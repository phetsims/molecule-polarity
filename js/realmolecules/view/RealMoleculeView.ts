// Copyright 2025, University of Colorado Boulder

/**
 * 3D view of the molecule.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import RealMolecule, { RealAtom, RealBond } from '../model/RealMolecule.js';
import moleculePolarity from '../../moleculePolarity.js';
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
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

const LABEL_SIZE = 0.4;
const BOND_DIPOLE_OFFSET = 0.4; // view units offset from bond centerline
const BOND_DIPOLE_FACTOR = 1.3; // max fraction of VISIBLE bond length allowed per arrow

const BOND_DIPOLE_FACTOR_OVERRIDES: Record<string, number> = {
  HF: 2,
  HCN: 1.6,
  CH2O: 1.6,
  CHCl3: 1.6
};

const getBondDipoleFactor = ( molecule: RealMolecule ): number => {
  return BOND_DIPOLE_FACTOR_OVERRIDES[ molecule.rawSymbol ] ?? BOND_DIPOLE_FACTOR;
};

export default class RealMoleculeView extends THREE.Object3D {
  public constructor(
    moleculeProperty: TReadOnlyProperty<RealMolecule>,
    moleculeQuaternionProperty: TReadOnlyProperty<THREE.Quaternion>,
    viewProperties: RealMoleculesViewProperties,
    stepEmitter: TinyEmitter
  ) {
    super();

    // Map atoms/bonds to views, needed for update logic.
    const atomLabelMap = new Map<RealAtom, TextureQuad>();
    const atomMeshMap = new Map<RealAtom, THREE.Mesh>();
    const bondsMeshesMap = new Map<RealBond, THREE.Mesh[]>();
    const bondDipoleMap = new Map<RealBond, DipoleArrowView>();
    const bondDipoleLastOffsetDirMap = new Map<RealBond, Vector3>();

    let bondDipoleGlobalScale = 1; // rescales all bond dipole lengths uniformly
    const bondRadius = 0.085;

    const orientationSignProperty = new DerivedProperty( [ MPPreferences.dipoleDirectionProperty ], dipoleDirection => {
      return ( dipoleDirection === 'positiveToNegative' ) ? 1 : -1;
    } );

    Multilink.multilink( [
      moleculeProperty,
      viewProperties.surfaceTypeProperty,
      viewProperties.atomLabelsVisibleProperty,
      viewProperties.partialChargesVisibleProperty,
      viewProperties.molecularDipoleVisibleProperty,
      viewProperties.bondDipolesVisibleProperty,
      orientationSignProperty,
      MPPreferences.surfaceColorProperty
    ], ( molecule, surfaceType, atomLabelsVisible, partialChargesVisible, molecularDipoleVisible, bondDipolesVisible, orientationSign, surfaceColor ) => {

      // Clear out children
      while ( this.children.length > 0 ) {
        this.remove( this.children[ 0 ] );
      }

      atomLabelMap.clear();
      atomMeshMap.clear();
      bondsMeshesMap.clear();
      bondDipoleMap.clear();
      bondDipoleLastOffsetDirMap.clear();

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

      // Ensure bond dipole global scale is computed so molecular/bond arrows share the same per-Debye scale
      {
        let globalScalePerDebye = Number.POSITIVE_INFINITY;
        for ( const bond of molecule.bonds ) {
          const muMag = bond.getDipoleMagnitudeDebye();
          if ( muMag <= 1e-3 ) { continue; }
          const cap = getBondDipoleFactor( molecule ) * bond.getVisibleLength();
          globalScalePerDebye = Math.min( globalScalePerDebye, cap / muMag );
        }
        if ( !isFinite( globalScalePerDebye ) || globalScalePerDebye < 0 ) {
          globalScalePerDebye = 0;
        }
        bondDipoleGlobalScale = globalScalePerDebye;
      }

      // Molecular dipole arrow
      if ( molecularDipoleVisible ) {
        const mu = molecule.computeBondDipoleVectorSum();
        if ( mu.getMagnitude() > 1e-3 ) {
          const centralAtom = molecule.getCentralAtom()!;
          assert && assert( centralAtom, 'Expected a central atom when molecular dipole is significant' );

          const centralRadius = centralAtom.getDisplayRadius();
          const muMag = mu.getMagnitude(); // Debye
          // Bond arrows are from positive->negative, so our sum is too; no negation needed here.
          const dir = mu.dividedScalar( muMag ).timesScalar( orientationSign );
          const tailV = centralAtom.position.plus( dir.timesScalar( centralRadius + 0.07 ) );

          // Use the same per-Debye scale as bond dipoles
          const drawLength = Math.max( 0, muMag * bondDipoleGlobalScale );
          const span = molecule.getMaximumExtent();
          const minUnscaled = Math.max( 0.2, 0.6 * span );

          const arrow = new DipoleArrowView( false );
          if ( drawLength < minUnscaled ) {
            arrow.setFrom( tailV, dir, minUnscaled );
            const uniformScale = Math.max( drawLength / Math.max( minUnscaled, 1e-6 ), 0 );
            arrow.scale.setScalar( uniformScale );
          }
          else {
            arrow.setFrom( tailV, dir, drawLength );
            arrow.scale.setScalar( 1 );
          }
          this.add( arrow );

          // Initialize cross axis aligned with the arrow direction
          arrow.setCrossPerp( dir );

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
            );
            const meshes = bond ? bondsMeshesMap.get( bond ) : null;
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
          const cap = getBondDipoleFactor( molecule ) * bond.getVisibleLength();
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
          bondDipoleMap.set( bond, arrow );
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
          atomLabelMap.set( atom, label );
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

      if ( atomLabelMap.size ) {
        for ( const atom of molecule.atoms ) {
          const label = atomLabelMap.get( atom );
          if ( !label ) { continue; }

          const localPoint = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );
          const localUpPoint = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION.plus( Vector3.Y_UNIT ) ) ) );

          const dirToCamera = localPoint.normalized();
          const upDir = localUpPoint.minus( localPoint ).normalized();
          const rightDir = upDir.cross( dirToCamera ).normalized();

          const labelCenter = atom.position.plus( dirToCamera.timesScalar( atom.getDisplayRadius() + 0.03 ) );
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
      if ( viewProperties.bondDipolesVisibleProperty.value && bondDipoleMap.size ) {
        const localCamera = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );
        for ( const [ bond, arrow ] of bondDipoleMap ) {
          const start = bond.atomA.position;
          const end = bond.atomB.position;
          const center = bond.getVisibleCenter();
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
          const last = bondDipoleLastOffsetDirMap.get( bond );
          if ( last ) {
            const d1 = perpV.dot( last );
            const d2 = perpNegV.dot( last );
            chosenV = ( d2 > d1 ) ? perpNegV : perpV;
          }
          bondDipoleLastOffsetDirMap.set( bond, chosenV );

          // Recompute tail position so that the arrow is centered at the bond center,
          // with side offset perpendicular to view and bond.
          const centerV = center;
          const distNow = start.distance( end );
          const drawLength = Math.max( 0, bond.getDipoleMagnitudeDebye() * bondDipoleGlobalScale );
          const sideOffsetScale = ( bond.bondType === 3 ? 1.3 : ( bond.bondType === 2 ? 1.1 : 0.9 ) );
          const dir = bond.getPositiveToNegativeUnit().timesScalar( orientationSignProperty.value );
          const tailV = centerV
            .plus( chosenV.timesScalar( BOND_DIPOLE_OFFSET * sideOffsetScale ) )
            .plus( dir.timesScalar( -drawLength / 2 ) );
          arrow.setFrom( tailV, dir, drawLength );
          // Cross axis should be parallel to bond direction but perpendicular to camera at arrow location (tail)
          const arrowPosFrameV = ThreeUtils.threeToVector( arrow.position ); // tail in parent space
          const viewDirFrameV = arrowPosFrameV.minus( localCamera ).normalized();
          let axisFrameV = dir.minus( viewDirFrameV.timesScalar( dir.dot( viewDirFrameV ) ) ).normalized();
          if ( axisFrameV.getMagnitudeSquared() < 1e-6 ) {
            const alt = ( Math.abs( viewDirFrameV.dot( Vector3.X_UNIT ) ) > 0.9 ) ? Vector3.Y_UNIT : Vector3.X_UNIT;
            axisFrameV = viewDirFrameV.cross( alt ).normalized();
          }
          arrow.setCrossPerp( axisFrameV );
          // Scale thickness consistently with the final length scaling
          const minUnscaledU = Math.max( 0.2, 0.72 * distNow );
          if ( drawLength < minUnscaledU ) {
            // Build arrow at M and uniformly scale to X/M.
            // Keep arrow centered at visible center by computing tail with X (final length).
            const tailForM = centerV
              .plus( chosenV.timesScalar( BOND_DIPOLE_OFFSET * sideOffsetScale ) )
              .plus( dir.timesScalar( -drawLength / 2 ) );
            arrow.setFrom( tailForM, dir, minUnscaledU );
            const uniformScaleU = Math.max( drawLength / Math.max( minUnscaledU, 1e-6 ), 0 );
            arrow.scale.setScalar( uniformScaleU );
          }
          else {
            arrow.setFrom( tailV, dir, drawLength );
            arrow.scale.setScalar( 1 );
          }
        }
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
