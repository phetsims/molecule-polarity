// Copyright 2002-2014, University of Colorado Boulder

/**
 * Collection of conversions functions between Polar and Cartesian coordinate systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function() {
  'use strict';

  return {

    getX: function( radius, angle ) {
      return radius * Math.cos( angle );
    },

    getY: function( radius, angle ) {
      return radius * Math.sin( angle );
    },

    getRadius: function( x, y ) {
      return Math.sqrt( ( x * x ) + ( y * y ) );
    },

    getAngle: function( x, y ) {
      return Math.atan2( y, x );
    }
  };
} );
