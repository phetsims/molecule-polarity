// Copyright 2017-2022, University of Colorado Boulder

/**
 * 'View' controls for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text, TextOptions, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import MPConstants from '../../common/MPConstants.js';
import BondDipolesCheckbox from '../../common/view/BondDipolesCheckbox.js';
import MolecularDipoleCheckbox from '../../common/view/MolecularDipoleCheckbox.js';
import PartialChargesCheckbox from '../../common/view/PartialChargesCheckbox.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import ThreeAtomsViewProperties from './ThreeAtomsViewProperties.js';

type SelfOptions = EmptySelfOptions;

type ThreeAtomsViewControlsOptions = SelfOptions & PickRequired<VBox, 'tandem'>;

export default class ThreeAtomsViewControls extends VBox {

  public constructor( viewProperties: ThreeAtomsViewProperties, providedOptions: ThreeAtomsViewControlsOptions ) {

    const options = optionize<ThreeAtomsViewControlsOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    }, providedOptions );

    // title
    const titleText = new Text( MoleculePolarityStrings.viewStringProperty,
      combineOptions<TextOptions>( {}, MPConstants.CONTROL_PANEL_TITLE_OPTIONS, {
        tandem: options.tandem.createTandem( 'titleText' )
      } ) );

    // Checkboxes
    const bondDipolesCheckbox = new BondDipolesCheckbox( viewProperties.bondDipolesVisibleProperty, {
      tandem: options.tandem.createTandem( 'bondDipolesCheckbox' )
    } );
    const molecularDipoleCheckbox = new MolecularDipoleCheckbox( viewProperties.molecularDipoleVisibleProperty, {
      tandem: options.tandem.createTandem( 'molecularDipoleCheckbox' )
    } );
    const partialChargesCheckbox = new PartialChargesCheckbox( viewProperties.partialChargesVisibleProperty, {
      tandem: options.tandem.createTandem( 'partialChargesCheckbox' )
    } );

    options.children = [
      titleText,
      bondDipolesCheckbox,
      molecularDipoleCheckbox,
      partialChargesCheckbox
    ];

    super( options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'ThreeAtomsViewControls', ThreeAtomsViewControls );