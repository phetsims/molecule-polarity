// Copyright 2021-2023, University of Colorado Boulder

/**
 * AtomElectronegativitiesCheckbox is the checkbox for controlling visibility of atom electronegativities.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Text } from '../../../../scenery/js/imports.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPCheckbox, { MPCheckboxOptions } from '../../common/view/MPCheckbox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type AtomElectronegativitiesCheckboxOptions = SelfOptions & PickRequired<MPCheckboxOptions, 'tandem'>;

export default class AtomElectronegativitiesCheckbox extends MPCheckbox {

  public constructor( atomElectronegativitiesVisibleProperty: Property<boolean>,
                      providedOptions: AtomElectronegativitiesCheckboxOptions ) {

    const options = optionize<AtomElectronegativitiesCheckboxOptions, SelfOptions, MPCheckboxOptions>()( {

      // MPCheckboxOptions
      isDisposable: false
    }, providedOptions );

    const labelText = new Text( MoleculePolarityStrings.atomElectronegativitiesStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    super( atomElectronegativitiesVisibleProperty, labelText, options );
  }
}

moleculePolarity.register( 'AtomElectronegativitiesCheckbox', AtomElectronegativitiesCheckbox );