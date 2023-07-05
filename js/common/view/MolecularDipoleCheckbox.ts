// Copyright 2021-2023, University of Colorado Boulder

/**
 * MolecularDipoleCheckbox is the checkbox for controlling visibility of the molecular dipole.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { HBox, Text } from '../../../../scenery/js/imports.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MolecularDipoleNode from './MolecularDipoleNode.js';
import MPCheckbox, { MPCheckboxOptions } from './MPCheckbox.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type MolecularDipoleCheckboxOptions = SelfOptions & PickRequired<MPCheckboxOptions, 'tandem'>;

export default class MolecularDipoleCheckbox extends MPCheckbox {

  public constructor( molecularDipoleVisibleProperty: Property<boolean>, providedOptions: MolecularDipoleCheckboxOptions ) {

    const options = optionize<MolecularDipoleCheckboxOptions, SelfOptions, MPCheckboxOptions>()( {

      // MPCheckboxOptions
      isDisposable: false
    }, providedOptions );

    const labelText = new Text( MoleculePolarityStrings.molecularDipoleStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );

    const iconNode = MolecularDipoleNode.createIcon();

    const content = new HBox( {
      children: [ labelText, iconNode ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );

    super( molecularDipoleVisibleProperty, content, options );
  }
}

moleculePolarity.register( 'MolecularDipoleCheckbox', MolecularDipoleCheckbox );