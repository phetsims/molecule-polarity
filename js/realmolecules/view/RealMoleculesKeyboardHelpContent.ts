// Copyright 2026, University of Colorado Boulder

/**
 * RealMoleculesKeyboardHelpContent is the content for the keyboard help dialog in the Real Molecules screen.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Copilot
 * @author Agustín Vallejo
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import ComboBoxKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/ComboBoxKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import MoveMoleculeWASDKeyboardHelpSection from '../../common/view/MoveMoleculeWASDKeyboardHelpSection.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';

export default class RealMoleculesKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // sections in the left column
    const leftSections = [
      new MoveMoleculeWASDKeyboardHelpSection(),
      new SliderControlsKeyboardHelpSection()
    ];

    // sections in the right column
    const rightSections = [
      new ComboBoxKeyboardHelpSection( {
        headingString: MoleculePolarityFluent.a11y.common.keyboardHelpContent.chooseRealMoleculeStringProperty,
        thingAsLowerCaseSingular: MoleculePolarityFluent.a11y.common.keyboardHelpContent.moleculeStringProperty,
        thingAsLowerCasePlural: MoleculePolarityFluent.a11y.common.keyboardHelpContent.moleculesStringProperty
      } ),
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
