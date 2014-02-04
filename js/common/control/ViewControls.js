// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for miscellaneous visibility settings.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define(function(require){
 'use strict';

  // imports
  var CheckBox = require( 'SUN/CheckBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var bondCharacterString = require( 'string!MOLECULE_POLARITY/bondCharacter' );
  var bondDipoleString = require( 'string!MOLECULE_POLARITY/bondDipole' );
  var partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  var viewString = require( 'string!MOLECULE_POLARITY/view' );

  function ViewControls( bondDipoleVisibleProperty, partialChargesVisibleProperty, bondCharacterVisibleProperty ) {

    // title
    var titleNode = new Text( viewString, { font: MPConstants.TITLE_FONT } );

    // check boxes
    var textOptions = { font: MPConstants.CONTROL_FONT };
    var bondDipoleCheckBox = new CheckBox( new Text( bondDipoleString, textOptions ), bondDipoleVisibleProperty ); //TODO add icon
    var partialChargesCheckBox = new CheckBox( new Text( partialChargesString, textOptions ), partialChargesVisibleProperty );
    var bondCharacterCheckBox = new CheckBox( new Text( bondCharacterString, textOptions ), bondCharacterVisibleProperty );

    var content = new VBox( {
      children: [ titleNode, bondDipoleCheckBox, partialChargesCheckBox, bondCharacterCheckBox ],
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

  return inherit( Panel, ViewControls );
});
