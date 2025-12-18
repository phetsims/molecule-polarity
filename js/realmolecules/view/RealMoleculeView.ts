// Copyright 2025, University of Colorado Boulder

/**
 * 3D view of the molecule.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import RealMolecule, { RealAtom, RealBond } from '../model/RealMolecule.js';
import moleculePolarity from '../../moleculePolarity.js';
import Element from '../../../../nitroglycerin/js/Element.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import TextureQuad from '../../../../mobius/js/TextureQuad.js';
import NodeTexture from '../../../../mobius/js/NodeTexture.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import TinyEmitter from '../../../../axon/js/TinyEmitter.js';
import { REAL_MOLECULES_CAMERA_POSITION } from '../model/RealMoleculesModel.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import MPPreferences from '../../common/model/MPPreferences.js';
import { elementToForegroundColor } from '../model/RealMoleculeColors.js';
import DipoleArrowView from './DipoleArrowView.js';
import SurfaceMesh from './SurfaceMesh.js';

const LABEL_SIZE = 0.4;

export default class RealMoleculeView extends THREE.Object3D {
  public constructor(
    moleculeProperty: TReadOnlyProperty<RealMolecule>,
    moleculeQuaternionProperty: TReadOnlyProperty<THREE.Quaternion>,
    viewProperties: RealMoleculesViewProperties,
    stepEmitter: TinyEmitter
  ) {
    super();

    const stepLabels: TextureQuad[] = [];
    const atomMeshMap = new Map<RealAtom, THREE.Mesh>();
    const bondsMeshesMap = new Map<RealBond, THREE.Mesh[]>();
    type BondDipoleState = {
      arrow: DipoleArrowView;
      dir: Vector3; // unit vector, positive -> negative
      muMag: number; // Debye magnitude for this bond
      start: Vector3;
      end: Vector3;
      centerVisible: Vector3;
      visibleLength: number;
      bondType: number;
      lastOffsetDir?: Vector3; // unit vector for side selection persistence
    };
    let bondDipoleStates: BondDipoleState[] = [];
    // Track molecular arrow so we can update its cross orientation per frame
    let molecularArrow: DipoleArrowView | null = null;
    let molecularArrowDir: Vector3 | null = null;
    let bondDipoleGlobalScale = 1; // rescales all bond dipole lengths uniformly
    const BOND_DIPOLE_OFFSET = 0.4; // view units offset from bond centerline
    const BOND_DIPOLE_FACTOR = 1.3; // max fraction of VISIBLE bond length allowed per arrow
    const bondRadius = 0.085;

    const elementToRadius = ( element: Element ) => {
      const angstroms = element.vanDerWaalsRadius / 100;

      return 0.25 * angstroms; // scale factor for better visibility
    };

    Multilink.multilink( [
      moleculeProperty,
      viewProperties.surfaceTypeProperty,
      viewProperties.atomLabelsVisibleProperty,
      viewProperties.partialChargesVisibleProperty,
      viewProperties.molecularDipoleVisibleProperty,
      viewProperties.bondDipolesVisibleProperty,
      MPPreferences.dipoleDirectionProperty,
      MPPreferences.surfaceColorProperty
    ], ( molecule, surfaceType, atomLabelsVisible, partialChargesVisible, molecularDipoleVisible, bondDipolesVisible, dipoleDirection, surfaceColor ) => {

      // Dipole direction preference: default is positiveToNegative; otherwise reverse arrows
      const orientationSign = ( dipoleDirection === 'positiveToNegative' ) ? 1 : -1;

      // Clear out children
      while ( this.children.length > 0 ) {
        this.remove( this.children[ 0 ] );
      }
      molecularArrow = null;
      molecularArrowDir = null;
      stepLabels.length = 0;

      atomMeshMap.clear();
      for ( const atom of molecule.atoms ) {
        const sphereGeometry = new THREE.SphereGeometry( atom.getDisplayRadius(), 32, 32 );
        const atomMaterial = new THREE.MeshLambertMaterial( {
          color: ThreeUtils.colorToThree( atom.getColor() ),
          side: THREE.FrontSide // for when transparent
        } );

        // Ensure atoms write depth (default), so bonds can depth-test against them
        atomMaterial.depthWrite = true;
        const sphereMesh = new THREE.Mesh( sphereGeometry, atomMaterial );
        // Lower renderOrder so atoms render before bonds
        sphereMesh.renderOrder = 0;
        sphereMesh.position.set( atom.position.x, atom.position.y, atom.position.z );
        this.add( sphereMesh );
        atomMeshMap.set( atom, sphereMesh );
      }

      bondsMeshesMap.clear();
      bondDipoleStates = [];
      bondDipoleGlobalScale = 1;

      for ( const bond of molecule.bonds ) {
        const meshes: THREE.Mesh[] = [];
        const bondGeometry = new THREE.CylinderGeometry( 1, 1, 1, 32, 1, false );
        // Bonds: depthTest against atoms, but do not write depth to avoid self-occlusion artifacts when semi-transparent
        const bondMaterial = new THREE.MeshLambertMaterial( {
          color: 0xffffff,
          depthTest: true,
          side: THREE.FrontSide // for when transparent
        } );

        for ( let i = 0; i < bond.bondType; i++ ) {
          const mesh = new THREE.Mesh( bondGeometry, bondMaterial );
          // Higher renderOrder so bonds render after atoms regardless of transparency
          mesh.renderOrder = 10;
          this.add( mesh );
          meshes.push( mesh );
        }
        bondsMeshesMap.set( bond, meshes );
      }

      // Molecular dipole arrow
      if ( molecularDipoleVisible ) {
        const mu = molecule.computeMolecularDipole();
        if ( mu && mu.getMagnitude() > 1e-3 ) {
          const centralAtom = molecule.getCentralAtom()!;
          assert && assert( centralAtom, 'Expected a central atom when molecular dipole is significant' );

          const centralRadius = elementToRadius( centralAtom.element );

          // Choose visual arrow length relative to molecule size
          const span = molecule.getMaximumExtent();
          const baseLength = Math.max( 0.2, span * 0.6 );

          // Cap the maximum displayed arrow length to 1.5x the longest bond length in the molecule
          let maxBondLength = 0;
          for ( const bond of molecule.bonds ) {
            const d = bond.atomA.position.distance( bond.atomB.position );
            if ( d > maxBondLength ) {
              maxBondLength = d;
            }
          }
          const molecularCap = 1.5 * maxBondLength;

          // Scale arrow by dipole magnitude: if weaker than reference, uniformly shrink arrow;
          // if stronger, just lengthen (keep width constant).
          const muMag = mu.getMagnitude(); // Debye
          const MU_REF = 0.5; // 1 Debye as reference

          // Chemistry default: arrow from positive -> negative (we previously inverted from physics μ)
          const dir = mu.negated().dividedScalar( muMag ).timesScalar( orientationSign );
          // Tail just outside the central atom
          const tailV = centralAtom.position.plus( dir.timesScalar( centralRadius + 0.07 ) );
            const factor = muMag / MU_REF;
            const desiredDisplayedLength = baseLength * factor; // consistent for both branches
            const cappedDisplayedLength = Math.min( molecularCap, desiredDisplayedLength );

            const arrow = new DipoleArrowView( false );
            if ( factor >= 1 ) {
              // No uniform scale; set the final displayed length directly
              arrow.setFrom( tailV, dir, cappedDisplayedLength );
            }
            else {
              // Uniformly scale arrow by factor; pre-scale length so final displayed length equals the cap
              const preScaleLength = cappedDisplayedLength / Math.max( factor, 1e-6 );
              arrow.setFrom( tailV, dir, preScaleLength );
              arrow.scale.setScalar( factor );
            }
            this.add( arrow );

            // Initialize cross axis aligned with the arrow direction
            arrow.setCrossPerp( dir );

            // Track for per-frame update
            molecularArrow = arrow;
            molecularArrowDir = dir;

            // Dim the non-central atom that lies along the arrow direction (if any)
            const alignmentThreshold = 0.95; // cosine threshold for alignment
            let bestDot = alignmentThreshold;
            let alignedAtom: RealAtom | null = null;
            for ( const atom of molecule.atoms ) {
              if ( atom === centralAtom ) { continue; }
              const v = atom.position.minus( centralAtom.position ).normalized();
              const d = v.dot( dir );
              if ( d > bestDot ) {
                bestDot = d;
                alignedAtom = atom;
              }
            }

            if ( alignedAtom ) {
              // Dim the aligned atom mesh
              const atomMesh = atomMeshMap.get( alignedAtom );
              if ( atomMesh ) {
                const mat = atomMesh.material as THREE.MeshLambertMaterial;
                mat.transparent = true;
                mat.opacity = 0.5;
              }

              // Dim the bond mesh between center and aligned atom
              const bond = molecule.bonds.find( bb =>
                ( bb.atomA === centralAtom && bb.atomB === alignedAtom ) ||
                ( bb.atomB === centralAtom && bb.atomA === alignedAtom )
              )!;

              const meshes = bondsMeshesMap.get( bond );
              if ( meshes ) {
                for ( const mesh of meshes ) {
                  const bmat = mesh.material as THREE.MeshLambertMaterial;
                  bmat.transparent = true;
                  bmat.opacity = 0.5;
                }
              }
            }
        }
      }

      // Bond dipole arrows (black), one per bond
      if ( bondDipolesVisible ) {
        // Compute a global scale so each bond arrow fits within its visible bond length
        let globalScalePerDebye = Number.POSITIVE_INFINITY;
        for ( const bond of molecule.bonds ) {
          const muMag = bond.getDipoleMagnitudeDebye();
          if ( muMag <= 1e-3 ) { continue; }
          const cap = BOND_DIPOLE_FACTOR * bond.getVisibleLength();
          globalScalePerDebye = Math.min( globalScalePerDebye, cap / muMag );
        }
        if ( !isFinite( globalScalePerDebye ) || globalScalePerDebye < 0 ) {
          globalScalePerDebye = 0;
        }
        bondDipoleGlobalScale = globalScalePerDebye;

        // Create arrows with the uniform global scale
        for ( const bond of molecule.bonds ) {
          const muMag = bond.getDipoleMagnitudeDebye();
          if ( muMag <= 1e-3 ) { continue; }
          const start = bond.atomA.position;
          const end = bond.atomB.position;
          const dist = start.distance( end );
          const dir = bond.getPositiveToNegativeUnit().timesScalar( orientationSign );
          const centerVisible = bond.getVisibleCenter();

          const arrow = new DipoleArrowView( true );
          const drawLength = Math.max( 0, muMag * bondDipoleGlobalScale );
          const centerInit = centerVisible;
          const minUnscaled = Math.max( 0.2, 0.72 * dist );
          if ( drawLength < minUnscaled ) {
            const initialTail = centerInit.plus( dir.timesScalar( -drawLength / 2 ) );
            arrow.setFrom( initialTail, dir, minUnscaled );
            const uniformScale = Math.max( drawLength / Math.max( minUnscaled, 1e-6 ), 0 );
            arrow.scale.setScalar( uniformScale );
          }
          else {
            const initialTail = centerInit.plus( dir.timesScalar( -drawLength / 2 ) );
            arrow.setFrom( initialTail, dir, drawLength );
            arrow.scale.setScalar( 1 );
          }
          this.add( arrow );

          const localCamera2 = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );
          const viewDirInit = centerInit.minus( localCamera2 ).normalized();
          let axisInit = dir.minus( viewDirInit.timesScalar( dir.dot( viewDirInit ) ) ).normalized();
          if ( axisInit.getMagnitudeSquared() < 1e-6 ) {
            const worldX = Vector3.X_UNIT;
            const alt = ( Math.abs( viewDirInit.dot( worldX ) ) > 0.9 ) ? Vector3.Y_UNIT : worldX;
            axisInit = viewDirInit.cross( alt ).normalized();
          }
          arrow.setCrossPerp( axisInit );

          bondDipoleStates.push( {
            arrow: arrow,
            dir: dir,
            muMag: muMag,
            start: start,
            end: end,
            centerVisible: centerVisible,
            visibleLength: bond.getVisibleLength(),
            bondType: bond.bondType
          } );
        }
      }

      if ( atomLabelsVisible || partialChargesVisible ) {
        for ( const atom of molecule.atoms ) {
          const element = atom.element;
          const partialCharge = atom.getPartialCharge();
          const sameElementAtoms = molecule.atoms.filter( a => a.element === atom.element );
          const atomVisualIndex = sameElementAtoms.indexOf( atom );
          const showIndex = sameElementAtoms.length > 1;

          const labelFill = elementToForegroundColor( element );

          const labelFont = new PhetFont( { size: 130, weight: 'bold' } );
          const smallFont = new PhetFont( { size: 110, weight: 'bold' } );
          const labelNode = new VBox( {
            children: [
              ...( atomLabelsVisible ? [
                new Text( showIndex ? `${element.symbol}${atomVisualIndex + 1}` : `${element.symbol}`, {
                  font: labelFont,
                  fill: labelFill
                } )
              ] : [] ),
              ...( partialChargesVisible ? [
                // TODO: strings! https://github.com/phetsims/molecule-polarity/issues/15
                new Text( `δ=${toFixed( partialCharge, 2 )}`, { font: smallFont, fill: labelFill } )
              ] : [] )
            ],
            center: new Vector2( 256, 128 )
          } );

          const labelNodeTexture = new NodeTexture( labelNode, {
            width: 512,
            height: 256
          } );

          const label = new TextureQuad( labelNodeTexture, 2 * LABEL_SIZE, LABEL_SIZE, {
            depthTest: true
          } );

          ( label as unknown as THREE.Object3D ).renderOrder = 100;

          label.position.copy( ThreeUtils.vectorToThree( new Vector3( -2 * LABEL_SIZE * 0.5, -LABEL_SIZE * 0.5, 2 ) ) );

          this.add( label );
          stepLabels.push( label );
        }
      }

      if ( surfaceType !== 'none' ) {
        this.add( new SurfaceMesh( molecule, surfaceType, surfaceColor ) );
      }
    } );

    moleculeQuaternionProperty.link( quaternion => {
      this.quaternion.copy( quaternion );
      this.updateMatrix();
      this.updateMatrixWorld();
    } );

    stepEmitter.addListener( () => {

      const molecule = moleculeProperty.value;

      if ( stepLabels.length ) {
        for ( let i = 0; i < stepLabels.length; i++ ) {
          const label = stepLabels[ i ];
          const atom = molecule.atoms[ i ];

          const localPoint = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );
          const localUpPoint = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION.plus( Vector3.Y_UNIT ) ) ) );

          const dirToCamera = localPoint.normalized();
          const upDir = localUpPoint.minus( localPoint ).normalized();
          const rightDir = upDir.cross( dirToCamera ).normalized();

          const element = atom.element;
          const atomPosition = atom.position;
          const atomRadius = elementToRadius( element );

          const labelCenter = atomPosition.plus( dirToCamera.timesScalar( atomRadius + 0.03 ) );
          const labelLowerLeft = labelCenter.plus( rightDir.timesScalar( -LABEL_SIZE ).plus( upDir.timesScalar( -0.5 * LABEL_SIZE ) ) );

          // TODO: don't require a renormalization https://github.com/phetsims/molecule-polarity/issues/15
          const forward = dirToCamera; // Z+
          const up = upDir; // Y+
          const right = up.cross( forward ).normalized(); // X+
          const rotMatrix = new THREE.Matrix4();
          rotMatrix.makeBasis(
            ThreeUtils.vectorToThree( right ),
            ThreeUtils.vectorToThree( up ),
            ThreeUtils.vectorToThree( forward )
          );

          label.matrixAutoUpdate = false;

          const m = new THREE.Matrix4();
          m.makeBasis(
            ThreeUtils.vectorToThree( right ),
            ThreeUtils.vectorToThree( up ),
            ThreeUtils.vectorToThree( forward )
          );
          m.setPosition( ThreeUtils.vectorToThree( labelLowerLeft ) );

          label.matrix.copy( m );
        }
      }

      // Update bonds to face the camera and handle double/triple offsets
      {
        const localCamera = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );

        const threeYUnit = new THREE.Vector3( 0, 1, 0 );

        const bondSeparation = bondRadius * ( 12 / 5 );

        for ( const bond of molecule.bonds ) {
          const atomA = bond.atomA;
          const atomB = bond.atomB;

          const start = atomA.position;
          const end = atomB.position;
          const towardsEnd = end.minus( start ).normalized();
          const distance = start.distance( end );
          const center = start.timesScalar( 0.5 ).plus( end.timesScalar( 0.5 ) );

          // Perpendicular to bond direction and camera direction
          const perpendicular = center.minus( end ).normalized().cross( center.minus( localCamera ).normalized() ).normalized();

          let offsets: Vector3[] = [];
          switch( bond.bondType ) {
            case 1:
              offsets = [ new Vector3( 0, 0, 0 ) ];
              break;
            case 2:
              offsets = [ perpendicular.timesScalar( bondSeparation / 2 ), perpendicular.timesScalar( -bondSeparation / 2 ) ];
              break;
            case 3:
              offsets = [ new Vector3( 0, 0, 0 ), perpendicular.timesScalar( bondSeparation ), perpendicular.timesScalar( -bondSeparation ) ];
              break;
            default:
              throw new Error( `Unsupported bond type: ${bond.bondType}` );
          }

          const threeTowardsEnd = ThreeUtils.vectorToThree( towardsEnd );
          const meshes = bondsMeshesMap.get( bond );
          if ( !meshes ) { continue; }
          for ( let i = 0; i < meshes.length; i++ ) {
            const mesh = meshes[ i ];
            const translation = center.plus( offsets[ i ] );
            mesh.position.set( translation.x, translation.y, translation.z );
            mesh.quaternion.setFromUnitVectors( threeYUnit, threeTowardsEnd );
            mesh.scale.x = mesh.scale.z = bondRadius;
            mesh.scale.y = distance;
            mesh.updateMatrix();
          }
        }
      }

      // Update bond dipole arrows to offset perpendicular to view and bond, with stable side selection
      if ( viewProperties.bondDipolesVisibleProperty.value && bondDipoleStates.length ) {
        const localCamera = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );
        for ( const state of bondDipoleStates ) {
          const start = state.start;
          const end = state.end;
          const center = state.centerVisible;
          const bondDirV = end.minus( start ).normalized();

          // Compute a perpendicular direction relative to camera
          const viewDirV = center.minus( localCamera ).normalized();
          let perpV = bondDirV.cross( viewDirV ).normalized();
          if ( perpV.getMagnitudeSquared() < 1e-6 ) {
            // Fallback perpendicular independent of view
            const alt = ( Math.abs( bondDirV.dot( Vector3.X_UNIT ) ) > 0.9 ) ? Vector3.Y_UNIT : Vector3.X_UNIT;
            perpV = bondDirV.cross( alt ).normalized();
          }
          const perpNegV = perpV.timesScalar( -1 );

          // Choose side closest to previous frame
          let chosenV = perpV;
          if ( state.lastOffsetDir ) {
            const d1 = perpV.dot( state.lastOffsetDir );
            const d2 = perpNegV.dot( state.lastOffsetDir );
            chosenV = ( d2 > d1 ) ? perpNegV : perpV;
          }
          state.lastOffsetDir = chosenV;

          // Recompute tail position so that the arrow is centered at the bond center,
          // with side offset perpendicular to view and bond.
          const centerV = center;
          // Use the global uniform scale so proportionality remains correct
          const distNow = start.distance( end );
          const drawLength = Math.max( 0, state.muMag * bondDipoleGlobalScale );
          const sideOffsetScale = ( state.bondType === 3 ? 1.3 : ( state.bondType === 2 ? 1.1 : 0.9 ) );
          const tailV = centerV
            .plus( chosenV.timesScalar( BOND_DIPOLE_OFFSET * sideOffsetScale ) )
            .plus( state.dir.timesScalar( -drawLength / 2 ) );
          state.arrow.setFrom( tailV, state.dir, drawLength );
          // Cross axis should be parallel to bond direction but perpendicular to camera at arrow location (tail)
          const arrowPosFrameV = ThreeUtils.threeToVector( state.arrow.position ); // tail in parent space
          const viewDirFrameV = arrowPosFrameV.minus( localCamera ).normalized();
          let axisFrameV = state.dir.minus( viewDirFrameV.timesScalar( state.dir.dot( viewDirFrameV ) ) ).normalized();
          if ( axisFrameV.getMagnitudeSquared() < 1e-6 ) {
            const alt = ( Math.abs( viewDirFrameV.dot( Vector3.X_UNIT ) ) > 0.9 ) ? Vector3.Y_UNIT : Vector3.X_UNIT;
            axisFrameV = viewDirFrameV.cross( alt ).normalized();
          }
          state.arrow.setCrossPerp( axisFrameV );
          // Scale thickness consistently with the final length scaling
          const minUnscaledU = Math.max( 0.2, 0.72 * distNow );
          if ( drawLength < minUnscaledU ) {
            // Build arrow at M and uniformly scale to X/M.
            // Keep arrow centered at visible center by computing tail with X (final length).
            const tailForM = centerV
              .plus( chosenV.timesScalar( BOND_DIPOLE_OFFSET * sideOffsetScale ) )
              .plus( state.dir.timesScalar( -drawLength / 2 ) );
            state.arrow.setFrom( tailForM, state.dir, minUnscaledU );
            const uniformScaleU = Math.max( drawLength / Math.max( minUnscaledU, 1e-6 ), 0 );
            state.arrow.scale.setScalar( uniformScaleU );
          }
          else {
            state.arrow.setFrom( tailV, state.dir, drawLength );
            state.arrow.scale.setScalar( 1 );
          }
        }
      }

      // Update molecular dipole cross orientation each frame (aligned with arrow)
      if ( molecularArrow && molecularArrowDir ) {
        molecularArrow.setCrossPerp( molecularArrowDir );
      }
    } );
  }

  /**
   * Disposes this view, so that its components can be reused for new molecules.
   */
  public dispose(): void {
    // Will fill in disposal
  }
}

moleculePolarity.register( 'RealMoleculeView', RealMoleculeView );
