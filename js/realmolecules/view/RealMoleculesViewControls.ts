// Copyright 2017-2026, University of Colorado Boulder

/**
 * RealMoleculesViewControls is the subpanel labeled 'View' in the 'Real Molecules' screen.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Chris Malley (PixelZoom, Inc.)
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
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import { createAtomElectronegativitiesCheckboxItem, createAtomLabelsCheckboxItem, createBondDipolesCheckboxItem, createMolecularDipoleCheckboxItem, createPartialChargesCheckboxItem } from '../../common/view/ViewControlCheckboxItems.js';

type SelfOptions = EmptySelfOptions;

type RealMoleculesViewControlsOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class RealMoleculesViewControls extends VBox {

  public constructor(
    isAdvancedProperty: PhetioProperty<boolean>,
    viewProperties: RealMoleculesViewProperties,
    provideOptions: RealMoleculesViewControlsOptions
  ) {

    const options = optionize<RealMoleculesViewControlsOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, provideOptions );

    const titleText = new Text( MoleculePolarityStrings.viewStringProperty, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    const checkboxGroup = new VerticalCheckboxGroup( [
      createBondDipolesCheckboxItem( viewProperties.bondDipolesVisibleProperty ),
      createMolecularDipoleCheckboxItem( viewProperties.molecularDipoleVisibleProperty ),
      createPartialChargesCheckboxItem( viewProperties.partialChargesVisibleProperty, isAdvancedProperty ),
      createAtomElectronegativitiesCheckboxItem( viewProperties.atomElectronegativitiesVisibleProperty ),
      createAtomLabelsCheckboxItem( viewProperties.atomLabelsVisibleProperty )
    ], {
      mouseAreaXDilation: MPConstants.CONTROL_PANEL_MOUSE_X_DILATION,
      touchAreaXDilation: MPConstants.CONTROL_PANEL_TOUCH_X_DILATION,
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: options.tandem.createTandem( 'checkboxGroup' ),
      checkboxOptions: {
        isDisposable: false
      },
      phetioVisiblePropertyInstrumented: false
    } );

    options.children = [
      titleText,
      checkboxGroup
    ];

    super( options );
  }
}

moleculePolarity.register( 'RealMoleculesViewControls', RealMoleculesViewControls );