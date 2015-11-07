// Copyright 2014, University of Colorado Boulder

/**
 * Real molecule that is viewable in 3D using Jmol.
 * Specific information about the molecule must be obtained by interrogating Jmol.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ChemUtils = require( 'NITROGLYCERIN/ChemUtils' );

  /**
   * @param {string} symbol
   * @param {string} name
   * @param {string} mol2Data molecule data description, in mol2 format
   * @constructor
   */
  function RealMolecule( symbol, name, mol2Data ) {
    this.symbol = ChemUtils.toSubscript( symbol );
    this.name = name;
    this.mol2Data = mol2Data;
  }

  return RealMolecule;
} );
