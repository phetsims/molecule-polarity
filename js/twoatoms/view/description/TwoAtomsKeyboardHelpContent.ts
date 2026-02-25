// Copyright 2026, University of Colorado Boulder

/**
 * TwoAtomsKeyboardHelpContent is the content for the keyboard help dialog in the Two Atoms screen.
 *
 * @author Copilot
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import MoveMoleculeKeyboardHelpSection from '../../../common/view/description/MoveMoleculeKeyboardHelpSection.js';
import moleculePolarity from '../../../moleculePolarity.js';

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
