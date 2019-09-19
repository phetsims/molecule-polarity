// Copyright 2015-2018, University of Colorado Boulder

/**
 * Control for selecting surface color that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AquaRadioButton = require( 'SUN/AquaRadioButton' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const SurfaceColorKey = require( 'MOLECULE_POLARITY/common/view/SurfaceColorKey' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const surfaceColorRealMoleculesString = require( 'string!MOLECULE_POLARITY/surfaceColorRealMolecules' );

  // constants
  var RADIO_BUTTON_OPTIONS = { radius: 8 };
  var COLOR_KEY_OPTIONS = {
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

    var surfaceColorLabel = new Text( surfaceColorRealMoleculesString, {
      font: new PhetFont( 14 ),
      maxWidth: 400
    } );

    var rwbButton = new AquaRadioButton(
      surfaceColorProperty,
      'RWB',
      SurfaceColorKey.createElectrostaticPotentialRWBColorKey( COLOR_KEY_OPTIONS ),
      RADIO_BUTTON_OPTIONS
    );

    var roygbButton = new AquaRadioButton(
      surfaceColorProperty,
      'ROYGB',
      SurfaceColorKey.createElectrostaticPotentialROYGBColorKey( COLOR_KEY_OPTIONS ),
      RADIO_BUTTON_OPTIONS
    );

    VBox.call( this, {
      align: 'left',
      spacing: 10,
      children: [
        surfaceColorLabel,
        rwbButton,
        roygbButton
      ]
    } );

    // @private
    this.disposeSurfaceColorControl = function() {
      rwbButton.dispose();
      roygbButton.dispose();
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
