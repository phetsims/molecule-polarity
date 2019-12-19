// Copyright 2014-2019, University of Colorado Boulder

/**
 * Drag handler for manipulating a bond angle.
 * The atom being dragged is popped to the front.
 * A pair of arrows indicating the direction of drag are shown when the mouse enters the atom.
 * When the drag begins, these arrows are made invisible.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Molecule} molecule
   * @param {Property.<number>} bondAngleProperty - Property that this handler modifies
   * @constructor
   */
  function BondAngleDragHandler( molecule, bondAngleProperty ) {

    let previousAngle = 0;

    /**
     * Finds the angle about the molecule's location.
     * @param {SceneryEvent} event
     * @returns {number} angle in radians
     */
    const getAngle = function( event ) {
      const point = event.currentTarget.getParent().globalToLocalPoint( event.pointer.point );
      return new Vector2( point.x - molecule.location.x, point.y - molecule.location.y ).angle;
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

  return inherit( SimpleDragHandler, BondAngleDragHandler );
} );