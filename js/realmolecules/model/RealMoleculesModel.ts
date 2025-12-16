// Copyright 2014-2025, University of Colorado Boulder

/**
 * RealMoleculesModel is the model for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import TModel from '../../../../joist/js/TModel.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import RealMolecule from './RealMolecule.js';
import ThreeQuaternionIO from '../../../../mobius/js/ThreeQuaternionIO.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import MPQueryParameters from '../../common/MPQueryParameters.js';

export const REAL_MOLECULES_CAMERA_POSITION = new Vector3( 0, 1.5, 15 );

export default class RealMoleculesModel extends PhetioObject implements TModel {

  // the set of molecules to choose from
  public readonly molecules: RealMolecule[];

  // the selected molecule
  public readonly moleculeProperty: Property<RealMolecule>;

  // the rotation of the molecule view
  public readonly moleculeQuaternionProperty: Property<THREE.Quaternion>;

  public constructor( tandem: Tandem ) {

    super( {
      tandem: tandem,
      phetioState: false
    } );

    const moleculesTandem = tandem.createTandem( 'molecules' );

    const selectedMolecule = new RealMolecule( 'HF', MoleculePolarityStrings.hydrogenFluorideStringProperty, moleculesTandem.createTandem( 'HF' ) );

    this.moleculeQuaternionProperty = new Property( new THREE.Quaternion(), {
      tandem: tandem.createTandem( 'moleculeQuaternionProperty' ),
      phetioValueType: ThreeQuaternionIO,
      phetioDocumentation: 'A quaternion describing the rotation of the molecule view'
    } );

    this.molecules = [

      new RealMolecule( 'H2', MoleculePolarityStrings.hydrogenStringProperty, moleculesTandem.createTandem( 'H2' ) ),
      new RealMolecule( 'N2', MoleculePolarityStrings.nitrogenStringProperty, moleculesTandem.createTandem( 'N2' ) ),
      new RealMolecule( 'O2', MoleculePolarityStrings.oxygenStringProperty, moleculesTandem.createTandem( 'O2' ) ),
      new RealMolecule( 'F2', MoleculePolarityStrings.fluorineStringProperty, moleculesTandem.createTandem( 'F2' ) ),
      selectedMolecule,

      new RealMolecule( 'H2O', MoleculePolarityStrings.waterStringProperty, moleculesTandem.createTandem( 'H2O' ) ),
      new RealMolecule( 'CO2', MoleculePolarityStrings.carbonDioxideStringProperty, moleculesTandem.createTandem( 'CO2' ) ),
      new RealMolecule( 'HCN', MoleculePolarityStrings.hydrogenCyanideStringProperty, moleculesTandem.createTandem( 'HCN' ) ),
      new RealMolecule( 'O3', MoleculePolarityStrings.ozoneStringProperty, moleculesTandem.createTandem( 'O3' ) ),

      new RealMolecule( 'NH3', MoleculePolarityStrings.ammoniaStringProperty, moleculesTandem.createTandem( 'NH3' ) ),
      new RealMolecule( 'BH3', MoleculePolarityStrings.boraneStringProperty, moleculesTandem.createTandem( 'BH3' ) ),
      new RealMolecule( 'BF3', MoleculePolarityStrings.boronTrifluorideStringProperty, moleculesTandem.createTandem( 'BF3' ) ),
      new RealMolecule( 'CH2O', MoleculePolarityStrings.formaldehydeStringProperty, moleculesTandem.createTandem( 'CH2O' ) ),

      new RealMolecule( 'CH4', MoleculePolarityStrings.methaneStringProperty, moleculesTandem.createTandem( 'CH4' ) ),
      new RealMolecule( 'CH3F', MoleculePolarityStrings.fluoromethaneStringProperty, moleculesTandem.createTandem( 'CH3F' ) ),
      new RealMolecule( 'CH2F2', MoleculePolarityStrings.difluoromethaneStringProperty, moleculesTandem.createTandem( 'CH2F2' ) ),
      new RealMolecule( 'CHF3', MoleculePolarityStrings.trifluoromethaneStringProperty, moleculesTandem.createTandem( 'CHF3' ) ),
      new RealMolecule( 'CF4', MoleculePolarityStrings.tetrafluoromethaneStringProperty, moleculesTandem.createTandem( 'CF4' ) ),
      new RealMolecule( 'CHCl3', MoleculePolarityStrings.chloroformStringProperty, moleculesTandem.createTandem( 'CHCl3' ) )
    ];

    this.moleculeProperty = new Property( selectedMolecule, {
      validValues: this.molecules,
      phetioValueType: RealMolecule.RealMoleculeIO,
      tandem: tandem.createTandem( 'moleculeProperty' ),
      phetioFeatured: true
    } );

    // Reset the quaternion when the molecule changes
    this.moleculeProperty.link( molecule => {
      if (
        molecule.rawSymbol === 'HF' ||
        molecule.rawSymbol === 'HCN'
      ) {
        this.moleculeQuaternionProperty.value = new THREE.Quaternion( 0, -Math.sqrt( 2 ) / 2, 0, Math.sqrt( 2 ) / 2 );
      }
      else if (
        molecule.rawSymbol === 'O3'
      ) {
        this.moleculeQuaternionProperty.value = new THREE.Quaternion( -1, 0, 0, 0 );
      }
      else if (
        molecule.rawSymbol === 'NH3'
      ) {
        this.moleculeQuaternionProperty.value = new THREE.Quaternion(
        0.7677141944032492,
        -0.4684697628688284,
        0.01799052832586886,
        0.4368378851243859
        );
      }
      else if (
        molecule.rawSymbol === 'CH2O'
      ) {
        this.moleculeQuaternionProperty.value = new THREE.Quaternion(
          0.39532868707908697,
          0.504571567312339,
          0.4912800148747718,
          0.5897174828822169
        );
      }
      else if (
        molecule.rawSymbol === 'CH3F'
      ) {
        this.moleculeQuaternionProperty.value = new THREE.Quaternion(
          -0.47764744580443635,
          -0.5590383890849989,
          0.43691780079761233,
          0.5181040748651952
        );
      }
      else if (
        molecule.rawSymbol === 'CH2F2'
      ) {
        this.moleculeQuaternionProperty.value = new THREE.Quaternion(
          0.6172145109411314,
          -0.24061500346218279,
          0.33114691075217983,
          0.6719318351528544
        );
      }
      else if (
        molecule.rawSymbol === 'CHF3'
      ) {
        this.moleculeQuaternionProperty.value = new THREE.Quaternion(
          0.017834718285708984,
          -0.7400716028848267,
          0.6715496673518707,
          0.03157514381184575
        );
      }
      else if (
        molecule.rawSymbol === 'CF4'
      ) {
        this.moleculeQuaternionProperty.value = new THREE.Quaternion(
          -0.3937806654121543,
          -0.17485260291214183,
          -0.9001547262973663,
          0.0639126241591583
        );
      }
      else if (
        molecule.rawSymbol === 'CHCl3'
      ) {
        this.moleculeQuaternionProperty.value = new THREE.Quaternion(
          -0.0176156710659009,
          -0.7491523440903591,
          0.6618225407772235,
          -0.021245658284855574
        );
      }
      else {
        this.moleculeQuaternionProperty.value = new THREE.Quaternion();
      }
    } );

    if ( MPQueryParameters.logQuaternionRotation ) {
      this.moleculeQuaternionProperty.link( quaternion => {
        console.log( `Molecule Quaternion changed to:\n  ${quaternion.x},\n  ${quaternion.y},\n  ${quaternion.z},\n  ${quaternion.w}` );
      } );
    }
  }

  public reset(): void {
    this.moleculeProperty.reset();
  }
}

moleculePolarity.register( 'RealMoleculesModel', RealMoleculesModel );