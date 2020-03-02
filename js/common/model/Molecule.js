// Copyright 2014-2020, University of Colorado Boulder

/**
 * Abstract base type for all 2D molecules.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import moleculePolarity from '../../moleculePolarity.js';

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

    options = merge( {
      position: new Vector2( 0, 0 ), // the point about which the molecule rotates, in global model coordinate frame
      angle: 0 // angle of rotation of the entire molecule about the position, in radians
    }, options );

    // @public (read-only)
    this.position = options.position; // the point about which the molecule rotates, in global model coordinate frame
    this.atoms = atoms;
    this.bonds = bonds;

    // @public
    this.angleProperty = new NumberProperty( options.angle ); // angle of rotation about the position, in radians
    this.dragging = false; // true when the user is dragging the molecule

    // update atom positions when molecule is rotated, unlink not needed
    this.angleProperty.link( angle => updateAtomPositions( this.position, angle ) );

    // bond dipoles, for deriving molecular dipole
    const bondDipoleProperties = [];
    this.bonds.forEach( bond => bondDipoleProperties.push( bond.dipoleProperty ) );

    // @public the molecular dipole, sum of the bond dipoles, dispose not needed
    this.dipoleProperty = new DerivedProperty( bondDipoleProperties, () => {
      const sum = new Vector2( 0, 0 );
      this.bonds.forEach( bond => {
        sum.add( bond.dipoleProperty.get() ); // add to the same Vector2 instance
      } );
      return sum;
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
    return Matrix3.translationFromVector( this.position ).timesMatrix( Matrix3.rotation2( this.angleProperty.get() ) );
  }
}

moleculePolarity.register( 'Molecule', Molecule );

export default Molecule;