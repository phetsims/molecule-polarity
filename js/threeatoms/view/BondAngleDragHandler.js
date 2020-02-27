// Copyright 2014-2020, University of Colorado Boulder

/**
 * Drag handler for manipulating a bond angle.
 * The atom being dragged is popped to the front.
 * A pair of arrows indicating the direction of drag are shown when the mouse enters the atom.
 * When the drag begins, these arrows are made invisible.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import SimpleDragHandler from '../../../../scenery/js/input/SimpleDragHandler.js';
import moleculePolarity from '../../moleculePolarity.js';

/**
 * @param {Molecule} molecule
 * @param {Property.<number>} bondAngleProperty - Property that this handler modifies
 * @constructor
 */
function BondAngleDragHandler( molecule, bondAngleProperty ) {

  let previousAngle = 0;

  /**
   * Finds the angle about the molecule's position.
   * @param {SceneryEvent} event
   * @returns {number} angle in radians
   */
  const getAngle = function( event ) {
    const point = event.currentTarget.getParent().globalToLocalPoint( event.pointer.point );
    return new Vector2( point.x - molecule.position.x, point.y - molecule.position.y ).angle;
  };

  SimpleDragHandler.call( this, {

    allowTouchSnag: true,

    start: function( event ) {
      molecule.dragging = true;
      event.currentTarget.moveToFront();
      previousAngle = getAngle( event );
    },

    drag: function( event ) {
      const currentAngle = getAngle( event );
      bondAngleProperty.set( bondAngleProperty.get() + currentAngle - previousAngle );
      previousAngle = currentAngle;
    },

    end: function( event ) {
      molecule.dragging = false;
    }
  } );
}

moleculePolarity.register( 'BondAngleDragHandler', BondAngleDragHandler );

inherit( SimpleDragHandler, BondAngleDragHandler );
export default BondAngleDragHandler;