// Copyright 2021-2022, University of Colorado Boulder

/**
 * BondDipolesCheckbox is the checkbox for controlling visibility of one or more bond dipoles.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { HBox, Text, TextOptions } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import BondDipoleNode from './BondDipoleNode.js';

type SelfOptions = {
  singular?: boolean; // whether the Text label should be singular or plural
};

type BondDipolesCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class BondDipolesCheckbox extends Checkbox {

  public constructor( bondDipolesVisibleProperty: Property<boolean>, providedOptions: BondDipolesCheckboxOptions ) {

    const options = optionize<BondDipolesCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // BondDipolesCheckboxOptions
      singular: false
    }, providedOptions );

    const stringProperty = options.singular ?
                           MoleculePolarityStrings.bondDipoleStringProperty :
                           MoleculePolarityStrings.bondDipolesStringProperty;

    const labelText = new Text( stringProperty, combineOptions<TextOptions>( {}, MPConstants.CONTROL_TEXT_OPTIONS, {
      tandem: options.tandem.createTandem( 'labelText' )
    } ) );

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