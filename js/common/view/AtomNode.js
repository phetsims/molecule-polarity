// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation of an atom.
 * Controls its own position, so clients should not attempt to position it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  function AtomNode( atom ) {

    var thisNode = this;
    Node.call( this );

    // nodes
    var sphereNode = new ShadedSphereNode( atom.diameter, { mainColor: atom.color } );
    var textNode = new Text( atom.name, new PhetFont( { size: 32, weight: 'bold' } ) );

    // rendering order
    thisNode.addChild( sphereNode );
    thisNode.addChild( textNode );

    // layout
    textNode.centerX = sphereNode.centerX;
    textNode.centerY = sphereNode.centerY;

    // sync location with model
    atom.locationProperty.linkAttribute( thisNode, 'translation' );
  }

  return inherit( Node, AtomNode );
} );