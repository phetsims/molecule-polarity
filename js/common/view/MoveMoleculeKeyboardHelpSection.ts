// Copyright 2026, University of Colorado Boulder

/**
 * MoveMoleculeKeyboardHelpSection is the keyboard help section for rotating molecules.
 * This is used in screens 1 and 2.
 */

import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection, { KeyboardHelpSectionOptions } from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type MoveMoleculeKeyboardHelpSectionOptions = SelfOptions & KeyboardHelpSectionOptions;

export default class MoveMoleculeKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( providedOptions?: MoveMoleculeKeyboardHelpSectionOptions ) {

    const options = optionize<MoveMoleculeKeyboardHelpSectionOptions, SelfOptions, KeyboardHelpSectionOptions>()( {
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

    // Rotate in smaller steps
    const rotateInSmallerSteps = KeyboardHelpSectionRow.labelWithIconList(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateInSmallerStepsStringProperty,
      [
        KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.leftRightArrowKeysRowIcon() ),
        KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.upDownArrowKeysRowIcon() )
      ],
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateInSmallerStepsDescriptionStringProperty
      }
    );

    const rows = [ rotateMolecule, rotateInSmallerSteps ];

    super( MoleculePolarityFluent.a11y.common.keyboardHelpContent.moveMoleculeStringProperty, rows, options );
  }
}

moleculePolarity.register( 'MoveMoleculeKeyboardHelpSection', MoveMoleculeKeyboardHelpSection );
