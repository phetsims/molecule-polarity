// Copyright 2021, University of Colorado Boulder

/**
 * AtomElectronegativitiesCheckbox is the checkbox for controlling visibility of atom electronegativities.
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

class AtomElectronegativitiesCheckbox extends Checkbox {

  /**
   * @param {Property.<boolean>} atomElectronegativitiesVisibleProperty
   * @param {Object} [options]
   */
  constructor( atomElectronegativitiesVisibleProperty, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    const labelText = new Text( moleculePolarityStrings.atomElectronegativities,
      merge( {
        tandem: options.tandem.createTandem( 'labelText' )
      }, MPConstants.CONTROL_TEXT_OPTIONS )
    );

    super( labelText, atomElectronegativitiesVisibleProperty, options );
  }
}

moleculePolarity.register( 'AtomElectronegativitiesCheckbox', AtomElectronegativitiesCheckbox );
export default AtomElectronegativitiesCheckbox;