// Copyright 2014-2019, University of Colorado Boulder

/**
 * Model for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import inherit from '../../../../phet-core/js/inherit.js';
import moleculePolarityStrings from '../../molecule-polarity-strings.js';
import moleculePolarity from '../../moleculePolarity.js';
import mol2Data from './mol2Data.js';
import RealMolecule from './RealMolecule.js';

// string
const ammoniaString = moleculePolarityStrings.ammonia;
const boraneString = moleculePolarityStrings.borane;
const boronTrifluorideString = moleculePolarityStrings.boronTrifluoride;
const carbonDioxideString = moleculePolarityStrings.carbonDioxide;
const chloroformString = moleculePolarityStrings.chloroform;
const difluoromethaneString = moleculePolarityStrings.difluoromethane;
const fluorineString = moleculePolarityStrings.fluorine;
const fluoromethaneString = moleculePolarityStrings.fluoromethane;
const formaldehydeString = moleculePolarityStrings.formaldehyde;
const hydrogenCyanideString = moleculePolarityStrings.hydrogenCyanide;
const hydrogenFluorideString = moleculePolarityStrings.hydrogenFluoride;
const hydrogenString = moleculePolarityStrings.hydrogen;
const methaneString = moleculePolarityStrings.methane;
const nitrogenString = moleculePolarityStrings.nitrogen;
const oxygenString = moleculePolarityStrings.oxygen;
const ozoneString = moleculePolarityStrings.ozone;
const tetrafluoromethaneString = moleculePolarityStrings.tetrafluoromethane;
const trifluoromethaneString = moleculePolarityStrings.trifluoromethane;
const waterString = moleculePolarityStrings.water;

/**
 * @constructor
 */
function RealMoleculesModel() {

  // @public (read-only) the set of molecules to choose from
  this.molecules = [

    new RealMolecule( 'H2', hydrogenString, mol2Data.H2 ),
    new RealMolecule( 'N2', nitrogenString, mol2Data.N2 ),
    new RealMolecule( 'O2', oxygenString, mol2Data.O2 ),
    new RealMolecule( 'F2', fluorineString, mol2Data.F2 ),
    new RealMolecule( 'HF', hydrogenFluorideString, mol2Data.HF ),

    new RealMolecule( 'H2O', waterString, mol2Data.H2O ),
    new RealMolecule( 'CO2', carbonDioxideString, mol2Data.CO2 ),
    new RealMolecule( 'HCN', hydrogenCyanideString, mol2Data.HCN ),
    new RealMolecule( 'O3', ozoneString, mol2Data.O3 ),

    new RealMolecule( 'NH3', ammoniaString, mol2Data.NH3 ),
    new RealMolecule( 'BH3', boraneString, mol2Data.BH3 ),
    new RealMolecule( 'BF3', boronTrifluorideString, mol2Data.BF3 ),
    new RealMolecule( 'CH2O', formaldehydeString, mol2Data.CH2O ),

    new RealMolecule( 'CH4', methaneString, mol2Data.CH4 ),
    new RealMolecule( 'CH3F', fluoromethaneString, mol2Data.CH3F ),
    new RealMolecule( 'CH2F2', difluoromethaneString, mol2Data.CH2F2 ),
    new RealMolecule( 'CHF3', trifluoromethaneString, mol2Data.CHF3 ),
    new RealMolecule( 'CF4', tetrafluoromethaneString, mol2Data.CF4 ),
    new RealMolecule( 'CHCl3', chloroformString, mol2Data.CHCl3 )
  ];

  // @public the selected molecule
  this.moleculeProperty = new Property( this.molecules[ 4 ] );
}

moleculePolarity.register( 'RealMoleculesModel', RealMoleculesModel );

export default inherit( Object, RealMoleculesModel, {

  // @public
  reset: function() {
    this.moleculeProperty.reset();
  }
} );