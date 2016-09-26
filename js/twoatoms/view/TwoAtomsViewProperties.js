// Copyright 2016, University of Colorado Boulder

/**
 * View-specific Properties for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc,)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Property = require( 'AXON/Property' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );

  /**
   * @constructor
   */
  function TwoAtomsViewProperties() {

    // @public
    this.bondDipoleVisibleProperty = new Property( true );
    this.partialChargesVisibleProperty = new Property( false );
    this.bondCharacterVisibleProperty = new Property( false );
    this.surfaceTypeProperty = new Property( SurfaceType.NONE );
  }

  moleculePolarity.register( 'TwoAtomsViewProperties', TwoAtomsViewProperties );

  return inherit( Object, TwoAtomsViewProperties, {

    // @public
    reset: function() {
      this.bondDipoleVisibleProperty.reset();
      this.partialChargesVisibleProperty.reset();
      this.bondCharacterVisibleProperty.reset();
      this.surfaceTypeProperty.reset();
    }
  } );
} );
