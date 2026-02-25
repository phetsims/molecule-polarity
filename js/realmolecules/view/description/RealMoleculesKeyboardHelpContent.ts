// Copyright 2026, University of Colorado Boulder

/**
 * RealMoleculesKeyboardHelpContent is the content for the keyboard help dialog in the Real Molecules screen.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import ComboBoxKeyboardHelpSection from '../../../../../scenery-phet/js/keyboard/help/ComboBoxKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import MoveMoleculeWASDKeyboardHelpSection from '../../../common/view/description/MoveMoleculeWASDKeyboardHelpSection.js';
import moleculePolarity from '../../../moleculePolarity.js';
import MoleculePolarityFluent from '../../../MoleculePolarityFluent.js';

export default class RealMoleculesKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // sections in the left column
    const leftSections = [
      new MoveMoleculeWASDKeyboardHelpSection(),
      new ComboBoxKeyboardHelpSection( {
        headingString: MoleculePolarityFluent.keyboardHelpContent.chooseRealMoleculeStringProperty,
        thingAsLowerCaseSingular: MoleculePolarityFluent.keyboardHelpContent.moleculeStringProperty,
        thingAsLowerCasePlural: MoleculePolarityFluent.keyboardHelpContent.moleculesStringProperty
      } )
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

moleculePolarity.register( 'RealMoleculesKeyboardHelpContent', RealMoleculesKeyboardHelpContent );
