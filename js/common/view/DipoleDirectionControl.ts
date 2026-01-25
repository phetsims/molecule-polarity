// Copyright 2017-2026, University of Colorado Boulder

/**
 * Dipole direction control that appears in the Preferences dialog. It is a radio button group with a label.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import PreferencesControl, { PreferencesControlOptions } from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import HorizontalAquaRadioButtonGroup, { HorizontalAquaRadioButtonGroupOptions } from '../../../../sun/js/HorizontalAquaRadioButtonGroup.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import { DipoleDirection } from '../model/DipoleDirection.js';
import MPConstants from '../MPConstants.js';

type SelfOptions = EmptySelfOptions;

type DipoleDirectionControlOptions = SelfOptions & WithRequired<PreferencesControlOptions, 'tandem'>;

const RADIO_BUTTON_LABEL_OPTIONS = {
  font: PreferencesDialogConstants.CONTENT_FONT,
  maxWidth: 200
};

export default class DipoleDirectionControl extends PreferencesControl {

  private readonly disposeDipoleDirectionControl: () => void;

  public constructor( dipoleDirectionProperty: StringUnionProperty<DipoleDirection>,
                      providedOptions: DipoleDirectionControlOptions ) {

    // title
    const dipoleDirectionText = new Text( MoleculePolarityFluent.dipoleDirectionStringProperty,
      PreferencesDialogConstants.CONTROL_LABEL_OPTIONS );

    // description
    const descriptionText = new RichText( MoleculePolarityFluent.dipoleDirectionDescriptionStringProperty,
      PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS );

    // Radio button group
    const radioButtonGroup = new DipoleDirectionRadioButtonGroup( dipoleDirectionProperty, {
      tandem: providedOptions.tandem.createTandem( 'radioButtonGroup' )
    } );


    const options = optionize<DipoleDirectionControlOptions, SelfOptions, PreferencesControlOptions>()( {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      labelNode: dipoleDirectionText,
      descriptionNode: descriptionText,
      controlNode: radioButtonGroup,
      phetioFeatured: true
    }, providedOptions );

    super( options );

    this.disposeDipoleDirectionControl = () => {
      dipoleDirectionText.dispose();
      radioButtonGroup.dispose();
    };
  }

  public override dispose(): void {
    this.disposeDipoleDirectionControl();
    super.dispose();
  }
}

/**
 * DipoleDirectionRadioButtonGroup is the radio button group for choosing dipole direction.
 */

type DipoleDirectionRadioButtonGroupSelfOptions = EmptySelfOptions;

type DipoleDirectionRadioButtonGroupOptions = SelfOptions & PickRequired<HorizontalAquaRadioButtonGroupOptions, 'tandem'>;

class DipoleDirectionRadioButtonGroup extends HorizontalAquaRadioButtonGroup<DipoleDirection> {

  private readonly disposeDipoleDirectionRadioButtonGroup: () => void;

  public constructor( dipoleDirectionProperty: StringUnionProperty<DipoleDirection>,
                      providedOptions: DipoleDirectionRadioButtonGroupOptions ) {

    const options = optionize<DipoleDirectionRadioButtonGroupOptions, DipoleDirectionRadioButtonGroupSelfOptions, HorizontalAquaRadioButtonGroupOptions>()( {

      // HorizontalAquaRadioButtonGroupOptions
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    }, providedOptions );

    // d+ -> d-
    const positiveToNegativeStringProperty =
      new PatternStringProperty( MoleculePolarityStrings.pattern.dipoleDirectionStringProperty, {
        from: MoleculePolarityStrings.deltaPlusStringProperty,
        to: MoleculePolarityStrings.deltaMinusStringProperty
      }, {
        tandem: options.tandem.createTandem( 'positiveToNegativeStringProperty' )
      } );

    // d- -> d+
    const negativeToPositiveStringProperty =
      new PatternStringProperty( MoleculePolarityStrings.pattern.dipoleDirectionStringProperty, {
        from: MoleculePolarityStrings.deltaMinusStringProperty,
        to: MoleculePolarityStrings.deltaPlusStringProperty
      }, {
        tandem: options.tandem.createTandem( 'negativeToPositiveStringProperty' )
      } );

    const radioButtonGroupItems: AquaRadioButtonGroupItem<DipoleDirection>[] = [
      {
        value: 'positiveToNegative',
        createNode: () => new Text( positiveToNegativeStringProperty, RADIO_BUTTON_LABEL_OPTIONS ),
        options: {
          accessibleName: MoleculePolarityFluent.a11y.common.preferencesDialog.positiveToNegativeStringProperty
        },
        tandemName: 'positiveToNegativeRadioButton'
      },
      {
        value: 'negativeToPositive',
        createNode: () => new Text( negativeToPositiveStringProperty, RADIO_BUTTON_LABEL_OPTIONS ),
        options: {
          accessibleName: MoleculePolarityFluent.a11y.common.preferencesDialog.negativeToPositiveStringProperty
        },
        tandemName: 'negativeToPositiveRadioButton'
      }
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

moleculePolarity.register( 'DipoleDirectionControl', DipoleDirectionControl );