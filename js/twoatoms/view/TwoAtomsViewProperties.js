// Copyright 2016-2018, University of Colorado Boulder

/**
 * View-specific Properties for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const Property = require( 'AXON/Property' );
  const SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );

  /**
   * @constructor
   */
  function TwoAtomsViewProperties() {

    // @public
    this.bondDipoleVisibleProperty = new BooleanProperty( true );
    this.partialChargesVisibleProperty = new BooleanProperty( false );
    this.bondCharacterVisibleProperty = new BooleanProperty( false );
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
