// Copyright 2014-2020, University of Colorado Boulder

/**
 * Drag handler for manipulating orientation of a molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import moleculePolarity from '../../moleculePolarity.js';

class MoleculeAngleDragListener extends DragListener {

  /**
   * @param {Molecule} molecule
   * @param {Node} relativeNode - angles are computed relative to this Node
   */
  constructor( molecule, relativeNode ) {

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

    super( {

      allowTouchSnag: true,

      start: event => {
        molecule.dragging = true;
        previousAngle = getAngle( event );
      },

      drag: event => {
        const currentAngle = getAngle( event );
        molecule.angleProperty.set( molecule.angleProperty.get() + currentAngle - previousAngle );
        previousAngle = currentAngle;
      },

      end: event => {
        molecule.dragging = false;
      }
    } );
  }
}

moleculePolarity.register( 'MoleculeAngleDragListener', MoleculeAngleDragListener );

export default MoleculeAngleDragListener;