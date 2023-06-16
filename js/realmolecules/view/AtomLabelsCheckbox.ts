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
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import MPCheckbox from '../../common/view/MPCheckbox.js';

type SelfOptions = EmptySelfOptions;

type AtomLabelsCheckboxOptions = SelfOptions & WithRequired<CheckboxOptions, 'tandem'>;

export default class AtomLabelsCheckbox extends MPCheckbox {

  public constructor( atomLabelsVisibleProperty: Property<boolean>, providedOptions: AtomLabelsCheckboxOptions ) {

    const options = optionize<AtomLabelsCheckboxOptions, SelfOptions, CheckboxOptions>()( {}, providedOptions );

    const labelText = new Text( MoleculePolarityStrings.atomLabelsStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    super( atomLabelsVisibleProperty, labelText, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'AtomLabelsCheckbox', AtomLabelsCheckbox );