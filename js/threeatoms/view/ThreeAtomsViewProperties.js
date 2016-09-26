// Copyright 2016, University of Colorado Boulder

/**
 * View-specific Properties for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc,)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function ThreeAtomsViewProperties() {

    // @public
    this.bondDipolesVisibleProperty = new Property( false );
    this.molecularDipoleVisibleProperty = new Property( true );
    this.partialChargesVisibleProperty = new Property( false );
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
