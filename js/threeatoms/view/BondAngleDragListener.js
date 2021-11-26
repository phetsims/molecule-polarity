// Copyright 2014-2021, University of Colorado Boulder

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
import merge from '../../../../phet-core/js/merge.js';
import { DragListener } from '../../../../scenery/js/imports.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Molecule from '../../common/model/Molecule.js';
import normalizeAngle from '../../common/model/normalizeAngle.js';
import moleculePolarity from '../../moleculePolarity.js';

class BondAngleDragListener extends DragListener {

  /**
   * @param {Molecule} molecule
   * @param {NumberProperty} bondAngleProperty - Property that this listener modifies
   * @param {Node} targetNode
   * @param {Object} [options]
   */
  constructor( molecule, bondAngleProperty, targetNode, options ) {
    assert && assert( molecule instanceof Molecule, 'invalid molecule' );
    assert && assert( bondAngleProperty instanceof NumberProperty, 'invalid bondAngleProperty' );
    assert && assert( bondAngleProperty.range, 'bondAngleProperty.range is required' );
    assert && assert( targetNode instanceof Node, 'invalid targetNode' );

    options = merge( {
      allowTouchSnag: true,
      tandem: Tandem.REQUIRED
    }, options );

    let previousAngle = 0;

    /**
     * Finds the angle about the molecule's position.
     * @param {SceneryEvent} event
     * @returns {number} angle in radians
     */
    const getAngle = event => {
      const point = targetNode.getParent().globalToLocalPoint( event.pointer.point );
      return new Vector2( point.x - molecule.position.x, point.y - molecule.position.y ).angle;
    };

    assert && assert( !options.start, 'BondAngleDragListener sets start' );
    options.start = event => {
      molecule.isDraggingProperty.value = true;
      targetNode.moveToFront();
      previousAngle = getAngle( event );
    };

    assert && assert( !options.drag, 'BondAngleDragListener sets drag' );
    options.drag = event => {
      const currentAngle = getAngle( event );
      bondAngleProperty.value =
        normalizeAngle( bondAngleProperty.value + currentAngle - previousAngle, bondAngleProperty.range.min );
      previousAngle = currentAngle;
    };

    assert && assert( !options.end, 'BondAngleDragListener sets end' );
    options.end = event => {
      molecule.isDraggingProperty.value = false;
    };

    super( options );
  }
}

moleculePolarity.register( 'BondAngleDragListener', BondAngleDragListener );
export default BondAngleDragListener;