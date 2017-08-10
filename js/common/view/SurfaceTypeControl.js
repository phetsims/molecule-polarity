// Copyright 2017, University of Colorado Boulder

/**
 * Control panel for the molecule's surface type.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var electronDensityString = require( 'string!MOLECULE_POLARITY/electronDensity' );
  var electrostaticPotentialString = require( 'string!MOLECULE_POLARITY/electrostaticPotential' );
  var noneString = require( 'string!MOLECULE_POLARITY/none' );
  var surfaceString = require( 'string!MOLECULE_POLARITY/surface' );

  // constants
  var RADIO_BUTTON_OPTIONS = {
    radius: 10
  };

  /**
   * @param {Property.<SurfaceType>} surfaceTypeProperty
   * @constructor
   */
  function SurfaceTypeControl( surfaceTypeProperty ) {

    // title
    var titleNode = new Text( surfaceString, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // radio buttons
    var noneButton = new AquaRadioButton( surfaceTypeProperty, SurfaceType.NONE,
      new Text( noneString, MPConstants.CONTROL_TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );
    var electrostaticPotentialButton = new AquaRadioButton( surfaceTypeProperty, SurfaceType.ELECTROSTATIC_POTENTIAL,
      new Text( electrostaticPotentialString, MPConstants.CONTROL_TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );
    var electronDensityButton = new AquaRadioButton( surfaceTypeProperty, SurfaceType.ELECTRON_DENSITY,
      new Text( electronDensityString, MPConstants.CONTROL_TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );

    // vertical panel
    VBox.call( this, {
      children: [ titleNode, noneButton, electrostaticPotentialButton, electronDensityButton ],
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    } );
  }

  moleculePolarity.register( 'SurfaceTypeControl', SurfaceTypeControl );

  return inherit( VBox, SurfaceTypeControl );
} );
