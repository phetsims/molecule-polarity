// Copyright 2026, University of Colorado Boulder

/**
 * Control panel for the molecule's model (basic or advanced).
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import ModelRadioButtonGroup from './ModelRadioButtonGroup.js';
import MPConstants from '../../common/MPConstants.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;

type ModelControlOptions = SelfOptions & PickRequired<StrictOmit<VBoxOptions, 'children'>, 'tandem'>;

export default class ModelControl extends VBox {

  public constructor( isAdvancedProperty: PhetioProperty<boolean>, providedOptions: ModelControlOptions ) {
    super( optionize<ModelControlOptions, SelfOptions, VBoxOptions>()( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      isDisposable: false,
      children: [
        new Text( MoleculePolarityStrings.modelStringProperty, MPConstants.CONTROL_PANEL_TITLE_OPTIONS ),
        new ModelRadioButtonGroup( isAdvancedProperty, {
          tandem: providedOptions.tandem.createTandem( 'radioButtonGroup' )
        } )
      ]
    }, providedOptions ) );
  }
}

moleculePolarity.register( 'ModelControl', ModelControl );