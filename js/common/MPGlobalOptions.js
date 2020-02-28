// Copyright 2015-2019, University of Colorado Boulder

/**
 * Global options for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringProperty from '../../../axon/js/StringProperty.js';
import moleculePolarity from '../moleculePolarity.js';
import MPQueryParameters from './MPQueryParameters.js';

class MPGlobalOptions {

  constructor() {

    // @public
    this.dipoleDirectionProperty = new StringProperty( MPQueryParameters.dipoleDirection );
    this.surfaceColorProperty = new StringProperty( MPQueryParameters.surfaceColor );
  }

  // @public
  reset() {
    this.dipoleDirectionProperty.reset();
    this.surfaceColorProperty.reset();
  }
}

moleculePolarity.register( 'MPGlobalOptions', MPGlobalOptions );

export default MPGlobalOptions;