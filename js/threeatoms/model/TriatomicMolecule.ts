// Copyright 2014-2022, University of Colorado Boulder

/**
 * TriatomicMolecule is the model of a make-believe triatomic (3 atoms) molecule with a very specific topology.
 * Variables are named based on the English labels applied to the atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import Atom from '../../common/model/Atom.js';
import Bond from '../../common/model/Bond.js';
import Molecule, { MoleculeOptions } from '../../common/model/Molecule.js';
import normalizeAngle from '../../common/model/normalizeAngle.js';
import MPColors from '../../common/MPColors.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';

type SelfOptions = EmptySelfOptions;

type TriatomicMoleculeOptions = SelfOptions & MoleculeOptions;

export default class TriatomicMolecule extends Molecule {

  public readonly atomA: Atom; // the atom labeled 'A'
  public readonly atomB: Atom; // the atom labeled 'B'
  public readonly atomC: Atom; // the atom labeled 'C'
  public readonly bondAB: Bond; // the bond between atoms 'A' and 'B'
  public readonly bondBC: Bond; // the bond between atoms 'B' and 'C'
  public readonly bondAngleABProperty: NumberProperty; // see phetioDocumentation
  public readonly bondAngleBCProperty: NumberProperty; // see phetioDocumentation

  // the angle between bondAB and bondBC
  // This was added for PhET-iO, see https://github.com/phetsims/molecule-polarity/issues/98
  private readonly bondAngleABCProperty: TReadOnlyProperty<number>;

  public constructor( providedOptions: TriatomicMoleculeOptions ) {

    const options = providedOptions;

    // atoms labeled A, B, C
    const atomA = new Atom( MoleculePolarityStrings.atomAStringProperty, {
      color: MPColors.ATOM_A,
      tandem: options.tandem.createTandem( 'atomA' )
    } );

    const atomB = new Atom( MoleculePolarityStrings.atomBStringProperty, {
      color: MPColors.ATOM_B,
      electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min + ( MPConstants.ELECTRONEGATIVITY_RANGE.getLength() / 2 ),
      tandem: options.tandem.createTandem( 'atomB' )
    } );

    const atomC = new Atom( MoleculePolarityStrings.atomCStringProperty, {
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
    const bondAngleABProperty = new NumberProperty( 0.75 * Math.PI, {
      range: MPConstants.ANGLE_RANGE,
      units: 'radians',
      tandem: bondABTandem.createTandem( 'angleProperty' ),
      phetioDocumentation: 'rotation angle of the bond between atoms A and B, relative to the molecule\'s angle and position, with positive rotation being CLOCKWISE'
    } );

    // the bond angle of atom C relative to atom B, before applying molecule rotation
    const bondAngleBCProperty = new NumberProperty( 0.25 * Math.PI, {
      range: MPConstants.ANGLE_RANGE,
      units: 'radians',
      tandem: bondBCTandem.createTandem( 'angleProperty' ),
      phetioDocumentation: 'rotation angle of the bond between atoms B and C, relative to the molecule\'s angle and position, with positive rotation being CLOCKWISE'
    } );

    const updateAtomPositions = ( position: Vector2, angle: number ) => {
      atomB.positionProperty.value = position;  // atom B remains at the molecule's position
      updateAtomPosition( atomA, bondAngleABProperty.value, position, angle );
      updateAtomPosition( atomC, bondAngleBCProperty.value, position, angle );
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

    const bondAngleListener = () => updateAtomPositions( this.position, this.angleProperty.value );
    bondAngleABProperty.link( bondAngleListener );
    bondAngleBCProperty.link( bondAngleListener );

    this.bondAngleABCProperty = new DerivedProperty(
      [ bondAngleABProperty, bondAngleBCProperty ],
      ( bondAngleAB, bondAngleBC ) => normalizeAngle( bondAngleAB - bondAngleBC, MPConstants.ANGLE_RANGE.min ), {
        isValidValue: value => MPConstants.ANGLE_RANGE.contains( value ),
        tandem: options.tandem.createTandem( 'bondAngleABCProperty' ),
        phetioValueType: NumberIO,
        phetioDocumentation: 'the angle between bonds AB and BC, with positive rotation being CLOCKWISE'
      } );

    this.atomA = atomA;
    this.atomB = atomB;
    this.atomC = atomC;
    this.bondAB = bondAB;
    this.bondBC = bondBC;
    this.bondAngleABProperty = bondAngleABProperty;
    this.bondAngleBCProperty = bondAngleBCProperty;
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public override reset(): void {
    super.reset();
    this.bondAngleABProperty.reset();
    this.bondAngleBCProperty.reset();
  }
}

/*
 * Repositions one atom.
 * @param atom - the atom to reposition
 * @param bondAngle - the angle of the bond that the atom participates in
 * @param position - position of the molecule
 * @param angle - orientation of the molecule
 */
function updateAtomPosition( atom: Atom, bondAngle: number, position: Vector2, angle: number ): void {
  const thetaA = angle + bondAngle;
  const xA = ( MPConstants.BOND_LENGTH * Math.cos( thetaA ) ) + position.x;
  const yA = ( MPConstants.BOND_LENGTH * Math.sin( thetaA ) ) + position.y;
  atom.positionProperty.value = new Vector2( xA, yA );
}

moleculePolarity.register( 'TriatomicMolecule', TriatomicMolecule );