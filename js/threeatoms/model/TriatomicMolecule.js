// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model of a make-believe triatomic (3 atoms) molecule with a very specific topology.
 * Variables are named based on the English labels applied to the atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Atom = require( 'MOLECULE_POLARITY/common/model/Atom' );
  var Bond = require( 'MOLECULE_POLARITY/common/model/Bond' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Molecule = require( 'MOLECULE_POLARITY/common/model/Molecule' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var atomAString = require( 'string!MOLECULE_POLARITY/A' );
  var atomBString = require( 'string!MOLECULE_POLARITY/B' );
  var atomCString = require( 'string!MOLECULE_POLARITY/C' );

  /**
   * @param {Object} options see supertype constructor
   * @constructor
   */
  function TriatomicMolecule( options ) {

    // the atoms labeled A, B, C
    this.atomA = new Atom( atomAString, MPConstants.ATOM_DIAMETER, MPColors.ATOM_A, MPConstants.ELECTRONEGATIVITY_RANGE.min );
    this.atomB = new Atom( atomBString, MPConstants.ATOM_DIAMETER, MPColors.ATOM_B, MPConstants.ELECTRONEGATIVITY_RANGE.min + ( MPConstants.ELECTRONEGATIVITY_RANGE.getLength() / 2 ) );
    this.atomC = new Atom( atomCString, MPConstants.ATOM_DIAMETER, MPColors.ATOM_C, MPConstants.ELECTRONEGATIVITY_RANGE.min );

    this.bondAB = new Bond( this.atomA, this.atomB ); // the bond connecting atoms A and B
    this.bondBC = new Bond( this.atomB, this.atomC ); // the bond connecting atoms B and C
    this.bondAngleAProperty = new Property( 0.75 * Math.PI ); // the bond angle of atom A relative to atom B, before applying molecule rotation
    this.bondAngleCProperty = new Property( 0.25 * Math.PI ); // the bond angle of atom C relative to atom B, before applying molecule rotation

    Molecule.call( this, [ this.atomA, this.atomB, this.atomC ], [ this.bondAB, this.bondBC ], this.updateAtomLocations, this.updatePartialCharges, options );

    this.bondAngleAProperty.link( this.updateAtomLocations.bind( this ) );
    this.bondAngleCProperty.link( this.updateAtomLocations.bind( this ) );
  }

  /*
   * Repositions one atom.
   *
   * @param {Atom} atom the atom to reposition
   * @param {Number} bondAngle the angle of the bond that the atom participates in
   * @param {Vector2 location location of the molecule
   * @param {Number} angle orientation of the molecule
   */
  var updateAtomLocation = function( atom, bondAngle, location, angle ) {
    var thetaA = angle + bondAngle;
    var xA = ( MPConstants.BOND_LENGTH * Math.cos( thetaA ) ) + location.x;
    var yA = ( MPConstants.BOND_LENGTH * Math.sin( thetaA ) ) + location.y;
    atom.locationProperty.set( new Vector2( xA, yA ) );
  };

  return inherit( Molecule, TriatomicMolecule, {

    // @override
    reset: function() {
      Molecule.prototype.reset.call( this );
      this.bondAngleAProperty.reset();
      this.bondAngleCProperty.reset();
    },

    // @private repositions the atoms
    updateAtomLocations: function() {
      this.atomB.locationProperty.set( this.location );  // atom B remains at the molecule's location
      updateAtomLocation( this.atomA, this.bondAngleAProperty.get(), this.location, this.angleProperty.get() );
      updateAtomLocation( this.atomC, this.bondAngleCProperty.get(), this.location, this.angleProperty.get() );
    },

    // @private updates partial charges
    updatePartialCharges: function() {
      var deltaAB = this.atomA.electronegativityProperty.get() - this.atomB.electronegativityProperty.get();
      var deltaCB = this.atomC.electronegativityProperty.get() - this.atomB.electronegativityProperty.get();
      // in our simplified model, partial charge and deltaEN are equivalent. not so in the real world.
      this.atomA.partialChargeProperty.set( -deltaAB );
      this.atomC.partialChargeProperty.set( -deltaCB );
      // atom B's participates in 2 bonds, so its partial charge is the sum
      this.atomB.partialChargeProperty.set( deltaAB + deltaCB );
    }

  } );
} );

