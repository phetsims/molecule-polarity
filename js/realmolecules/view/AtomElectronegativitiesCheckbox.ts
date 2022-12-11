// Copyright 2021-2022, University of Colorado Boulder

/**
 * AtomElectronegativitiesCheckbox is the checkbox for controlling visibility of atom electronegativities.
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
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';

type SelfOptions = EmptySelfOptions;

type AtomElectronegativitiesCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class AtomElectronegativitiesCheckbox extends Checkbox {

  public constructor( atomElectronegativitiesVisibleProperty: Property<boolean>,
                      providedOptions: AtomElectronegativitiesCheckboxOptions ) {

    const options = providedOptions;

    const labelText = new Text( MoleculePolarityStrings.atomElectronegativitiesStringProperty,
      combineOptions<TextOptions>( {}, MPConstants.CONTROL_TEXT_OPTIONS, {
        tandem: options.tandem.createTandem( 'labelText' )
      } ) );

    super( atomElectronegativitiesVisibleProperty, labelText, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'AtomElectronegativitiesCheckbox', AtomElectronegativitiesCheckbox );