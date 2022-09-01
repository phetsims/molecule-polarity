// Copyright 2014-2022, University of Colorado Boulder

/**
 * RealMoleculesModel is the model for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import mol2Data from './mol2Data.js';
import RealMolecule from './RealMolecule.js';

type SelfOptions = EmptySelfOptions;

export type RealMoleculesModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class RealMoleculesModel extends PhetioObject {

  // the set of molecules to choose from
  public readonly molecules: RealMolecule[];

  // the selected molecule
  public readonly moleculeProperty: Property<RealMolecule>;

  public constructor( providedOptions: RealMoleculesModelOptions ) {

    const options = optionize<RealMoleculesModelOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      phetioState: false
    }, providedOptions );

    super( options );

    const moleculesTandem = options.tandem.createTandem( 'molecules' );

    const selectedMolecule = new RealMolecule( 'HF', moleculePolarityStrings.hydrogenFluorideStringProperty, mol2Data.HF, moleculesTandem.createTandem( 'HF' ) );

    this.molecules = [

      new RealMolecule( 'H2', moleculePolarityStrings.hydrogenStringProperty, mol2Data.H2, moleculesTandem.createTandem( 'H2' ) ),
      new RealMolecule( 'N2', moleculePolarityStrings.nitrogenStringProperty, mol2Data.N2, moleculesTandem.createTandem( 'N2' ) ),
      new RealMolecule( 'O2', moleculePolarityStrings.oxygenStringProperty, mol2Data.O2, moleculesTandem.createTandem( 'O2' ) ),
      new RealMolecule( 'F2', moleculePolarityStrings.fluorineStringProperty, mol2Data.F2, moleculesTandem.createTandem( 'F2' ) ),
      selectedMolecule,

      new RealMolecule( 'H2O', moleculePolarityStrings.waterStringProperty, mol2Data.H2O, moleculesTandem.createTandem( 'H2O' ) ),
      new RealMolecule( 'CO2', moleculePolarityStrings.carbonDioxideStringProperty, mol2Data.CO2, moleculesTandem.createTandem( 'CO2' ) ),
      new RealMolecule( 'HCN', moleculePolarityStrings.hydrogenCyanideStringProperty, mol2Data.HCN, moleculesTandem.createTandem( 'HCN' ) ),
      new RealMolecule( 'O3', moleculePolarityStrings.ozoneStringProperty, mol2Data.O3, moleculesTandem.createTandem( 'O3' ) ),

      new RealMolecule( 'NH3', moleculePolarityStrings.ammoniaStringProperty, mol2Data.NH3, moleculesTandem.createTandem( 'NH3' ) ),
      new RealMolecule( 'BH3', moleculePolarityStrings.boraneStringProperty, mol2Data.BH3, moleculesTandem.createTandem( 'BH3' ) ),
      new RealMolecule( 'BF3', moleculePolarityStrings.boronTrifluorideStringProperty, mol2Data.BF3, moleculesTandem.createTandem( 'BF3' ) ),
      new RealMolecule( 'CH2O', moleculePolarityStrings.formaldehydeStringProperty, mol2Data.CH2O, moleculesTandem.createTandem( 'CH2O' ) ),

      new RealMolecule( 'CH4', moleculePolarityStrings.methaneStringProperty, mol2Data.CH4, moleculesTandem.createTandem( 'CH4' ) ),
      new RealMolecule( 'CH3F', moleculePolarityStrings.fluoromethaneStringProperty, mol2Data.CH3F, moleculesTandem.createTandem( 'CH3F' ) ),
      new RealMolecule( 'CH2F2', moleculePolarityStrings.difluoromethaneStringProperty, mol2Data.CH2F2, moleculesTandem.createTandem( 'CH2F2' ) ),
      new RealMolecule( 'CHF3', moleculePolarityStrings.trifluoromethaneStringProperty, mol2Data.CHF3, moleculesTandem.createTandem( 'CHF3' ) ),
      new RealMolecule( 'CF4', moleculePolarityStrings.tetrafluoromethaneStringProperty, mol2Data.CF4, moleculesTandem.createTandem( 'CF4' ) ),
      new RealMolecule( 'CHCl3', moleculePolarityStrings.chloroformStringProperty, mol2Data.CHCl3, moleculesTandem.createTandem( 'CHCl3' ) )
    ];

    this.moleculeProperty = new Property( selectedMolecule, {
      validValues: this.molecules,
      phetioValueType: RealMolecule.RealMoleculeIO,
      tandem: options.tandem.createTandem( 'moleculeProperty' )
    } );
  }

  public reset(): void {
    this.moleculeProperty.reset();
  }
}

moleculePolarity.register( 'RealMoleculesModel', RealMoleculesModel );