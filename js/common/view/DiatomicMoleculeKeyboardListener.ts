// Copyright 2025, University of Colorado Boulder

/**
 * DiatomicMoleculeKeyboardListener is the keyboard listener for manipulating orientation of a molecule.
 *
 * @author Agustín Vallejo
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener, { KeyboardListenerOptions } from '../../../../scenery/js/listeners/KeyboardListener.js';
import moleculePolarity from '../../moleculePolarity.js';
import Molecule from '../model/Molecule.js';

type SelfOptions = EmptySelfOptions;

type DiatomicMoleculeKeyboardListenerOptions = SelfOptions &
  WithRequired<KeyboardListenerOptions<OneKeyStroke[]>, 'tandem'>;

const NAVIGATION_KEYS: OneKeyStroke[] = [ 'arrowRight', 'arrowLeft', 'a', 'd' ];

export default class DiatomicMoleculeKeyboardListener extends KeyboardListener<OneKeyStroke[]> {

  /**
   * @param molecule
   */
  public constructor( molecule: Molecule, providedOptions: DiatomicMoleculeKeyboardListenerOptions ) {

    const options = optionize<DiatomicMoleculeKeyboardListenerOptions, SelfOptions, KeyboardListenerOptions<OneKeyStroke[]>>()( {

      keys: NAVIGATION_KEYS,
      isDisposable: false,
      fireOnHold: true,

      fire: ( event, keysPressed ) => {
        if ( keysPressed === 'arrowRight' || keysPressed === 'd' ) {
          // rotate clockwise
          let newAngle = molecule.angleProperty.value + Math.PI / 4;
          newAngle = newAngle > Math.PI ? newAngle - 2 * Math.PI : newAngle;
          molecule.angleProperty.value = newAngle;
        }
        else if ( keysPressed === 'arrowLeft' || keysPressed === 'a' ) {
          // rotate counter-clockwise
          let newAngle = molecule.angleProperty.value - Math.PI / 4;
          newAngle = newAngle < -Math.PI ? newAngle + 2 * Math.PI : newAngle;
          molecule.angleProperty.value = newAngle;
        }
      }
    }, providedOptions );

    super( options );
  }
}

moleculePolarity.register( 'DiatomicMoleculeKeyboardListener', DiatomicMoleculeKeyboardListener );