// Copyright 2017, University of Colorado Boulder

/**
 * 'View' controls for the 'Real Molecules' screen.
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
  var MolecularDipoleNode = require( 'MOLECULE_POLARITY/common/view/MolecularDipoleNode' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var atomElectronegativitiesString = require( 'string!MOLECULE_POLARITY/atomElectronegativities' );
  var atomLabelsString = require( 'string!MOLECULE_POLARITY/atomLabels' );
  var bondDipolesString = require( 'string!MOLECULE_POLARITY/bondDipoles' );
  var molecularDipoleString = require( 'string!MOLECULE_POLARITY/molecularDipole' );
  var partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  var viewString = require( 'string!MOLECULE_POLARITY/view' );

  // constants
  var CONTROL_TEXT_OPTIONS = _.extend( {}, MPConstants.CONTROL_TEXT_OPTIONS, {
    maxWidth: 225 // a bit wider in for this Screen
  } );

  /**
   * @param {RealMoleculesViewProperties} viewProperties
   * @constructor
   */
  function RealMoleculesViewControls( viewProperties ) {

    // title
    var titleNode = new Text( viewString, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // Check box labels
    var bondDipolesLabel = new HBox( {
      children: [ new Text( bondDipolesString, CONTROL_TEXT_OPTIONS ), BondDipoleNode.createIcon() ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );
    var molecularDipoleLabel = new HBox( {
      children: [ new Text( molecularDipoleString, CONTROL_TEXT_OPTIONS ), MolecularDipoleNode.createIcon() ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );
    var partialChargesLabel = new Text( partialChargesString, CONTROL_TEXT_OPTIONS );
    var atomLabelsLabel = new Text( atomLabelsString, CONTROL_TEXT_OPTIONS );
    var atomElectronegativityLabel = new Text( atomElectronegativitiesString, CONTROL_TEXT_OPTIONS );

    // Check boxes
    var bondDipolesCheckBox = new CheckBox( bondDipolesLabel, viewProperties.bondDipolesVisibleProperty );
    var molecularDipoleCheckBox = new CheckBox( molecularDipoleLabel, viewProperties.molecularDipoleVisibleProperty );
    var partialChargesCheckBox = new CheckBox( partialChargesLabel, viewProperties.partialChargesVisibleProperty );
    var atomLabelsCheckBox = new CheckBox( atomLabelsLabel, viewProperties.atomLabelsVisibleProperty );
    var atomElectronegativitiesCheckBox = new CheckBox( atomElectronegativityLabel, viewProperties.atomElectronegativitiesVisibleProperty );

    VBox.call( this, {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      children: [
        titleNode,
        bondDipolesCheckBox,
        molecularDipoleCheckBox,
        partialChargesCheckBox,
        atomLabelsCheckBox,
        atomElectronegativitiesCheckBox
      ]
    } );
  }

  moleculePolarity.register( 'RealMoleculesViewControls', RealMoleculesViewControls );

  return inherit( VBox, RealMoleculesViewControls );
} );
