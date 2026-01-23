// Copyright 2026, University of Colorado Boulder

/**
 * MoveMoleculeWASDKeyboardHelpSection is the keyboard help section for rotating molecules using arrow keys or WASD keys.
 * This is used in the Real Molecules screen.
 *
 * @author Copilot
 * @author Agustín Vallejo
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import KeyboardHelpSection, { KeyboardHelpSectionOptions } from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MPHotkeyData from './MPHotkeyData.js';

type SelfOptions = EmptySelfOptions;
type MoveMoleculeWASDKeyboardHelpSectionOptions = SelfOptions & KeyboardHelpSectionOptions;

export default class MoveMoleculeWASDKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( providedOptions?: MoveMoleculeWASDKeyboardHelpSectionOptions ) {

    const options = optionize<MoveMoleculeWASDKeyboardHelpSectionOptions, SelfOptions, KeyboardHelpSectionOptions>()( {
      // no additional options
    }, providedOptions );

    const rows = [
      KeyboardHelpSectionRow.fromHotkeyData( MPHotkeyData.ROTATE_MOLECULE_WASD ),
      KeyboardHelpSectionRow.fromHotkeyData( MPHotkeyData.ROTATE_MOLECULE_WASD_SMALLER_STEPS )
    ];

    super( MoleculePolarityFluent.a11y.common.keyboardHelpContent.moveMoleculeStringProperty, rows, options );
  }
}

moleculePolarity.register( 'MoveMoleculeWASDKeyboardHelpSection', MoveMoleculeWASDKeyboardHelpSection );
