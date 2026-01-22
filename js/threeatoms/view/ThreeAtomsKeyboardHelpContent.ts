// Copyright 2026, University of Colorado Boulder

/**
 * ThreeAtomsKeyboardHelpContent is the content for the keyboard help dialog in the Three Atoms screen.
 *
 * @author Copilot
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoveAtomsOrMoleculeKeyboardHelpSection from '../../common/view/MoveAtomsOrMoleculeKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../common/view/SliderControlsKeyboardHelpSection.js';

export default class ThreeAtomsKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // sections in the left column
    const leftSections = [
      new MoveAtomsOrMoleculeKeyboardHelpSection(),
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

moleculePolarity.register( 'ThreeAtomsKeyboardHelpContent', ThreeAtomsKeyboardHelpContent );
