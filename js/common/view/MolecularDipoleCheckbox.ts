// Copyright 2021-2025, University of Colorado Boulder

/**
 * MolecularDipoleCheckbox is the checkbox for controlling visibility of the molecular dipole.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MolecularDipoleNode from './MolecularDipoleNode.js';
import MPCheckbox, { MPCheckboxOptions } from './MPCheckbox.js';

type SelfOptions = EmptySelfOptions;

type MolecularDipoleCheckboxOptions = SelfOptions & PickRequired<MPCheckboxOptions, 'tandem'>;

export default class MolecularDipoleCheckbox extends MPCheckbox {

  public constructor( molecularDipoleVisibleProperty: Property<boolean>, providedOptions: MolecularDipoleCheckboxOptions ) {

    const options = optionize<MolecularDipoleCheckboxOptions, SelfOptions, MPCheckboxOptions>()( {
      phetioDisplayOnlyPropertyInstrumented: true,

      // MPCheckboxOptions
      isDisposable: false,
      accessibleName: MoleculePolarityFluent.a11y.common.molecularDipoleCheckbox.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.molecularDipoleCheckbox.accessibleHelpTextStringProperty
    }, providedOptions );

    const labelText = new Text( MoleculePolarityStrings.molecularDipoleStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    const iconNode = MolecularDipoleNode.createIcon();

    const content = new HBox( {
      children: [ labelText, iconNode ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );

    super( molecularDipoleVisibleProperty, content, options );

    molecularDipoleVisibleProperty.lazyLink( checked => {
      const objectResponse = checked ?
                             MoleculePolarityFluent.a11y.common.molecularDipoleCheckbox.checkedStringProperty.value :
                             MoleculePolarityFluent.a11y.common.molecularDipoleCheckbox.uncheckedStringProperty.value;
      this.addAccessibleObjectResponse( objectResponse );
    } );
  }
}

moleculePolarity.register( 'MolecularDipoleCheckbox', MolecularDipoleCheckbox );