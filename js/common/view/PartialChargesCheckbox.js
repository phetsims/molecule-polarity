// Copyright 2021-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * PartialChargesCheckbox is the checkbox for controlling visibility of partial charges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import { Text } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';

class PartialChargesCheckbox extends Checkbox {

  /**
   * @param {Property.<boolean>} partialChargesVisibleProperty
   * @param {Object} [options]
   */
  constructor( partialChargesVisibleProperty, options ) {
    assert && AssertUtils.assertPropertyOf( partialChargesVisibleProperty, 'boolean' );

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    const labelText = new Text( moleculePolarityStrings.partialChargesStringProperty, merge( {
      tandem: options.tandem.createTandem( 'labelText' ),
      phetioVisiblePropertyInstrumented: false
    }, MPConstants.CONTROL_TEXT_OPTIONS ) );

    super( partialChargesVisibleProperty, labelText, options );
  }
}

moleculePolarity.register( 'PartialChargesCheckbox', PartialChargesCheckbox );
export default PartialChargesCheckbox;