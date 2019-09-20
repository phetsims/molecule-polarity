// Copyright 2017-2019, University of Colorado Boulder

/**
 * 'View' controls for the 'Three Atoms' screen.
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
  const MolecularDipoleNode = require( 'MOLECULE_POLARITY/common/view/MolecularDipoleNode' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const bondDipolesString = require( 'string!MOLECULE_POLARITY/bondDipoles' );
  const molecularDipoleString = require( 'string!MOLECULE_POLARITY/molecularDipole' );
  const partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  const viewString = require( 'string!MOLECULE_POLARITY/view' );

  /**
   * @param {ThreeAtomsViewProperties} viewProperties
   * @constructor
   */
  function ThreeAtomsViewControls( viewProperties ) {

    // title
    const titleNode = new Text( viewString, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // Checkbox labels
    const bondDipolesLabel = new HBox( {
      children: [ new Text( bondDipolesString, MPConstants.CONTROL_TEXT_OPTIONS ), BondDipoleNode.createIcon() ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );
    const molecularDipoleLabel = new HBox( {
      children: [ new Text( molecularDipoleString, MPConstants.CONTROL_TEXT_OPTIONS ), MolecularDipoleNode.createIcon() ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );
    const partialChargesLabel = new Text( partialChargesString, MPConstants.CONTROL_TEXT_OPTIONS );

    // Checkboxes
    const bondDipolesCheckbox = new Checkbox( bondDipolesLabel, viewProperties.bondDipolesVisibleProperty );
    const molecularDipoleCheckbox = new Checkbox( molecularDipoleLabel, viewProperties.molecularDipoleVisibleProperty );
    const partialChargesCheckbox = new Checkbox( partialChargesLabel, viewProperties.partialChargesVisibleProperty );

    VBox.call( this, {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      children: [
        titleNode,
        bondDipolesCheckbox,
        molecularDipoleCheckbox,
        partialChargesCheckbox
      ]
    } );
  }

  moleculePolarity.register( 'ThreeAtomsViewControls', ThreeAtomsViewControls );

  return inherit( VBox, ThreeAtomsViewControls );
} );
