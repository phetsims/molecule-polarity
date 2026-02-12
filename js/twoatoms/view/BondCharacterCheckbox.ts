// Copyright 2021-2026, University of Colorado Boulder

/**
 * BondCharacterCheckbox is the checkbox for controlling visibility of the 'Bond Character' display.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import MPConstants from '../../common/MPConstants.js';
import MPCheckbox, { MPCheckboxOptions } from '../../common/view/MPCheckbox.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';

type SelfOptions = EmptySelfOptions;

type BondCharacterCheckboxOptions = SelfOptions & PickRequired<MPCheckboxOptions, 'tandem'>;

export default class BondCharacterCheckbox extends MPCheckbox {

  public constructor( bondCharacterVisibleProperty: Property<boolean>, providedOptions: BondCharacterCheckboxOptions ) {

    const options = optionize<BondCharacterCheckboxOptions, SelfOptions, MPCheckboxOptions>()( {

      // MPCheckboxOptions
      isDisposable: false,
      accessibleName: MoleculePolarityFluent.a11y.common.bondCharacterCheckbox.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.bondCharacterCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.bondCharacterCheckbox.checkedStringProperty.value,
      accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.bondCharacterCheckbox.uncheckedStringProperty.value
    }, providedOptions );

    const labelText = new Text( MoleculePolarityStrings.bondCharacterStringProperty, MPConstants.CONTROL_TEXT_LABEL_OPTIONS );

    super( bondCharacterVisibleProperty, labelText, options );
  }
}

moleculePolarity.register( 'BondCharacterCheckbox', BondCharacterCheckbox );