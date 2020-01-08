// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPModel = require( 'MOLECULE_POLARITY/common/model/MPModel' );
  const TriatomicMolecule = require( 'MOLECULE_POLARITY/threeatoms/model/TriatomicMolecule' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function ThreeAtomsModel() {
    MPModel.call( this, new TriatomicMolecule( { position: new Vector2( 400, 280 ) } ) );
  }

  moleculePolarity.register( 'ThreeAtomsModel', ThreeAtomsModel );

  return inherit( MPModel, ThreeAtomsModel );
} );
