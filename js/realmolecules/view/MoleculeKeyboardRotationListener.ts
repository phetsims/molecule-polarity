// Copyright 2026, University of Colorado Boulder

/**
 * Keyboard drag listener for molecule rotation.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import SoundKeyboardDragListener from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import moleculePolarity from '../../moleculePolarity.js';
import TProperty from '../../../../axon/js/TProperty.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class MoleculeKeyboardRotationListener extends SoundKeyboardDragListener {
  public constructor(
    moleculeQuaternionProperty: TProperty<THREE.Quaternion>,
    moleculeNode: Node,
    tandem: Tandem
  ) {
    let lastHorizontalDirection: 'left' | 'right' | null = null;
    let lastVerticalDirection: 'up' | 'down' | null = null;

    super( {
      dragDelta: Math.PI / 16,
      shiftDragDelta: Math.PI / 32,
      moveOnHoldInterval: 100,
      drag: ( event, listener ) => {
        // Apply rotation
        const newQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler( listener.modelDelta.y, listener.modelDelta.x, 0 )
        );
        newQuaternion.multiply( moleculeQuaternionProperty.value );
        moleculeQuaternionProperty.value = newQuaternion;

        // Detect directions
        const x = listener.modelDelta.x;
        const y = listener.modelDelta.y;

        const currentHorizontal: 'left' | 'right' | null = x !== 0 ? ( x > 0 ? 'right' : 'left' ) : null;
        const currentVertical: 'up' | 'down' | null = y !== 0 ? ( y > 0 ? 'down' : 'up' ) : null;

        if ( currentHorizontal !== null && currentHorizontal !== lastHorizontalDirection ) {
          lastHorizontalDirection = currentHorizontal;
          moleculeNode.addAccessibleObjectResponse(
            MoleculePolarityFluent.a11y.realMoleculesScreen.draggableMolecule.objectResponses.format(
              {
                direction: currentHorizontal
              }
            ) );
        }

        if ( currentVertical !== null && currentVertical !== lastVerticalDirection ) {
          lastVerticalDirection = currentVertical;
          moleculeNode.addAccessibleObjectResponse(
            MoleculePolarityFluent.a11y.realMoleculesScreen.draggableMolecule.objectResponses.format(
              {
                direction: currentVertical
              }
            ) );
        }
      },
      tandem: tandem
    } );
  }
}

moleculePolarity.register( 'MoleculeKeyboardRotationListener', MoleculeKeyboardRotationListener );