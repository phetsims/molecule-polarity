// Copyright 2017, University of Colorado Boulder

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
  var LABEL_OPTIONS = {
    font: MPConstants.CONTROL_FONT,
    maxWidth: 80  // i18n, set empirically
  };

  /**
   * @param {Property.<boolean>} eFieldEnabledProperty
   * @constructor
   */
  function EFieldControl( eFieldEnabledProperty ) {

    // title
    var titleNode = new Text( electricFieldString, {
      font: MPConstants.TITLE_FONT,
      maxWidth: 225 // i18n, set empirically
    } );

    // on/off switch
    var onOffSwitch = new ABSwitch( eFieldEnabledProperty,
      false, new Text( offString, LABEL_OPTIONS ),
      true, new Text( onString, LABEL_OPTIONS ), {
        xSpacing: 12,
        trackFillA: 'rgb(180,180,180)',
        trackFillB: 'rgb(0,180,0)'
      } );

    // vertical panel
    VBox.call( this, {
      children: [ titleNode, onOffSwitch ],
      align: 'left',
      spacing: 15
    } );
  }

  moleculePolarity.register( 'EFieldControl', EFieldControl );

  return inherit( VBox, EFieldControl );
} );
