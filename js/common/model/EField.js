// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model of the electric field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function EField( options ) {

    options = _.extend( {
      enabled: false // {boolean} is the E-field initially enabled?
    }, options );

    // @public
    this.enabledProperty = new BooleanProperty( options.enabled );
  }

  moleculePolarity.register( 'EField', EField );

  return inherit( Object, EField, {

    // @public
    reset: function() {
      this.enabledProperty.reset();
    }
  } );
} );