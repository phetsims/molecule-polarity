// Copyright 2021-2022, University of Colorado Boulder

/**
 * PartialChargesCheckbox is the checkbox for controlling visibility of partial charges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text, TextOptions } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';

type SelfOptions = EmptySelfOptions;

export type PartialChargesCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

class PartialChargesCheckbox extends Checkbox {

  public constructor( partialChargesVisibleProperty: Property<boolean>, providedOptions: PartialChargesCheckboxOptions ) {

    const options = providedOptions;

    const labelText = new Text( MoleculePolarityStrings.partialChargesStringProperty,
      combineOptions<TextOptions>( {
        tandem: options.tandem.createTandem( 'labelText' ),
        phetioVisiblePropertyInstrumented: false
      }, MPConstants.CONTROL_TEXT_OPTIONS ) );

    super( partialChargesVisibleProperty, labelText, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'PartialChargesCheckbox', PartialChargesCheckbox );
export default PartialChargesCheckbox;