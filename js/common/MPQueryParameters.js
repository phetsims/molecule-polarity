// Copyright 2014-2020, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import moleculePolarity from '../moleculePolarity.js';

const MPQueryParameters = QueryStringMachine.getAll( {

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

  //TODO https://github.com/phetsims/molecule-polarity/issues/32 delete when Real Molecules is fully implemented
  // enables the 'Real Molecules' screen, for development
  realMolecules: { type: 'flag' }
} );

moleculePolarity.register( 'MPQueryParameters', MPQueryParameters );

// log the values of all sim-specific query parameters
phet.log && phet.log( 'query parameters: ' + JSON.stringify( MPQueryParameters, null, 2 ) );

export default MPQueryParameters;