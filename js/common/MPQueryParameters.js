// Copyright 2014-2017, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );

  var MPQueryParameters = QueryStringMachine.getAll( {

    // Default direction of dipoles: 'positiveToNegative' or 'negativeToPositive' (IUPAC convention).
    // This can also be changed from the Options dialog. See issue #5
    dipoleDirection: {
      type: 'string',
      validValues: [ 'positiveToNegative', 'negativeToPositive' ],
      defaultValue: 'positiveToNegative'
    },

    // Default color of 3D electrostatic-potential surface: 'RWB' (red-white-blue) or 'ROYGB' (rainbow).
    // This can also be changed from the Options dialog. See issue #7
    surfaceColor: {
      type: 'string',
      validValues: [ 'RWB', 'ROYGB' ],
      defaultValue: 'RWB'
    },

    //TODO delete this query parameter when Real Molecules is fully implemented, see #32
    // enables the 'Real Molecules' screen, for development
    realMolecules: { type: 'flag' }
  } );

  moleculePolarity.register( 'MPQueryParameters', MPQueryParameters );

  // log the values of all sim-specific query parameters
  if ( phet.log ) {
    for ( var property in MPQueryParameters ) {
      if ( MPQueryParameters.hasOwnProperty( property ) ) {
        phet.log( property + '=' + MPQueryParameters[ property ] );
      }
    }
  }

  return MPQueryParameters;
} );
