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
  var Property = require( 'AXON/Property' );

  function EField( options ) {
    options = _.extend( { enabled: false }, options );
    this.enabledProperty = new Property( options.enabled );
  }

  return inherit( Object, EField, {

    reset: function() {
      this.enabledProperty.reset();
    }
  } );
} );