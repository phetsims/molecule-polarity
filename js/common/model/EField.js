// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model of the electric field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' );

  function EField( options ) {
    options = _.extend( { enabled: false }, options );
    this.enabledProperty = new Property( options.enabled );
  }

  EField.prototype = {
    reset: function() {
      this.enabledProperty.reset();
    }
  };

  return EField;
} );