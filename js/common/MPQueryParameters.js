// Copyright 2002-2014, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  var getQueryParameter = window.phetcommon.getQueryParameter;

  return {
    // enable developer-only features
    DEV: getQueryParameter( 'dev' ) || false,

    // whether to use the IUPAC convention for dipole direction
    IUPAC: getQueryParameter( 'IUPAC' ) || false
  };
} );
