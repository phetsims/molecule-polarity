// Copyright 2017-2025, University of Colorado Boulder

/**
 * TwoAtomsViewControls is the subpanel labeled 'View' in the 'Two Atoms' screen.
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
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';
import ViewControlsCheckboxGroup, { createBondCharacterCheckboxItem, createBondDipoleCheckboxItem, createPartialChargesCheckboxItem } from '../../common/view/ViewControlsCheckboxGroup.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;

type TwoAtomsViewControlsOptions = SelfOptions & PickRequired<StrictOmit<VBoxOptions, 'children'>, 'tandem'>;

export default class TwoAtomsViewControls extends VBox {

  public constructor( viewProperties: TwoAtomsViewProperties, providedOptions: TwoAtomsViewControlsOptions ) {
    super( optionize<TwoAtomsViewControlsOptions, SelfOptions, VBoxOptions>()( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      isDisposable: false,
      children: [
        new Text( MoleculePolarityStrings.viewStringProperty, MPConstants.CONTROL_PANEL_TITLE_OPTIONS ),
        new ViewControlsCheckboxGroup( [
          createBondDipoleCheckboxItem( viewProperties.bondDipoleVisibleProperty ),
          createPartialChargesCheckboxItem( viewProperties.partialChargesVisibleProperty ),
          createBondCharacterCheckboxItem( viewProperties.bondCharacterVisibleProperty )
        ], {
          tandem: providedOptions.tandem.createTandem( 'checkboxGroup' )
        } )
      ]
    }, providedOptions ) );
  }
}

moleculePolarity.register( 'TwoAtomsViewControls', TwoAtomsViewControls );