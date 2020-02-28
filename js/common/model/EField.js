// Copyright 2014-2019, University of Colorado Boulder

/**
 * Model of the electric field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import moleculePolarity from '../../moleculePolarity.js';

class EField {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      enabled: false // {boolean} is the E-field initially enabled?
    }, options );

    // @public
    this.enabledProperty = new BooleanProperty( options.enabled );
  }

  // @public
  reset() {
    this.enabledProperty.reset();
  }
}

moleculePolarity.register( 'EField', EField );

export default EField;