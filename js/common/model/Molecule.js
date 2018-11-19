// Copyright 2014-2018, University of Colorado Boulder

/**
 * Abstract base type for all 2D molecules.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Atom[]} atoms - atoms that make up the molecule
   * @param {Bond[]} bonds - bonds between the atoms
   * @param {function} updateAtomLocations - repositions the atoms (no arguments, no return value)
   * @param {function} updatePartialCharges - updates the partial charges (no arguments, no return value)
   * @param {Object} [options]
   * @constructor
   * @abstract
   */
  function Molecule( atoms, bonds, updateAtomLocations, updatePartialCharges, options ) {

    options = _.extend( {
      location: new Vector2( 0, 0 ), // the point about which the molecule rotates, in global model coordinate frame
      angle: 0 // angle of rotation of the entire molecule about the location, in radians
    }, options );

    var self = this;

    // @public (read-only)
    this.location = options.location; // the point about which the molecule rotates, in global model coordinate frame
    this.atoms = atoms;
    this.bonds = bonds;

    // @public
    this.angleProperty = new NumberProperty( options.angle ); // angle of rotation about the location, in radians
    this.dragging = false; // true when the user is dragging the molecule

    // update atom locations when molecule is rotated
    this.angleProperty.link( updateAtomLocations.bind( this ) ); // unlink not needed

    // bond dipoles, for deriving molecular dipole
    var bondDipoleProperties = [];
    this.bonds.forEach( function( bond ) {
      bondDipoleProperties.push( bond.dipoleProperty );
    } );

    // @public the molecular dipole, sum of the bond dipoles, dispose not needed
    this.dipoleProperty = new DerivedProperty( bondDipoleProperties, function() {
      var sum = new Vector2();
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
     * Creates a transform that accounts for the molecule's location and orientation.
     * @returns {Matrix3}
     * @public
     */
    createTransformMatrix: function() {
      return Matrix3.translationFromVector( this.location ).timesMatrix( Matrix3.rotation2( this.angleProperty.get() ) );
    }
  } );
} );