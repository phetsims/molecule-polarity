// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model of a make-believe diatomic (2 atoms) molecule.
 * Variables are named based on the English labels applied to the atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Atom = require( 'MOLECULE_POLARITY/common/model/Atom' );
  var Bond = require( 'MOLECULE_POLARITY/common/model/Bond' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Molecule2 = require( 'MOLECULE_POLARITY/common/model/Molecule2' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var PolarCartesianConverter = require( 'MOLECULE_POLARITY/common/PolarCartesianConverter' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var atomAString = require( 'string!MOLECULE_POLARITY/A' );
  var atomBString = require( 'string!MOLECULE_POLARITY/B' );

  /**
   * @param {*} options see supertype constructor
   * @constructor
   */
  function DiatomicMolecule( options ) {

    // the atoms labeled A and B
    this.atomA = new Atom( atomAString, MPConstants.ATOM_DIAMETER, MPColors.ATOM_A, MPConstants.ELECTRONEGATIVITY_RANGE.min );
    this.atomB = new Atom( atomBString, MPConstants.ATOM_DIAMETER, MPColors.ATOM_B, MPConstants.ELECTRONEGATIVITY_RANGE.min + ( MPConstants.ELECTRONEGATIVITY_RANGE.getLength() / 2 ) );

    // the bond connecting atoms A and B
    this.bond = new Bond( this.atomA, this.atomB );

    Molecule2.call( this, [ this.atomA, this.atomB ], [ this.bond ], this.updateAtomLocations, this.updatePartialCharges, options );
  }

  return inherit( Molecule2, DiatomicMolecule, {

    // Gets the difference in electronegativity (EN), positive sign indicates atom B has higher EN.
    getDeltaEN: function() {
      return this.atomB.electronegativityProperty.get() - this.atomA.electronegativityProperty.get();
    },

    // @private repositions the atoms
    updateAtomLocations: function() {
      var radius = MPConstants.BOND_LENGTH / 2;
      // atom A
      var xA = PolarCartesianConverter.getX( radius, this.angleProperty.get() + Math.PI ) + this.location.x;
      var yA = PolarCartesianConverter.getY( radius, this.angleProperty.get() + Math.PI ) + this.location.y;
      this.atomA.locationProperty.set( new Vector2( xA, yA ) );
      // atom B
      var xB = PolarCartesianConverter.getX( radius, this.angleProperty.get() ) + this.location.x;
      var yB = PolarCartesianConverter.getY( radius, this.angleProperty.get() ) + this.location.y;
      this.atomB.locationProperty.set( new Vector2( xB, yB ) );
    },

    // @private updates partial charges
    updatePartialCharges: function() {
      var deltaEN = this.getDeltaEN();
      // in our simplified model, partial charge and deltaEN are equivalent. not so in the real world.
      this.atomA.partialChargeProperty.set( -deltaEN );
      this.atomB.partialChargeProperty.set( deltaEN );
    }
  } );
} );