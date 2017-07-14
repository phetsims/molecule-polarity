// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model of a make-believe diatomic (2 atoms) molecule.
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
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var atomAString = require( 'string!MOLECULE_POLARITY/atomA' );
  var atomBString = require( 'string!MOLECULE_POLARITY/atomB' );

  /**
   * @param {Object} [options] - see supertype constructor
   * @constructor
   */
  function DiatomicMolecule( options ) {

    // @public the atoms labeled A and B
    this.atomA = new Atom( atomAString, {
      color: MPColors.ATOM_A,
      electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min + ( MPConstants.ELECTRONEGATIVITY_RANGE.getLength() / 2 )
    } );
    this.atomB = new Atom( atomBString, {
      color: MPColors.ATOM_B
    } );

    // @public the bond connecting atoms A and B
    this.bond = new Bond( this.atomA, this.atomB );

    Molecule.call( this,
      [ this.atomA, this.atomB ],
      [ this.bond ],
      this.updateAtomLocations,
      this.updatePartialCharges,
      options );
  }

  moleculePolarity.register( 'DiatomicMolecule', DiatomicMolecule );

  return inherit( Molecule, DiatomicMolecule, {

    /**
     * Gets the difference in electronegativity (EN), positive sign indicates atom B has higher EN.
     * @returns {number}
     * @public
     */
    getDeltaEN: function() {
      return this.atomB.electronegativityProperty.get() - this.atomA.electronegativityProperty.get();
    },

    /**
     * Repositions the atoms.
     * @private
     */
    updateAtomLocations: function() {

      var radius = MPConstants.BOND_LENGTH / 2;

      // atom A
      var xA = ( radius * Math.cos( this.angleProperty.get() + Math.PI ) ) + this.location.x;
      var yA = ( radius * Math.sin( this.angleProperty.get() + Math.PI ) ) + this.location.y;
      this.atomA.locationProperty.set( new Vector2( xA, yA ) );

      // atom B
      var xB = ( radius * Math.cos( this.angleProperty.get() ) ) + this.location.x;
      var yB = ( radius * Math.sin( this.angleProperty.get() ) ) + this.location.y;
      this.atomB.locationProperty.set( new Vector2( xB, yB ) );
    },

    /**
     * Updates partial charges.
     * @private
     */
    updatePartialCharges: function() {

      var deltaEN = this.getDeltaEN();

      // in our simplified model, partial charge and deltaEN are equivalent. not so in the real world.
      this.atomA.partialChargeProperty.set( deltaEN );
      this.atomB.partialChargeProperty.set( -deltaEN );
    }
  } );
} );