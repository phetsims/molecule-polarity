// Copyright 2021-2026, University of Colorado Boulder

/**
 * BondDipolesCheckbox is the checkbox for controlling visibility of one or more bond dipoles.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import HBox, { HBoxOptions } from '../../../../scenery/js/layout/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import BondDipoleNode from './BondDipoleNode.js';
import MPCheckbox, { MPCheckboxOptions } from './MPCheckbox.js';

type SelfOptions = {
  singular?: boolean; // whether the Text label should be singular or plural
};

export type BondDipolesCheckboxOptions = SelfOptions & PickRequired<MPCheckboxOptions, 'tandem'>;

export default class BondDipolesCheckbox extends MPCheckbox {

  public constructor( bondDipolesVisibleProperty: Property<boolean>, providedOptions: BondDipolesCheckboxOptions ) {

    const options = optionize<BondDipolesCheckboxOptions, SelfOptions, MPCheckboxOptions>()( {
      phetioDisplayOnlyPropertyInstrumented: true,

      // BondDipolesCheckboxOptions
      singular: false,

      // MPCheckboxOptions
      isDisposable: false,

      accessibleName: providedOptions.singular ?
                      MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.accessibleNameStringProperty :
                      MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.accessibleNamePluralStringProperty,
      accessibleHelpText: providedOptions.singular ?
                          MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.accessibleHelpTextStringProperty :
                          MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.accessibleHelpTextPluralStringProperty
    }, providedOptions );

    const stringProperty = options.singular ?
                           MoleculePolarityStrings.bondDipoleStringProperty :
                           MoleculePolarityStrings.bondDipolesStringProperty;

    const labelText = new Text( stringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    const iconNode = BondDipoleNode.createIcon();

    const content = new HBox( combineOptions<HBoxOptions>( {
      children: [ labelText, iconNode ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    }, MPConstants.CONTROL_LABEL_OPTIONS ) );

    super( bondDipolesVisibleProperty, content, options );

    bondDipolesVisibleProperty.lazyLink( checked => {
      const objectResponse = checked ?
                             options.singular ?
                                MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.checkedStringProperty.value :
                                MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.checkedPluralStringProperty.value :
                             options.singular ?
                                MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.uncheckedStringProperty.value :
                                MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.uncheckedPluralStringProperty.value;
      this.addAccessibleContextResponse( objectResponse );
    } );
  }
}

moleculePolarity.register( 'BondDipolesCheckbox', BondDipolesCheckbox );