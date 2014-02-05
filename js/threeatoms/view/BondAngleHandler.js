// Copyright 2002-2014, University of Colorado Boulder

/**
 * Drag handler for manipulating a bond angle.
 * The atom being dragged is popped to the front.
 * A pair of arrows indicating the direction of drag are shown when the mouse enters the atom.
 * When the drag begins, these arrows are made invisible.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Molecule} molecule angle is relative to this molecule's location, and we pause any animation of this molecule while dragging
   * @param {Property<Number>} bondAngleProperty property that this handler modifies
   * @param {Node} atomNode atom that is being dragged
   * @param {BondAngleArrowsNode} arrowsNode arrows that indicate direction of dragging
   * @constructor
   */
  function BondAngleHandler( molecule, bondAngleProperty, atomNode, arrowsNode ) {

    var previousAngle = 0;

    // Find the angle about the molecule's location.
    var getAngle = function( event ) {
      var point = atomNode.getParent().globalToLocalPoint( event.pointer.point );
      return new Vector2( point.x - molecule.location.x, point.y - molecule.location.y ).angle();
    };

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      start: function( event ) {
        molecule.dragging = true;
        atomNode.moveToFront();
        arrowsNode.visible = false;
        previousAngle = getAngle( event );
      },

      drag: function( event ) {
        var currentAngle = getAngle( event );
        bondAngleProperty.set( bondAngleProperty.get() + currentAngle - previousAngle );
        previousAngle = currentAngle;
      },

      end: function( event ) {
        molecule.dragging = false;
      }
    } );

    this.enter = function( event ) {
      if ( !molecule.dragging ) {
        arrowsNode.visible = true;
      }
    };

    this.exit = function( event ) {
      console.log( 'exit' );
      arrowsNode.visible = false;
    };
  }

  return inherit( SimpleDragHandler, BondAngleHandler );
} );