// Copyright 2026, University of Colorado Boulder

/**
 * MoveAtomsOrMoleculeKeyboardHelpSection is the keyboard help section for moving atoms or rotating molecules.
 * This is used in the Three Atoms screen.
 *
 * @author Copilot
 * @author Agustín Vallejo
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection, { KeyboardHelpSectionOptions } from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MPHotkeyData from './MPHotkeyData.js';

type SelfOptions = EmptySelfOptions;
type MoveAtomsOrMoleculeKeyboardHelpSectionOptions = SelfOptions & KeyboardHelpSectionOptions;

export default class MoveAtomsOrMoleculeKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( providedOptions?: MoveAtomsOrMoleculeKeyboardHelpSectionOptions ) {

    const options = optionize<MoveAtomsOrMoleculeKeyboardHelpSectionOptions, SelfOptions, KeyboardHelpSectionOptions>()( {
      // no additional options
    }, providedOptions );

    // Rotate molecule
    const rotateMolecule = KeyboardHelpSectionRow.fromHotkeyData(
      MPHotkeyData.ROTATE_MOLECULE,
      {
        icon: KeyboardHelpIconFactory.iconOrIcon( KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(), KeyboardHelpIconFactory.upDownArrowKeysRowIcon() )
      }
    );

    // Move atom A and C
    const moveAtomAAndC = KeyboardHelpSectionRow.fromHotkeyData(
      MPHotkeyData.MOVE_ATOM_A_AND_C,
      {
        icon: KeyboardHelpIconFactory.iconOrIcon( KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(), KeyboardHelpIconFactory.upDownArrowKeysRowIcon() )
      }
    );

    // Rotate or move in smaller steps
    // TODO: Try to yAlign: top this icon https://github.com/phetsims/scenery-phet/issues/966
    const rotateOrMoveInSmallerSteps = KeyboardHelpSectionRow.fromHotkeyData(
      MPHotkeyData.ROTATE_OR_MOVE_SMALLER_STEPS,
      {
        icon: KeyboardHelpIconFactory.iconListWithOr(
          [ KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.leftRightArrowKeysRowIcon() ),
            KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.upDownArrowKeysRowIcon() ) ] )
      }
    );

    const rows = [ rotateMolecule, moveAtomAAndC, rotateOrMoveInSmallerSteps ];

    super( MoleculePolarityFluent.a11y.common.keyboardHelpContent.moveAtomsOrMoleculeStringProperty, rows, options );
  }
}

moleculePolarity.register( 'MoveAtomsOrMoleculeKeyboardHelpSection', MoveAtomsOrMoleculeKeyboardHelpSection );
