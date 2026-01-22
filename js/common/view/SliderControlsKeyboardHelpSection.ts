// Copyright 2026, University of Colorado Boulder

/**
 * SliderControlsKeyboardHelpSection is the keyboard help section for slider controls.
 * This is used in all screens.
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
type SliderControlsKeyboardHelpSectionOptions = SelfOptions & KeyboardHelpSectionOptions;

export default class SliderControlsKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( providedOptions?: SliderControlsKeyboardHelpSectionOptions ) {

    const options = optionize<SliderControlsKeyboardHelpSectionOptions, SelfOptions, KeyboardHelpSectionOptions>()( {
      // no additional options
    }, providedOptions );

    // Adjust slider
    const adjustSlider = KeyboardHelpSectionRow.labelWithIconList(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.adjustSliderStringProperty,
      [ KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(), KeyboardHelpIconFactory.upDownArrowKeysRowIcon() ],
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.adjustSliderDescriptionStringProperty
      }
    );

    // Adjust in smaller steps
    const adjustInSmallerSteps = KeyboardHelpSectionRow.labelWithIconList(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.adjustInSmallerStepsStringProperty,
      [
        KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.leftRightArrowKeysRowIcon() ),
        KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.upDownArrowKeysRowIcon() )
      ],
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.adjustInSmallerStepsDescriptionStringProperty
      }
    );

    // Adjust in larger steps
    const adjustInLargerSteps = KeyboardHelpSectionRow.labelWithIconList(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.adjustInLargerStepsStringProperty,
      [ KeyboardHelpIconFactory.pageUpPageDownRowIcon() ],
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.adjustInLargerStepsDescriptionStringProperty
      }
    );

    // Jump to minimum
    const jumpToMinimum = KeyboardHelpSectionRow.labelWithIcon(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.jumpToMinimumStringProperty,
      TextKeyNode.home(),
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.jumpToMinimumDescriptionStringProperty
      }
    );

    // Jump to maximum
    const jumpToMaximum = KeyboardHelpSectionRow.labelWithIcon(
      MoleculePolarityFluent.a11y.common.keyboardHelpContent.jumpToMaximumStringProperty,
      TextKeyNode.end(),
      {
        labelInnerContent: MoleculePolarityFluent.a11y.common.keyboardHelpContent.jumpToMaximumDescriptionStringProperty
      }
    );

    const rows = [ adjustSlider, adjustInSmallerSteps, adjustInLargerSteps, jumpToMinimum, jumpToMaximum ];

    super( MoleculePolarityFluent.a11y.common.keyboardHelpContent.sliderControlsStringProperty, rows, options );
  }
}

moleculePolarity.register( 'SliderControlsKeyboardHelpSection', SliderControlsKeyboardHelpSection );
