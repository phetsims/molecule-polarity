// Copyright 2021-2023, University of Colorado Boulder

/**
 * PartialChargesCheckbox is the checkbox for controlling visibility of partial charges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Text } from '../../../../scenery/js/imports.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPCheckbox, { MPCheckboxOptions } from './MPCheckbox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type PartialChargesCheckboxOptions = SelfOptions & PickRequired<MPCheckboxOptions, 'tandem'>;

export default class PartialChargesCheckbox extends MPCheckbox {

  public constructor( partialChargesVisibleProperty: Property<boolean>, providedOptions: PartialChargesCheckboxOptions ) {

    const options = optionize<PartialChargesCheckboxOptions, SelfOptions, MPCheckboxOptions>()( {

      // MPCheckboxOptions
      isDisposable: false
    }, providedOptions );

    const labelText = new Text( MoleculePolarityStrings.partialChargesStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    super( partialChargesVisibleProperty, labelText, options );
  }
}

moleculePolarity.register( 'PartialChargesCheckbox', PartialChargesCheckbox );