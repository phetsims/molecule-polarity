// Copyright 2017, University of Colorado Boulder

/**
 * Control panel for the molecule's surface type.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AquaRadioButton = require( 'SUN/AquaRadioButton' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const electronDensityString = require( 'string!MOLECULE_POLARITY/electronDensity' );
  const electrostaticPotentialString = require( 'string!MOLECULE_POLARITY/electrostaticPotential' );
  const noneString = require( 'string!MOLECULE_POLARITY/none' );
  const surfaceString = require( 'string!MOLECULE_POLARITY/surface' );

  // constants
  const RADIO_BUTTON_OPTIONS = {
    radius: 10
  };

  /**
   * @param {Property.<SurfaceType>} surfaceTypeProperty
   * @constructor
   */
  function SurfaceTypeControl( surfaceTypeProperty ) {

    // title
    const titleNode = new Text( surfaceString, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // radio buttons
    const noneButton = new AquaRadioButton( surfaceTypeProperty, SurfaceType.NONE,
      new Text( noneString, MPConstants.CONTROL_TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );
    const electrostaticPotentialButton = new AquaRadioButton( surfaceTypeProperty, SurfaceType.ELECTROSTATIC_POTENTIAL,
      new Text( electrostaticPotentialString, MPConstants.CONTROL_TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );
    const electronDensityButton = new AquaRadioButton( surfaceTypeProperty, SurfaceType.ELECTRON_DENSITY,
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
