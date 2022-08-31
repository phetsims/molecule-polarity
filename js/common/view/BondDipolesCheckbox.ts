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
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import BondDipoleNode from './BondDipoleNode.js';

type SelfOptions = {
  singular?: boolean; // whether the Text label should be singular or plural
};

export type BondDipolesCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class BondDipolesCheckbox extends Checkbox {

  public constructor( bondDipolesVisibleProperty: Property<boolean>, providedOptions: BondDipolesCheckboxOptions ) {

    const options = optionize<BondDipolesCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // BondDipolesCheckboxOptions
      singular: false
    }, providedOptions );

    const stringProperty = options.singular ?
                           moleculePolarityStrings.bondDipoleStringProperty :
                           moleculePolarityStrings.bondDipolesStringProperty;

    const textNode = new Text( stringProperty, combineOptions<TextOptions>( {
      tandem: options.tandem.createTandem( 'textNode' ),
      phetioVisiblePropertyInstrumented: false
    }, MPConstants.CONTROL_TEXT_OPTIONS ) );

    const iconNode = BondDipoleNode.createIcon();

    const content = new HBox( {
      children: [ textNode, iconNode ],
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