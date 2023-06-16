// Copyright 2021-2023, University of Colorado Boulder

/**
 * BondDipolesCheckbox is the checkbox for controlling visibility of one or more bond dipoles.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { HBox, Text, TextOptions } from '../../../../scenery/js/imports.js';
import { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import BondDipoleNode from './BondDipoleNode.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import MPCheckbox from './MPCheckbox.js';

type SelfOptions = {
  singular?: boolean; // whether the Text label should be singular or plural
};

export type BondDipolesCheckboxOptions = SelfOptions & WithRequired<CheckboxOptions, 'tandem'>;

export default class BondDipolesCheckbox extends MPCheckbox {

  public constructor( bondDipolesVisibleProperty: Property<boolean>, providedOptions: BondDipolesCheckboxOptions ) {

    const options = optionize<BondDipolesCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // BondDipolesCheckboxOptions
      singular: false
    }, providedOptions );

    const stringProperty = options.singular ?
                           MoleculePolarityStrings.bondDipoleStringProperty :
                           MoleculePolarityStrings.bondDipolesStringProperty;

    const labelText = new Text( stringProperty, combineOptions<TextOptions>( {}, MPConstants.CONTROL_TEXT_OPTIONS ) );

    const iconNode = BondDipoleNode.createIcon();

    const content = new HBox( {
      children: [ labelText, iconNode ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );

    super( bondDipolesVisibleProperty, content, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'BondDipolesCheckbox', BondDipolesCheckbox );