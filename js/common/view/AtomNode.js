// Copyright 2014-2015, University of Colorado Boulder

/**
 * Visual representation of an atom.
 * Controls its own position, so clients should not attempt to position it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  function AtomNode( atom ) {

    Node.call( this );

    // nodes
    var sphereNode = new ShadedSphereNode( atom.diameter, { mainColor: atom.color } );
    var textNode = new Text( atom.name, new PhetFont( { size: 32, weight: 'bold' } ) );

    // rendering order
    this.addChild( sphereNode );
    this.addChild( textNode );

    // layout
    textNode.centerX = sphereNode.centerX;
    textNode.centerY = sphereNode.centerY;

    // sync location with model
    atom.locationProperty.linkAttribute( this, 'translation' );
  }

  moleculePolarity.register( 'AtomNode', AtomNode );

  return inherit( Node, AtomNode );
} );