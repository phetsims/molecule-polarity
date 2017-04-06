// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model of the electric field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function EField( options ) {

    options = _.extend( {
      enabled: false // {boolean} is the E-field initially enabled?
    }, options );

    // @public
    this.enabledProperty = new Property( options.enabled );
  }

  moleculePolarity.register( 'EField', EField );

  return inherit( Object, EField, {

    // @public
    reset: function() {
      this.enabledProperty.reset();
    }
  } );
} );