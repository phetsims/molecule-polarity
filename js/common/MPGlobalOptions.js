// Copyright 2002-2015, University of Colorado Boulder

/**
 * Global options for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var MPQueryParameters = require( 'MOLECULE_POLARITY/common/MPQueryParameters' );
  var PropertySet = require( 'AXON/PropertySet' );

  var MPGlobalOptions = new PropertySet( {
    dipoleDirection: MPQueryParameters.DIPOLE_DIRECTION,
    surfaceColor: MPQueryParameters.SURFACE_COLOR
  } );

  return MPGlobalOptions;
} );
