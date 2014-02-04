// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for turning the E-field on/off.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var electricFieldString = require( 'string!MOLECULE_POLARITY/electricField' );
  var offString = require( 'string!MOLECULE_POLARITY/off' );
  var onString = require( 'string!MOLECULE_POLARITY/on' );

  /**
   * @param {EField} eField
   * @constructor
   */
  function SurfaceControls( eField ) {

    // title
    var titleNode = new Text( electricFieldString, { font: MPConstants.TITLE_FONT } );

    // radio buttons
    var textOptions = { font: MPConstants.CONTROL_FONT };
    var onButton = new AquaRadioButton( eField.enabledProperty, true, new Text( onString, textOptions ) );
    var offButton = new AquaRadioButton( eField.enabledProperty, false, new Text( offString, textOptions ) );
    var buttonGroup = new HBox( {
      children: [ onButton, offButton ],
      align: 'left',
      spacing: 30
    } );

    var content = new VBox( {
      children: [ titleNode, buttonGroup ],
      align: 'left',
      spacing: 12
    } );

    // vertical panel
    Panel.call( this, content, {
      fill: 'rgb(238,238,238)',
      xMargin: 20,
      yMargin: 10
    } );
  }

  return inherit( Panel, SurfaceControls );
} );
