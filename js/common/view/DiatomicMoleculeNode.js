// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var PlaceholderNode = require( 'MOLECULE_POLARITY/common/view/PlaceholderNode' );

  function DiatomicMoleculeNode() {
    PlaceholderNode.call( this, 'DiatomicMoleculeNode' );
  }

  return inherit( PlaceholderNode, DiatomicMoleculeNode, {

    setBondDipoleVisible: function( visible ) {
      //TODO
    },

    setPartialChargesVisible: function( visible ) {
      //TODO
    },

    setSurfaceType: function( surfaceType ) {
      //TODO
    }
  } );
} );
