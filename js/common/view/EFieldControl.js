// Copyright 2014-2019, University of Colorado Boulder

/**
 * Control for the E-field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSwitch = require( 'SUN/ABSwitch' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const electricFieldString = require( 'string!MOLECULE_POLARITY/electricField' );
  const offString = require( 'string!MOLECULE_POLARITY/off' );
  const onString = require( 'string!MOLECULE_POLARITY/on' );

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

  return inherit( VBox, EFieldControl );
} );
