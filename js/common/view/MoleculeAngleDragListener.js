// Copyright 2014-2021, University of Colorado Boulder

/**
 * Drag handler for manipulating orientation of a molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import Molecule from '../model/Molecule.js';

class MoleculeAngleDragListener extends DragListener {

  /**
   * @param {Molecule} molecule
   * @param {Node} relativeNode - angles are computed relative to this Node
   * @param {Object} [options]
   */
  constructor( molecule, relativeNode, options ) {
    assert && assert( molecule instanceof Molecule, 'invalid molecule' );
    assert && assert( relativeNode instanceof Node, 'invalid relativeNode' );

    options = merge( {
      allowTouchSnag: true,
      tandem: Tandem.REQUIRED
    }, options );

    let previousAngle; // angle between the pointer and the molecule when the drag started

    /**
     * Gets the angle of the pointer relative to relativeNode.
     * @param {SceneryEvent} event
     * @returns {number} angle in radians
     */
    const getAngle = event => {
      const point = relativeNode.globalToParentPoint( event.pointer.point );
      return new Vector2( point.x - molecule.position.x, point.y - molecule.position.y ).angle;
    };

    assert && assert( !options.start, 'MoleculeAngleDragListener sets start' );
    options.start = event => {
      molecule.isDraggingProperty.value = true;
      previousAngle = getAngle( event );
    };

    assert && assert( !options.drag, 'MoleculeAngleDragListener sets drag' );
    options.drag = event => {
      const currentAngle = getAngle( event );
      molecule.angleProperty.value = molecule.angleProperty.value + currentAngle - previousAngle;
      previousAngle = currentAngle;
    };

    assert && assert( !options.end, 'MoleculeAngleDragListener sets end' );
    options.end = event => {
      molecule.isDraggingProperty.value = false;
    };

    super( options );
  }
}

moleculePolarity.register( 'MoleculeAngleDragListener', MoleculeAngleDragListener );

export default MoleculeAngleDragListener;