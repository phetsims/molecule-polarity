// Copyright 2017-2026, University of Colorado Boulder

/**
 * RealMoleculesViewControls is the subpanel labeled 'View' in the 'Real Molecules' screen.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import ViewControlsCheckboxGroup, { createAtomElectronegativitiesCheckboxItem, createAtomLabelsCheckboxItem, createBondDipolesCheckboxItem, createMolecularDipoleCheckboxItem, createPartialChargesCheckboxItem } from '../../common/view/ViewControlsCheckboxGroup.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;

type RealMoleculesViewControlsOptions = SelfOptions & PickRequired<StrictOmit<VBoxOptions, 'children'>, 'tandem'>;

export default class RealMoleculesViewControls extends VBox {

  public constructor(
    isAdvancedProperty: PhetioProperty<boolean>,
    viewProperties: RealMoleculesViewProperties,
    provideOptions: RealMoleculesViewControlsOptions
  ) {
    super( optionize<RealMoleculesViewControlsOptions, SelfOptions, VBoxOptions>()( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      isDisposable: false,
      children: [
        new Text( MoleculePolarityStrings.viewStringProperty, MPConstants.CONTROL_PANEL_TITLE_OPTIONS ),
        new ViewControlsCheckboxGroup( [
          createBondDipolesCheckboxItem( viewProperties.bondDipolesVisibleProperty ),
          createMolecularDipoleCheckboxItem( viewProperties.molecularDipoleVisibleProperty ),
          createPartialChargesCheckboxItem( viewProperties.partialChargesVisibleProperty, isAdvancedProperty ),
          createAtomElectronegativitiesCheckboxItem( viewProperties.atomElectronegativitiesVisibleProperty ),
          createAtomLabelsCheckboxItem( viewProperties.atomLabelsVisibleProperty )
        ], {
          tandem: provideOptions.tandem.createTandem( 'checkboxGroup' )
        } )
      ]
    }, provideOptions ) );
  }
}

moleculePolarity.register( 'RealMoleculesViewControls', RealMoleculesViewControls );