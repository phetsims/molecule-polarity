// Copyright 2017, University of Colorado Boulder

/**
 * 'View' controls for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  var CheckBox = require( 'SUN/CheckBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var bondCharacterString = require( 'string!MOLECULE_POLARITY/bondCharacter' );
  var bondDipoleString = require( 'string!MOLECULE_POLARITY/bondDipole' );
  var partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  var viewString = require( 'string!MOLECULE_POLARITY/view' );

  /**
   * @param {TwoAtomsViewProperties} viewProperties
   * @constructor
   */
  function TwoAtomsViewControls( viewProperties ) {

    // title
    var titleNode = new Text( viewString, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // Check box labels
    var bondDipoleLabel = new HBox( {
      children: [ new Text( bondDipoleString, MPConstants.CONTROL_TEXT_OPTIONS ), BondDipoleNode.createIcon() ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );
    var partialChargesLabel = new Text( partialChargesString, MPConstants.CONTROL_TEXT_OPTIONS );
    var bondCharacterLabel = new Text( bondCharacterString, MPConstants.CONTROL_TEXT_OPTIONS );

    // Check boxes
    var bondDipoleCheckBox = new CheckBox( bondDipoleLabel, viewProperties.bondDipoleVisibleProperty );
    var partialChargesCheckBox = new CheckBox( partialChargesLabel, viewProperties.partialChargesVisibleProperty );
    var bondCharacterCheckBox = new CheckBox( bondCharacterLabel, viewProperties.bondCharacterVisibleProperty );

    VBox.call( this, {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      children: [
        titleNode,
        bondDipoleCheckBox,
        partialChargesCheckBox,
        bondCharacterCheckBox
      ]
    } );
  }

  moleculePolarity.register( 'TwoAtomsViewControls', TwoAtomsViewControls );

  return inherit( VBox, TwoAtomsViewControls );
} );
