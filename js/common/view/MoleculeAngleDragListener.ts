// Copyright 2014-2023, University of Colorado Boulder

/**
 * MoleculeAngleDragListener is the drag listener for manipulating orientation of a molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { DragListener, DragListenerOptions, Node, PressedDragListener, SceneryEvent } from '../../../../scenery/js/imports.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import moleculePolarity from '../../moleculePolarity.js';
import Molecule from '../model/Molecule.js';
import normalizeAngle from '../model/normalizeAngle.js';

type SelfOptions = EmptySelfOptions;

type MoleculeAngleDragListenerOptions = SelfOptions &
  PickRequired<DragListenerOptions<PressedDragListener>, 'tandem'> &
  //TODO https://github.com/phetsims/axon/issues/412 until fixed, phetioDocumentation is ignored
  //PickOptional<DragListenerOptions<PressedDragListener>, 'phetioDocumentation'>
  PickOptional<PhetioObjectOptions, 'phetioDocumentation'>;

export default class MoleculeAngleDragListener extends DragListener {

  /**
   * @param molecule
   * @param relativeNode - angles are computed relative to this Node
   * @param [providedOptions]
   */
  public constructor( molecule: Molecule, relativeNode: Node, providedOptions: MoleculeAngleDragListenerOptions ) {

    const options = optionize<MoleculeAngleDragListenerOptions, SelfOptions, DragListenerOptions<PressedDragListener>>()( {

      // DragListenerOptions
      allowTouchSnag: true
    }, providedOptions );

    let previousAngle: number; // angle between the pointer and the molecule when the drag started

    // Gets the angle (in radians) of the pointer, relative to relativeNode.
    const getAngle = ( event: SceneryEvent ) => {
      const point = relativeNode.globalToParentPoint( event.pointer.point );
      return new Vector2( point.x - molecule.position.x, point.y - molecule.position.y ).angle;
    };

    options.start = event => {
      molecule.isDraggingProperty.value = true;
      previousAngle = getAngle( event );
    };

    const angleRange = molecule.angleProperty.range;

    options.drag = event => {
      const currentAngle = getAngle( event );
      molecule.angleProperty.value =
        normalizeAngle( molecule.angleProperty.value + currentAngle - previousAngle, angleRange.min );
      previousAngle = currentAngle;
    };

    options.end = () => {
      molecule.isDraggingProperty.value = false;
    };

    super( options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'MoleculeAngleDragListener', MoleculeAngleDragListener );