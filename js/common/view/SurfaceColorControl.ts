// Copyright 2015-2022, University of Colorado Boulder

/**
 * Control for selecting surface color that appears in the Preferences dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';
import { SurfaceColor } from '../model/SurfaceColor.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SurfaceColorKey from './SurfaceColorKey.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import VerticalAquaRadioButtonGroup, { VerticalAquaRadioButtonGroupOptions } from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';

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

type SurfaceColorControlOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class SurfaceColorControl extends VBox {

  private readonly disposeSurfaceColorControl: () => void;

  public constructor( surfaceColorProperty: StringUnionProperty<SurfaceColor>,
                      providedOptions: SurfaceColorControlOptions ) {

    const options = optionize<SurfaceColorControlOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    }, providedOptions );

    const titleText = new Text( MoleculePolarityStrings.surfaceColorRealMoleculesStringProperty, {
      font: PreferencesDialog.CONTENT_FONT,
      maxWidth: 400,
      tandem: options.tandem.createTandem( 'titleText' )
    } );

    const radioButtonGroup = new SurfaceColorRadioButtonGroup( surfaceColorProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    options.children = [ titleText, radioButtonGroup ];

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

type SurfaceColorRadioButtonGroupOptions = SelfOptions & PickRequired<VerticalAquaRadioButtonGroupOptions, 'tandem'>;

class SurfaceColorRadioButtonGroup extends VerticalAquaRadioButtonGroup<SurfaceColor> {

  public constructor( surfaceColorProperty: StringUnionProperty<SurfaceColor>,
                      providedOptions: SurfaceColorRadioButtonGroupOptions ) {

    const options = optionize<SurfaceColorRadioButtonGroupOptions, SurfaceColorRadioButtonGroupSelfOptions, VerticalAquaRadioButtonGroupOptions>()( {

      // VerticalAquaRadioButtonGroupOptions
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    }, providedOptions );

    const radioButtonGroupItems: AquaRadioButtonGroupItem<SurfaceColor>[] = [
      {
        value: 'RWB',
        createNode: ( tandem: Tandem ) => SurfaceColorKey.createElectrostaticPotentialRWBColorKey( COLOR_KEY_OPTIONS ),
        tandemName: 'RWBRadioButton'
      },
      {
        value: 'ROYGB',
        createNode: ( tandem: Tandem ) => SurfaceColorKey.createElectrostaticPotentialROYGBColorKey( COLOR_KEY_OPTIONS ),
        tandemName: 'ROYGBRadioButton'
      }
    ];

    super( surfaceColorProperty, radioButtonGroupItems, options );
  }
}

moleculePolarity.register( 'SurfaceColorControl', SurfaceColorControl );