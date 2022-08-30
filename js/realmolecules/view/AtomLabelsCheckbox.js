// Copyright 2021-2022, University of Colorado Boulder

/**
 * AtomLabelsCheckbox is the checkbox for controlling visibility of atom labels.
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

class AtomLabelsCheckbox extends Checkbox {

  /**
   * @param {Property.<boolean>} atomLabelsVisibleProperty
   * @param {Object} [options]
   */
  constructor( atomLabelsVisibleProperty, options ) {
    assert && AssertUtils.assertPropertyOf( atomLabelsVisibleProperty, 'boolean' );

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    const labelText = new Text( moleculePolarityStrings.atomLabelsStringProperty, merge( {
      tandem: options.tandem.createTandem( 'labelText' ),
      phetioVisiblePropertyInstrumented: false
    }, MPConstants.CONTROL_TEXT_OPTIONS ) );

    super( atomLabelsVisibleProperty, labelText, options );
  }
}

moleculePolarity.register( 'AtomLabelsCheckbox', AtomLabelsCheckbox );
export default AtomLabelsCheckbox;