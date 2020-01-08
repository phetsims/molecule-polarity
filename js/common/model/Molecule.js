// Copyright 2014-2020, University of Colorado Boulder

/**
 * Abstract base type for all 2D molecules.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const merge = require( 'PHET_CORE/merge' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Atom[]} atoms - atoms that make up the molecule
   * @param {Bond[]} bonds - bonds between the atoms
   * @param {function} updateAtomPositions - repositions the atoms (no arguments, no return value)
   * @param {function} updatePartialCharges - updates the partial charges (no arguments, no return value)
   * @param {Object} [options]
   * @constructor
   * @abstract
   */
  function Molecule( atoms, bonds, updateAtomPositions, updatePartialCharges, options ) {

    options = merge( {
      position: new Vector2( 0, 0 ), // the point about which the molecule rotates, in global model coordinate frame
      angle: 0 // angle of rotation of the entire molecule about the position, in radians
    }, options );

    const self = this;

    // @public (read-only)
    this.position = options.position; // the point about which the molecule rotates, in global model coordinate frame
    this.atoms = atoms;
    this.bonds = bonds;

    // @public
    this.angleProperty = new NumberProperty( options.angle ); // angle of rotation about the position, in radians
    this.dragging = false; // true when the user is dragging the molecule

    // update atom positions when molecule is rotated
    this.angleProperty.link( updateAtomPositions.bind( this ) ); // unlink not needed

    // bond dipoles, for deriving molecular dipole
    const bondDipoleProperties = [];
    this.bonds.forEach( function( bond ) {
      bondDipoleProperties.push( bond.dipoleProperty );
    } );

    // @public the molecular dipole, sum of the bond dipoles, dispose not needed
    this.dipoleProperty = new DerivedProperty( bondDipoleProperties, function() {
      const sum = new Vector2( 0, 0 );
      self.bonds.forEach( function( bond ) {
        sum.add( bond.dipoleProperty.get() ); // add to the same Vector2 instance
      } );
      return sum;
    } );

    // update partial charges when atoms' EN changes
    this.atoms.forEach( function( atom ) {
      atom.electronegativityProperty.link( updatePartialCharges.bind( self ) ); // unlink not needed
    } );
  }

  moleculePolarity.register( 'Molecule', Molecule );

  return inherit( Object, Molecule, {

    // @public
    reset: function() {
      this.angleProperty.reset();
      this.atoms.forEach( function( atom ) { atom.reset(); } );
    },

    /**
     * Creates a transform that accounts for the molecule's position and orientation.
     * @returns {Matrix3}
     * @public
     */
    createTransformMatrix: function() {
      return Matrix3.translationFromVector( this.position ).timesMatrix( Matrix3.rotation2( this.angleProperty.get() ) );
    }
  } );
} );