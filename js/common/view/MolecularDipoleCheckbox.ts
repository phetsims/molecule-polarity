// Copyright 2021-2022, University of Colorado Boulder

/**
 * MolecularDipoleCheckbox is the checkbox for controlling visibility of the molecular dipole.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { HBox, Text, TextOptions } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import MolecularDipoleNode from './MolecularDipoleNode.js';

type SelfOptions = EmptySelfOptions;

export type MolecularDipoleCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class MolecularDipoleCheckbox extends Checkbox {

  public constructor( molecularDipoleVisibleProperty: Property<boolean>, providedOptions: MolecularDipoleCheckboxOptions ) {

    const options = providedOptions;

    const textNode = new Text( moleculePolarityStrings.molecularDipoleStringProperty,
      combineOptions<TextOptions>( {
        tandem: options.tandem.createTandem( 'textNode' ),
        phetioVisiblePropertyInstrumented: false
      }, MPConstants.CONTROL_TEXT_OPTIONS ) );

    const iconNode = MolecularDipoleNode.createIcon();

    const content = new HBox( {
      children: [ textNode, iconNode ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );

    super( molecularDipoleVisibleProperty, content, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'MolecularDipoleCheckbox', MolecularDipoleCheckbox );