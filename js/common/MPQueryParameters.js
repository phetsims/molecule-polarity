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

    // direction of dipoles: negativeToPositive or positiveToNegative (IUPAC convention), see issue #5
    DIPOLE_DIRECTION: getQueryParameter( 'dipoleDirection' ) || 'positiveToNegative',

    // enabled console debugging output for JSmol
    JSMOL_DEBUG: getQueryParameter( 'JSmolDebug' ) || false
  };
} );
