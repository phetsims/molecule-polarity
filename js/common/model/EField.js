// Copyright 2014-2019, University of Colorado Boulder

/**
 * Model of the electric field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import moleculePolarity from '../../moleculePolarity.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function EField( options ) {

  options = merge( {
    enabled: false // {boolean} is the E-field initially enabled?
  }, options );

  // @public
  this.enabledProperty = new BooleanProperty( options.enabled );
}

moleculePolarity.register( 'EField', EField );

export default inherit( Object, EField, {

  // @public
  reset: function() {
    this.enabledProperty.reset();
  }
} );