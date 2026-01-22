// Copyright 2026, University of Colorado Boulder

/**
 * MoveAtomsOrMoleculeKeyboardHelpSection is the keyboard help section for moving atoms or rotating molecules.
 * This is used in the Three Atoms screen.
 */

import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection, { KeyboardHelpSectionOptions } from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type MoveAtomsOrMoleculeKeyboardHelpSectionOptions = SelfOptions & KeyboardHelpSectionOptions;

export default class MoveAtomsOrMoleculeKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( providedOptions?: MoveAtomsOrMoleculeKeyboardHelpSectionOptions ) {

    const options = optionize<MoveAtomsOrMoleculeKeyboardHelpSectionOptions, SelfOptions, KeyboardHelpSectionOptions>()( {
      // no additional options
    }, providedOptions );

    // Rotate molecule
    const rotateMolecule = KeyboardHelpSectionRow.labelWithIconList(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateMoleculeStringProperty,
      [ KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(), KeyboardHelpIconFactory.upDownArrowKeysRowIcon() ],
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateMoleculeDescriptionStringProperty
      }
    );

    // Move atom A and C
    const moveAtomAAndC = KeyboardHelpSectionRow.labelWithIconList(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.moveAtomAAndCStringProperty,
      [ KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(), KeyboardHelpIconFactory.upDownArrowKeysRowIcon() ],
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.moveAtomAAndCDescriptionStringProperty
      }
    );

    // Rotate or move in smaller steps
    const rotateOrMoveInSmallerSteps = KeyboardHelpSectionRow.labelWithIconList(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateOrMoveInSmallerStepsStringProperty,
      [
        KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.leftRightArrowKeysRowIcon() ),
        KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.upDownArrowKeysRowIcon() )
      ],
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateOrMoveInSmallerStepsDescriptionStringProperty
      }
    );

    const rows = [ rotateMolecule, moveAtomAAndC, rotateOrMoveInSmallerSteps ];

    super( MoleculePolarityFluent.a11y.common.keyboardHelpContent.moveAtomsOrMoleculeStringProperty, rows, options );
  }
}

moleculePolarity.register( 'MoveAtomsOrMoleculeKeyboardHelpSection', MoveAtomsOrMoleculeKeyboardHelpSection );
