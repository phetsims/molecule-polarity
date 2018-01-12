// Copyright 2017, University of Colorado Boulder

/**
 * 'View' controls for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  var Checkbox = require( 'SUN/Checkbox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MolecularDipoleNode = require( 'MOLECULE_POLARITY/common/view/MolecularDipoleNode' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var bondDipolesString = require( 'string!MOLECULE_POLARITY/bondDipoles' );
  var molecularDipoleString = require( 'string!MOLECULE_POLARITY/molecularDipole' );
  var partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  var viewString = require( 'string!MOLECULE_POLARITY/view' );

  /**
   * @param {ThreeAtomsViewProperties} viewProperties
   * @constructor
   */
  function ThreeAtomsViewControls( viewProperties ) {

    // title
    var titleNode = new Text( viewString, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // Checkbox labels
    var bondDipolesLabel = new HBox( {
      children: [ new Text( bondDipolesString, MPConstants.CONTROL_TEXT_OPTIONS ), BondDipoleNode.createIcon() ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );
    var molecularDipoleLabel = new HBox( {
      children: [ new Text( molecularDipoleString, MPConstants.CONTROL_TEXT_OPTIONS ), MolecularDipoleNode.createIcon() ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );
    var partialChargesLabel = new Text( partialChargesString, MPConstants.CONTROL_TEXT_OPTIONS );

    // Checkboxes
    var bondDipolesCheckbox = new Checkbox( bondDipolesLabel, viewProperties.bondDipolesVisibleProperty );
    var molecularDipoleCheckbox = new Checkbox( molecularDipoleLabel, viewProperties.molecularDipoleVisibleProperty );
    var partialChargesCheckbox = new Checkbox( partialChargesLabel, viewProperties.partialChargesVisibleProperty );

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
