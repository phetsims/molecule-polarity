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
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import moleculePolarity from '../../moleculePolarity.js';
import DipoleDirection from '../model/DipoleDirection.js';
import MPConstants from '../MPConstants.js';

// strings
const deltaMinusString = moleculePolarityStrings.deltaMinus;
const deltaPlusString = moleculePolarityStrings.deltaPlus;
const dipoleDirectionString = moleculePolarityStrings.dipoleDirection;
const patternDipoleDirectionString = moleculePolarityStrings.pattern.dipoleDirection;

// constants
const TEXT_OPTIONS = {
  font: new PhetFont( 20 ),
  maxWidth: 300
};

class DipoleDirectionControl extends VBox {

  /**
   * @param {EnumerationProperty.<DipoleDirection>} dipoleDirectionProperty
   */
  constructor( dipoleDirectionProperty ) {

    const titleNode = new Text( dipoleDirectionString, {
      font: new PhetFont( 14 ),
      maxWidth: 400
    } );

    // d+ -> d-
    const positiveToNegativeString = StringUtils.fillIn( patternDipoleDirectionString, {
      from: deltaPlusString,
      to: deltaMinusString
    } );

    // d- -> d+
    const negativeToPositiveString = StringUtils.fillIn( patternDipoleDirectionString, {
      from: deltaMinusString,
      to: deltaPlusString
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