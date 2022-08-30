// Copyright 2017-2022, University of Colorado Boulder

/**
 * Control panel for the molecule's surface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import SurfaceType from '../model/SurfaceType.js';
import MPConstants from '../MPConstants.js';
import SurfaceRadioButtonGroup from './SurfaceRadioButtonGroup.js';

class SurfaceControl extends VBox {

  /**
   * @param {EnumerationDeprecatedProperty.<SurfaceType>} surfaceTypeProperty
   * @param {Object} [options]
   */
  constructor( surfaceTypeProperty, options ) {
    assert && AssertUtils.assertEnumerationPropertyOf( surfaceTypeProperty, SurfaceType );

    options = merge( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, options );

    // title
    const titleText = new Text( moleculePolarityStrings.surfaceStringProperty, merge( {
      tandem: options.tandem.createTandem( 'titleText' ),
      phetioVisiblePropertyInstrumented: false
    }, MPConstants.CONTROL_PANEL_TITLE_OPTIONS ) );

    // Radio button group
    const radioButtonGroup = new SurfaceRadioButtonGroup( surfaceTypeProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    assert && assert( !options.children, 'SurfaceControl sets children' );
    options.children = [ titleText, radioButtonGroup ];

    super( options );
  }
}

moleculePolarity.register( 'SurfaceControl', SurfaceControl );
export default SurfaceControl;