// Copyright 2014-2020, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import moleculePolarity from '../moleculePolarity.js';

const MPQueryParameters = QueryStringMachine.getAll( {

  //TODO https://github.com/phetsims/molecule-polarity/issues/32 delete when Real Molecules is fully implemented
  // Enables the 'Real Molecules' screen, for internal use only.
  realMolecules: { type: 'flag' }
} );

moleculePolarity.register( 'MPQueryParameters', MPQueryParameters );

// log the values of all sim-specific query parameters
phet.log && phet.log( 'query parameters: ' + JSON.stringify( MPQueryParameters, null, 2 ) );

export default MPQueryParameters;