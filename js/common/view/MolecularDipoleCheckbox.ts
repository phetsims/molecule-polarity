// Copyright 2021-2023, University of Colorado Boulder

/**
 * MolecularDipoleCheckbox is the checkbox for controlling visibility of the molecular dipole.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { HBox, Text } from '../../../../scenery/js/imports.js';
import { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MolecularDipoleNode from './MolecularDipoleNode.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import MPCheckbox from './MPCheckbox.js';

type SelfOptions = EmptySelfOptions;

type MolecularDipoleCheckboxOptions = SelfOptions & WithRequired<CheckboxOptions, 'tandem'>;

export default class MolecularDipoleCheckbox extends MPCheckbox {

  public constructor( molecularDipoleVisibleProperty: Property<boolean>, providedOptions: MolecularDipoleCheckboxOptions ) {

    const options = providedOptions;

    const labelText = new Text( MoleculePolarityStrings.molecularDipoleStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    const iconNode = MolecularDipoleNode.createIcon();

    const content = new HBox( {
      children: [ labelText, iconNode ],
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