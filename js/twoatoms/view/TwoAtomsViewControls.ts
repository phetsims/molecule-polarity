// Copyright 2017-2022, University of Colorado Boulder

/**
 * TwoAtomsViewControls is the subpanel labeled 'View' in the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Text, TextOptions, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import MPConstants from '../../common/MPConstants.js';
import BondDipolesCheckbox from '../../common/view/BondDipolesCheckbox.js';
import PartialChargesCheckbox from '../../common/view/PartialChargesCheckbox.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import BondCharacterCheckbox from './BondCharacterCheckbox.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

type TwoAtomsViewControlsOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class TwoAtomsViewControls extends VBox {

  public constructor( viewProperties: TwoAtomsViewProperties, providedOptions: TwoAtomsViewControlsOptions ) {

    const options = optionize<TwoAtomsViewControlsOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    }, providedOptions );

    // title
    const titleText = new Text( MoleculePolarityStrings.viewStringProperty, combineOptions<TextOptions>(
      {}, MPConstants.CONTROL_PANEL_TITLE_OPTIONS, {
        tandem: options.tandem.createTandem( 'titleText' )
      } ) );

    // Checkboxes
    const bondDipoleCheckbox = new BondDipolesCheckbox( viewProperties.bondDipoleVisibleProperty, {
      singular: true,
      tandem: options.tandem.createTandem( 'bondDipoleCheckbox' )
    } );
    const partialChargesCheckbox = new PartialChargesCheckbox( viewProperties.partialChargesVisibleProperty, {
      tandem: options.tandem.createTandem( 'partialChargesCheckbox' )
    } );
    const bondCharacterCheckbox = new BondCharacterCheckbox( viewProperties.bondCharacterVisibleProperty, {
      tandem: options.tandem.createTandem( 'bondCharacterCheckbox' )
    } );

    options.children = [
      titleText,
      bondDipoleCheckbox,
      partialChargesCheckbox,
      bondCharacterCheckbox
    ];

    super( options );
  }
}

moleculePolarity.register( 'TwoAtomsViewControls', TwoAtomsViewControls );