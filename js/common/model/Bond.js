// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model of a bond between 2 atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';

/**
 * @param {Atom} atom1
 * @param {Atom} atom2
 * @constructor
 */
function Bond( atom1, atom2 ) {

  const self = this;

  // @public (read-only)
  this.atom1 = atom1;
  this.atom2 = atom2;

  // @public dispose not needed, exists for the lifetime of the sim
  this.dipoleProperty = new DerivedProperty( [
      atom1.positionProperty, atom2.positionProperty,
      atom1.electronegativityProperty, atom2.electronegativityProperty,
      MPConstants.GLOBAL_OPTIONS.dipoleDirectionProperty
    ],
    function( position1, position2, electronegativity1, electronegativity2, dipoleDirection ) {

      const deltaEN = electronegativity2 - electronegativity1;

      // this is a simplification. in reality, magnitude is a function of deltaEN and many other things.
      const magnitude = Math.abs( deltaEN );

      let angle = self.getAngle();
      if ( deltaEN < 0 ) {
        angle += Math.PI;
      }

      const dipole = Vector2.createPolar( magnitude, angle );

      // The above algorithm is for a dipole that points from positive to negative charge.
      // For IUPAC convention, the direction of the dipole is from negative to positive charge,
      // so rotate the dipole 180 degrees. See issue #5 and #56.
      if ( dipoleDirection === 'negativeToPositive' ) {
        dipole.rotate( Math.PI );
      }

      return dipole;
    }
  );
}

moleculePolarity.register( 'Bond', Bond );

export default inherit( Object, Bond, {

  /**
   * Gets the center of the bond, the midpoint between the 2 atom positions.
   * @returns {Vector2}
   * @public
   */
  getCenter: function() {
    return this.atom1.positionProperty.get().average( this.atom2.positionProperty.get() );
  },

  /**
   * Gets the angle of atom2 relative to the horizontal axis.
   * @returns {number} angle in radians
   * @public
   */
  getAngle: function() {
    const center = this.getCenter();
    return Math.atan2( this.atom2.positionProperty.get().y - center.y, this.atom2.positionProperty.get().x - center.x );
  },

  /**
   * Gets the bond length, the distance between the 2 atoms.
   * @returns {number}
   * @public
   */
  getLength: function() {
    return this.atom1.positionProperty.get().distance( this.atom2.positionProperty.get() );
  }
} );