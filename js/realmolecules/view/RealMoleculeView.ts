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

      // Atom spheres
      for ( const atom of molecule.atoms ) {
        const view = new AtomView( atom );
        this.add( view );
        atomViewMap.set( atom, view );
      }

      // Bond cylinders
      for ( const bond of molecule.bonds ) {
        const view = new BondView( bond );
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

          const alignedAtom = molecule.getMoleculeDipoleAlignedAtom( orientationSign );
          if ( alignedAtom ) {
            const atomView = atomViewMap.get( alignedAtom );
            atomView && atomView.setDimmed( true );

            const bond = molecule.bonds.find( bb =>
              ( bb.atomA === centralAtom && bb.atomB === alignedAtom ) ||
              ( bb.atomB === centralAtom && bb.atomA === alignedAtom )
            );
            const bondView = bond ? bondViewMap.get( bond ) : null;
            bondView && bondView.setDimmed( true );
          }
        }
      }

      // Bond dipole arrows
      if ( bondDipolesVisible ) {
        const localCamera2 = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );
        for ( const bond of molecule.bonds ) {
          if ( bond.getDipoleMagnitudeDebye() > 1e-3 ) {
            const view = new BondDipoleView( molecule, bond );
            this.add( view );
            view.update( this, localCamera2, orientationSign );
            bondDipoleViewMap.set( bond, view );
          }
        }
      }

      // Atom labels
      if ( atomLabelsVisible || partialChargesVisible ) {
        for ( const atom of molecule.atoms ) {
          const label = new AtomLabelView( molecule, atom, atomLabelsVisible, partialChargesVisible );
          this.add( label );
          atomLabelViews.push( label );
        }
      }

      // Surface (MEP or electron density)
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
      const localCamera = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );

      for ( const view of atomLabelViews ) {
        view.update( this );
      }

      for ( const bond of molecule.bonds ) {
        const bondView = bondViewMap.get( bond );
        bondView && bondView.update( this, localCamera );

        const bondDipoleView = bondDipoleViewMap.get( bond );
        bondDipoleView && bondDipoleView.update( this, localCamera, orientationSignProperty.value );
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
