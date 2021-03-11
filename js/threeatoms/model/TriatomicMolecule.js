// Copyright 2014-2021, University of Colorado Boulder

/**
 * Model of a make-believe triatomic (3 atoms) molecule with a very specific topology.
 * Variables are named based on the English labels applied to the atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import Atom from '../../common/model/Atom.js';
import Bond from '../../common/model/Bond.js';
import Molecule from '../../common/model/Molecule.js';
import MPColors from '../../common/MPColors.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';

class TriatomicMolecule extends Molecule {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    // atoms labeled A, B, C
    const atomA = new Atom( moleculePolarityStrings.atomA, {
      color: MPColors.ATOM_A,
      tandem: options.tandem.createTandem( 'atomA' )
    } );
    const atomB = new Atom( moleculePolarityStrings.atomB, {
      color: MPColors.ATOM_B,
      electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min + ( MPConstants.ELECTRONEGATIVITY_RANGE.getLength() / 2 ),
      tandem: options.tandem.createTandem( 'atomB' )
    } );
    const atomC = new Atom( moleculePolarityStrings.atomC, {
      color: MPColors.ATOM_C,
      tandem: options.tandem.createTandem( 'atomC' )
    } );

    const bondABTandem = options.tandem.createTandem( 'bondAB' );
    const bondBCTandem = options.tandem.createTandem( 'bondBC' );

    // the bond connecting atoms A and B
    const bondAB = new Bond( atomA, atomB, {
      tandem: bondABTandem,
      phetioDocumentation: 'the bond between atoms A and B'
    } );

    // the bond connecting atoms B and C
    const bondBC = new Bond( atomB, atomC, {
      tandem: bondBCTandem,
      phetioDocumentation: 'the bond between atoms B and C'
    } );

    // the bond angle of atom A relative to atom B, before applying molecule rotation
    const bondAngleAProperty = new NumberProperty( 0.75 * Math.PI, {
      range: MPConstants.ANGLE_RANGE,
      units: 'radians',
      tandem: bondABTandem.createTandem( 'angleProperty' ),
      phetioDocumentation: 'rotation angle of the bond between atoms A and B, relative to the molecule\'s angle and position, with positive rotation being CLOCKWISE'
    } );

    // the bond angle of atom C relative to atom B, before applying molecule rotation
    const bondAngleCProperty = new NumberProperty( 0.25 * Math.PI, {
      range: MPConstants.ANGLE_RANGE,
      units: 'radians',
      tandem: bondBCTandem.createTandem( 'angleProperty' ),
      phetioDocumentation: 'rotation angle of the bond between atoms B and C, relative to the molecule\'s angle and position, with positive rotation being CLOCKWISE'
    } );

    const updateAtomPositions = ( position, angle ) => {
      atomB.positionProperty.value = position;  // atom B remains at the molecule's position
      updateAtomPosition( atomA, bondAngleAProperty.value, position, angle );
      updateAtomPosition( atomC, bondAngleCProperty.value, position, angle );
    };

    const updatePartialCharges = () => {

      const deltaAB = atomA.electronegativityProperty.value - atomB.electronegativityProperty.value;
      const deltaCB = atomC.electronegativityProperty.value - atomB.electronegativityProperty.value;

      // in our simplified model, partial charge and deltaEN are equivalent. not so in the real world.
      atomA.partialChargeProperty.value = -deltaAB;
      atomC.partialChargeProperty.value = -deltaCB;

      // atom B's participates in 2 bonds, so its partial charge is the sum
      atomB.partialChargeProperty.value = deltaAB + deltaCB;
    };

    super( [ atomA, atomB, atomC ], [ bondAB, bondBC ], updateAtomPositions, updatePartialCharges, options );

    // unlink not needed
    const bondAngleListener = () => updateAtomPositions( this.position, this.angleProperty.value );
    bondAngleAProperty.link( bondAngleListener );
    bondAngleCProperty.link( bondAngleListener );

    // @private (phet-io) {DerivedProperty.<number>} the angle between bonds AB and BC
    // This was added for PhET-iO, see https://github.com/phetsims/molecule-polarity/issues/98
    this.boundAngleABCProperty = new DerivedProperty(
      [ bondAB.dipoleProperty, bondBC.dipoleProperty ],
      ( dipoleAB, dipoleBC ) => dipoleBC.angle - dipoleAB.angle, {
        tandem: options.tandem.createTandem( 'boundAngleABCProperty' ),
        phetioType: DerivedProperty.DerivedPropertyIO( NumberIO ),
        phetioDocumentation: 'the angle between bonds AB and BC, with positive rotation being CLOCKWISE'
      } );

    // @public
    this.atomA = atomA;
    this.atomB = atomB;
    this.atomC = atomC;
    this.bondAB = bondAB;
    this.bondBC = bondBC;
    this.bondAngleAProperty = bondAngleAProperty;
    this.bondAngleCProperty = bondAngleCProperty;
  }

  /**
   * @public
   * @override
   */
  reset() {
    super.reset();
    this.bondAngleAProperty.reset();
    this.bondAngleCProperty.reset();
  }
}

/*
 * Repositions one atom.
 *
 * @param {Atom} atom the atom to reposition
 * @param {number} bondAngle the angle of the bond that the atom participates in
 * @param {Vector2} position position of the molecule
 * @param {number} angle orientation of the molecule
 */
function updateAtomPosition( atom, bondAngle, position, angle ) {
  const thetaA = angle + bondAngle;
  const xA = ( MPConstants.BOND_LENGTH * Math.cos( thetaA ) ) + position.x;
  const yA = ( MPConstants.BOND_LENGTH * Math.sin( thetaA ) ) + position.y;
  atom.positionProperty.value = new Vector2( xA, yA );
}

moleculePolarity.register( 'TriatomicMolecule', TriatomicMolecule );
export default TriatomicMolecule;