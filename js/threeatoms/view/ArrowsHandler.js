// Copyright 2014-2015, University of Colorado Boulder

/**
 * Drag handler for controlling visibility of arrows that appear around atoms as interactivity cues.
 * When a drag begins, these arrows are made invisible.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  /**
   * @param {Node} arrowsNode
   * @constructor
   */
  function ArrowsHandler( arrowsNode ) {

    this.enter = function( event ) {
      arrowsNode.visible = !event.pointer.isDown;
    };

    this.exit = function( event ) {
      arrowsNode.visible = false;
    };

    this.move = function( event ) {
      if ( event.pointer.isDown ) {
        arrowsNode.visible = false;
      }
    };
  }

  return ArrowsHandler;
} );