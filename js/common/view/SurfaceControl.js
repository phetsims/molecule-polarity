// Copyright 2017-2020, University of Colorado Boulder

/**
 * Control panel for the molecule's surface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import SurfaceType from '../model/SurfaceType.js';
import MPConstants from '../MPConstants.js';

class SurfaceControl extends VBox {

  /**
   * @param {EnumerationProperty.<SurfaceType>} surfaceTypeProperty
   * @param {Object} [options]
   */
  constructor( surfaceTypeProperty, options ) {

    options = merge( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, options );

    // title
    const titleText = new Text( moleculePolarityStrings.surface,
      merge( {
        tandem: options.tandem.createTandem( 'titleText' )
      }, MPConstants.CONTROL_PANEL_TITLE_OPTIONS )
    );

    const radioButtonGroupItems = [
      {
        node: new Text( moleculePolarityStrings.none, MPConstants.CONTROL_TEXT_OPTIONS ),
        value: SurfaceType.NONE
      },
      {
        value: SurfaceType.ELECTROSTATIC_POTENTIAL,
        node: new Text( moleculePolarityStrings.electrostaticPotential, MPConstants.CONTROL_TEXT_OPTIONS )
      },
      {
        value: SurfaceType.ELECTRON_DENSITY,
        node: new Text( moleculePolarityStrings.electronDensity, MPConstants.CONTROL_TEXT_OPTIONS )
      }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup( surfaceTypeProperty, radioButtonGroupItems, {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      radioButtonOptions: MPConstants.AQUA_RADIO_BUTTON_OPTIONS,
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    assert && assert( !options.children, 'SurfaceControl sets children' );
    options.children = [ titleText, radioButtonGroup ];

    super( options );
  }
}

moleculePolarity.register( 'SurfaceControl', SurfaceControl );

export default SurfaceControl;