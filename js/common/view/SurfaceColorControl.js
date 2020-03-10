// Copyright 2015-2020, University of Colorado Boulder

/**
 * Control for selecting surface color that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import moleculePolarityStrings from '../../molecule-polarity-strings.js';
import moleculePolarity from '../../moleculePolarity.js';
import SurfaceColor from '../model/SurfaceColor.js';
import MPConstants from '../MPConstants.js';
import SurfaceColorKey from './SurfaceColorKey.js';

// strings
const surfaceColorRealMoleculesString = moleculePolarityStrings.surfaceColorRealMolecules;

// constants
const COLOR_KEY_OPTIONS = {
  size: new Dimension2( 150, 15 ),
  titleVisible: false,
  rangeFont: new PhetFont( 8 ),
  xMargin: 0,
  ySpacing: 2
};

class SurfaceColorControl extends VBox {

  /**
   * @param {EnumerationProperty.<SurfaceColor>} surfaceColorProperty
   */
  constructor( surfaceColorProperty ) {

    const titleNode = new Text( surfaceColorRealMoleculesString, {
      font: new PhetFont( 14 ),
      maxWidth: 400
    } );

    const radioButtonGroupItems = [
      {
        value: SurfaceColor.RWB,
        node: SurfaceColorKey.createElectrostaticPotentialRWBColorKey( COLOR_KEY_OPTIONS )
      },
      {
        value: SurfaceColor.ROYGB,
        node: SurfaceColorKey.createElectrostaticPotentialROYGBColorKey( COLOR_KEY_OPTIONS )
      }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup( surfaceColorProperty, radioButtonGroupItems, {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS
    } );

    super( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      children: [ titleNode, radioButtonGroup ]
    } );

    // @private
    this.disposeSurfaceColorControl = () => {
      radioButtonGroup.dispose();
    };
  }

  // @public @override
  dispose() {
    this.disposeSurfaceColorControl();
    super.dispose();
  }
}

moleculePolarity.register( 'SurfaceColorControl', SurfaceColorControl );

export default SurfaceColorControl;