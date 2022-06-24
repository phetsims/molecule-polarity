// Copyright 2021-2022, University of Colorado Boulder

/**
 * BondCharacterCheckbox is the checkbox for controlling visibility of the 'Bond Character' display.
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

class BondCharacterCheckbox extends Checkbox {

  /**
   * @param {Property.<boolean>} bondCharacterVisibleProperty
   * @param {Object} [options]
   */
  constructor( bondCharacterVisibleProperty, options ) {
    assert && AssertUtils.assertPropertyOf( bondCharacterVisibleProperty, 'boolean' );

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    const labelText = new Text( moleculePolarityStrings.bondCharacter,
      merge( {
        tandem: options.tandem.createTandem( 'labelText' )
      }, MPConstants.CONTROL_TEXT_OPTIONS )
    );

    super( bondCharacterVisibleProperty, labelText, options );
  }
}

moleculePolarity.register( 'BondCharacterCheckbox', BondCharacterCheckbox );
export default BondCharacterCheckbox;