// Copyright 2014-2021, University of Colorado Boulder

/**
 * Model of a make-believe diatomic (2 atoms) molecule.
 * Variables are named based on the English labels applied to the atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Atom from '../../common/model/Atom.js';
import Bond from '../../common/model/Bond.js';
import Molecule from '../../common/model/Molecule.js';
import MPColors from '../../common/MPColors.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';

class DiatomicMolecule extends Molecule {

  /**
   * @param {Object} [options] - see supertype constructor
   */
  constructor( options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    // @public the atoms labeled A and B
    const atomA = new Atom( moleculePolarityStrings.atomA, {
      color: MPColors.ATOM_A,
      tandem: options.tandem.createTandem( 'atomA' )
    } );
    const atomB = new Atom( moleculePolarityStrings.atomB, {
      color: MPColors.ATOM_B,
      electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min + ( MPConstants.ELECTRONEGATIVITY_RANGE.getLength() / 2 ),
      tandem: options.tandem.createTandem( 'atomB' )
    } );

    // the bond connecting atoms A and B
    const bond = new Bond( atomA, atomB, {
      tandem: options.tandem.createTandem( 'bond' ),
      phetioDocumentation: 'the bonds between atoms A and B'
    } );

    const updateAtomPositions = ( position, angle ) => {

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

    // @public
    this.atomA = atomA;
    this.atomB = atomB;
    this.bond = bond;
    this.getDeltaEN = getDeltaEN;
  }
}

moleculePolarity.register( 'DiatomicMolecule', DiatomicMolecule );
export default DiatomicMolecule;