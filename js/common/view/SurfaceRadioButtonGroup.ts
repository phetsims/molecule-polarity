// Copyright 2021-2022, University of Colorado Boulder

/**
 * SurfaceRadioButtonGroup is the radio button group for choosing a surface for the molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text, TextOptions } from '../../../../scenery/js/imports.js';
import VerticalAquaRadioButtonGroup, { VerticalAquaRadioButtonGroupOptions } from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import { SurfaceType } from '../model/SurfaceType.js';
import MPConstants from '../MPConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = EmptySelfOptions;

type SurfaceRadioButtonGroupOptions = SelfOptions & PickRequired<VerticalAquaRadioButtonGroupOptions, 'tandem'>;

export default class SurfaceRadioButtonGroup extends VerticalAquaRadioButtonGroup<SurfaceType> {

  public constructor( surfaceTypeProperty: StringUnionProperty<SurfaceType>,
                      providedOptions: SurfaceRadioButtonGroupOptions ) {

    const options = optionize<SurfaceRadioButtonGroupOptions, SelfOptions, VerticalAquaRadioButtonGroupOptions>()( {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    }, providedOptions );

    const radioButtonGroupItems = [
      createItem( 'none', MoleculePolarityStrings.noneStringProperty, 'noneRadioButton' ),
      createItem( 'electrostaticPotential', MoleculePolarityStrings.electrostaticPotentialStringProperty, 'electrostaticPotentialRadioButton' ),
      createItem( 'electronDensity', MoleculePolarityStrings.electronDensityStringProperty, 'electronDensityRadioButton' )
    ];

    super( surfaceTypeProperty, radioButtonGroupItems, options );
  }
}

// Creates an item for this radio-button group.
function createItem( value: SurfaceType,
                     labelStringProperty: TReadOnlyProperty<string>,
                     tandemName: string ): AquaRadioButtonGroupItem<SurfaceType> {
  return {
    value: value,
    createNode: ( tandem: Tandem ) => new Text( labelStringProperty, combineOptions<TextOptions>(
      {}, MPConstants.CONTROL_TEXT_OPTIONS, {
        tandem: tandem.createTandem( 'labelText' )
      } ) ),
    tandemName: tandemName
  };
}

moleculePolarity.register( 'SurfaceRadioButtonGroup', SurfaceRadioButtonGroup );