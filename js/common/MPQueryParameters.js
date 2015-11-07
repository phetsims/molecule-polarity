// Copyright 2014-2015, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  var getQueryParameter = phet.chipper.getQueryParameter;

  return {
    // enables developer-only features
    DEV:              getQueryParameter( 'dev' ) || false,

    // direction of dipoles: 'positiveToNegative' or 'negativeToPositive' (IUPAC convention), see issue #5
    DIPOLE_DIRECTION: getQueryParameter( 'dipoleDirection' ) || 'positiveToNegative',

    // color of 3D electrostatic-potential surface: 'RWB' (red-white-blue) or 'ROYGB' (rainbow), see issue #7
    SURFACE_COLOR:    getQueryParameter( 'surfaceColor' ) || 'RWB'
  };
} );
