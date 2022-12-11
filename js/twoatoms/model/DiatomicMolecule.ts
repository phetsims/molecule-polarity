// Copyright 2014-2022, University of Colorado Boulder

/**
 * DiatomicMolecule is the model of a make-believe diatomic (2 atoms) molecule.
 * Variables are named based on the English labels applied to the atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Atom from '../../common/model/Atom.js';
import Bond from '../../common/model/Bond.js';
import Molecule, { MoleculeOptions } from '../../common/model/Molecule.js';
import MPColors from '../../common/MPColors.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';

type SelfOptions = EmptySelfOptions;

type DiatomicMoleculeOptions = SelfOptions & MoleculeOptions;

export default class DiatomicMolecule extends Molecule {

  public readonly atomA: Atom; // the atom labeled 'A'
  public readonly atomB: Atom; // the atom labeled 'B'
  public readonly bond: Bond;
  public readonly getDeltaEN: () => number;

  public constructor( providedOptions: DiatomicMoleculeOptions ) {

    const options = providedOptions;

    const atomA = new Atom( MoleculePolarityStrings.atomAStringProperty, {
      color: MPColors.ATOM_A,
      tandem: options.tandem.createTandem( 'atomA' )
    } );

    const atomB = new Atom( MoleculePolarityStrings.atomBStringProperty, {
      color: MPColors.ATOM_B,
      electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min + ( MPConstants.ELECTRONEGATIVITY_RANGE.getLength() / 2 ),
      tandem: options.tandem.createTandem( 'atomB' )
    } );

    // the bond connecting atoms A and B
    const bond = new Bond( atomA, atomB, {
      tandem: options.tandem.createTandem( 'bond' ),
      phetioDocumentation: 'the bonds between atoms A and B'
    } );

    const updateAtomPositions = ( position: Vector2, angle: number ) => {

      const radius = MPConstants.BOND_LENGTH / 2;

      // atom A
      const xA = ( radius * Math.cos( angle + Math.PI ) ) + position.x;
      const yA = ( radius * Math.sin( angle + Math.PI ) ) + position.y;
      atomA.positionProperty.value = new Vector2( xA, yA );

      // atom B
      const xB = ( radius * Math.cos( angle ) ) + position.x;
      const yB = ( radius * Math.sin( angle ) ) + position.y;
      atomB.positionProperty.value = new Vector2( xB, yB );
    };

    const getDeltaEN = () => {
      return atomB.electronegativityProperty.value - atomA.electronegativityProperty.value;
    };

    const updatePartialCharges = () => {

      const deltaEN = getDeltaEN();

      // in our simplified model, partial charge and deltaEN are equivalent. not so in the real world.
      atomA.partialChargeProperty.value = deltaEN;
      atomB.partialChargeProperty.value = -deltaEN;
    };

    super( [ atomA, atomB ], [ bond ], updateAtomPositions, updatePartialCharges, options );

    this.atomA = atomA;
    this.atomB = atomB;
    this.bond = bond;
    this.getDeltaEN = getDeltaEN;
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'DiatomicMolecule', DiatomicMolecule );