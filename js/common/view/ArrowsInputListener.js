// Copyright 2014-2017, University of Colorado Boulder

/**
 * Input listener for controlling visibility of arrows that appear around atoms as interactivity cues.
 * When a drag begins, these arrows are made invisible.
 * Conforms to scenery's input listener interface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );

  /**
   * @param {Node} arrowsNode
   * @constructor
   */
  function ArrowsInputListener( arrowsNode ) {

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

  moleculePolarity.register( 'ArrowsInputListener', ArrowsInputListener );

  return ArrowsInputListener;
} );