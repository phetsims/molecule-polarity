// Copyright 2017-2025, University of Colorado Boulder

/**
 * TwoAtomsViewControls is the subpanel labeled 'View' in the 'Two Atoms' screen.
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
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import { createBondCharacterCheckboxItem, createBondDipoleCheckboxItem, createPartialChargesCheckboxItem } from '../../common/view/ViewControlCheckboxItems.js';

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

    const checkboxGroup = new VerticalCheckboxGroup( [
      createBondDipoleCheckboxItem( viewProperties.bondDipoleVisibleProperty ),
      createPartialChargesCheckboxItem( viewProperties.partialChargesVisibleProperty ),
      createBondCharacterCheckboxItem( viewProperties.bondCharacterVisibleProperty )
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

moleculePolarity.register( 'TwoAtomsViewControls', TwoAtomsViewControls );