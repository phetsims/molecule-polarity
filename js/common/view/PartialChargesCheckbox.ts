// Copyright 2021-2026, University of Colorado Boulder

/**
 * PartialChargesCheckbox is the checkbox for controlling visibility of partial charges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPCheckbox, { MPCheckboxOptions } from './MPCheckbox.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';

type SelfOptions = EmptySelfOptions;

type PartialChargesCheckboxOptions = SelfOptions & PickRequired<MPCheckboxOptions, 'tandem'> & PickOptional<MPCheckboxOptions, 'visibleProperty'>;

export default class PartialChargesCheckbox extends MPCheckbox {

  public constructor( partialChargesVisibleProperty: Property<boolean>, providedOptions: PartialChargesCheckboxOptions ) {

    const options = optionize<PartialChargesCheckboxOptions, SelfOptions, MPCheckboxOptions>()( {

      // MPCheckboxOptions
      isDisposable: false,

      accessibleName: MoleculePolarityFluent.a11y.common.partialChargesCheckbox.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.partialChargesCheckbox.accessibleHelpTextStringProperty
    }, providedOptions );

    const labelText = new Text( MoleculePolarityStrings.partialChargesStringProperty, MPConstants.CONTROL_TEXT_LABEL_OPTIONS );

    super( partialChargesVisibleProperty, labelText, options );

    partialChargesVisibleProperty.lazyLink( checked => {
      const objectResponse = checked ?
                             MoleculePolarityFluent.a11y.common.partialChargesCheckbox.checkedStringProperty.value :
                             MoleculePolarityFluent.a11y.common.partialChargesCheckbox.uncheckedStringProperty.value;
      this.addAccessibleContextResponse( objectResponse );
    } );
  }
}

moleculePolarity.register( 'PartialChargesCheckbox', PartialChargesCheckbox );