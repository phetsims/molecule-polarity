// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' );
  var RealMolecule = require( 'MOLECULE_POLARITY/realmolecules/model/RealMolecule' );

  // string
  var hydrogenString = require( 'string!MOLECULE_POLARITY/hydrogen' );
  var nitrogrenString = require( 'string!MOLECULE_POLARITY/nitrogen' );
  var oxygenString = require( 'string!MOLECULE_POLARITY/oxygen' );
  var fluorineString = require( 'string!MOLECULE_POLARITY/fluorine' );
  var hydrogenFluorideString = require( 'string!MOLECULE_POLARITY/hydrogenFluoride' );
  var waterString = require( 'string!MOLECULE_POLARITY/water' );
  var carbonDioxideString = require( 'string!MOLECULE_POLARITY/carbonDioxide' );
  var hydrogenCyanideString = require( 'string!MOLECULE_POLARITY/hydrogenCyanide' );
  var ozoneString = require( 'string!MOLECULE_POLARITY/ozone' );
  var ammoniaString = require( 'string!MOLECULE_POLARITY/ammonia' );
  var boraneString = require( 'string!MOLECULE_POLARITY/borane' );
  var boronTrifluorideString = require( 'string!MOLECULE_POLARITY/boronTrifluoride' );
  var formaldehydeString = require( 'string!MOLECULE_POLARITY/formaldehyde' );
  var methaneString = require( 'string!MOLECULE_POLARITY/methane' );
  var fluoromethaneString = require( 'string!MOLECULE_POLARITY/fluoromethane' );
  var difluoromethaneString = require( 'string!MOLECULE_POLARITY/difluoromethane' );
  var trifluoromethaneString = require( 'string!MOLECULE_POLARITY/trifluoromethane' );
  var tetrafluoromethaneString = require( 'string!MOLECULE_POLARITY/tetrafluoromethane' );
  var chloroformString = require( 'string!MOLECULE_POLARITY/chloroform' );

  /**
   * @constructor
   */
  function RealMoleculesModel() {

    this.molecules = [
      //TODO how to handle Jmol resource files?
      new RealMolecule( 'H2', hydrogenString, 'mol2/h2.mol2' ),
      new RealMolecule( 'N2', nitrogrenString, 'mol2/n2.mol2' ),
      new RealMolecule( 'O2', oxygenString, 'mol2/o2.mol2' ),
      new RealMolecule( 'F2', fluorineString, 'mol2/f2.mol2' ),
      new RealMolecule( 'HF', hydrogenFluorideString, 'mol2/hf.mol2' ),

      new RealMolecule( 'H2O', waterString, 'mol2/h2o.mol2' ),
      new RealMolecule( 'CO2', carbonDioxideString, 'mol2/co2.mol2' ),
      new RealMolecule( 'HCN', hydrogenCyanideString, 'mol2/hcn.mol2' ),
      new RealMolecule( 'O3', ozoneString, 'mol2/o3.mol2' ),

      new RealMolecule( 'NH3', ammoniaString, 'mol2/nh3.mol2' ),
      new RealMolecule( 'BH3', boraneString, 'mol2/bh3.mol2' ),
      new RealMolecule( 'BF3', boronTrifluorideString, 'mol2/bf3.mol2' ),
      new RealMolecule( 'CH2O', formaldehydeString, 'mol2/ch2o.mol2' ),

      new RealMolecule( 'CH4', methaneString, 'mol2/ch4.mol2' ),
      new RealMolecule( 'CH3F', fluoromethaneString, 'mol2/ch3f.mol2' ),
      new RealMolecule( 'CH2F2', difluoromethaneString, 'mol2/ch2f2.mol2' ),
      new RealMolecule( 'CHF3', trifluoromethaneString, 'mol2/chf3.mol2' ),
      new RealMolecule( 'CF4', tetrafluoromethaneString, 'mol2/cf4.mol2' ),
      new RealMolecule( 'CHCl3', chloroformString, 'mol2/chcl3.mol2' )
    ];

    this.currentMolecule = new Property( this.molecules[4] );
  }

  RealMoleculesModel.prototype = {
    reset: function() {
      this.currentMolecule.reset();
    }
  };

  return RealMoleculesModel;
} );
