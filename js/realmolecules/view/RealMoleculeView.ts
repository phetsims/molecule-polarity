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
import AtomLabelView from './AtomLabelView.js';
import TinyEmitter from '../../../../axon/js/TinyEmitter.js';
import { REAL_MOLECULES_CAMERA_POSITION } from '../model/RealMoleculesModel.js';
import MPPreferences from '../../common/model/MPPreferences.js';
import MolecularDipoleView from './MolecularDipoleView.js';
import BondDipoleView from './BondDipoleView.js';
import SurfaceMesh from './SurfaceMesh.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import AtomView from './AtomView.js';
import BondView from './BondView.js';

const BOND_DIPOLE_OFFSET = 0.4; // view units offset from bond centerline
const BOND_RADIUS = 0.085;

export default class RealMoleculeView extends THREE.Object3D {
  public constructor(
    moleculeProperty: TReadOnlyProperty<RealMolecule>,
    moleculeQuaternionProperty: TReadOnlyProperty<THREE.Quaternion>,
    viewProperties: RealMoleculesViewProperties,
    stepEmitter: TinyEmitter
  ) {
    super();

    // Map atoms/bonds to views, needed for update logic.
    const atomLabelViews: AtomLabelView[] = [];
    const atomViewMap = new Map<RealAtom, AtomView>();
    const bondViewMap = new Map<RealBond, BondView>();
    const bondDipoleViewMap = new Map<RealBond, BondDipoleView>();

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

      atomLabelViews.length = 0;
      atomViewMap.clear();
      bondViewMap.clear();
      bondDipoleViewMap.clear();

      for ( const atom of molecule.atoms ) {
        const view = new AtomView( atom );
        view.position.set( atom.position.x, atom.position.y, atom.position.z );
        this.add( view );
        atomViewMap.set( atom, view );
      }

      for ( const bond of molecule.bonds ) {
        const view = new BondView( bond, BOND_RADIUS );
        this.add( view );
        bondViewMap.set( bond, view );
      }

      // Molecular dipole arrow
      if ( molecularDipoleVisible ) {
        const mu = molecule.computeBondDipoleVectorSum();
        if ( mu.getMagnitude() > 1e-3 ) {
          const centralAtom = molecule.getCentralAtom()!;
          assert && assert( centralAtom, 'Expected a central atom when molecular dipole is significant' );

          const mdView = new MolecularDipoleView( molecule, orientationSign );
          this.add( mdView );

          // Dim the non-central atom that lies along the arrow direction (if any)
          const alignmentThreshold = 0.95; // cosine threshold for alignment
          let bestDot = alignmentThreshold;
          let alignedAtom: RealAtom | null = null;
          for ( const atom of molecule.atoms ) {
            if ( atom === centralAtom ) { continue; }
            const v = atom.position.minus( centralAtom.position ).normalized();
            const d = v.dot( mdView.dir );
            if ( d > bestDot ) {
              bestDot = d;
              alignedAtom = atom;
            }
          }

          if ( alignedAtom ) {
            // Dim the aligned atom mesh
            const atomView = atomViewMap.get( alignedAtom );
            atomView && atomView.setDimmed( true );

            // Dim the bond mesh between center and aligned atom
            const bond = molecule.bonds.find( bb =>
              ( bb.atomA === centralAtom && bb.atomB === alignedAtom ) ||
              ( bb.atomB === centralAtom && bb.atomA === alignedAtom )
            );
            const bView = bond ? bondViewMap.get( bond ) : null;
            bView && bView.setDimmed( true );
          }
        }
      }

      // Bond dipole arrows (black), one per bond
      if ( bondDipolesVisible ) {
        const localCamera2 = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );
        for ( const bond of molecule.bonds ) {
          const muMag = bond.getDipoleMagnitudeDebye();
          if ( muMag <= 1e-3 ) { continue; }
          const view = new BondDipoleView( molecule, bond );
          this.add( view );
          view.update( this, localCamera2, orientationSign, BOND_DIPOLE_OFFSET );
          bondDipoleViewMap.set( bond, view );
        }
      }

      if ( atomLabelsVisible || partialChargesVisible ) {
        for ( const atom of molecule.atoms ) {
          const label = new AtomLabelView( molecule, atom, atomLabelsVisible, partialChargesVisible );
          this.add( label );
          atomLabelViews.push( label );
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

      if ( atomLabelViews.length ) {
        for ( const view of atomLabelViews ) {
          view.update( this );
        }
      }

      // Update bonds to face the camera and handle double/triple offsets
      {
        const localCamera = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );

        const bondSeparation = BOND_RADIUS * ( 12 / 5 );

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

          const view = bondViewMap.get( bond );
          view && view.setTransforms( towardsEnd, center, distance, offsets );
        }
      }

      if ( viewProperties.bondDipolesVisibleProperty.value && bondDipoleViewMap.size ) {
        const localCamera = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );
        for ( const view of bondDipoleViewMap.values() ) {
          view.update( this, localCamera, orientationSignProperty.value, BOND_DIPOLE_OFFSET );
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
