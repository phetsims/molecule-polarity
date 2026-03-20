// Copyright 2026, University of Colorado Boulder

/**
 * Keyboard drag listener for molecule rotation.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

import SoundKeyboardDragListener from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import TProperty from '../../../../axon/js/TProperty.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const SOUND_NOTIFICATION_PERIOD = 4;

export default class MoleculeKeyboardRotationListener extends SoundKeyboardDragListener {
  public constructor(
    moleculeQuaternionProperty: TProperty<THREE.Quaternion>,
    moleculeNode: Node,
    tandem: Tandem
  ) {
    let lastDirection: 'left' | 'right' | 'up' | 'down' | null = null;

    // We'll play sounds every SOUND_NOTIFICATION_PERIOD for fresh keypresses,
    // see https://github.com/phetsims/molecule-polarity/issues/294
    let count = 0;

    super( {
      dragDelta: Math.PI / 16,
      shiftDragDelta: Math.PI / 32,
      moveOnHoldInterval: 100,
      start: ( event, listener ) => {

        // Detect directions
        const x = listener.modelDelta.x;
        const y = listener.modelDelta.y;

        // Decision was made to not "worry" about cases where vertical and horizontal is changing at the same time.
        const currentDirection = ( x !== 0 ? ( x > 0 ? 'right' : 'left' ) : null ) ?? ( y !== 0 ? ( y > 0 ? 'down' : 'up' ) : null );
        const changed = currentDirection !== lastDirection;
        const repeatedSound = count === 0;

        if ( changed ) {
          count = 0;
        }

        if ( currentDirection !== null ) {
          if ( changed || repeatedSound ) {
            lastDirection = currentDirection;
            moleculeNode.addAccessibleObjectResponse(
              MoleculePolarityFluent.a11y.realMoleculesScreen.draggableMolecule.objectResponses.format(
                {
                  direction: currentDirection
                }
              ) );
          }

          count = ( count + 1 ) % SOUND_NOTIFICATION_PERIOD;
        }
      },
      drag: ( event, listener ) => {
        // Apply rotation
        const newQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler( listener.modelDelta.y, listener.modelDelta.x, 0 )
        );
        newQuaternion.multiply( moleculeQuaternionProperty.value );
        moleculeQuaternionProperty.value = newQuaternion;
      },
      tandem: tandem
    } );
  }
}
