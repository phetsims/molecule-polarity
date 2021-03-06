// Copyright 2021, University of Colorado Boulder

/**
 * SurfaceColorRadioButtonGroup is the radio button group for choosing a color for the molecule surface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import SurfaceColor from '../model/SurfaceColor.js';
import MPConstants from '../MPConstants.js';
import SurfaceColorKey from './SurfaceColorKey.js';

// constants
const COLOR_KEY_OPTIONS = {
  size: new Dimension2( 150, 15 ),
  titleVisible: false,
  rangeFont: new PhetFont( 8 ),
  xMargin: 0,
  ySpacing: 2
};

class SurfaceColorRadioButtonGroup extends AquaRadioButtonGroup {

  /**
   * @param {EnumerationProperty.<SurfaceColor>} surfaceColorProperty
   * @param {Object} [options]
   */
  constructor( surfaceColorProperty, options ) {
    assert && AssertUtils.assertEnumerationPropertyOf( surfaceColorProperty, SurfaceColor );

    options = merge( {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, MPConstants.AQUA_RADIO_BUTTON_OPTIONS, options );

    const radioButtonGroupItems = [
      {
        value: SurfaceColor.RWB,
        node: SurfaceColorKey.createElectrostaticPotentialRWBColorKey( COLOR_KEY_OPTIONS ),
        tandemName: 'RWBRadioButton'
      },
      {
        value: SurfaceColor.ROYGB,
        node: SurfaceColorKey.createElectrostaticPotentialROYGBColorKey( COLOR_KEY_OPTIONS ),
        tandemName: 'ROYGBRadioButton'
      }
    ];

    super( surfaceColorProperty, radioButtonGroupItems, options );

    this.disposeSurfaceColorRadioButtonGroup = () => {
      radioButtonGroupItems.forEach( item => item.node.dispose() );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeSurfaceColorRadioButtonGroup();
    super.dispose();
  }
}

moleculePolarity.register( 'SurfaceColorRadioButtonGroup', SurfaceColorRadioButtonGroup );
export default SurfaceColorRadioButtonGroup;