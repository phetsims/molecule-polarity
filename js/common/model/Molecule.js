// Copyright 2014-2021, University of Colorado Boulder

/**
 * Abstract base type for all 2D molecules.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';
import Atom from './Atom.js';
import Bond from './Bond.js';

class Molecule {

  /**
   * @param {Atom[]} atoms - atoms that make up the molecule
   * @param {Bond[]} bonds - bonds between the atoms
   * @param {function} updateAtomPositions - repositions the atoms (no arguments, no return value)
   * @param {function} updatePartialCharges - updates the partial charges (no arguments, no return value)
   * @param {Object} [options]
   * @abstract
   */
  constructor( atoms, bonds, updateAtomPositions, updatePartialCharges, options ) {
    assert && AssertUtils.assertArrayOf( atoms, Atom );
    assert && AssertUtils.assertArrayOf( bonds, Bond );
    assert && assert( typeof updateAtomPositions === 'function', 'invalid updateAtomPositions' );
    assert && assert( typeof updatePartialCharges === 'function', 'invalid updatePartialCharges' );

    options = merge( {
      position: new Vector2( 0, 0 ), // the point about which the molecule rotates, in global model coordinate frame
      angle: 0, // angle of rotation of the entire molecule about the position, in radians
      tandem: Tandem.REQUIRED
    }, options );

    // @public (read-only)
    this.position = options.position; // the point about which the molecule rotates, in global model coordinate frame
    this.atoms = atoms;
    this.bonds = bonds;

    // @public
    this.angleProperty = new NumberProperty( options.angle, {
      range: MPConstants.ANGLE_RANGE,
      units: 'radians',
      tandem: options.tandem.createTandem( 'angleProperty' ),
      phetioDocumentation: 'rotation angle of the molecule, with positive rotation being CLOCKWISE'
    } );

    // @pubic true when the user is dragging the molecule
    // This is Property only so that it appears in PhET-iO state.
    this.isDraggingProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'isDraggingProperty' ),
      phetioReadOnly: true,
      phetioState: false
    } );

    // update atom positions when molecule is rotated, unlink not needed
    this.angleProperty.link( angle => updateAtomPositions( this.position, angle ) );

    // bond dipoles, for deriving molecular dipole
    const bondDipoleProperties = [];
    this.bonds.forEach( bond => bondDipoleProperties.push( bond.dipoleProperty ) );

    // @public {DerivedProperty.<Vector2>} the molecular dipole, sum of the bond dipoles, dispose not needed
    this.dipoleProperty = new DerivedProperty( bondDipoleProperties, () => {
      const sum = new Vector2( 0, 0 );
      this.bonds.forEach( bond => {
        sum.add( bond.dipoleProperty.value ); // add to the same Vector2 instance
      } );

      // If y is effectively zero, snap to zero. See https://github.com/phetsims/molecule-polarity/issues/89
      if ( Math.abs( sum.y ) < 1E-10 ) {
        sum.y = 0;
      }
      return sum;
    }, {
      tandem: options.tandem.createTandem( 'dipoleProperty' ),
      phetioType: DerivedProperty.DerivedPropertyIO( Vector2.Vector2IO ),
      phetioDocumentation: 'The molecular dipole, vector sum of the bond dipoles. ' +
                           '+x is to the right, +y is DOWN, and positive rotation is CLOCKWISE.'
    } );

    // update partial charges when atoms' EN changes
    this.atoms.forEach( atom => {
      atom.electronegativityProperty.link( updatePartialCharges ); // unlink not needed
    } );
  }

  // @public
  reset() {
    this.angleProperty.reset();
    this.atoms.forEach( atom => atom.reset() );
  }

  /**
   * Creates a transform that accounts for the molecule's position and orientation.
   * @returns {Matrix3}
   * @public
   */
  createTransformMatrix() {
    return Matrix3.translationFromVector( this.position ).timesMatrix( Matrix3.rotation2( this.angleProperty.value ) );
  }
}

moleculePolarity.register( 'Molecule', Molecule );
export default Molecule;