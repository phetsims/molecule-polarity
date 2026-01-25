// Copyright 2015-2026, University of Colorado Boulder

/**
 * Control for selecting surface color that appears in the Preferences dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import PreferencesControl, { PreferencesControlOptions } from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import HorizontalAquaRadioButtonGroup, { HorizontalAquaRadioButtonGroupOptions } from '../../../../sun/js/HorizontalAquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import { SurfaceColor } from '../model/SurfaceColor.js';
import MPConstants from '../MPConstants.js';
import SurfaceColorKey from './SurfaceColorKey.js';

// constants
const COLOR_KEY_OPTIONS = {
  size: new Dimension2( 150, 15 ),
  titleVisible: false,
  rangeFont: new PhetFont( 8 ),
  xMargin: 0,
  ySpacing: 2,
  tandem: Tandem.OPT_OUT
};

type SelfOptions = EmptySelfOptions;

type SurfaceColorControlOptions = SelfOptions & WithRequired<PreferencesControlOptions, 'tandem'>;

export default class SurfaceColorControl extends PreferencesControl {

  private readonly disposeSurfaceColorControl: () => void;

  public constructor( surfaceColorProperty: StringUnionProperty<SurfaceColor>,
                      providedOptions: SurfaceColorControlOptions ) {

    // title
    const titleText = new Text( MoleculePolarityStrings.surfaceColorRealMoleculesStringProperty,
      PreferencesDialogConstants.CONTROL_LABEL_OPTIONS );

    // description
    const descriptionText = new RichText( MoleculePolarityFluent.surfaceColorDescriptionStringProperty,
      PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS );

    // control Node
    const radioButtonGroup = new SurfaceColorRadioButtonGroup( surfaceColorProperty, {
      tandem: providedOptions.tandem.createTandem( 'radioButtonGroup' )
    } );

    const options = optionize<SurfaceColorControlOptions, SelfOptions, PreferencesControlOptions>()( {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      labelNode: titleText,
      descriptionNode: descriptionText,
      controlNode: radioButtonGroup,
      phetioFeatured: true
    }, providedOptions );

    super( options );

    this.disposeSurfaceColorControl = () => {
      titleText.dispose();
      radioButtonGroup.dispose();
    };
  }

  public override dispose(): void {
    this.disposeSurfaceColorControl();
    super.dispose();
  }
}

/**
 * SurfaceColorRadioButtonGroup is the radio button group for choosing a color for the molecule surface.
 */

type SurfaceColorRadioButtonGroupSelfOptions = EmptySelfOptions;

type SurfaceColorRadioButtonGroupOptions = SelfOptions & PickRequired<HorizontalAquaRadioButtonGroupOptions, 'tandem'>;

class SurfaceColorRadioButtonGroup extends HorizontalAquaRadioButtonGroup<SurfaceColor> {

  public constructor( surfaceColorProperty: StringUnionProperty<SurfaceColor>,
                      providedOptions: SurfaceColorRadioButtonGroupOptions ) {

    const options = optionize<SurfaceColorRadioButtonGroupOptions, SurfaceColorRadioButtonGroupSelfOptions, HorizontalAquaRadioButtonGroupOptions>()( {

      // HorizontalAquaRadioButtonGroupOptions
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    }, providedOptions );

    const radioButtonGroupItems: AquaRadioButtonGroupItem<SurfaceColor>[] = [
      {
        value: 'blueWhiteRed',
        createNode: ( tandem: Tandem ) => SurfaceColorKey.createElectrostaticPotentialRWBColorKey( COLOR_KEY_OPTIONS ),
        tandemName: 'RWBRadioButton',
        options: {
          accessibleName: MoleculePolarityFluent.a11y.common.preferencesDialog.blueToRedStringProperty
        }
      },
      {
        value: 'rainbow',
        createNode: ( tandem: Tandem ) => SurfaceColorKey.createElectrostaticPotentialROYGBColorKey( COLOR_KEY_OPTIONS ),
        tandemName: 'ROYGBRadioButton',
        options: {
          accessibleName: MoleculePolarityFluent.a11y.common.preferencesDialog.rainbowBlueToRedStringProperty
        }
      }
    ];

    super( surfaceColorProperty, radioButtonGroupItems, options );
  }
}

moleculePolarity.register( 'SurfaceColorControl', SurfaceColorControl );