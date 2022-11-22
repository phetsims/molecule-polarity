// Copyright 2017-2022, University of Colorado Boulder

/**
 * DipoleDirectionRadioButtonGroup is the radio button group for choosing dipole direction.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text } from '../../../../scenery/js/imports.js';
import VerticalAquaRadioButtonGroup, { VerticalAquaRadioButtonGroupOptions } from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';
import { DipoleDirection } from '../model/DipoleDirection.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';

type SelfOptions = EmptySelfOptions;

export type DipoleDirectionRadioButtonGroupOptions = SelfOptions & PickRequired<VerticalAquaRadioButtonGroupOptions, 'tandem'>;

export default class DipoleDirectionRadioButtonGroup extends VerticalAquaRadioButtonGroup<DipoleDirection> {

  private readonly disposeDipoleDirectionRadioButtonGroup: () => void;

  public constructor( dipoleDirectionProperty: StringEnumerationProperty<DipoleDirection>,
                      providedOptions: DipoleDirectionRadioButtonGroupOptions ) {

    const options = optionize<DipoleDirectionRadioButtonGroupOptions, SelfOptions, VerticalAquaRadioButtonGroupOptions>()( {

      // VerticalAquaRadioButtonGroupOptions
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    }, providedOptions );

    // d+ -> d-
    const positiveToNegativeStringProperty =
      new PatternStringProperty( MoleculePolarityStrings.pattern.dipoleDirectionStringProperty, {
        from: MoleculePolarityStrings.deltaPlusStringProperty,
        to: MoleculePolarityStrings.deltaMinusStringProperty
      }, {
        tandem: options.tandem.createTandem( 'positiveToNegativeStringProperty' ),
        phetioValueType: StringIO
      } );

    // d- -> d+
    const negativeToPositiveStringProperty =
      new PatternStringProperty( MoleculePolarityStrings.pattern.dipoleDirectionStringProperty, {
        from: MoleculePolarityStrings.deltaMinusStringProperty,
        to: MoleculePolarityStrings.deltaPlusStringProperty
      }, {
        tandem: options.tandem.createTandem( 'negativeToPositiveStringProperty' ),
        phetioValueType: StringIO
      } );

    const radioButtonGroupItems = [
      createItem( 'positiveToNegative', positiveToNegativeStringProperty, 'positiveToNegativeRadioButton' ),
      createItem( 'negativeToPositive', negativeToPositiveStringProperty, 'negativeToPositiveRadioButton' )
    ];

    super( dipoleDirectionProperty, radioButtonGroupItems, options );

    this.disposeDipoleDirectionRadioButtonGroup = () => {
      positiveToNegativeStringProperty.dispose();
      negativeToPositiveStringProperty.dispose();
    };
  }

  public override dispose(): void {
    this.disposeDipoleDirectionRadioButtonGroup();
    super.dispose();
  }
}

// Creates an item for this radio-button group.
function createItem( value: DipoleDirection,
                     labelStringProperty: TReadOnlyProperty<string>,
                     tandemName: string ): AquaRadioButtonGroupItem<DipoleDirection> {
  return {
    value: value,
    createNode: ( tandem: Tandem ) => new Text( labelStringProperty, {
      font: PreferencesDialog.CONTENT_FONT,
      maxWidth: 500,
      tandem: tandem.createTandem( 'labelText' )
    } ),
    tandemName: tandemName
  };
}

moleculePolarity.register( 'DipoleDirectionRadioButtonGroup', DipoleDirectionRadioButtonGroup );