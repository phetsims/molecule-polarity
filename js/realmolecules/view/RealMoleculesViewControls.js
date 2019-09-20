// Copyright 2017-2019, University of Colorado Boulder

/**
 * 'View' controls for the 'Real Molecules' screen.
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
  const atomElectronegativitiesString = require( 'string!MOLECULE_POLARITY/atomElectronegativities' );
  const atomLabelsString = require( 'string!MOLECULE_POLARITY/atomLabels' );
  const bondDipolesString = require( 'string!MOLECULE_POLARITY/bondDipoles' );
  const molecularDipoleString = require( 'string!MOLECULE_POLARITY/molecularDipole' );
  const partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  const viewString = require( 'string!MOLECULE_POLARITY/view' );

  // constants
  const CONTROL_TEXT_OPTIONS = _.extend( {}, MPConstants.CONTROL_TEXT_OPTIONS, {
    maxWidth: 225 // a bit wider in for this Screen
  } );

  /**
   * @param {RealMoleculesViewProperties} viewProperties
   * @constructor
   */
  function RealMoleculesViewControls( viewProperties ) {

    // title
    const titleNode = new Text( viewString, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // Checkbox labels
    const bondDipolesLabel = new HBox( {
      children: [ new Text( bondDipolesString, CONTROL_TEXT_OPTIONS ), BondDipoleNode.createIcon() ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );
    const molecularDipoleLabel = new HBox( {
      children: [ new Text( molecularDipoleString, CONTROL_TEXT_OPTIONS ), MolecularDipoleNode.createIcon() ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );
    const partialChargesLabel = new Text( partialChargesString, CONTROL_TEXT_OPTIONS );
    const atomLabelsLabel = new Text( atomLabelsString, CONTROL_TEXT_OPTIONS );
    const atomElectronegativityLabel = new Text( atomElectronegativitiesString, CONTROL_TEXT_OPTIONS );

    // Checkboxes
    const bondDipolesCheckbox = new Checkbox( bondDipolesLabel, viewProperties.bondDipolesVisibleProperty );
    const molecularDipoleCheckbox = new Checkbox( molecularDipoleLabel, viewProperties.molecularDipoleVisibleProperty );
    const partialChargesCheckbox = new Checkbox( partialChargesLabel, viewProperties.partialChargesVisibleProperty );
    const atomLabelsCheckbox = new Checkbox( atomLabelsLabel, viewProperties.atomLabelsVisibleProperty );
    const atomElectronegativitiesCheckbox = new Checkbox( atomElectronegativityLabel, viewProperties.atomElectronegativitiesVisibleProperty );

    VBox.call( this, {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      children: [
        titleNode,
        bondDipolesCheckbox,
        molecularDipoleCheckbox,
        partialChargesCheckbox,
        atomLabelsCheckbox,
        atomElectronegativitiesCheckbox
      ]
    } );
  }

  moleculePolarity.register( 'RealMoleculesViewControls', RealMoleculesViewControls );

  return inherit( VBox, RealMoleculesViewControls );
} );
