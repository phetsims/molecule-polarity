// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DiatomicMolecule = require( 'MOLECULE_POLARITY/twoatoms/model/DiatomicMolecule' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPModel = require( 'MOLECULE_POLARITY/common/model/MPModel' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function TwoAtomsModel() {
    MPModel.call( this, new DiatomicMolecule( { position: new Vector2( 380, 280 ) } ) );
  }

  moleculePolarity.register( 'TwoAtomsModel', TwoAtomsModel );

  return inherit( MPModel, TwoAtomsModel );
} );
