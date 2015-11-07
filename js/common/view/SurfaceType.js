// Copyright 2014-2015, University of Colorado Boulder

/**
 * Type of surface rendered in the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function() {
  'use strict';

  // NOTE: enum pattern recommends using {} for each value, but strings are more convenient for debugging
  return Object.freeze( {
    NONE: 'none',
    ELECTROSTATIC_POTENTIAL: 'electrostaticPotential',
    ELECTRON_DENSITY: 'electronDensity'
  } );
} );