// Copyright 2021-2026, University of Colorado Boulder

/**
 * AtomElectronegativitiesCheckbox is the checkbox for controlling visibility of atom electronegativities.
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

type AtomElectronegativitiesCheckboxOptions = SelfOptions & PickRequired<MPCheckboxOptions, 'tandem'>;

export default class AtomElectronegativitiesCheckbox extends MPCheckbox {

  public constructor( atomElectronegativitiesVisibleProperty: Property<boolean>,
                      providedOptions: AtomElectronegativitiesCheckboxOptions ) {

    const options = optionize<AtomElectronegativitiesCheckboxOptions, SelfOptions, MPCheckboxOptions>()( {

      // MPCheckboxOptions
      isDisposable: false,
      accessibleName: MoleculePolarityFluent.a11y.common.atomElectronegativitiesCheckbox.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.atomElectronegativitiesCheckbox.accessibleHelpTextStringProperty
    }, providedOptions );

    const labelText = new Text( MoleculePolarityStrings.atomElectronegativitiesStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    super( atomElectronegativitiesVisibleProperty, labelText, options );

    atomElectronegativitiesVisibleProperty.lazyLink( checked => {
      const objectResponse = checked ?
                             MoleculePolarityFluent.a11y.common.atomElectronegativitiesCheckbox.checkedStringProperty.value :
                             MoleculePolarityFluent.a11y.common.atomElectronegativitiesCheckbox.uncheckedStringProperty.value;
      this.addAccessibleContextResponse( objectResponse );
    } );
  }
}

moleculePolarity.register( 'AtomElectronegativitiesCheckbox', AtomElectronegativitiesCheckbox );