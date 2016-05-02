// Copyright 2014-2015, University of Colorado Boulder

/**
 * Type of surface rendered in the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );

  // NOTE: enum pattern recommends using {} for each value, but strings are more convenient for debugging
  var SurfaceType = Object.freeze( {
    NONE: 'none',
    ELECTROSTATIC_POTENTIAL: 'electrostaticPotential',
    ELECTRON_DENSITY: 'electronDensity'
  } );

  moleculePolarity.register( 'SurfaceType', SurfaceType );

  return SurfaceType;
} );