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
import { BondDipoleModel } from './BondDipoleModel.js';
import { FieldModel } from './FieldModel.js';
import THREE from '../../../../mobius/js/THREE.js';
import LocalizedStringProperty from '../../../../chipper/js/browser/LocalizedStringProperty.js';

export const REAL_MOLECULES_CAMERA_POSITION = new Vector3( 0, 1.5, 15 );

export default class RealMoleculesModel extends PhetioObject implements TModel {

  // the set of molecules to choose from
  public readonly molecules: RealMolecule[];

  // the selected molecule
  public readonly moleculeProperty: Property<RealMolecule>;

  // the rotation of the molecule view
  public readonly moleculeQuaternionProperty: Property<THREE.Quaternion>;

  public readonly bondDipoleModelProperty = new Property<BondDipoleModel>( 'electronegativity' );

  public readonly fieldModelProperty = new Property<FieldModel>( 'java' );

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

    const createMolecule = ( symbol: string, nameStringProperty: LocalizedStringProperty ) => {
      return new RealMolecule(
        symbol,
        nameStringProperty,
        this.bondDipoleModelProperty,
        this.fieldModelProperty,
        moleculesTandem.createTandem( symbol )
      );
    };

    this.molecules = [
      createMolecule( 'H2', MoleculePolarityStrings.hydrogenStringProperty ),
      createMolecule( 'N2', MoleculePolarityStrings.nitrogenStringProperty ),
      createMolecule( 'O2', MoleculePolarityStrings.oxygenStringProperty ),
      createMolecule( 'F2', MoleculePolarityStrings.fluorineStringProperty ),
      createMolecule( 'HF', MoleculePolarityStrings.hydrogenFluorideStringProperty ),

      createMolecule( 'H2O', MoleculePolarityStrings.waterStringProperty ),
      createMolecule( 'CO2', MoleculePolarityStrings.carbonDioxideStringProperty ),
      createMolecule( 'HCN', MoleculePolarityStrings.hydrogenCyanideStringProperty ),
      createMolecule( 'O3', MoleculePolarityStrings.ozoneStringProperty ),

      createMolecule( 'NH3', MoleculePolarityStrings.ammoniaStringProperty ),
      createMolecule( 'BH3', MoleculePolarityStrings.boraneStringProperty ),
      createMolecule( 'BF3', MoleculePolarityStrings.boronTrifluorideStringProperty ),
      createMolecule( 'CH2O', MoleculePolarityStrings.formaldehydeStringProperty ),

      createMolecule( 'CH4', MoleculePolarityStrings.methaneStringProperty ),
      createMolecule( 'CH3F', MoleculePolarityStrings.fluoromethaneStringProperty ),
      createMolecule( 'CH2F2', MoleculePolarityStrings.difluoromethaneStringProperty ),
      // createMolecule( 'CHF3', MoleculePolarityStrings.trifluoromethaneStringProperty ),
      createMolecule( 'CF4', MoleculePolarityStrings.tetrafluoromethaneStringProperty ),
      createMolecule( 'CHCl3', MoleculePolarityStrings.chloroformStringProperty )
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

  public updateRotation( molecule: RealMolecule ): void {
    if (
      molecule.symbol === 'HF' ||
      molecule.symbol === 'HCN'
    ) {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion( 0, -Math.sqrt( 2 ) / 2, 0, Math.sqrt( 2 ) / 2 );
    }
    else if (
      molecule.symbol === 'O3'
    ) {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion( -1, 0, 0, 0 );
    }
    else if (
      molecule.symbol === 'NH3'
    ) {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion(
      0.7677141944032492,
      -0.4684697628688284,
      0.01799052832586886,
      0.4368378851243859
      );
    }
    else if (
      molecule.symbol === 'CH2O'
    ) {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion(
        0.39532868707908697,
        0.504571567312339,
        0.4912800148747718,
        0.5897174828822169
      );
    }
    else if (
      molecule.symbol === 'CH3F'
    ) {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion(
        -0.47764744580443635,
        -0.5590383890849989,
        0.43691780079761233,
        0.5181040748651952
      );
    }
    else if (
      molecule.symbol === 'CH2F2'
    ) {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion(
        0.6172145109411314,
        -0.24061500346218279,
        0.33114691075217983,
        0.6719318351528544
      );
    }
    else if (
      molecule.symbol === 'CHF3'
    ) {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion(
        0.017834718285708984,
        -0.7400716028848267,
        0.6715496673518707,
        0.03157514381184575
      );
    }
    else if (
      molecule.symbol === 'CF4'
    ) {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion(
        -0.3937806654121543,
        -0.17485260291214183,
        -0.9001547262973663,
        0.0639126241591583
      );
    }
    else if (
      molecule.symbol === 'CHCl3'
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
  }

  public reset(): void {
    this.moleculeProperty.reset();
    this.moleculeQuaternionProperty.reset();
    this.bondDipoleModelProperty.reset();
    this.fieldModelProperty.reset();
    this.updateRotation( this.moleculeProperty.value );
  }
}

moleculePolarity.register( 'RealMoleculesModel', RealMoleculesModel );