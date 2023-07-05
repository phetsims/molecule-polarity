// Copyright 2021-2023, University of Colorado Boulder

/**
 * AtomLabelsCheckbox is the checkbox for controlling visibility of atom labels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Text } from '../../../../scenery/js/imports.js';
import { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPCheckbox, { MPCheckboxOptions } from '../../common/view/MPCheckbox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type AtomLabelsCheckboxOptions = SelfOptions & PickRequired<MPCheckboxOptions, 'tandem'>;

export default class AtomLabelsCheckbox extends MPCheckbox {

  public constructor( atomLabelsVisibleProperty: Property<boolean>, providedOptions: AtomLabelsCheckboxOptions ) {

    const options = optionize<AtomLabelsCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // MPCheckboxOptions
      isDisposable: false
    }, providedOptions );

    const labelText = new Text( MoleculePolarityStrings.atomLabelsStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    super( atomLabelsVisibleProperty, labelText, options );
  }
}

moleculePolarity.register( 'AtomLabelsCheckbox', AtomLabelsCheckbox );