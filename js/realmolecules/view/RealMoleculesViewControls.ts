// Copyright 2017-2022, University of Colorado Boulder

/**
 * RealMoleculesViewControls is the subpanel labeled 'View' in the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Text, TextOptions, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import MPConstants from '../../common/MPConstants.js';
import BondDipolesCheckbox from '../../common/view/BondDipolesCheckbox.js';
import MolecularDipoleCheckbox from '../../common/view/MolecularDipoleCheckbox.js';
import PartialChargesCheckbox from '../../common/view/PartialChargesCheckbox.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import AtomElectronegativitiesCheckbox from './AtomElectronegativitiesCheckbox.js';
import AtomLabelsCheckbox from './AtomLabelsCheckbox.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

type RealMoleculesViewControlsOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class RealMoleculesViewControls extends VBox {

  public constructor( viewProperties: RealMoleculesViewProperties, provideOptions: RealMoleculesViewControlsOptions ) {

    const options = optionize<RealMoleculesViewControlsOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    }, provideOptions );

    const titleText = new Text( MoleculePolarityStrings.viewStringProperty,
      combineOptions<TextOptions>( {}, MPConstants.CONTROL_PANEL_TITLE_OPTIONS, {
        tandem: options.tandem.createTandem( 'titleText' )
      } ) );

    const bondDipolesCheckbox = new BondDipolesCheckbox( viewProperties.bondDipolesVisibleProperty, {
      tandem: options.tandem.createTandem( 'bondDipolesCheckbox' )
    } );

    const molecularDipoleCheckbox = new MolecularDipoleCheckbox( viewProperties.molecularDipoleVisibleProperty, {
      tandem: options.tandem.createTandem( 'molecularDipoleCheckbox' )
    } );

    const partialChargesCheckbox = new PartialChargesCheckbox( viewProperties.partialChargesVisibleProperty, {
      tandem: options.tandem.createTandem( 'partialChargesCheckbox' )
    } );

    const atomLabelsCheckbox = new AtomLabelsCheckbox( viewProperties.atomLabelsVisibleProperty, {
      tandem: options.tandem.createTandem( 'atomLabelsCheckbox' )
    } );

    const atomElectronegativitiesCheckbox = new AtomElectronegativitiesCheckbox( viewProperties.atomElectronegativitiesVisibleProperty, {
      tandem: options.tandem.createTandem( 'atomElectronegativitiesCheckbox' )
    } );

    options.children = [
      titleText,
      bondDipolesCheckbox,
      molecularDipoleCheckbox,
      partialChargesCheckbox,
      atomLabelsCheckbox,
      atomElectronegativitiesCheckbox
    ];

    super( options );
  }
}

moleculePolarity.register( 'RealMoleculesViewControls', RealMoleculesViewControls );