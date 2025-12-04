// Copyright 2021-2025, University of Colorado Boulder

/**
 * AtomLabelsCheckbox is the checkbox for controlling visibility of atom labels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import MPConstants from '../../common/MPConstants.js';
import MPCheckbox, { MPCheckboxOptions } from '../../common/view/MPCheckbox.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';

type SelfOptions = EmptySelfOptions;

type AtomLabelsCheckboxOptions = SelfOptions & PickRequired<MPCheckboxOptions, 'tandem'>;

export default class AtomLabelsCheckbox extends MPCheckbox {

  public constructor( atomLabelsVisibleProperty: Property<boolean>, providedOptions: AtomLabelsCheckboxOptions ) {

    const options = optionize<AtomLabelsCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // MPCheckboxOptions
      isDisposable: false,
      accessibleName: MoleculePolarityFluent.a11y.common.atomLabelsCheckbox.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.atomLabelsCheckbox.accessibleHelpTextStringProperty
    }, providedOptions );

    const labelText = new Text( MoleculePolarityStrings.atomLabelsStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    super( atomLabelsVisibleProperty, labelText, options );

    atomLabelsVisibleProperty.lazyLink( checked => {
      const objectResponse = checked ?
                             MoleculePolarityFluent.a11y.common.atomLabelsCheckbox.checkedStringProperty.value :
                             MoleculePolarityFluent.a11y.common.atomLabelsCheckbox.uncheckedStringProperty.value;
      this.addAccessibleObjectResponse( objectResponse );
    } );
  }
}

moleculePolarity.register( 'AtomLabelsCheckbox', AtomLabelsCheckbox );