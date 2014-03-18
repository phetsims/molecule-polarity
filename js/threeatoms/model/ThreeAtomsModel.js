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
  var MPModel = require( 'MOLECULE_POLARITY/common/model/MPModel' );
  var TriatomicMolecule = require( 'MOLECULE_POLARITY/threeatoms/model/TriatomicMolecule' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function ThreeAtomsModel() {
    MPModel.call( this, new TriatomicMolecule( { location: new Vector2( 400, 280 ) } ) );
  }

  return inherit( MPModel, ThreeAtomsModel );
} );
