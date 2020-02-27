// Copyright 2015-2019, University of Colorado Boulder

/**
 * Global options for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringProperty from '../../../axon/js/StringProperty.js';
import inherit from '../../../phet-core/js/inherit.js';
import moleculePolarity from '../moleculePolarity.js';
import MPQueryParameters from './MPQueryParameters.js';

/**
 * @constructor
 */
function MPGlobalOptions() {

  // @public
  this.dipoleDirectionProperty = new StringProperty( MPQueryParameters.dipoleDirection );
  this.surfaceColorProperty = new StringProperty( MPQueryParameters.surfaceColor );
}

moleculePolarity.register( 'MPGlobalOptions', MPGlobalOptions );

export default inherit( Object, MPGlobalOptions, {

  // @public
  reset: function() {
    this.dipoleDirectionProperty.reset();
    this.surfaceColorProperty.reset();
  }
} );