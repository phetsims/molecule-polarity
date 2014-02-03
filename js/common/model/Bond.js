// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model of a bond between 2 atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var PolarCartesianConverter = require( 'MOLECULE_POLARITY/common/PolarCartesianConverter' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Atom} atom1
   * @param {Atom} atom2
   * @constructor
   */
  function Bond( atom1, atom2 ) {

    var thisBond = this;

    thisBond.endPoint1Property = atom1.locationProperty;
    thisBond.endPoint2Property = atom2.locationProperty;

    thisBond.dipoleProperty = new DerivedProperty( [ thisBond.endPoint1Property, thisBond.endPoint2Property, atom1.electronegativityProperty, atom2.electronegativityProperty ],
      function( endPoint1, endPoint2, electronegativity1, electronegativity2 ) {
        var deltaEN = electronegativity2 - electronegativity1;
        var magnitude = Math.abs( deltaEN ); // this is a simplification. in reality, magnitude is a function of deltaEN and many other things.
        var angle = thisBond.getAngle();
        if ( deltaEN < 0 ) {
          angle += Math.PI;
        }
        return Vector2.createPolar( magnitude, angle );
      }
    );
  }

  Bond.prototype = {

    // gets the center of the bond, using the midpoint formula
    getCenter: function() {
      return new Vector2( ( this.endPoint1Property.get().x + this.endPoint2Property.get().x ) / 2, ( this.endPoint1Property.get().y + this.endPoint2Property.get().y ) / 2 );
    },

    // gets the angle of endpoint2 relative to the horizontal axis
    getAngle: function() {
      var center = this.getCenter();
      return PolarCartesianConverter.getAngle( this.endPoint2Property.get().x - center.x, this.endPoint2Property.get().y - center.y );
    },

    // Gets the bond length, the distance between the 2 endpoints.
    getLength: function() {
      return this.endPoint1Property.get().distance( this.endPoint2Property.get() );
    }
  };

  return Bond;
} );