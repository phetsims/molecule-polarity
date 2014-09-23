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
    // enables developer-only features
    DEV: getQueryParameter( 'dev' ) || false,

    // enables IUPAC convention for dipole direction, see issue #5
    IUPAC: getQueryParameter( 'IUPAC' ) || false,

    // enabled console debugging output for JSmol
    JSMOL_DEBUG: getQueryParameter( 'JSmolDebug' ) || false
  };
} );
