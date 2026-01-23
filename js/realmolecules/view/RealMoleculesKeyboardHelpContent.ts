// Copyright 2026, University of Colorado Boulder

/**
 * RealMoleculesKeyboardHelpContent is the content for the keyboard help dialog in the Real Molecules screen.
 *
 * @author Copilot
 * @author Agustín Vallejo
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import ChooseRealMoleculeKeyboardHelpSection from '../../common/view/ChooseRealMoleculeKeyboardHelpSection.js';
import MoveMoleculeWASDKeyboardHelpSection from '../../common/view/MoveMoleculeWASDKeyboardHelpSection.js';
import moleculePolarity from '../../moleculePolarity.js';

export default class RealMoleculesKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // sections in the left column
    const leftSections = [
      new MoveMoleculeWASDKeyboardHelpSection(),
      new SliderControlsKeyboardHelpSection()
    ];

    // sections in the right column
    // TODO: Use ComboBoxKeyboardHelpSection instead of ChooseRealMoleculeKeyboardHelpSection when it is available.
    // https://github.com/phetsims/molecule-polarity/pull/238
    // https://github.com/phetsims/molecule-polarity/issues/233
    const rightSections = [
    // TODO: Use ComboBoxKeyboardHelpSection instead of ChooseRealMoleculeKeyboardHelpSection when it is available. https://github.com/phetsims/molecule-polarity/pull/238 https://github.com/phetsims/molecule-polarity/issues/233
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
