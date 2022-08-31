// Copyright 2017-2022, University of Colorado Boulder

/**
 * DipoleDirectionRadioButtonGroup is the radio button group for choosing dipole direction.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import DipoleDirection from '../model/DipoleDirection.js';
import MPConstants from '../MPConstants.js';

// constants
const TEXT_OPTIONS = {
  font: new PhetFont( 24 ),
  maxWidth: 500,
  phetioVisiblePropertyInstrumented: false
};

class DipoleDirectionRadioButtonGroup extends AquaRadioButtonGroup {

  /**
   * @param {EnumerationDeprecatedProperty.<DipoleDirection>} dipoleDirectionProperty
   * @param {Object} [options]
   */
  constructor( dipoleDirectionProperty, options ) {
    assert && AssertUtils.assertEnumerationPropertyOf( dipoleDirectionProperty, DipoleDirection );

    options = merge( {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, MPConstants.AQUA_RADIO_BUTTON_OPTIONS, options );

    // d+ -> d-
    //TODO https://github.com/phetsims/molecule-polarity/issues/144 not showing up in Studio
    const positiveToNegativeStringProperty = new DerivedProperty( [
      moleculePolarityStrings.pattern.dipoleDirectionStringProperty,
      moleculePolarityStrings.deltaPlusStringProperty,
      moleculePolarityStrings.deltaMinusStringProperty
    ], ( patternString, deltaPlusString, deltaMinusString ) =>
      StringUtils.fillIn( patternString, {
        from: deltaPlusString,
        to: deltaMinusString
      }, {
        tandem: options.tandem.createTandem( 'positiveToNegativeStringProperty' ),
        phetioValueType: StringIO
      } ) );

    // d- -> d+
    //TODO https://github.com/phetsims/molecule-polarity/issues/144 not showing up in Studio
    const negativeToPositiveStringProperty = new DerivedProperty( [
      moleculePolarityStrings.pattern.dipoleDirectionStringProperty,
      moleculePolarityStrings.deltaPlusStringProperty,
      moleculePolarityStrings.deltaMinusStringProperty
    ], ( patternString, deltaPlusString, deltaMinusString ) =>
      StringUtils.fillIn( patternString, {
        from: deltaMinusString,
        to: deltaPlusString
      }, {
        tandem: options.tandem.createTandem( 'negativeToPositiveStringProperty' ),
        phetioValueType: StringIO
      } ) );

    const positiveToNegativeRadioButtonTandemName = 'positiveToNegativeRadioButton';
    const negativeToPositiveRadioButtonTandem = 'negativeToPositiveRadioButton';

    const radioButtonGroupItems = [
      {
        value: DipoleDirection.POSITIVE_TO_NEGATIVE,

        //TODO //TODO https://github.com/phetsims/molecule-polarity/issues/144 no textProperty linked element in Studio
        node: new Text( positiveToNegativeStringProperty, merge( {
          tandem: options.tandem.createTandem( positiveToNegativeRadioButtonTandemName ).createTandem( 'labelText' )
        }, TEXT_OPTIONS ) ),
        tandemName: positiveToNegativeRadioButtonTandemName
      },
      {
        value: DipoleDirection.NEGATIVE_TO_POSITIVE,

        //TODO //TODO https://github.com/phetsims/molecule-polarity/issues/144 no textProperty linked element in Studio
        node: new Text( negativeToPositiveStringProperty, merge( {
          tandem: options.tandem.createTandem( negativeToPositiveRadioButtonTandem ).createTandem( 'labelText' )
        }, TEXT_OPTIONS ) ),
        tandemName: negativeToPositiveRadioButtonTandem
      }
    ];

    super( dipoleDirectionProperty, radioButtonGroupItems, options );

    // @private
    this.disposeDipoleDirectionRadioButtonGroup = () => {
      positiveToNegativeStringProperty.dispose();
      negativeToPositiveStringProperty.dispose();
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