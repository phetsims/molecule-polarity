// Copyright 2014-2026, University of Colorado Boulder

/**
 * RealMoleculesModel is the model for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import LocalizedStringProperty from '../../../../chipper/js/browser/LocalizedStringProperty.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import TModel from '../../../../joist/js/TModel.js';
import THREE from '../../../../mobius/js/THREE.js';
import ThreeQuaternionIO from '../../../../mobius/js/ThreeQuaternionIO.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPQueryParameters from '../../common/MPQueryParameters.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import RealMolecule, { MoleculeGeometry, MoleculeSymbols } from './RealMolecule.js';
import { RealMoleculeCustomization } from './RealMoleculeCustomization.js';

export const REAL_MOLECULES_CAMERA_POSITION = new Vector3( 0, 1.5, 15 );

export default class RealMoleculesModel extends PhetioObject implements TModel {

  // the set of molecules to choose from
  public readonly molecules: RealMolecule[];

  // the selected molecule
  public readonly moleculeProperty: Property<RealMolecule>;

  // the rotation of the molecule view
  public readonly moleculeQuaternionProperty: Property<THREE.Quaternion>;

  // whether the advanced view is selected (as opposed to the "basic" view)
  public readonly isAdvancedProperty: BooleanProperty;

  public constructor( tandem: Tandem ) {

    super( {
      tandem: tandem,
      phetioState: false
    } );

    const moleculesTandem = tandem.createTandem( 'molecules' );

    this.moleculeQuaternionProperty = new Property( new THREE.Quaternion(), {
      tandem: tandem.createTandem( 'moleculeQuaternionProperty' ),
      phetioValueType: ThreeQuaternionIO,
      phetioDocumentation: 'A quaternion describing the rotation of the molecule view'
    } );

    this.isAdvancedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'isAdvancedProperty' ),
      phetioDocumentation: 'Whether the selected model is advanced (true) or basic (false).',
      phetioFeatured: true
    } );

    const createMolecule = ( symbol: MoleculeSymbols, nameStringProperty: LocalizedStringProperty, geometry: MoleculeGeometry ) => {
      return new RealMolecule(
        symbol,
        nameStringProperty,
        geometry,
        this.isAdvancedProperty,
        moleculesTandem.createTandem( symbol )
      );
    };

    this.molecules = [
      createMolecule( 'H2', MoleculePolarityStrings.hydrogenStringProperty, 'linear' ),
      createMolecule( 'N2', MoleculePolarityStrings.nitrogenStringProperty, 'linear' ),
      createMolecule( 'O2', MoleculePolarityStrings.oxygenStringProperty, 'linear' ),
      createMolecule( 'F2', MoleculePolarityStrings.fluorineStringProperty, 'linear' ),
      createMolecule( 'HF', MoleculePolarityStrings.hydrogenFluorideStringProperty, 'linear' ),

      createMolecule( 'H2O', MoleculePolarityStrings.waterStringProperty, 'bent' ),
      createMolecule( 'CO2', MoleculePolarityStrings.carbonDioxideStringProperty, 'linear' ),
      createMolecule( 'HCN', MoleculePolarityStrings.hydrogenCyanideStringProperty, 'linear' ),
      createMolecule( 'O3', MoleculePolarityStrings.ozoneStringProperty, 'bent' ),

      createMolecule( 'NH3', MoleculePolarityStrings.ammoniaStringProperty, 'trigonalPyramidal' ),
      createMolecule( 'BH3', MoleculePolarityStrings.boraneStringProperty, 'trigonalPlanar' ),
      createMolecule( 'BF3', MoleculePolarityStrings.boronTrifluorideStringProperty, 'trigonalPlanar' ),
      createMolecule( 'CH2O', MoleculePolarityStrings.formaldehydeStringProperty, 'trigonalPlanar' ),

      createMolecule( 'CH4', MoleculePolarityStrings.methaneStringProperty, 'tetrahedral' ),
      createMolecule( 'CH3F', MoleculePolarityStrings.fluoromethaneStringProperty, 'tetrahedral' ),
      createMolecule( 'CH2F2', MoleculePolarityStrings.difluoromethaneStringProperty, 'tetrahedral' ),
      createMolecule( 'CHF3', MoleculePolarityStrings.trifluoromethaneStringProperty, 'tetrahedral' ),
      createMolecule( 'CF4', MoleculePolarityStrings.tetrafluoromethaneStringProperty, 'tetrahedral' ),
      createMolecule( 'CHCl3', MoleculePolarityStrings.chloroformStringProperty, 'tetrahedral' )
    ];

    const selectedMolecule = this.molecules.find( molecule => molecule.symbol === 'HF' )!;

    this.moleculeProperty = new Property( selectedMolecule, {
      validValues: this.molecules,
      phetioValueType: RealMolecule.RealMoleculeIO,
      tandem: tandem.createTandem( 'moleculeProperty' ),
      phetioFeatured: true
    } );

    // Reset the quaternion when the molecule changes
    this.moleculeProperty.link( molecule => this.updateRotation( molecule ) );

    if ( MPQueryParameters.logQuaternionRotation ) {
      this.moleculeQuaternionProperty.link( quaternion => {
        console.log( `Molecule Quaternion changed to:\n  ${quaternion.x},\n  ${quaternion.y},\n  ${quaternion.z},\n  ${quaternion.w}` );
      } );
    }
  }

  /**
   * Apply the initial rotation for the specified molecule.
   */
  public updateRotation( molecule: RealMolecule ): void {
    this.moleculeQuaternionProperty.value = RealMoleculeCustomization[ molecule.symbol ].initialRotation ?? new THREE.Quaternion();
  }

  /**
   * Reset all model state.
   */
  public reset(): void {
    this.moleculeProperty.reset();
    this.moleculeQuaternionProperty.reset();
    this.isAdvancedProperty.reset();
    this.updateRotation( this.moleculeProperty.value );
  }
}

moleculePolarity.register( 'RealMoleculesModel', RealMoleculesModel );