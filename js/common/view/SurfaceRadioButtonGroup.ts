// Copyright 2021-2026, University of Colorado Boulder

/**
 * SurfaceRadioButtonGroup is the radio button group for choosing a surface for the molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import VerticalAquaRadioButtonGroup, { VerticalAquaRadioButtonGroupOptions } from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import { SurfaceType } from '../model/SurfaceType.js';
import MPConstants from '../MPConstants.js';

// The color mapping used for electrostatic surface, determined by preferences or options
export type ElectrostaticSurfaceColors = 'blueWhiteRed' | 'realMolecules';

type SelfOptions = {

  // Color map used for the electrostatic surface
  electrosaticSurfaceColors?: ElectrostaticSurfaceColors;
};

type SurfaceRadioButtonGroupOptions = SelfOptions & PickRequired<VerticalAquaRadioButtonGroupOptions, 'tandem'>;

export default class SurfaceRadioButtonGroup extends VerticalAquaRadioButtonGroup<SurfaceType> {

  public constructor( surfaceTypeProperty: StringUnionProperty<SurfaceType>,
                      providedOptions: SurfaceRadioButtonGroupOptions ) {

    const options = optionize<SurfaceRadioButtonGroupOptions, SelfOptions, VerticalAquaRadioButtonGroupOptions>()( {

      // Self Options
      electrosaticSurfaceColors: 'blueWhiteRed',

      // VerticalAquaRadioButtonGroupOptions
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS,
      phetioVisiblePropertyInstrumented: false,

      accessibleName: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.accessibleHelpTextStringProperty
    }, providedOptions );

    const radioButtonGroupItems = [
      createItem( 'none',
        MoleculePolarityStrings.noneStringProperty,
        null,
        'noneRadioButton'
      ),
      createItem( 'electrostaticPotential',
        MoleculePolarityStrings.electrostaticPotentialStringProperty,
        MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.electrostaticPotentialHelpText
          .createProperty( {
            colorMap: options.electrosaticSurfaceColors
          } ),
        'electrostaticPotentialRadioButton'
      ),
      createItem( 'electronDensity',
        MoleculePolarityStrings.electronDensityStringProperty,
        MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.electronDensityHelpTextStringProperty,
        'electronDensityRadioButton' )
    ];

    super( surfaceTypeProperty, radioButtonGroupItems, options );

    surfaceTypeProperty.lazyLink( surfaceType => {
      let contextResponse: string;
      switch( surfaceType ) {
        case 'none':
          contextResponse = MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.noneSelectedStringProperty.value;
          break;
        case 'electrostaticPotential':
          contextResponse = MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.electrostaticSelectedStringProperty.value;
          break;
        case 'electronDensity':
          contextResponse = MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.electronDensitySelectedStringProperty.value;
          break;
        default:
          affirm( false, `Unknown surfaceType: ${surfaceType}` );
      }
      this.addAccessibleContextResponse( contextResponse );
    } );
  }
}

// Creates an item for this radio-button group.
function createItem(
  value: SurfaceType,
  labelStringProperty: TReadOnlyProperty<string>,
  accessibleHelpText: TReadOnlyProperty<string> | null,
  tandemName: string
): AquaRadioButtonGroupItem<SurfaceType> {
  return {
    value: value,
    createNode: () => new Text( labelStringProperty, MPConstants.CONTROL_TEXT_OPTIONS ),
    tandemName: tandemName,
    options: {
      accessibleHelpText: accessibleHelpText
    }
  };
}

moleculePolarity.register( 'SurfaceRadioButtonGroup', SurfaceRadioButtonGroup );