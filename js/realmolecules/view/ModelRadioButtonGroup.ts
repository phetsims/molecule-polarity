// Copyright 2026, University of Colorado Boulder

/**
 * ModelRadioButtonGroup is the radio button group for choosing a model (basic or advanced) for the molecule.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VerticalAquaRadioButtonGroup, { VerticalAquaRadioButtonGroupOptions } from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';

type SelfOptions = EmptySelfOptions;

type ModelRadioButtonGroupOptions = SelfOptions & PickRequired<VerticalAquaRadioButtonGroupOptions, 'tandem'>;

export default class ModelRadioButtonGroup extends VerticalAquaRadioButtonGroup<boolean> {

  public constructor( isAdvancedProperty: PhetioProperty<boolean>,
                      providedOptions: ModelRadioButtonGroupOptions ) {

    const options = optionize<ModelRadioButtonGroupOptions, SelfOptions, VerticalAquaRadioButtonGroupOptions>()( {

      // VerticalAquaRadioButtonGroupOptions
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      mouseAreaXDilation: MPConstants.CONTROL_PANEL_MOUSE_X_DILATION,
      touchAreaXDilation: MPConstants.CONTROL_PANEL_TOUCH_X_DILATION,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS,
      phetioVisiblePropertyInstrumented: false,

      accessibleName: MoleculePolarityFluent.a11y.realMoleculesScreen.modelRadioButtonGroup.accessibleNameStringProperty
    }, providedOptions );

    const radioButtonGroupItems = [
      {
        value: false,
        createNode: () => new Text( MoleculePolarityStrings.basicStringProperty, MPConstants.CONTROL_TEXT_LABEL_OPTIONS ),
        tandemName: 'basicRadioButton',
        options: {
          accessibleName: MoleculePolarityStrings.basicStringProperty,
          accessibleHelpText: MoleculePolarityFluent.a11y.realMoleculesScreen.modelRadioButtonGroup.basicHelpTextStringProperty
        }
      },
      {
        value: true,
        createNode: () => new Text( MoleculePolarityStrings.advancedStringProperty, MPConstants.CONTROL_TEXT_LABEL_OPTIONS ),
        tandemName: 'advancedRadioButton',
        options: {
          accessibleName: MoleculePolarityStrings.advancedStringProperty,
          accessibleHelpText: MoleculePolarityFluent.a11y.realMoleculesScreen.modelRadioButtonGroup.advancedHelpTextStringProperty
        }
      }
    ];

    super( isAdvancedProperty, radioButtonGroupItems, options );
  }
}

moleculePolarity.register( 'ModelRadioButtonGroup', ModelRadioButtonGroup );