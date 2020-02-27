// Copyright 2014-2020, University of Colorado Boulder

/**
 * Control for the E-field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import moleculePolarityStrings from '../../molecule-polarity-strings.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';

const electricFieldString = moleculePolarityStrings.electricField;
const offString = moleculePolarityStrings.off;
const onString = moleculePolarityStrings.on;

// constants
const SWITCH_LABEL_OPTIONS = merge( {}, MPConstants.CONTROL_TEXT_OPTIONS, {
  maxWidth: 80  // i18n, set empirically
} );

/**
 * @param {Property.<boolean>} eFieldEnabledProperty
 * @constructor
 */
function EFieldControl( eFieldEnabledProperty ) {

  // title
  const titleNode = new Text( electricFieldString, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

  // on/off switch
  const onOffSwitch = new ABSwitch( eFieldEnabledProperty,
    false, new Text( offString, SWITCH_LABEL_OPTIONS ),
    true, new Text( onString, SWITCH_LABEL_OPTIONS ), {
      xSpacing: 12,
      toggleSwitchOptions: {
        trackFillLeft: 'rgb( 180, 180, 180 )',
        trackFillRight: 'rgb( 0, 180, 0 )'
      }
    } );

  // vertical panel
  VBox.call( this, {
    children: [ titleNode, onOffSwitch ],
    align: 'left',
    spacing: MPConstants.CONTROL_PANEL_Y_SPACING
  } );
}

moleculePolarity.register( 'EFieldControl', EFieldControl );

inherit( VBox, EFieldControl );
export default EFieldControl;