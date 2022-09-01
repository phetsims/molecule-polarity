// Copyright 2021-2022, University of Colorado Boulder

/**
 * AtomLabelsCheckbox is the checkbox for controlling visibility of atom labels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text, TextOptions } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';

type SelfOptions = EmptySelfOptions;

export type AtomLabelsCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class AtomLabelsCheckbox extends Checkbox {

  public constructor( atomLabelsVisibleProperty: Property<boolean>, providedOptions: AtomLabelsCheckboxOptions ) {

    const options = optionize<AtomLabelsCheckboxOptions, SelfOptions, CheckboxOptions>()( {
      tandem: Tandem.REQUIRED
    }, providedOptions );

    const labelText = new Text( moleculePolarityStrings.atomLabelsStringProperty,
      combineOptions<TextOptions>( {
        tandem: options.tandem.createTandem( 'labelText' ),
        phetioVisiblePropertyInstrumented: false
      }, MPConstants.CONTROL_TEXT_OPTIONS ) );

    super( atomLabelsVisibleProperty, labelText, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'AtomLabelsCheckbox', AtomLabelsCheckbox );