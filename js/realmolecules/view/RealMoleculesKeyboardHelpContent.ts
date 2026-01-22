// Copyright 2026, University of Colorado Boulder

/**
 * RealMoleculesKeyboardHelpContent is the content for the keyboard help dialog in the Real Molecules screen.
 *
 * @author Copilot
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoveMoleculeWASDKeyboardHelpSection from '../../common/view/MoveMoleculeWASDKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../common/view/SliderControlsKeyboardHelpSection.js';
import ChooseRealMoleculeKeyboardHelpSection from '../../common/view/ChooseRealMoleculeKeyboardHelpSection.js';

export default class RealMoleculesKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // sections in the left column
    const leftSections = [
      new MoveMoleculeWASDKeyboardHelpSection(),
      new SliderControlsKeyboardHelpSection()
    ];

    // sections in the right column
    const rightSections = [
      new ChooseRealMoleculeKeyboardHelpSection(),
      new BasicActionsKeyboardHelpSection( {
        withCheckboxContent: true
      } )
    ];

    super( leftSections, rightSections, {
      isDisposable: false
    } );
  }
}

moleculePolarity.register( 'RealMoleculesKeyboardHelpContent', RealMoleculesKeyboardHelpContent );
