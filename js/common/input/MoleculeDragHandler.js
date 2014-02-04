// Copyright 2002-2014, University of Colorado Boulder

/**
 * Drag handler for manipulating molecule angle.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define(function(require){
  'use strict';
  
  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Molecule} molecule
   * @constructor
   */
  function MoleculeDragHandler( molecule ) {
    
    var previousAngle; // rotations are computed as deltas between each event

    var getAngle = function( event ) {
      var point = event.currentTarget.globalToLocalPoint( event.pointer.point );
      return new Vector2( point.x - molecule.location.x, point.y - molecule.location.y ).angle();
    };

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      start: function( event ) {
        molecule.dragging = true;
        previousAngle = getAngle( event );
      },

      drag: function( event ) {
        var angle = getAngle( event );
        molecule.angleProperty.set( molecule.angleProperty.get() + angle - previousAngle );
        previousAngle = angle;
      },

      end: function( event ) {
        molecule.dragging = false;
      }
    } );
  }
  
  return inherit( SimpleDragHandler, MoleculeDragHandler );
});
