// Copyright 2021-2026, University of Colorado Boulder

/**
 * SurfaceRadioButtonGroup is the radio button group for choosing a surface for the molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VerticalAquaRadioButtonGroup, { VerticalAquaRadioButtonGroupOptions } from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import { SurfaceColor } from '../model/SurfaceColor.js';
import { SurfaceType } from '../model/SurfaceType.js';
import MPConstants from '../MPConstants.js';

type SelfOptions = {

  // Color map used for the electrostatic surface
  electrosaticSurfaceColorsProperty?: TProperty<SurfaceColor>;
};

type SurfaceRadioButtonGroupOptions = SelfOptions & PickRequired<VerticalAquaRadioButtonGroupOptions, 'tandem'>;

export default class SurfaceRadioButtonGroup extends VerticalAquaRadioButtonGroup<SurfaceType> {

  public constructor( surfaceTypeProperty: StringUnionProperty<SurfaceType>,
                      providedOptions: SurfaceRadioButtonGroupOptions ) {

    const options = optionize<SurfaceRadioButtonGroupOptions, SelfOptions, VerticalAquaRadioButtonGroupOptions>()( {

      // Self Options
      electrosaticSurfaceColorsProperty: new Property<SurfaceColor>( 'blueWhiteRed' ),

      // VerticalAquaRadioButtonGroupOptions
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      mouseAreaXDilation: MPConstants.CONTROL_PANEL_MOUSE_X_DILATION,
      touchAreaXDilation: MPConstants.CONTROL_PANEL_TOUCH_X_DILATION,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS,
      phetioVisiblePropertyInstrumented: false,

      accessibleName: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.accessibleHelpTextStringProperty
    }, providedOptions );

    const radioButtonGroupItems = [
      {
        value: 'none' as const,
        createNode: () => new Text( MoleculePolarityStrings.noneStringProperty, MPConstants.CONTROL_TEXT_LABEL_OPTIONS ),
        tandemName: 'noneRadioButton',
        options: {
          accessibleHelpText: null,
          accessibleContextResponse: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.noneSelectedStringProperty
        }
      },
      {
        value: 'electrostaticPotential' as const,
        createNode: () => new Text( MoleculePolarityStrings.electrostaticPotentialStringProperty, MPConstants.CONTROL_TEXT_LABEL_OPTIONS ),
        tandemName: 'electrostaticPotentialRadioButton',
        options: {
          accessibleHelpText: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.electrostaticPotentialHelpText
            .createProperty( {
              colorMap: options.electrosaticSurfaceColorsProperty
            } ),
          accessibleContextResponse: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.electrostaticSelectedStringProperty
        }
      },
      {
        value: 'electronDensity' as const,
        createNode: () => new Text( MoleculePolarityStrings.electronDensityStringProperty, MPConstants.CONTROL_TEXT_LABEL_OPTIONS ),
        tandemName: 'electronDensityRadioButton',
        options: {
          accessibleHelpText: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.electronDensityHelpTextStringProperty,
          accessibleContextResponse: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.electronDensitySelectedStringProperty
        }
      }
    ];

    super( surfaceTypeProperty, radioButtonGroupItems, options );
  }
}

// Creates an item for this radio-button group.
moleculePolarity.register( 'SurfaceRadioButtonGroup', SurfaceRadioButtonGroup );