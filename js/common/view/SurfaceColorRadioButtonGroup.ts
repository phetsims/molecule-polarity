// Copyright 2021-2022, University of Colorado Boulder

/**
 * SurfaceColorRadioButtonGroup is the radio button group for choosing a color for the molecule surface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';
import SurfaceColorKey from './SurfaceColorKey.js';
import { SurfaceColor } from '../model/SurfaceColor.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import VerticalAquaRadioButtonGroup, { VerticalAquaRadioButtonGroupOptions } from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

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

export type SurfaceColorRadioButtonGroupOptions = SelfOptions & PickRequired<VerticalAquaRadioButtonGroupOptions, 'tandem'>;

export default class SurfaceColorRadioButtonGroup extends VerticalAquaRadioButtonGroup<SurfaceColor> {

  public constructor( surfaceColorProperty: StringEnumerationProperty<SurfaceColor>,
                      providedOptions: SurfaceColorRadioButtonGroupOptions ) {

    const options = optionize<SurfaceColorRadioButtonGroupOptions, SelfOptions, VerticalAquaRadioButtonGroupOptions>()( {

      // VerticalAquaRadioButtonGroupOptions
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    }, providedOptions );

    const radioButtonGroupItems = [
      {
        value: 'RWB',
        node: SurfaceColorKey.createElectrostaticPotentialRWBColorKey( COLOR_KEY_OPTIONS ),
        tandemName: 'RWBRadioButton'
      },
      {
        value: 'ROYGB',
        node: SurfaceColorKey.createElectrostaticPotentialROYGBColorKey( COLOR_KEY_OPTIONS ),
        tandemName: 'ROYGBRadioButton'
      }
    ];

    // @ts-ignore https://github.com/phetsims/molecule-polarity/issues/145
    super( surfaceColorProperty, radioButtonGroupItems, options );
  }
}

moleculePolarity.register( 'SurfaceColorRadioButtonGroup', SurfaceColorRadioButtonGroup );