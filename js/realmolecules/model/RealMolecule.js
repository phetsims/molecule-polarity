// Copyright 2002-2014, University of Colorado Boulder

/**
 * Real molecule that is viewable in 3D using Jmol.
 * Specific information about the molecule must be obtained by interrogating Jmol.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {

  // imports
  var ChemUtils = require( 'NITROGLYCERIN/ChemUtils' );

  function RealMolecule( symbol, name, resourceFilename ) {
    this.symbol = ChemUtils.toSubscript( symbol );
    this.name = name;
    this.resourceFilename = resourceFilename;
  }

  return RealMolecule;
} );
