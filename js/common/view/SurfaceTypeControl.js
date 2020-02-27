// Copyright 2017-2020, University of Colorado Boulder

/**
 * Control panel for the molecule's surface type.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import moleculePolarityStrings from '../../molecule-polarity-strings.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';
import SurfaceType from './SurfaceType.js';

const electronDensityString = moleculePolarityStrings.electronDensity;
const electrostaticPotentialString = moleculePolarityStrings.electrostaticPotential;
const noneString = moleculePolarityStrings.none;
const surfaceString = moleculePolarityStrings.surface;

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
    {
      node: new Text( electrostaticPotentialString, MPConstants.CONTROL_TEXT_OPTIONS ),
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

inherit( VBox, SurfaceTypeControl );
export default SurfaceTypeControl;