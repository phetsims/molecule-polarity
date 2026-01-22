// Copyright 2026, University of Colorado Boulder

/**
 * MoveMoleculeWASDKeyboardHelpSection is the keyboard help section for rotating molecules using arrow keys or WASD keys.
 * This is used in the Real Molecules screen.
 *
 * @author Copilot
 * @author Agustín Vallejo
 */

import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import KeyboardHelpSection, { KeyboardHelpSectionOptions } from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type MoveMoleculeWASDKeyboardHelpSectionOptions = SelfOptions & KeyboardHelpSectionOptions;

export default class MoveMoleculeWASDKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( providedOptions?: MoveMoleculeWASDKeyboardHelpSectionOptions ) {

    const options = optionize<MoveMoleculeWASDKeyboardHelpSectionOptions, SelfOptions, KeyboardHelpSectionOptions>()( {
      // no additional options
    }, providedOptions );

    // Rotate molecule - using HotkeyData for arrow keys and WASD
    const rotateMoleculeHotkeyData = new HotkeyData( {
      keyStringProperties: [
        [ 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown' ],
        [ 'w', 'a', 's', 'd' ]
      ],
      keyboardHelpDialogLabelStringProperty: MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateMoleculeWASDStringProperty,
      keyboardHelpDialogPDOMLabelStringProperty: MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateMoleculeWASDDescriptionStringProperty
    } );

    // Rotate in smaller steps - using HotkeyData with shift modifier
    const rotateInSmallerStepsHotkeyData = new HotkeyData( {
      keyStringProperties: [
        [ 'shift+arrowLeft', 'shift+arrowRight', 'shift+arrowUp', 'shift+arrowDown' ],
        [ 'shift+w', 'shift+a', 'shift+s', 'shift+d' ]
      ],
      keyboardHelpDialogLabelStringProperty: MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateInSmallerStepsWASDStringProperty,
      keyboardHelpDialogPDOMLabelStringProperty: MoleculePolarityFluent.a11y.common.keyboardHelpContent.rotateInSmallerStepsWASDDescriptionStringProperty
    } );

    const rows = [
      KeyboardHelpSectionRow.fromHotkeyData( rotateMoleculeHotkeyData ),
      KeyboardHelpSectionRow.fromHotkeyData( rotateInSmallerStepsHotkeyData )
    ];

    super( MoleculePolarityFluent.a11y.common.keyboardHelpContent.moveMoleculeStringProperty, rows, options );
  }
}

moleculePolarity.register( 'MoveMoleculeWASDKeyboardHelpSection', MoveMoleculeWASDKeyboardHelpSection );
