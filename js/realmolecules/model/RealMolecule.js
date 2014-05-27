// Copyright 2002-2014, University of Colorado Boulder

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
   * @param {String} symbol
   * @param {String} name
   * @param {String} resourceFilename the data file that will be provided to Jmol
   * @constructor
   */
  function RealMolecule( symbol, name, resourceFilename ) {
    this.symbol = ChemUtils.toSubscript( symbol );
    this.name = name;
    this.resourceFilename = resourceFilename; //TODO how to handle Jmol resource file?
  }

  return RealMolecule;
} );
