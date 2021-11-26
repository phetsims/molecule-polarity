// Copyright 2017-2021, University of Colorado Boulder

/**
 * DipoleDirectionRadioButtonGroup is the radio button group for choosing dipole direction.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import DipoleDirection from '../model/DipoleDirection.js';
import MPConstants from '../MPConstants.js';

// constants
const TEXT_OPTIONS = {
  font: new PhetFont( 24 ),
  maxWidth: 500
};

class DipoleDirectionRadioButtonGroup extends AquaRadioButtonGroup {

  /**
   * @param {EnumerationProperty.<DipoleDirection>} dipoleDirectionProperty
   * @param {Object} [options]
   */
  constructor( dipoleDirectionProperty, options ) {
    assert && AssertUtils.assertEnumerationPropertyOf( dipoleDirectionProperty, DipoleDirection );

    options = merge( {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, MPConstants.AQUA_RADIO_BUTTON_OPTIONS, options );

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
        node: new Text( positiveToNegativeString, merge( {
          tandem: options.tandem.createTandem( 'positiveToNegativeText' )
        }, TEXT_OPTIONS ) ),
        tandemName: 'positiveToNegativeRadioButton'
      },
      {
        value: DipoleDirection.NEGATIVE_TO_POSITIVE,
        node: new Text( negativeToPositiveString, merge( {
          tandem: options.tandem.createTandem( 'negativeToPositiveText' )
        }, TEXT_OPTIONS ) ),
        tandemName: 'negativeToPositiveRadioButton'
      }
    ];

    super( dipoleDirectionProperty, radioButtonGroupItems, options );

    // @private
    this.disposeDipoleDirectionRadioButtonGroup = () => {
      radioButtonGroupItems.forEach( item => item.node.dispose() );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeDipoleDirectionRadioButtonGroup();
    super.dispose();
  }
}

moleculePolarity.register( 'DipoleDirectionRadioButtonGroup', DipoleDirectionRadioButtonGroup );
export default DipoleDirectionRadioButtonGroup;