// Copyright 2015-2020, University of Colorado Boulder

/**
 * Control for selecting surface color that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AquaRadioButtonGroup = require( 'SUN/AquaRadioButtonGroup' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const SurfaceColorKey = require( 'MOLECULE_POLARITY/common/view/SurfaceColorKey' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const surfaceColorRealMoleculesString = require( 'string!MOLECULE_POLARITY/surfaceColorRealMolecules' );

  // constants
  const COLOR_KEY_OPTIONS = {
    size: new Dimension2( 150, 15 ),
    titleVisible: false,
    rangeFont: new PhetFont( 8 ),
    xMargin: 0,
    ySpacing: 2
  };

  /**
   * @param {Property.<string>} surfaceColorProperty
   * @constructor
   */
  function SurfaceColorControl( surfaceColorProperty ) {

    const titleNode = new Text( surfaceColorRealMoleculesString, {
      font: new PhetFont( 14 ),
      maxWidth: 400
    } );

    const radioButtonGroupItems = [
      { node: SurfaceColorKey.createElectrostaticPotentialRWBColorKey( COLOR_KEY_OPTIONS ), value: 'RWB' },
      { node: SurfaceColorKey.createElectrostaticPotentialROYGBColorKey( COLOR_KEY_OPTIONS ), value: 'ROYGB' }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup( surfaceColorProperty, radioButtonGroupItems, {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    } );

    VBox.call( this, {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      children: [ titleNode, radioButtonGroup ]
    } );

    // @private
    this.disposeSurfaceColorControl = function() {
      radioButtonGroup.dispose();
    };
  }

  moleculePolarity.register( 'SurfaceColorControl', SurfaceColorControl );

  return inherit( VBox, SurfaceColorControl, {

    // @public
    dispose: function() {
      this.disposeSurfaceColorControl();
      VBox.prototype.dispose.call( this );
    }
  } );
} );
