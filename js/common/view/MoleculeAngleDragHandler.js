// Copyright 2014-2020, University of Colorado Boulder

/**
 * Drag handler for manipulating orientation of a molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import SimpleDragHandler from '../../../../scenery/js/input/SimpleDragHandler.js';
import moleculePolarity from '../../moleculePolarity.js';

/**
 * @param {Molecule} molecule
 * @param {Node} relativeNode - angles are computed relative to this Node
 * @constructor
 */
function MoleculeAngleDragHandler( molecule, relativeNode ) {

  let previousAngle; // angle between the pointer and the molecule when the drag started

  /**
   * Gets the angle of the pointer relative to relativeNode.
   * @param {SceneryEvent} event
   * @returns {number} angle in radians
   */
  const getAngle = function( event ) {
    const point = relativeNode.globalToParentPoint( event.pointer.point );
    return new Vector2( point.x - molecule.position.x, point.y - molecule.position.y ).angle;
  };

  SimpleDragHandler.call( this, {

    allowTouchSnag: true,

    start: function( event ) {
      molecule.dragging = true;
      previousAngle = getAngle( event );
    },

    drag: function( event ) {
      const currentAngle = getAngle( event );
      molecule.angleProperty.set( molecule.angleProperty.get() + currentAngle - previousAngle );
      previousAngle = currentAngle;
    },

    end: function( event ) {
      molecule.dragging = false;
    }
  } );
}

moleculePolarity.register( 'MoleculeAngleDragHandler', MoleculeAngleDragHandler );

inherit( SimpleDragHandler, MoleculeAngleDragHandler );
export default MoleculeAngleDragHandler;