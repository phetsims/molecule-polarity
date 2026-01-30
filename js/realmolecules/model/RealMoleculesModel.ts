// Copyright 2014-2026, University of Colorado Boulder

/**
 * RealMoleculesModel is the model for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
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

export const REAL_MOLECULES_CAMERA_POSITION = new Vector3( 0, 1.5, 15 );

export default class RealMoleculesModel extends PhetioObject implements TModel {

  // the set of molecules to choose from
  public readonly molecules: RealMolecule[];

  // the selected molecule
  public readonly moleculeProperty: Property<RealMolecule>;

  // the rotation of the molecule view
  public readonly moleculeQuaternionProperty: Property<THREE.Quaternion>;

  public readonly isAdvancedProperty: BooleanProperty;

  public readonly dipoleScaleProperty = new Property<number>( 0.25 );

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

    // TODO: Should this property be featured? Should it have phetioDocumentation? https://github.com/phetsims/molecule-polarity/issues/246
    this.isAdvancedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'isAdvancedProperty' ),
      phetioFeatured: true
    } );

    const createMolecule = ( symbol: MoleculeSymbols, nameStringProperty: LocalizedStringProperty, geometry: MoleculeGeometry ) => {
      return new RealMolecule(
        symbol,
        nameStringProperty,
        geometry,
        this.isAdvancedProperty,
        this.dipoleScaleProperty,
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
      this.moleculeQuaternionProperty.value = new THREE.Quaternion(
        0.9995276220774126,
        -0.01492863425893462,
        0.010407093463581261,
        0.024766125838878564
      );
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
      molecule.symbol === 'H2O'
    ) {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion( -1, 0, 0, 0 );
    }
    else if (
      molecule.symbol === 'CH4'
    ) {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion(
        0.09754516100806414,
        0.09754516100806415,
        -0.009607359798384778,
        0.9903926402016154
      );
    }
    else if (
      molecule.symbol === 'CH3F'
    ) {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion(
        -0.424564362987182,
        -0.5991718998340826,
        0.3800185779324334,
        0.5624268988559403
      );
    }
    else if (
      molecule.symbol === 'CH2F2'
    ) {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion(
        -0.27136646893101857,
        -0.6903203332285108,
        -0.6223760651398221,
        0.24993221203410235
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
        -0.1748081804583777,
        -0.789947747694425,
        0.5773331843722288,
        -0.11005021662823589
      );
    }
    else {
      this.moleculeQuaternionProperty.value = new THREE.Quaternion();
    }
  }

  public reset(): void {
    this.moleculeProperty.reset();
    this.moleculeQuaternionProperty.reset();
    this.isAdvancedProperty.reset();
    this.dipoleScaleProperty.reset();
    this.updateRotation( this.moleculeProperty.value );
  }
}

moleculePolarity.register( 'RealMoleculesModel', RealMoleculesModel );