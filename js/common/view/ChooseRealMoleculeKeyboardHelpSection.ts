// Copyright 2026, University of Colorado Boulder

/**
 * ChooseRealMoleculeKeyboardHelpSection is the keyboard help section for choosing real molecules.
 * This is used in the Real Molecules screen.
 *
 * @author Copilot
 * @author Agustín Vallejo
 */

import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection, { KeyboardHelpSectionOptions } from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type ChooseRealMoleculeKeyboardHelpSectionOptions = SelfOptions & KeyboardHelpSectionOptions;

export default class ChooseRealMoleculeKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( providedOptions?: ChooseRealMoleculeKeyboardHelpSectionOptions ) {

    const options = optionize<ChooseRealMoleculeKeyboardHelpSectionOptions, SelfOptions, KeyboardHelpSectionOptions>()( {
      // no additional options
    }, providedOptions );

    // Show molecules
    const showMolecules = KeyboardHelpSectionRow.labelWithIcon(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.showMoleculesStringProperty,
      KeyboardHelpIconFactory.spaceOrEnter(),
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.showMoleculesDescriptionStringProperty
      }
    );

    // Move through molecules
    const moveThroughMolecules = KeyboardHelpSectionRow.labelWithIcon(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.moveThroughMoleculesStringProperty,
      KeyboardHelpIconFactory.upDownArrowKeysRowIcon(),
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.moveThroughMoleculesDescriptionStringProperty
      }
    );

    // Change molecule
    const changeMolecule = KeyboardHelpSectionRow.labelWithIcon(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.changeMoleculeStringProperty,
      TextKeyNode.enter(),
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.changeMoleculeDescriptionStringProperty
      }
    );

    // Close without changing
    const closeWithoutChanging = KeyboardHelpSectionRow.labelWithIcon(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.closeWithoutChangingStringProperty,
      TextKeyNode.esc(),
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.closeWithoutChangingDescriptionStringProperty
      }
    );

    const rows = [ showMolecules, moveThroughMolecules, changeMolecule, closeWithoutChanging ];

    super( MoleculePolarityFluent.a11y.common.keyboardHelpContent.chooseRealMoleculeStringProperty, rows, options );
  }
}

moleculePolarity.register( 'ChooseRealMoleculeKeyboardHelpSection', ChooseRealMoleculeKeyboardHelpSection );
