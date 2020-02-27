// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model of a make-believe triatomic (3 atoms) molecule with a very specific topology.
 * Variables are named based on the English labels applied to the atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import Atom from '../../common/model/Atom.js';
import Bond from '../../common/model/Bond.js';
import Molecule from '../../common/model/Molecule.js';
import MPColors from '../../common/MPColors.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarityStrings from '../../molecule-polarity-strings.js';
import moleculePolarity from '../../moleculePolarity.js';

const atomAString = moleculePolarityStrings.atomA;
const atomBString = moleculePolarityStrings.atomB;
const atomCString = moleculePolarityStrings.atomC;

/**
 * @param {Object} [options] see supertype constructor
 * @constructor
 */
function TriatomicMolecule( options ) {

  // @public the atoms labeled A, B, C
  this.atomA = new Atom( atomAString, {
    color: MPColors.ATOM_A
  } );
  this.atomB = new Atom( atomBString, {
    color: MPColors.ATOM_B,
    electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min + ( MPConstants.ELECTRONEGATIVITY_RANGE.getLength() / 2 )
  } );
  this.atomC = new Atom( atomCString, {
    color: MPColors.ATOM_C
  } );

  // @public
  this.bondAB = new Bond( this.atomA, this.atomB ); // the bond connecting atoms A and B
  this.bondBC = new Bond( this.atomB, this.atomC ); // the bond connecting atoms B and C

  // @public the bond angle of atom A relative to atom B, before applying molecule rotation
  this.bondAngleAProperty = new NumberProperty( 0.75 * Math.PI );

  // @public the bond angle of atom C relative to atom B, before applying molecule rotation
  this.bondAngleCProperty = new NumberProperty( 0.25 * Math.PI );

  Molecule.call( this,
    [ this.atomA, this.atomB, this.atomC ],
    [ this.bondAB, this.bondBC ],
    this.updateAtomPositions,
    this.updatePartialCharges,
    options );

  // unlinks not needed
  this.bondAngleAProperty.link( this.updateAtomPositions.bind( this ) );
  this.bondAngleCProperty.link( this.updateAtomPositions.bind( this ) );
}

moleculePolarity.register( 'TriatomicMolecule', TriatomicMolecule );

/*
 * Repositions one atom.
 *
 * @param {Atom} atom the atom to reposition
 * @param {number} bondAngle the angle of the bond that the atom participates in
 * @param {Vector2 position position of the molecule
 * @param {number} angle orientation of the molecule
 */
const updateAtomPosition = function( atom, bondAngle, position, angle ) {
  const thetaA = angle + bondAngle;
  const xA = ( MPConstants.BOND_LENGTH * Math.cos( thetaA ) ) + position.x;
  const yA = ( MPConstants.BOND_LENGTH * Math.sin( thetaA ) ) + position.y;
  atom.positionProperty.set( new Vector2( xA, yA ) );
};

export default inherit( Molecule, TriatomicMolecule, {

  /**
   * @public
   * @override
   */
  reset: function() {
    Molecule.prototype.reset.call( this );
    this.bondAngleAProperty.reset();
    this.bondAngleCProperty.reset();
  },

  /**
   * Repositions the atoms.
   * @private
   */
  updateAtomPositions: function() {
    this.atomB.positionProperty.set( this.position );  // atom B remains at the molecule's position
    updateAtomPosition( this.atomA, this.bondAngleAProperty.get(), this.position, this.angleProperty.get() );
    updateAtomPosition( this.atomC, this.bondAngleCProperty.get(), this.position, this.angleProperty.get() );
  },

  /**
   * Updates partial charges.
   * @private
   */
  updatePartialCharges: function() {

    const deltaAB = this.atomA.electronegativityProperty.get() - this.atomB.electronegativityProperty.get();
    const deltaCB = this.atomC.electronegativityProperty.get() - this.atomB.electronegativityProperty.get();

    // in our simplified model, partial charge and deltaEN are equivalent. not so in the real world.
    this.atomA.partialChargeProperty.set( -deltaAB );
    this.atomC.partialChargeProperty.set( -deltaCB );

    // atom B's participates in 2 bonds, so its partial charge is the sum
    this.atomB.partialChargeProperty.set( deltaAB + deltaCB );
  }

} );