// Copyright 2014-2023, University of Colorado Boulder

/**
 * MoleculeAngleDragListener is the drag listener for manipulating orientation of a molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { DragListener, DragListenerOptions, Node, PressedDragListener, SceneryEvent } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import Molecule from '../model/Molecule.js';
import normalizeAngle from '../model/normalizeAngle.js';

type SelfOptions = EmptySelfOptions;

type MoleculeAngleDragListenerOptions = SelfOptions &
  PickRequired<DragListenerOptions<PressedDragListener>, 'tandem'>;

export default class MoleculeAngleDragListener extends DragListener {

  /**
   * @param molecule
   * @param relativeNode - angles are computed relative to this Node
   * @param [providedOptions]
   */
  public constructor( molecule: Molecule, relativeNode: Node, providedOptions: MoleculeAngleDragListenerOptions ) {

    const options = optionize<MoleculeAngleDragListenerOptions, SelfOptions, DragListenerOptions<PressedDragListener>>()( {

      // DragListenerOptions
      allowTouchSnag: true,
      isDisposable: false
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
}

moleculePolarity.register( 'MoleculeAngleDragListener', MoleculeAngleDragListener );