// Copyright 2021, University of Colorado Boulder

/**
 * PartialChargesCheckbox is the checkbox for controlling visibility of partial charges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Text from '../../../../scenery/js/nodes/Text.js';
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

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    const labelText = new Text( moleculePolarityStrings.partialCharges,
      merge( {
        tandem: options.tandem.createTandem( 'labelText' )
      }, MPConstants.CONTROL_TEXT_OPTIONS )
    );

    super( labelText, partialChargesVisibleProperty, options );
  }
}

moleculePolarity.register( 'PartialChargesCheckbox', PartialChargesCheckbox );
export default PartialChargesCheckbox;