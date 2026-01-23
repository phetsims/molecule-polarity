// Copyright 2026, University of Colorado Boulder

/**
 * MoveMoleculeKeyboardHelpSection is the keyboard help section for rotating molecules.
 * This is used in screens 1 and 2.
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
type MoveMoleculeKeyboardHelpSectionOptions = SelfOptions & KeyboardHelpSectionOptions;

export default class MoveMoleculeKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( providedOptions?: MoveMoleculeKeyboardHelpSectionOptions ) {

    const options = optionize<MoveMoleculeKeyboardHelpSectionOptions, SelfOptions, KeyboardHelpSectionOptions>()( {
      // no additional options
    }, providedOptions );

    // Rotate molecule
    const rotateMolecule = KeyboardHelpSectionRow.fromHotkeyData(
      MPHotkeyData.ROTATE_MOLECULE,
      {
        icon: KeyboardHelpIconFactory.iconOrIcon( KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(), KeyboardHelpIconFactory.upDownArrowKeysRowIcon() )
      }
    );

    // Rotate in smaller steps
    // TODO: Try to yAlign: top this icon https://github.com/phetsims/scenery-phet/issues/966
    const rotateInSmallerSteps = KeyboardHelpSectionRow.fromHotkeyData(
      MPHotkeyData.ROTATE_MOLECULE_SMALLER_STEPS,
      {
        labelWithIconOptions: {
          iconOptions: {
            yAlign: 'top'
          }
        },
        icon: KeyboardHelpIconFactory.iconListWithOr(
          [ KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.leftRightArrowKeysRowIcon() ),
            KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.upDownArrowKeysRowIcon() ) ] )
      }
    );

    const rows = [ rotateMolecule, rotateInSmallerSteps ];

    super( MoleculePolarityFluent.a11y.common.keyboardHelpContent.moveMoleculeStringProperty, rows, options );
  }
}

moleculePolarity.register( 'MoveMoleculeKeyboardHelpSection', MoveMoleculeKeyboardHelpSection );
