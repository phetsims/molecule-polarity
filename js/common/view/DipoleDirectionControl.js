// Copyright 2017-2022, University of Colorado Boulder

/**
 * Dipole direction control that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';
import DipoleDirectionRadioButtonGroup from './DipoleDirectionRadioButtonGroup.js';

class DipoleDirectionControl extends VBox {

  /**
   * @param {StringEnumerationProperty.<DipoleDirection>} dipoleDirectionProperty
   * @param {Object} [options]
   */
  constructor( dipoleDirectionProperty, options ) {

    options = merge( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, options );

    // title
    const dipoleDirectionText = new Text( moleculePolarityStrings.dipoleDirectionStringProperty, {
      font: new PhetFont( 18 ),
      maxWidth: 500,
      tandem: options.tandem.createTandem( 'dipoleDirectionText' ),
      phetioVisiblePropertyInstrumented: false
    } );

    // Radio button group
    const radioButtonGroup = new DipoleDirectionRadioButtonGroup( dipoleDirectionProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    assert && assert( !options.children, 'DipoleDirectionControl sets children' );
    options.children = [ dipoleDirectionText, radioButtonGroup ];

    super( options );

    // @private
    this.disposeDipoleDirectionControl = () => {
      dipoleDirectionText.dispose();
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