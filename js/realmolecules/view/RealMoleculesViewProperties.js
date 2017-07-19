// Copyright 2016, University of Colorado Boulder

/**
 * View-specific Properties for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc,)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Property = require( 'AXON/Property' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );

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
    this.surfaceTypeProperty = new Property( SurfaceType.NONE );
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
