// Copyright 2014-2023, University of Colorado Boulder

/**
 * Drag handler for manipulating a bond angle.
 * The atom being dragged is popped to the front.
 * A pair of arrows indicating the direction of drag are shown when the mouse enters the atom.
 * When the drag begins, these arrows are made invisible.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { DragListener, DragListenerOptions, Node, PressedDragListener, SceneryEvent } from '../../../../scenery/js/imports.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Molecule from '../../common/model/Molecule.js';
import normalizeAngle from '../../common/model/normalizeAngle.js';
import moleculePolarity from '../../moleculePolarity.js';

type SelfOptions = EmptySelfOptions;

type BondAngleDragListenerOptions = SelfOptions &
  PickRequired<DragListenerOptions<PressedDragListener>, 'tandem'> &
  //TODO https://github.com/phetsims/axon/issues/412 until fixed, phetioDocumentation is ignored
  //PickOptional<DragListenerOptions<PressedDragListener>, 'phetioDocumentation'>
  PickOptional<PhetioObjectOptions, 'phetioDocumentation'>;

export default class BondAngleDragListener extends DragListener {

  public constructor( molecule: Molecule,
                      bondAngleProperty: NumberProperty,
                      targetNode: Node,
                      providedOptions: BondAngleDragListenerOptions ) {

    const options = optionize<BondAngleDragListenerOptions, SelfOptions, DragListenerOptions<PressedDragListener>>()( {

      // DragListenerOptions
      allowTouchSnag: true
    }, providedOptions );

    let previousAngle = 0;

    // Finds the angle (in radians) about the molecule's position.
    const getAngle = ( event: SceneryEvent ) => {
      const parent = targetNode.getParent()!;
      assert && assert( parent );
      const point = parent.globalToLocalPoint( event.pointer.point );
      return new Vector2( point.x - molecule.position.x, point.y - molecule.position.y ).angle;
    };

    options.start = event => {
      molecule.isDraggingProperty.value = true;
      targetNode.moveToFront();
      previousAngle = getAngle( event );
    };

    const bondAngleRange = bondAngleProperty.range;

    options.drag = event => {
      const currentAngle = getAngle( event );
      bondAngleProperty.value =
        normalizeAngle( bondAngleProperty.value + currentAngle - previousAngle, bondAngleRange.min );
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

moleculePolarity.register( 'BondAngleDragListener', BondAngleDragListener );