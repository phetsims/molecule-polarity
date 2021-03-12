// Copyright 2014-2021, University of Colorado Boulder

/**
 * Model of a bond between 2 atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';
import Atom from './Atom.js';
import DipoleDirection from './DipoleDirection.js';

class Bond extends PhetioObject {

  /**
   * @param {Atom} atom1
   * @param {Atom} atom2
   * @param {Object} [options]
   */
  constructor( atom1, atom2, options ) {
    assert && assert( atom1 instanceof Atom, 'invalid atom1' );
    assert && assert( atom2 instanceof Atom, 'invalid atom2' );

    options = merge( {
      tandem: Tandem.REQUIRED,
      phetioState: false // extends PhetioObject only for phetioDocumentation
    }, options );

    super( options );

    // @public (read-only)
    this.atom1 = atom1;
    this.atom2 = atom2;

    // @public {DerivedProperty.<Vector2>} dispose not needed, exists for the lifetime of the sim
    this.dipoleProperty = new DerivedProperty( [
        atom1.positionProperty, atom2.positionProperty,
        atom1.electronegativityProperty, atom2.electronegativityProperty,
        MPConstants.GLOBAL_OPTIONS.dipoleDirectionProperty
      ],
      ( position1, position2, electronegativity1, electronegativity2, dipoleDirection ) => {

        const deltaEN = electronegativity2 - electronegativity1;

        // this is a simplification. in reality, magnitude is a function of deltaEN and many other things.
        const magnitude = Math.abs( deltaEN );

        let angle = this.getAngle();
        if ( deltaEN < 0 ) {
          angle += Math.PI;
        }

        const dipole = Vector2.createPolar( magnitude, angle );

        // The above algorithm is for a dipole that points from positive to negative charge.
        // For IUPAC convention, the direction of the dipole is from negative to positive charge,
        // so rotate the dipole 180 degrees. See issue #5 and #56.
        if ( dipoleDirection === DipoleDirection.NEGATIVE_TO_POSITIVE ) {
          dipole.rotate( Math.PI );
        }

        return dipole;
      }, {
        tandem: options.tandem.createTandem( 'dipoleProperty' ),
        phetioType: DerivedProperty.DerivedPropertyIO( Vector2.Vector2IO ),
        phetioDocumentation:
          'Qualitative vector representation of the dipole, based on the electronegativity difference ' +
          'between the atoms. +x is to the right, +y is DOWN, and positive rotation is CLOCKWISE.'
      } );
  }

  /**
   * Gets the center of the bond, the midpoint between the 2 atom positions.
   * @returns {Vector2}
   * @public
   */
  getCenter() {
    return this.atom1.positionProperty.value.average( this.atom2.positionProperty.value );
  }

  /**
   * Gets the angle of atom2 relative to the horizontal axis.
   * @returns {number} angle in radians
   * @public
   */
  getAngle() {
    const center = this.getCenter();
    return Math.atan2( this.atom2.positionProperty.value.y - center.y, this.atom2.positionProperty.value.x - center.x );
  }

  /**
   * Gets the bond length, the distance between the 2 atoms.
   * @returns {number}
   * @public
   */
  getLength() {
    return this.atom1.positionProperty.value.distance( this.atom2.positionProperty.value );
  }
}

moleculePolarity.register( 'Bond', Bond );
export default Bond;