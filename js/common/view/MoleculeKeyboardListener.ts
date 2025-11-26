// Copyright 2025, University of Colorado Boulder

/**
 * MoleculeKeyboardListener is the keyboard listener for manipulating orientation of a molecule.
 *
 * @author Agustín Vallejo
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener, { KeyboardListenerOptions } from '../../../../scenery/js/listeners/KeyboardListener.js';
import moleculePolarity from '../../moleculePolarity.js';

type SelfOptions = EmptySelfOptions;

type MoleculeKeyboardListenerOptions = SelfOptions &
  WithRequired<KeyboardListenerOptions<OneKeyStroke[]>, 'tandem'>;

const NAVIGATION_KEYS: OneKeyStroke[] = [ 'arrowRight', 'arrowLeft', 'a', 'd' ];

export default class MoleculeKeyboardListener extends KeyboardListener<OneKeyStroke[]> {

  public constructor( angleProperty: Property<number>, providedOptions: MoleculeKeyboardListenerOptions ) {

    const options = optionize<MoleculeKeyboardListenerOptions, SelfOptions, KeyboardListenerOptions<OneKeyStroke[]>>()( {

      keys: NAVIGATION_KEYS,
      isDisposable: false,
      fireOnHold: true,

      fire: ( event, keysPressed ) => {
        if ( keysPressed === 'arrowRight' || keysPressed === 'd' ) {
          // rotate clockwise
          let newAngle = angleProperty.value + Math.PI / 4;
          newAngle = newAngle > Math.PI ? newAngle - 2 * Math.PI : newAngle;
          angleProperty.value = newAngle;
        }
        else if ( keysPressed === 'arrowLeft' || keysPressed === 'a' ) {
          // rotate counter-clockwise
          let newAngle = angleProperty.value - Math.PI / 4;
          newAngle = newAngle < -Math.PI ? newAngle + 2 * Math.PI : newAngle;
          angleProperty.value = newAngle;
        }
      }
    }, providedOptions );

    super( options );
  }
}

moleculePolarity.register( 'MoleculeKeyboardListener', MoleculeKeyboardListener );