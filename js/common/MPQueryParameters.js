// Copyright 2014-2021, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import moleculePolarity from '../moleculePolarity.js';

const MPQueryParameters = QueryStringMachine.getAll( {

  //TODO https://github.com/phetsims/molecule-polarity/issues/32 delete when Real Molecules is fully implemented
  // Enables the 'Real Molecules' screen, for internal use only.
  realMolecules: { type: 'flag' }
} );

moleculePolarity.register( 'MPQueryParameters', MPQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.moleculePolarity.MPQueryParameters' );

export default MPQueryParameters;