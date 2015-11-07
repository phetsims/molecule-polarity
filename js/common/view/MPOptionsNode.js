// Copyright 2015, University of Colorado Boulder

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
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var MPGlobalOptions = require( 'MOLECULE_POLARITY/common/MPGlobalOptions' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var SurfaceColorKey = require( 'MOLECULE_POLARITY/common/view/SurfaceColorKey' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var dipoleDirectionString = require( 'string!MOLECULE_POLARITY/dipoleDirection' );
  var deltaPlusString = require( 'string!MOLECULE_POLARITY/deltaPlus' );
  var deltaMinusString = require( 'string!MOLECULE_POLARITY/deltaMinus' );
  var pattern0To1String = require( 'string!MOLECULE_POLARITY/pattern0to1' );
  var surfaceColorString = require( 'string!MOLECULE_POLARITY/surfaceColor' );

  // constants
  var CONTROL_TITLE_OPTIONS = { font: new PhetFont( 14 ) };
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
    var dipoleDirectionLabel = new Text( dipoleDirectionString, CONTROL_TITLE_OPTIONS );
    var dipoleDirectionProperty = MPGlobalOptions.dipoleDirectionProperty;
    var positiveToNegativeButton = new AquaRadioButton(
      dipoleDirectionProperty,
      'positiveToNegative',
      new Text( StringUtils.format( pattern0To1String, deltaPlusString, deltaMinusString ), { font: new PhetFont( 20 ) } ),
      RADIO_BUTTON_OPTIONS
    );
    var negativeToPositiveButton = new AquaRadioButton(
      dipoleDirectionProperty,
      'negativeToPositive',
      new Text( StringUtils.format( pattern0To1String, deltaMinusString, deltaPlusString ), { font: new PhetFont( 20 ) } ),
      RADIO_BUTTON_OPTIONS
    );
    var dipoleDirectionControl = new LayoutBox( {
      orientation: 'vertical',
      align: 'left',
      spacing: 10,
      children: [
        dipoleDirectionLabel,
        positiveToNegativeButton,
        negativeToPositiveButton
      ]
    } );

    // surface color control
    var surfaceColorLabel = new Text( surfaceColorString, CONTROL_TITLE_OPTIONS );
    var surfaceColorProperty = MPGlobalOptions.surfaceColorProperty;
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

  return inherit( LayoutBox, MPOptionsNode );
} );
