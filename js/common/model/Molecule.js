// Copyright 2014-2017, University of Colorado Boulder

/**
 * Base type for all 2D molecules.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Atom[]} atoms - atoms that make up the molecule
   * @param {Bond[]} bonds - bonds between the atoms
   * @param {function} updateAtomLocations
   * @param {function} updatePartialCharges
   * @param {Object} [options]
   * @constructor
   */
  function Molecule( atoms, bonds, updateAtomLocations, updatePartialCharges, options ) {

    options = _.extend( {
      location: new Vector2( 0, 0 ), // the point about which the molecule rotates, in global model coordinate frame
      angle: 0 // angle of rotation of the entire molecule about the location, in radians
    }, options );

    var self = this;

    // @public
    this.location = options.location;
    this.angleProperty = new Property( options.angle );
    this.atoms = atoms;
    this.bonds = bonds;
    this.dipoleProperty = new Property( new Vector2() ); // the molecular dipole
    this.dragging = false; // true when the user is dragging the molecule

    // update atom locations when molecule is rotated
    this.angleProperty.link( updateAtomLocations.bind( this ) ); // unlink not needed

    // update molecular dipole when bond dipoles change
    this.bonds.forEach( function( bond ) {
      bond.dipoleProperty.link( self.updateMolecularDipole.bind( self ) ); // unlink not needed
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
    },

    /**
     * Molecular dipole is the vector sum of the bond dipoles.
     * @private
     */
    updateMolecularDipole: function() {
      var sum = new Vector2();
      this.bonds.forEach( function( bond ) { sum.add( bond.dipoleProperty.get() ); } );
      this.dipoleProperty.set( sum );
    }
  } );
} );