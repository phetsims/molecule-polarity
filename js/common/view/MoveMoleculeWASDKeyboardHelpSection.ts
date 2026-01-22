// Copyright 2026, University of Colorado Boulder

/**
 * MoveMoleculeWASDKeyboardHelpSection is the keyboard help section for rotating molecules using arrow keys or WASD keys.
 * This is used in the Real Molecules screen.
 *
 * @author Copilot
 */

import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection, { KeyboardHelpSectionOptions } from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type MoveMoleculeWASDKeyboardHelpSectionOptions = SelfOptions & KeyboardHelpSectionOptions;

export default class MoveMoleculeWASDKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( providedOptions?: MoveMoleculeWASDKeyboardHelpSectionOptions ) {

    const options = optionize<MoveMoleculeWASDKeyboardHelpSectionOptions, SelfOptions, KeyboardHelpSectionOptions>()( {
      // no additional options
    }, providedOptions );

    // Rotate molecule
    const rotateMolecule = KeyboardHelpSectionRow.labelWithIconList(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateMoleculeWASDStringProperty,
      [
        KeyboardHelpIconFactory.arrowOrWasdKeysRowIcon(),
        KeyboardHelpIconFactory.upDownOrWSKeysRowIcon()
      ],
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateMoleculeWASDDescriptionStringProperty
      }
    );

    // Rotate in smaller steps
    const rotateInSmallerSteps = KeyboardHelpSectionRow.labelWithIconList(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateInSmallerStepsWASDStringProperty,
      [
        KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.arrowOrWasdKeysRowIcon() ),
        KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.upDownOrWSKeysRowIcon() )
      ],
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateInSmallerStepsWASDDescriptionStringProperty
      }
    );

    const rows = [ rotateMolecule, rotateInSmallerSteps ];

    super( MoleculePolarityFluent.a11y.common.keyboardHelpContent.moveMoleculeStringProperty, rows, options );
  }
}

moleculePolarity.register( 'MoveMoleculeWASDKeyboardHelpSection', MoveMoleculeWASDKeyboardHelpSection );
