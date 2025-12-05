// Copyright 2021-2025, University of Colorado Boulder

/**
 * SurfaceRadioButtonGroup is the radio button group for choosing a surface for the molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import VerticalAquaRadioButtonGroup, { VerticalAquaRadioButtonGroupOptions } from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import { SurfaceType } from '../model/SurfaceType.js';
import MPConstants from '../MPConstants.js';

type SelfOptions = EmptySelfOptions;

type SurfaceRadioButtonGroupOptions = SelfOptions & PickRequired<VerticalAquaRadioButtonGroupOptions, 'tandem'>;

export default class SurfaceRadioButtonGroup extends VerticalAquaRadioButtonGroup<SurfaceType> {

  public constructor( surfaceTypeProperty: StringUnionProperty<SurfaceType>,
                      providedOptions: SurfaceRadioButtonGroupOptions ) {

    const options = optionize<SurfaceRadioButtonGroupOptions, SelfOptions, VerticalAquaRadioButtonGroupOptions>()( {

      // VerticalAquaRadioButtonGroupOptions
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS,
      visiblePropertyOptions: {
        phetioFeatured: false
      },

      accessibleName: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.accessibleHelpTextStringProperty
    }, providedOptions );

    const radioButtonGroupItems = [
      createItem( 'none', MoleculePolarityStrings.noneStringProperty, 'noneRadioButton' ),
      createItem( 'electrostaticPotential', MoleculePolarityStrings.electrostaticPotentialStringProperty, 'electrostaticPotentialRadioButton' ),
      createItem( 'electronDensity', MoleculePolarityStrings.electronDensityStringProperty, 'electronDensityRadioButton' )
    ];

    super( surfaceTypeProperty, radioButtonGroupItems, options );

    surfaceTypeProperty.lazyLink( surfaceType => {
      let objectResponse: string;
      switch( surfaceType ) {
        case 'none':
          objectResponse = MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.noneSelectedStringProperty.value;
          break;
        case 'electrostaticPotential':
          objectResponse = MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.electrostaticSelectedStringProperty.value;
          break;
        case 'electronDensity':
          objectResponse = MoleculePolarityFluent.a11y.common.surfaceRadioButtonGroup.electronDensitySelectedStringProperty.value;
          break;
        default:
          affirm( false, `Unknown surfaceType: ${surfaceType}` );
      }
      this.addAccessibleObjectResponse( objectResponse );
    } );
  }
}

// Creates an item for this radio-button group.
function createItem( value: SurfaceType,
                     labelStringProperty: TReadOnlyProperty<string>,
                     tandemName: string ): AquaRadioButtonGroupItem<SurfaceType> {
  return {
    value: value,
    createNode: () => new Text( labelStringProperty, MPConstants.CONTROL_TEXT_OPTIONS ),
    tandemName: tandemName
  };
}

moleculePolarity.register( 'SurfaceRadioButtonGroup', SurfaceRadioButtonGroup );