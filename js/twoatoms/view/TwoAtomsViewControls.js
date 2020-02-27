// Copyright 2017-2019, University of Colorado Boulder

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
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const bondCharacterString = require( 'string!MOLECULE_POLARITY/bondCharacter' );
  const bondDipoleString = require( 'string!MOLECULE_POLARITY/bondDipole' );
  const partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  const viewString = require( 'string!MOLECULE_POLARITY/view' );

  class TwoAtomsViewControls extends VBox {

    /**
     * @param {TwoAtomsViewProperties} viewProperties
     */
    constructor( viewProperties ) {

      // title
      const titleNode = new Text( viewString, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

      // Checkbox labels
      const bondDipoleLabel = new HBox( {
        children: [ new Text( bondDipoleString, MPConstants.CONTROL_TEXT_OPTIONS ), BondDipoleNode.createIcon() ],
        spacing: MPConstants.CONTROL_ICON_X_SPACING
      } );
      const partialChargesLabel = new Text( partialChargesString, MPConstants.CONTROL_TEXT_OPTIONS );
      const bondCharacterLabel = new Text( bondCharacterString, MPConstants.CONTROL_TEXT_OPTIONS );

      // Checkboxes
      const bondDipoleCheckbox = new Checkbox( bondDipoleLabel, viewProperties.bondDipoleVisibleProperty );
      const partialChargesCheckbox = new Checkbox( partialChargesLabel, viewProperties.partialChargesVisibleProperty );
      const bondCharacterCheckbox = new Checkbox( bondCharacterLabel, viewProperties.bondCharacterVisibleProperty );

      super( {
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
  }

  return moleculePolarity.register( 'TwoAtomsViewControls', TwoAtomsViewControls );
} );
