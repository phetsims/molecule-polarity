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

    // direction of dipoles: 'positiveToNegative' or 'negativeToPositive' (IUPAC convention), see issue #5
    dipoleDirection: {
      type: 'string',
      validValues: [ 'positiveToNegative', 'negativeToPositive' ],
      defaultValue: 'positiveToNegative'
    },

    // color of 3D electrostatic-potential surface: 'RWB' (red-white-blue) or 'ROYGB' (rainbow), see issue #7
    surfaceColor: {
      type: 'string',
      validValues: [ 'RWB', 'ROYGB' ],
      defaultValue: 'RWB'
    },

    //TODO delete when Real Molecules is fully implemented, see #15
    // enables the 'Real Molecules' screen, for development
    realMolecules: { type: 'flag' }
  } );

  moleculePolarity.register( 'MPQueryParameters', MPQueryParameters );

  return MPQueryParameters;
} );
