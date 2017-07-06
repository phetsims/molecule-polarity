// Copyright 2015-2017, University of Colorado Boulder

/**
 * User interface for setting global options in the 'Molecule Polarity' simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var DipoleDirectionControl = require( 'MOLECULE_POLARITY/common/view/DipoleDirectionControl' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var SurfaceColorKey = require( 'MOLECULE_POLARITY/common/view/SurfaceColorKey' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var surfaceColorString = require( 'string!MOLECULE_POLARITY/surfaceColor' );

  // constants
  var CONTROL_TITLE_OPTIONS = {
    font: new PhetFont( 14 ),
    maxWidth: 400
  };
  var RADIO_BUTTON_OPTIONS = { radius: 8 };
  var COLOR_KEY_OPTIONS = {
    size: new Dimension2( 150, 15 ),
    titleVisible: false,
    rangeFont: new PhetFont( 8 ),
    xMargin: 0,
    ySpacing: 2
  };

  /**
   * @constructor
   */
  function MPOptionsNode() {

    // dipole direction control
    var dipoleDirectionControl = new DipoleDirectionControl( MPConstants.GLOBAL_OPTIONS.dipoleDirectionProperty );

    //TODO factor out into its own js file
    // surface color control
    var surfaceColorLabel = new Text( surfaceColorString, CONTROL_TITLE_OPTIONS );
    var surfaceColorProperty = MPConstants.GLOBAL_OPTIONS.surfaceColorProperty;
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
    var surfaceColorControl = new LayoutBox( {
      orientation: 'vertical',
      align: 'left',
      spacing: 10,
      children: [
        surfaceColorLabel,
        rwbButton,
        roygbButton
      ]
    } );

    // container for all controls
    LayoutBox.call( this, {
      orientation: 'vertical',
      align: 'left',
      spacing: 25,
      children: [
        dipoleDirectionControl,
        surfaceColorControl
      ]
    } );
  }

  moleculePolarity.register( 'MPOptionsNode', MPOptionsNode );

  return inherit( LayoutBox, MPOptionsNode );
} );
