// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model of a make-believe diatomic (2 atoms) molecule.
 * Variables are named based on the English labels applied to the atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Atom = require( 'MOLECULE_POLARITY/common/model/Atom' );
  const Bond = require( 'MOLECULE_POLARITY/common/model/Bond' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Molecule = require( 'MOLECULE_POLARITY/common/model/Molecule' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const atomAString = require( 'string!MOLECULE_POLARITY/atomA' );
  const atomBString = require( 'string!MOLECULE_POLARITY/atomB' );

  /**
   * @param {Object} [options] - see supertype constructor
   * @constructor
   */
  function DiatomicMolecule( options ) {

    // @public the atoms labeled A and B
    this.atomA = new Atom( atomAString, {
      color: MPColors.ATOM_A
    } );
    this.atomB = new Atom( atomBString, {
      color: MPColors.ATOM_B,
      electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min + ( MPConstants.ELECTRONEGATIVITY_RANGE.getLength() / 2 )
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