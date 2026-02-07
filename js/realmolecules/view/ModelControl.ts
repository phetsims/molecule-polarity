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

type SelfOptions = EmptySelfOptions;

type ModelControlOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class ModelControl extends VBox {

  public constructor( isAdvancedProperty: PhetioProperty<boolean>,
                      providedOptions: ModelControlOptions ) {

    const options = optionize<ModelControlOptions, SelfOptions, VBoxOptions>()( {
      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      isDisposable: false
    }, providedOptions );

    // title
    const titleText = new Text( MoleculePolarityStrings.modelStringProperty, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // Radio button group
    const radioButtonGroup = new ModelRadioButtonGroup( isAdvancedProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    options.children = [ titleText, radioButtonGroup ];

    super( options );
  }
}

moleculePolarity.register( 'ModelControl', ModelControl );