// Copyright 2017-2025, University of Colorado Boulder

/**
 * 'View' controls for the 'Three Atoms' screen.
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
import ThreeAtomsViewProperties from './ThreeAtomsViewProperties.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import { createBondDipolesCheckboxItem, createMolecularDipoleCheckboxItem, createPartialChargesCheckboxItem } from '../../common/view/ViewControlCheckboxItems.js';

type SelfOptions = EmptySelfOptions;

type ThreeAtomsViewControlsOptions = SelfOptions & PickRequired<VBox, 'tandem'>;

export default class ThreeAtomsViewControls extends VBox {

  public constructor( viewProperties: ThreeAtomsViewProperties, providedOptions: ThreeAtomsViewControlsOptions ) {

    const options = optionize<ThreeAtomsViewControlsOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      isDisposable: false
    }, providedOptions );

    // title
    const titleText = new Text( MoleculePolarityStrings.viewStringProperty, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    const checkboxGroup = new VerticalCheckboxGroup( [
      createBondDipolesCheckboxItem( viewProperties.bondDipolesVisibleProperty ),
      createMolecularDipoleCheckboxItem( viewProperties.molecularDipoleVisibleProperty ),
      createPartialChargesCheckboxItem( viewProperties.partialChargesVisibleProperty )
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

moleculePolarity.register( 'ThreeAtomsViewControls', ThreeAtomsViewControls );