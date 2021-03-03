// Copyright 2014-2021, University of Colorado Boulder

/**
 * Drag handler for manipulating a bond angle.
 * The atom being dragged is popped to the front.
 * A pair of arrows indicating the direction of drag are shown when the mouse enters the atom.
 * When the drag begins, these arrows are made invisible.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Molecule from '../../common/model/Molecule.js';
import moleculePolarity from '../../moleculePolarity.js';

class BondAngleDragListener extends DragListener {

  /**
   * @param {Molecule} molecule
   * @param {Property.<number>} bondAngleProperty - Property that this listener modifies
   * @param {Node} targetNode
   * @param {Object} [options]
   */
  constructor( molecule, bondAngleProperty, targetNode, options ) {
    assert && assert( molecule instanceof Molecule, 'invalid molecule' );
    assert && AssertUtils.assertPropertyOf( bondAngleProperty, 'number' );
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
      molecule.dragging = true;
      targetNode.moveToFront();
      previousAngle = getAngle( event );
    };

    assert && assert( !options.drag, 'BondAngleDragListener sets drag' );
    options.drag = event => {
      const currentAngle = getAngle( event );
      bondAngleProperty.set( bondAngleProperty.get() + currentAngle - previousAngle );
      previousAngle = currentAngle;
    };

    assert && assert( !options.end, 'BondAngleDragListener sets end' );
    options.end = event => {
      molecule.dragging = false;
    };

    super( options );
  }
}

moleculePolarity.register( 'BondAngleDragListener', BondAngleDragListener );

export default BondAngleDragListener;