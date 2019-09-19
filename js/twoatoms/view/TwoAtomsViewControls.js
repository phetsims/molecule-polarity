// Copyright 2017-2018, University of Colorado Boulder

/**
 * 'View' controls for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  const Checkbox = require( 'SUN/Checkbox' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const bondCharacterString = require( 'string!MOLECULE_POLARITY/bondCharacter' );
  const bondDipoleString = require( 'string!MOLECULE_POLARITY/bondDipole' );
  const partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  const viewString = require( 'string!MOLECULE_POLARITY/view' );

  /**
   * @param {TwoAtomsViewProperties} viewProperties
   * @constructor
   */
  function TwoAtomsViewControls( viewProperties ) {

    // title
    var titleNode = new Text( viewString, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // Checkbox labels
    var bondDipoleLabel = new HBox( {
      children: [ new Text( bondDipoleString, MPConstants.CONTROL_TEXT_OPTIONS ), BondDipoleNode.createIcon() ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );
    var partialChargesLabel = new Text( partialChargesString, MPConstants.CONTROL_TEXT_OPTIONS );
    var bondCharacterLabel = new Text( bondCharacterString, MPConstants.CONTROL_TEXT_OPTIONS );

    // Checkboxes
    var bondDipoleCheckbox = new Checkbox( bondDipoleLabel, viewProperties.bondDipoleVisibleProperty );
    var partialChargesCheckbox = new Checkbox( partialChargesLabel, viewProperties.partialChargesVisibleProperty );
    var bondCharacterCheckbox = new Checkbox( bondCharacterLabel, viewProperties.bondCharacterVisibleProperty );

    VBox.call( this, {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      children: [
        titleNode,
        bondDipoleCheckbox,
        partialChargesCheckbox,
        bondCharacterCheckbox
      ]
    } );
  }

  moleculePolarity.register( 'TwoAtomsViewControls', TwoAtomsViewControls );

  return inherit( VBox, TwoAtomsViewControls );
} );
