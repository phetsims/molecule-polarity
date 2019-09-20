// Copyright 2016-2019, University of Colorado Boulder

/**
 * View-specific Properties for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );

  /**
   * @constructor
   */
  function ThreeAtomsViewProperties() {

    // @public
    this.bondDipolesVisibleProperty = new BooleanProperty( false );
    this.molecularDipoleVisibleProperty = new BooleanProperty( true );
    this.partialChargesVisibleProperty = new BooleanProperty( false );
  }

  moleculePolarity.register( 'ThreeAtomsViewProperties', ThreeAtomsViewProperties );

  return inherit( Object, ThreeAtomsViewProperties, {

    // @public
    reset: function() {
      this.bondDipolesVisibleProperty.reset();
      this.molecularDipoleVisibleProperty.reset();
      this.partialChargesVisibleProperty.reset();
    }
  } );
} );
