// Copyright 2016-2019, University of Colorado Boulder

/**
 * View-specific Properties for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const StringProperty = require( 'AXON/StringProperty' );
  const SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );

  /**
   * @constructor
   */
  function RealMoleculesViewProperties() {

    // @public
    this.bondDipolesVisibleProperty = new BooleanProperty( false );
    this.molecularDipoleVisibleProperty = new BooleanProperty( false );
    this.partialChargesVisibleProperty = new BooleanProperty( false );
    this.atomElectronegativitiesVisibleProperty = new BooleanProperty( false );
    this.atomLabelsVisibleProperty = new BooleanProperty( false );
    this.surfaceTypeProperty = new StringProperty( SurfaceType.NONE );
  }

  moleculePolarity.register( 'RealMoleculesViewProperties', RealMoleculesViewProperties );

  return inherit( Object, RealMoleculesViewProperties, {

    // @public
    reset: function() {
      this.bondDipolesVisibleProperty.reset();
      this.molecularDipoleVisibleProperty.reset();
      this.partialChargesVisibleProperty.reset();
      this.atomElectronegativitiesVisibleProperty.reset();
      this.atomLabelsVisibleProperty.reset();
      this.surfaceTypeProperty.reset();
    }
  } );
} );
