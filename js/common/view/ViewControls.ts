// Copyright 2017-2026, University of Colorado Boulder

/**
 * Extracts shared behavior for all of the view controls across screens
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import ViewControlsCheckboxGroup from '../../common/view/ViewControlsCheckboxGroup.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { VerticalCheckboxGroupItem } from '../../../../sun/js/VerticalCheckboxGroup.js';

type SelfOptions = EmptySelfOptions;

export type ViewControlsOptions = SelfOptions & PickRequired<StrictOmit<VBoxOptions, 'children'>, 'tandem'>;

export default class ViewControls extends VBox {
  public constructor(
    titleStringProperty: TReadOnlyProperty<string>,
    items: VerticalCheckboxGroupItem[],
    provideOptions: ViewControlsOptions
  ) {
    super( optionize<ViewControlsOptions, SelfOptions, VBoxOptions>()( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      isDisposable: false,
      children: [
        new Text( titleStringProperty, MPConstants.CONTROL_PANEL_TITLE_OPTIONS ),
        new ViewControlsCheckboxGroup( items, {
          tandem: provideOptions.tandem.createTandem( 'checkboxGroup' )
        } )
      ]
    }, provideOptions ) );
  }
}

moleculePolarity.register( 'ViewControls', ViewControls );