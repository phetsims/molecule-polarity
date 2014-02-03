// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var MPModel2 = require( 'MOLECULE_POLARITY/common/model/MPModel2' );
  var TriatomicMolecule = require( 'MOLECULE_POLARITY/common/model/TriatomicMolecule' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function ThreeAtomsModel() {
    MPModel2.call( this, new TriatomicMolecule( { location: new Vector2( 380, 375 ) } ) );
  }

  return inherit( MPModel2, ThreeAtomsModel );
} );
