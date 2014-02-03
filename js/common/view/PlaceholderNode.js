// Copyright 2002-2014, University of Colorado Boulder

//TODO delete me when everything is fleshed out
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );

  function PlaceholderNode( text ) {
    Node.call( this );
    this.addChild( new Text( text, { font: new PhetFont( 20 ) } ) );
  }

  return inherit( Node, PlaceholderNode );
} );
