// Copyright 2015-2021, University of Colorado Boulder

/**
 * Control for selecting surface color that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import SurfaceColor from '../model/SurfaceColor.js';
import MPConstants from '../MPConstants.js';
import SurfaceColorRadioButtonGroup from './SurfaceColorRadioButtonGroup.js';

class SurfaceColorControl extends VBox {

  /**
   * @param {EnumerationProperty.<SurfaceColor>} electrostaticPotentialSurfaceColorProperty
   * @param {Object} [options]
   */
  constructor( electrostaticPotentialSurfaceColorProperty, options ) {
    assert && AssertUtils.assertEnumerationPropertyOf( electrostaticPotentialSurfaceColorProperty, SurfaceColor );

    options = merge( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, options );

    const titleText = new Text( moleculePolarityStrings.surfaceColorRealMolecules, {
      font: new PhetFont( 14 ),
      maxWidth: 400,
      tandem: options.tandem.createTandem( 'titleText' )
    } );

    const radioButtonGroup = new SurfaceColorRadioButtonGroup( electrostaticPotentialSurfaceColorProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    assert && assert( !options.children, 'SurfaceColorControl sets children' );
    options.children = [ titleText, radioButtonGroup ];

    super( options );

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