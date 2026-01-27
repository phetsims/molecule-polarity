// Copyright 2021-2026, University of Colorado Boulder

/**
 * ModelRadioButtonGroup is the radio button group for choosing a model (basic or advanced) for the molecule
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import VerticalAquaRadioButtonGroup, { VerticalAquaRadioButtonGroupOptions } from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPConstants from '../../common/MPConstants.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';

type SelfOptions = EmptySelfOptions;

type ModelRadioButtonGroupOptions = SelfOptions & PickRequired<VerticalAquaRadioButtonGroupOptions, 'tandem'>;

export default class ModelRadioButtonGroup extends VerticalAquaRadioButtonGroup<boolean> {

  public constructor( isAdvancedProperty: PhetioProperty<boolean>,
                      providedOptions: ModelRadioButtonGroupOptions ) {

    const options = optionize<ModelRadioButtonGroupOptions, SelfOptions, VerticalAquaRadioButtonGroupOptions>()( {

      // VerticalAquaRadioButtonGroupOptions
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS,
      phetioVisiblePropertyInstrumented: false,

      accessibleName: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.accessibleHelpTextStringProperty
    }, providedOptions );

    const radioButtonGroupItems = [
      createItem( false,
        MoleculePolarityStrings.basicStringProperty,
        null,
        'basicRadioButton'
      ),
      createItem( true,
        MoleculePolarityStrings.advancedStringProperty,
        null,
        'advancedRadioButton'
      )
    ];

    super( isAdvancedProperty, radioButtonGroupItems, options );
  }
}

// Creates an item for this radio-button group.
function createItem(
  value: boolean,
  labelStringProperty: TReadOnlyProperty<string>,
  accessibleHelpText: TReadOnlyProperty<string> | null,
  tandemName: string
): AquaRadioButtonGroupItem<boolean> {
  return {
    value: value,
    createNode: () => new Text( labelStringProperty, MPConstants.CONTROL_TEXT_OPTIONS ),
    tandemName: tandemName,
    options: {
      accessibleHelpText: accessibleHelpText
    }
  };
}

moleculePolarity.register( 'ModelRadioButtonGroup', ModelRadioButtonGroup );