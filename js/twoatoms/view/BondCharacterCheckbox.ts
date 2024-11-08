// Copyright 2021-2023, University of Colorado Boulder

/**
 * BondCharacterCheckbox is the checkbox for controlling visibility of the 'Bond Character' display.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text } from '../../../../scenery/js/imports.js';
import MPConstants from '../../common/MPConstants.js';
import MPCheckbox, { MPCheckboxOptions } from '../../common/view/MPCheckbox.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';

type SelfOptions = EmptySelfOptions;

type BondCharacterCheckboxOptions = SelfOptions & PickRequired<MPCheckboxOptions, 'tandem'>;

export default class BondCharacterCheckbox extends MPCheckbox {

  public constructor( bondCharacterVisibleProperty: Property<boolean>, providedOptions: BondCharacterCheckboxOptions ) {

    const options = optionize<BondCharacterCheckboxOptions, SelfOptions, MPCheckboxOptions>()( {

      // MPCheckboxOptions
      isDisposable: false
    }, providedOptions );

    const labelText = new Text( MoleculePolarityStrings.bondCharacterStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    super( bondCharacterVisibleProperty, labelText, options );
  }
}

moleculePolarity.register( 'BondCharacterCheckbox', BondCharacterCheckbox );