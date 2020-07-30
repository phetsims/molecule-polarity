// Copyright 2017-2020, University of Colorado Boulder

/**
 * Dipole direction control that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import DipoleDirection from '../model/DipoleDirection.js';
import MPConstants from '../MPConstants.js';

// constants
const TEXT_OPTIONS = {
  font: new PhetFont( 24 ),
  maxWidth: 500
};

class DipoleDirectionControl extends VBox {

  /**
   * @param {EnumerationProperty.<DipoleDirection>} dipoleDirectionProperty
   */
  constructor( dipoleDirectionProperty ) {

    const titleNode = new Text( moleculePolarityStrings.dipoleDirection, {
      font: new PhetFont( 18 ),
      maxWidth: 500
    } );

    // d+ -> d-
    const positiveToNegativeString = StringUtils.fillIn( moleculePolarityStrings.pattern.dipoleDirection, {
      from: moleculePolarityStrings.deltaPlus,
      to: moleculePolarityStrings.deltaMinus
    } );

    // d- -> d+
    const negativeToPositiveString = StringUtils.fillIn( moleculePolarityStrings.pattern.dipoleDirection, {
      from: moleculePolarityStrings.deltaMinus,
      to: moleculePolarityStrings.deltaPlus
    } );

    const radioButtonGroupItems = [
      {
        value: DipoleDirection.POSITIVE_TO_NEGATIVE,
        node: new Text( positiveToNegativeString, TEXT_OPTIONS )
      },
      {
        value: DipoleDirection.NEGATIVE_TO_POSITIVE,
        node: new Text( negativeToPositiveString, TEXT_OPTIONS )
      }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup( dipoleDirectionProperty, radioButtonGroupItems, {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    } );

    super( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      children: [ titleNode, radioButtonGroup ]
    } );

    // @private
    this.disposeDipoleDirectionControl = () => {
      radioButtonGroup.dispose();
    };
  }

  // @public @override
  dispose() {
    this.disposeDipoleDirectionControl();
    super.dispose();
  }
}

moleculePolarity.register( 'DipoleDirectionControl', DipoleDirectionControl );

export default DipoleDirectionControl;