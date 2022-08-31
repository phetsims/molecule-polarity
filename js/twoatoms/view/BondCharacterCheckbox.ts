// Copyright 2021-2022, University of Colorado Boulder

/**
 * BondCharacterCheckbox is the checkbox for controlling visibility of the 'Bond Character' display.
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
import moleculePolarityStrings from '../../moleculePolarityStrings.js';

type SelfOptions = EmptySelfOptions;

export type BondCharacterCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class BondCharacterCheckbox extends Checkbox {

  public constructor( bondCharacterVisibleProperty: Property<boolean>, providedOptions: BondCharacterCheckboxOptions ) {

    const options = providedOptions;

    const labelText = new Text( moleculePolarityStrings.bondCharacterStringProperty,
      combineOptions<TextOptions>( {
        tandem: options.tandem.createTandem( 'labelText' ),
        phetioVisiblePropertyInstrumented: false
      }, MPConstants.CONTROL_TEXT_OPTIONS ) );

    super( bondCharacterVisibleProperty, labelText, options );
  }
}

moleculePolarity.register( 'BondCharacterCheckbox', BondCharacterCheckbox );