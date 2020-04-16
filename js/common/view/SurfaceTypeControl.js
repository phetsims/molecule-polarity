// Copyright 2017-2020, University of Colorado Boulder

/**
 * Control panel for the molecule's surface type.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import SurfaceType from '../model/SurfaceType.js';
import MPConstants from '../MPConstants.js';

class SurfaceTypeControl extends VBox {

  /**
   * @param {EnumerationProperty.<SurfaceType>} surfaceTypeProperty
   */
  constructor( surfaceTypeProperty ) {

    // title
    const titleNode = new Text( moleculePolarityStrings.surface, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    const radioButtonGroupItems = [
      {
        node: new Text( moleculePolarityStrings.none, MPConstants.CONTROL_TEXT_OPTIONS ),
        value: SurfaceType.NONE
      },
      {
        value: SurfaceType.ELECTROSTATIC_POTENTIAL,
        node: new Text( moleculePolarityStrings.electrostaticPotential, MPConstants.CONTROL_TEXT_OPTIONS )
      },
      {
        value: SurfaceType.ELECTRON_DENSITY,
        node: new Text( moleculePolarityStrings.electronDensity, MPConstants.CONTROL_TEXT_OPTIONS )
      }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup( surfaceTypeProperty, radioButtonGroupItems, {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    } );

    // vertical panel
    super( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      children: [ titleNode, radioButtonGroup ]
    } );
  }
}

moleculePolarity.register( 'SurfaceTypeControl', SurfaceTypeControl );

export default SurfaceTypeControl;