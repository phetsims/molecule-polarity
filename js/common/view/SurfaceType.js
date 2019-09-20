// Copyright 2014-2019, University of Colorado Boulder

/**
 * Type of surface rendered in the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );

  // NOTE: enum pattern recommends using {} for each value, but strings are more convenient for debugging
  const SurfaceType = Object.freeze( {
    NONE: 'none',
    ELECTROSTATIC_POTENTIAL: 'electrostaticPotential',
    ELECTRON_DENSITY: 'electronDensity'
  } );

  moleculePolarity.register( 'SurfaceType', SurfaceType );

  return SurfaceType;
} );