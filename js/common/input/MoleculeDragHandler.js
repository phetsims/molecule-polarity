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
    
    var startAngle; // angle between the pointer and the molecule when the drag started

    var getAngle = function( event ) {
      var point = event.currentTarget.globalToLocalPoint( event.pointer.point );
      return new Vector2( point.x - molecule.location.x, point.y - molecule.location.y ).angle();
    };

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      start: function( event ) {
        molecule.dragging = true;
        startAngle = getAngle( event );
      },

      drag: function( event ) {
        molecule.angleProperty.set( getAngle( event ) - startAngle );
      },

      end: function( event ) {
        molecule.dragging = false;
      }
    } );
  }
  
  return inherit( SimpleDragHandler, MoleculeDragHandler );
});
