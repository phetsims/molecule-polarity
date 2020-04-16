// Copyright 2014-2020, University of Colorado Boulder

/**
 * Control for the E-field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';

// constants
const SWITCH_LABEL_OPTIONS = merge( {}, MPConstants.CONTROL_TEXT_OPTIONS, {
  maxWidth: 80  // i18n, set empirically
} );

class EFieldControl extends VBox {

  /**
   * @param {Property.<boolean>} eFieldEnabledProperty
   */
  constructor( eFieldEnabledProperty ) {

    // title
    const titleNode = new Text( moleculePolarityStrings.electricField, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // on/off switch
    const onOffSwitch = new ABSwitch( eFieldEnabledProperty,
      false, new Text( moleculePolarityStrings.off, SWITCH_LABEL_OPTIONS ),
      true, new Text( moleculePolarityStrings.on, SWITCH_LABEL_OPTIONS ), {
        xSpacing: 12,
        toggleSwitchOptions: {
          trackFillLeft: 'rgb( 180, 180, 180 )',
          trackFillRight: 'rgb( 0, 180, 0 )'
        }
      } );

    // vertical panel
    super( {
      children: [ titleNode, onOffSwitch ],
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    } );
  }
}

moleculePolarity.register( 'EFieldControl', EFieldControl );

export default EFieldControl;