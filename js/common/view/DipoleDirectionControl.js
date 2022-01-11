// Copyright 2017-2021, University of Colorado Boulder

/**
 * Dipole direction control that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import DipoleDirection from '../model/DipoleDirection.js';
import MPConstants from '../MPConstants.js';
import DipoleDirectionRadioButtonGroup from './DipoleDirectionRadioButtonGroup.js';

class DipoleDirectionControl extends VBox {

  /**
   * @param {EnumerationDeprecatedProperty.<DipoleDirection>} dipoleDirectionProperty
   * @param {Object} [options]
   */
  constructor( dipoleDirectionProperty, options ) {
    assert && AssertUtils.assertEnumerationPropertyOf( dipoleDirectionProperty, DipoleDirection );

    options = merge( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, options );

    // title
    const titleText = new Text( moleculePolarityStrings.dipoleDirection, {
      font: new PhetFont( 18 ),
      maxWidth: 500,
      tandem: options.tandem.createTandem( 'titleText' )
    } );

    // Radio button group
    const radioButtonGroup = new DipoleDirectionRadioButtonGroup( dipoleDirectionProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    assert && assert( !options.children, 'DipoleDirectionControl sets children' );
    options.children = [ titleText, radioButtonGroup ];

    super( options );

    // @private
    this.disposeDipoleDirectionControl = () => {
      titleText.dispose();
      radioButtonGroup.dispose();
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeDipoleDirectionControl();
    super.dispose();
  }
}

moleculePolarity.register( 'DipoleDirectionControl', DipoleDirectionControl );
export default DipoleDirectionControl;