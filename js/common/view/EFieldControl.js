// Copyright 2014-2017, University of Colorado Boulder

/**
 * Control for the E-field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ABSwitch = require( 'SUN/ABSwitch' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var electricFieldString = require( 'string!MOLECULE_POLARITY/electricField' );
  var offString = require( 'string!MOLECULE_POLARITY/off' );
  var onString = require( 'string!MOLECULE_POLARITY/on' );

  // constants
  var SWITCH_LABEL_OPTIONS = _.extend( {}, MPConstants.CONTROL_TEXT_OPTIONS, {
    maxWidth: 80  // i18n, set empirically
  } );

  /**
   * @param {Property.<boolean>} eFieldEnabledProperty
   * @constructor
   */
  function EFieldControl( eFieldEnabledProperty ) {

    // title
    var titleNode = new Text( electricFieldString, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // on/off switch
    var onOffSwitch = new ABSwitch( eFieldEnabledProperty,
      false, new Text( offString, SWITCH_LABEL_OPTIONS ),
      true, new Text( onString, SWITCH_LABEL_OPTIONS ), {
        xSpacing: 12,
        trackFillA: 'rgb(180,180,180)',
        trackFillB: 'rgb(0,180,0)'
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
