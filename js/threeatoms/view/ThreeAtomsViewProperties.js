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
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );

  class ThreeAtomsViewProperties {

    constructor() {

      // @public
      this.bondDipolesVisibleProperty = new BooleanProperty( false );
      this.molecularDipoleVisibleProperty = new BooleanProperty( true );
      this.partialChargesVisibleProperty = new BooleanProperty( false );
    }

    // @public
    reset() {
      this.bondDipolesVisibleProperty.reset();
      this.molecularDipoleVisibleProperty.reset();
      this.partialChargesVisibleProperty.reset();
    }
  }

  return moleculePolarity.register( 'ThreeAtomsViewProperties', ThreeAtomsViewProperties );
} );
