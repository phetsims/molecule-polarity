// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var DiatomicMolecule = require( 'MOLECULE_POLARITY/twoatoms/model/DiatomicMolecule' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MPModel = require( 'MOLECULE_POLARITY/common/model/MPModel' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function TwoAtomsModel() {
    MPModel.call( this, new DiatomicMolecule( { location: new Vector2( 350, 275 ) } ) );
  }

  return inherit( MPModel, TwoAtomsModel );
} );
