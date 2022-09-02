// Copyright 2021-2022, University of Colorado Boulder

/**
 * SurfaceRadioButtonGroup is the radio button group for choosing a surface for the molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text, TextOptions } from '../../../../scenery/js/imports.js';
import VerticalAquaRadioButtonGroup, { VerticalAquaRadioButtonGroupOptions } from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import { SurfaceType } from '../model/SurfaceType.js';
import MPConstants from '../MPConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = EmptySelfOptions;

export type SurfaceRadioButtonGroupOptions = SelfOptions & PickRequired<VerticalAquaRadioButtonGroupOptions, 'tandem'>;

export default class SurfaceRadioButtonGroup extends VerticalAquaRadioButtonGroup<SurfaceType> {

  public constructor( surfaceTypeProperty: StringEnumerationProperty<SurfaceType>,
                      providedOptions: SurfaceRadioButtonGroupOptions ) {

    const options = optionize<SurfaceRadioButtonGroupOptions, SelfOptions, VerticalAquaRadioButtonGroupOptions>()( {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    }, providedOptions );

    const radioButtonGroupItems = [
      createItem( 'none', moleculePolarityStrings.noneStringProperty, 'noneRadioButton' ),
      createItem( 'electrostaticPotential', moleculePolarityStrings.electrostaticPotentialStringProperty, 'electrostaticPotentialRadioButton' ),
      createItem( 'electronDensity', moleculePolarityStrings.electronDensityStringProperty, 'electronDensityRadioButton' )
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
    createNode: ( tandem: Tandem ) => new Text( labelStringProperty, combineOptions<TextOptions>( {
      tandem: tandem.createTandem( 'labelText' ),
      phetioVisiblePropertyInstrumented: false
    }, MPConstants.CONTROL_TEXT_OPTIONS ) ),
    tandemName: tandemName
  };
}

moleculePolarity.register( 'SurfaceRadioButtonGroup', SurfaceRadioButtonGroup );