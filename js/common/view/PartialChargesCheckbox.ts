// Copyright 2021-2023, University of Colorado Boulder

/**
 * PartialChargesCheckbox is the checkbox for controlling visibility of partial charges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Text } from '../../../../scenery/js/imports.js';
import { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import MPCheckbox from './MPCheckbox.js';

type SelfOptions = EmptySelfOptions;

type PartialChargesCheckboxOptions = SelfOptions & WithRequired<CheckboxOptions, 'tandem'>;

export default class PartialChargesCheckbox extends MPCheckbox {

  public constructor( partialChargesVisibleProperty: Property<boolean>, providedOptions: PartialChargesCheckboxOptions ) {

    const options = providedOptions;

    const labelText = new Text( MoleculePolarityStrings.partialChargesStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    super( partialChargesVisibleProperty, labelText, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'PartialChargesCheckbox', PartialChargesCheckbox );