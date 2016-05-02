// Copyright 2014-2015, University of Colorado Boulder

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
    options = _.extend( { enabled: false }, options );
    this.enabledProperty = new Property( options.enabled );
  }

  moleculePolarity.register( 'EField', EField );

  return inherit( Object, EField, {

    reset: function() {
      this.enabledProperty.reset();
    }
  } );
} );