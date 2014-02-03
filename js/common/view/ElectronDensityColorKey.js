// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var PlaceholderNode = require( 'MOLECULE_POLARITY/common/view/PlaceholderNode' );

  function ElectronDensityColorKey() {
    PlaceholderNode.call( this, 'ElectronDensityColorKey' );
  }

  return inherit( PlaceholderNode, ElectronDensityColorKey );
} );
