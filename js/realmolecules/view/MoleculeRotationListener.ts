// Copyright 2026, University of Colorado Boulder

/**
 * Main pointer drag listener for molecule rotation.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import moleculePolarity from '../../moleculePolarity.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import SceneryEvent from '../../../../scenery/js/input/SceneryEvent.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

export default class MoleculeRotationListener {

  private grabSound = sharedSoundPlayers.get( 'grab' );
  private releaseSound = sharedSoundPlayers.get( 'release' );

  // We'll want the rotation to be readable to determine whether focus highlights are available.
  public isRotatingProperty = new BooleanProperty( false );

  public constructor(
    private moleculeQuaternionProperty: TProperty<THREE.Quaternion>,
    private activeScaleProperty: TReadOnlyProperty<number>
  ) {

  }

  public down( event: SceneryEvent ): void {
    if ( !event.canStartPress() ) { return; }

    // if we are already rotating the entire molecule, no more drags can be handled
    if ( this.isRotatingProperty.value ) {
      return;
    }
    this.isRotatingProperty.value = true;

    const pointer = event.pointer;
    const lastGlobalPoint = pointer.point.copy();

    const onEndDrag = () => {
      if ( this.isRotatingProperty.value ) {
        this.isRotatingProperty.value = false;
        pointer.removeInputListener( pointerListener );
        pointer.cursor = null;

        this.releaseSound.play();
      }
    };

    const pointerListener = {
      // end drag on either up or cancel (not supporting full cancel behavior)
      up: onEndDrag,
      cancel: onEndDrag,
      interrupt: onEndDrag,

      move: () => {
        const delta = pointer.point.minus( lastGlobalPoint );
        lastGlobalPoint.set( pointer.point );

        const scale = 0.007 / this.activeScaleProperty.value; // tuned constant for acceptable drag motion
        const newQuaternion = new THREE.Quaternion().setFromEuler( new THREE.Euler( delta.y * scale, delta.x * scale, 0 ) );
        newQuaternion.multiply( this.moleculeQuaternionProperty.value );
        this.moleculeQuaternionProperty.value = newQuaternion;
      }
    };

    pointer.cursor = 'pointer';

    // attach the listener so that it can be interrupted from pan and zoom operations
    pointer.addInputListener( pointerListener, true );

    this.grabSound.play();
  }
}

moleculePolarity.register( 'MoleculeRotationListener', MoleculeRotationListener );