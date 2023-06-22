// Copyright 2021-2023, University of Colorado Boulder

/**
 * BondCharacterCheckbox is the checkbox for controlling visibility of the 'Bond Character' display.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Text } from '../../../../scenery/js/imports.js';
import { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import MPCheckbox from '../../common/view/MPCheckbox.js';

type SelfOptions = EmptySelfOptions;

type BondCharacterCheckboxOptions = SelfOptions & WithRequired<CheckboxOptions, 'tandem'>;

export default class BondCharacterCheckbox extends MPCheckbox {

  public constructor( bondCharacterVisibleProperty: Property<boolean>, providedOptions: BondCharacterCheckboxOptions ) {

    const options = providedOptions;

    const labelText = new Text( MoleculePolarityStrings.bondCharacterStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    super( bondCharacterVisibleProperty, labelText, options );
  }

  public override dispose(): void {
    Disposable.assertNotDisposable();
    super.dispose();
  }
}

moleculePolarity.register( 'BondCharacterCheckbox', BondCharacterCheckbox );