// Copyright 2015-2017, University of Colorado Boulder

/**
 * Control for selecting surface color that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var SurfaceColorKey = require( 'MOLECULE_POLARITY/common/view/SurfaceColorKey' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var surfaceColorRealMoleculesString = require( 'string!MOLECULE_POLARITY/surfaceColorRealMolecules' );

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
      orientation: 'vertical',
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
