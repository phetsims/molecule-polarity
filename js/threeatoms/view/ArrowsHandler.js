// Copyright 2002-2014, University of Colorado Boulder

/**
 * Drag handler for controlling visibility of arrows that appear around atoms as interactivity cues.
 * When a drag begins, these arrows are made invisible.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var DownUpListener = require( 'SCENERY/input/DownUpListener' );

  /**
   * @param {Node} arrowsNode
   * @constructor
   */
  function ArrowsHandler( arrowsNode ) {

    DownUpListener.call( this ); // manages this.isDown

    this.enter = function( event ) {
      arrowsNode.visible = !this.isDown;
    };

    this.exit = function( event ) {
      arrowsNode.visible = false;
    };

    this.move = function( event ) {
      if ( this.isDown ) {
        arrowsNode.visible = false;
      }
    };
  }

  return inherit( DownUpListener, ArrowsHandler );
} );