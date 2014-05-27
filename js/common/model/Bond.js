// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model of a bond between 2 atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Atom} atom1
   * @param {Atom} atom2
   * @constructor
   */
  function Bond( atom1, atom2 ) {

    var thisBond = this;

    thisBond.atom1 = atom1;
    thisBond.atom2 = atom2;

    thisBond.dipoleProperty = new DerivedProperty( [ atom1.locationProperty, atom2.locationProperty, atom1.electronegativityProperty, atom2.electronegativityProperty ],
      function( location1, location2, electronegativity1, electronegativity2 ) {
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

    // gets the center of the bond, the midpoint between the 2 atom locations
    getCenter: function() {
      return this.atom1.locationProperty.get().average( this.atom2.locationProperty.get() );
    },

    // gets the angle of atom2 relative to the horizontal axis
    getAngle: function() {
      var center = this.getCenter();
      return Math.atan2( this.atom2.locationProperty.get().y - center.y, this.atom2.locationProperty.get().x - center.x );
    },

    // Gets the bond length, the distance between the 2 atoms.
    getLength: function() {
      return this.atom1.locationProperty.get().distance( this.atom2.locationProperty.get() );
    }
  };

  return Bond;
} );