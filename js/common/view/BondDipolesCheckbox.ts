// Copyright 2021-2023, University of Colorado Boulder

/**
 * BondDipolesCheckbox is the checkbox for controlling visibility of one or more bond dipoles.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import { HBox, Text, TextOptions } from '../../../../scenery/js/imports.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import BondDipoleNode from './BondDipoleNode.js';
import MPCheckbox, { MPCheckboxOptions } from './MPCheckbox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = {
  singular?: boolean; // whether the Text label should be singular or plural
};

export type BondDipolesCheckboxOptions = SelfOptions & PickRequired<MPCheckboxOptions, 'tandem'>;

export default class BondDipolesCheckbox extends MPCheckbox {

  public constructor( bondDipolesVisibleProperty: Property<boolean>, providedOptions: BondDipolesCheckboxOptions ) {

    const options = optionize<BondDipolesCheckboxOptions, SelfOptions, MPCheckboxOptions>()( {

      // BondDipolesCheckboxOptions
      singular: false,

      // MPCheckboxOptions
      isDisposable: false
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
}

moleculePolarity.register( 'BondDipolesCheckbox', BondDipolesCheckbox );