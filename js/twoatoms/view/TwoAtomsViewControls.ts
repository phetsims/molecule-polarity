// Copyright 2017-2023, University of Colorado Boulder

/**
 * TwoAtomsViewControls is the subpanel labeled 'View' in the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import MPConstants from '../../common/MPConstants.js';
import BondDipolesCheckbox from '../../common/view/BondDipolesCheckbox.js';
import PartialChargesCheckbox from '../../common/view/PartialChargesCheckbox.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import BondCharacterCheckbox from './BondCharacterCheckbox.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';

type SelfOptions = EmptySelfOptions;

type TwoAtomsViewControlsOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class TwoAtomsViewControls extends VBox {

  public constructor( viewProperties: TwoAtomsViewProperties, providedOptions: TwoAtomsViewControlsOptions ) {

    const options = optionize<TwoAtomsViewControlsOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions );

    // title
    const titleText = new Text( MoleculePolarityStrings.viewStringProperty, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

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