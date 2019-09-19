// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const mol2Data = require( 'MOLECULE_POLARITY/realmolecules/model/mol2Data' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const Property = require( 'AXON/Property' );
  const RealMolecule = require( 'MOLECULE_POLARITY/realmolecules/model/RealMolecule' );

  // string
  const ammoniaString = require( 'string!MOLECULE_POLARITY/ammonia' );
  const boraneString = require( 'string!MOLECULE_POLARITY/borane' );
  const boronTrifluorideString = require( 'string!MOLECULE_POLARITY/boronTrifluoride' );
  const carbonDioxideString = require( 'string!MOLECULE_POLARITY/carbonDioxide' );
  const chloroformString = require( 'string!MOLECULE_POLARITY/chloroform' );
  const difluoromethaneString = require( 'string!MOLECULE_POLARITY/difluoromethane' );
  const fluorineString = require( 'string!MOLECULE_POLARITY/fluorine' );
  const fluoromethaneString = require( 'string!MOLECULE_POLARITY/fluoromethane' );
  const formaldehydeString = require( 'string!MOLECULE_POLARITY/formaldehyde' );
  const hydrogenCyanideString = require( 'string!MOLECULE_POLARITY/hydrogenCyanide' );
  const hydrogenFluorideString = require( 'string!MOLECULE_POLARITY/hydrogenFluoride' );
  const hydrogenString = require( 'string!MOLECULE_POLARITY/hydrogen' );
  const methaneString = require( 'string!MOLECULE_POLARITY/methane' );
  const nitrogenString = require( 'string!MOLECULE_POLARITY/nitrogen' );
  const oxygenString = require( 'string!MOLECULE_POLARITY/oxygen' );
  const ozoneString = require( 'string!MOLECULE_POLARITY/ozone' );
  const tetrafluoromethaneString = require( 'string!MOLECULE_POLARITY/tetrafluoromethane' );
  const trifluoromethaneString = require( 'string!MOLECULE_POLARITY/trifluoromethane' );
  const waterString = require( 'string!MOLECULE_POLARITY/water' );

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

  return inherit( Object, RealMoleculesModel, {

    // @public
    reset: function() {
      this.moleculeProperty.reset();
    }
  } );
} );
