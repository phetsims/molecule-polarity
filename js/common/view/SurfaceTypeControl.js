// Copyright 2017-2020, University of Colorado Boulder

/**
 * Control panel for the molecule's surface type.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AquaRadioButtonGroup = require( 'SUN/AquaRadioButtonGroup' );
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

  /**
   * @param {Property.<SurfaceType>} surfaceTypeProperty
   * @constructor
   */
  function SurfaceTypeControl( surfaceTypeProperty ) {

    // title
    const titleNode = new Text( surfaceString, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    const radioButtonGroupItems = [
      {
        node: new Text( noneString, MPConstants.CONTROL_TEXT_OPTIONS ),
        value: SurfaceType.NONE
      },
      { node: new Text( electrostaticPotentialString, MPConstants.CONTROL_TEXT_OPTIONS ),
        value: SurfaceType.ELECTROSTATIC_POTENTIAL
      },
      {
        node: new Text( electronDensityString, MPConstants.CONTROL_TEXT_OPTIONS ),
        value: SurfaceType.ELECTRON_DENSITY
      }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup( surfaceTypeProperty, radioButtonGroupItems, {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    } );

    // vertical panel
    VBox.call( this, {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      children: [ titleNode, radioButtonGroup ]
    } );
  }

  moleculePolarity.register( 'SurfaceTypeControl', SurfaceTypeControl );

  return inherit( VBox, SurfaceTypeControl );
} );
