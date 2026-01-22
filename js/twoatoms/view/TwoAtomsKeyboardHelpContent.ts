// Copyright 2026, University of Colorado Boulder

/**
 * TwoAtomsKeyboardHelpContent is the content for the keyboard help dialog in the Two Atoms screen.
 *
 * @author Copilot
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoveMoleculeKeyboardHelpSection from '../../common/view/MoveMoleculeKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../common/view/SliderControlsKeyboardHelpSection.js';

export default class TwoAtomsKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // sections in the left column
    const leftSections = [
      new MoveMoleculeKeyboardHelpSection(),
      new SliderControlsKeyboardHelpSection()
    ];

    // sections in the right column
    const rightSections = [
      new BasicActionsKeyboardHelpSection( {
        withCheckboxContent: true
      } )
    ];

    super( leftSections, rightSections, {
      isDisposable: false
    } );
  }
}

moleculePolarity.register( 'TwoAtomsKeyboardHelpContent', TwoAtomsKeyboardHelpContent );
