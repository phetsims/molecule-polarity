// Copyright 2026, University of Colorado Boulder

/**
 * MPHotkeyData provides static HotkeyData instances for keyboard help in Molecule Polarity.
 * This centralizes the hotkey definitions for reuse across keyboard help sections.
 *
 * @author Copilot
 * @author Agustín Vallejo
 */

import HotkeyData from '../../../../../scenery/js/input/HotkeyData.js';
import moleculePolarity from '../../../moleculePolarity.js';
import MoleculePolarityFluent from '../../../MoleculePolarityFluent.js';

export default class MPHotkeyData {

  public constructor() {
    // no-op
  }

  /**
   * HotkeyData for rotating molecule with arrow keys (left/right or up/down)
   */
  public static readonly ROTATE_MOLECULE = new HotkeyData( {
    keys: [ 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown' ],
    keyboardHelpDialogLabelStringProperty: MoleculePolarityFluent.keyboardHelpContent.rotateMoleculeStringProperty,
    repoName: moleculePolarity.name
  } );

  /**
   * HotkeyData for rotating molecule in smaller steps with shift + arrow keys
   */
  public static readonly ROTATE_MOLECULE_SMALLER_STEPS = new HotkeyData( {
    keys: [
      'shift+arrowLeft', 'shift+arrowRight', 'shift+arrowUp', 'shift+arrowDown'
    ],
    keyboardHelpDialogLabelStringProperty: MoleculePolarityFluent.keyboardHelpContent.rotateInSmallerStepsStringProperty,
    repoName: moleculePolarity.name
  } );

  /**
   * HotkeyData for moving atoms A and C with arrow keys (Three Atoms screen)
   */
  public static readonly MOVE_ATOM_A_AND_C = new HotkeyData( {
    keys: [ 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown' ],
    keyboardHelpDialogLabelStringProperty: MoleculePolarityFluent.keyboardHelpContent.moveAtomAAndCStringProperty,
    repoName: moleculePolarity.name
  } );

  /**
   * HotkeyData for rotating or moving in smaller steps with shift + arrow keys (Three Atoms screen)
   */
  public static readonly ROTATE_OR_MOVE_SMALLER_STEPS = new HotkeyData( {
    keys: [
      'shift+arrowLeft', 'shift+arrowRight', 'shift+arrowUp', 'shift+arrowDown'
    ],
    keyboardHelpDialogLabelStringProperty: MoleculePolarityFluent.keyboardHelpContent.rotateOrMoveInSmallerStepsStringProperty,
    repoName: moleculePolarity.name
  } );

  /**
   * HotkeyData for rotating molecule with arrow keys or WASD keys (Real Molecules screen)
   */
  public static readonly ROTATE_MOLECULE_WASD = new HotkeyData( {
    keys: [
      'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown', 'w', 'a', 's', 'd'
    ],
    keyboardHelpDialogLabelStringProperty: MoleculePolarityFluent.keyboardHelpContent.rotateMoleculeWASDStringProperty,
    repoName: moleculePolarity.name
  } );

  /**
   * HotkeyData for rotating molecule in smaller steps with shift + arrow/WASD keys (Real Molecules screen)
   */
  public static readonly ROTATE_MOLECULE_WASD_SMALLER_STEPS = new HotkeyData( {
    keys: [
      'shift+arrowLeft', 'shift+arrowRight', 'shift+arrowUp', 'shift+arrowDown', 'shift+w', 'shift+a', 'shift+s', 'shift+d'
    ],
    keyboardHelpDialogLabelStringProperty: MoleculePolarityFluent.keyboardHelpContent.rotateInSmallerStepsWASDStringProperty,
    repoName: moleculePolarity.name
  } );
}

moleculePolarity.register( 'MPHotkeyData', MPHotkeyData );
