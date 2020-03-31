// Copyright 2017-2020, University of Colorado Boulder

/**
 * 'View' controls for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import MPConstants from '../../common/MPConstants.js';
import BondDipoleNode from '../../common/view/BondDipoleNode.js';
import MolecularDipoleNode from '../../common/view/MolecularDipoleNode.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import moleculePolarity from '../../moleculePolarity.js';

// strings
const atomElectronegativitiesString = moleculePolarityStrings.atomElectronegativities;
const atomLabelsString = moleculePolarityStrings.atomLabels;
const bondDipolesString = moleculePolarityStrings.bondDipoles;
const molecularDipoleString = moleculePolarityStrings.molecularDipole;
const partialChargesString = moleculePolarityStrings.partialCharges;
const viewString = moleculePolarityStrings.view;

// constants
const CONTROL_TEXT_OPTIONS = merge( {}, MPConstants.CONTROL_TEXT_OPTIONS, {
  maxWidth: 225 // a bit wider in for this Screen
} );

class RealMoleculesViewControls extends VBox {

  /**
   * @param {RealMoleculesViewProperties} viewProperties
   */
  constructor( viewProperties ) {

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

    super( {
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
}

moleculePolarity.register( 'RealMoleculesViewControls', RealMoleculesViewControls );

export default RealMoleculesViewControls;