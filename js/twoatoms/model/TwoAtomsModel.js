// Copyright 2014-2016, University of Colorado Boulder

/**
 * Model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DiatomicMolecule = require( 'MOLECULE_POLARITY/twoatoms/model/DiatomicMolecule' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPModel = require( 'MOLECULE_POLARITY/common/model/MPModel' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function TwoAtomsModel() {
    MPModel.call( this, new DiatomicMolecule( { location: new Vector2( 380, 280 ) } ) );
  }

  moleculePolarity.register( 'TwoAtomsModel', TwoAtomsModel );

  return inherit( MPModel, TwoAtomsModel );
} );
