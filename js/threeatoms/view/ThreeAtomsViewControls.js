// Copyright 2017-2020, University of Colorado Boulder

/**
 * 'View' controls for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import HBox from '../../../../scenery/js/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import MPConstants from '../../common/MPConstants.js';
import BondDipoleNode from '../../common/view/BondDipoleNode.js';
import MolecularDipoleNode from '../../common/view/MolecularDipoleNode.js';
import moleculePolarityStrings from '../../molecule-polarity-strings.js';
import moleculePolarity from '../../moleculePolarity.js';

// strings
const bondDipolesString = moleculePolarityStrings.bondDipoles;
const molecularDipoleString = moleculePolarityStrings.molecularDipole;
const partialChargesString = moleculePolarityStrings.partialCharges;
const viewString = moleculePolarityStrings.view;

class ThreeAtomsViewControls extends VBox {

  /**
   * @param {ThreeAtomsViewProperties} viewProperties
   */
  constructor( viewProperties ) {

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

    super( {
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
}

moleculePolarity.register( 'ThreeAtomsViewControls', ThreeAtomsViewControls );

export default ThreeAtomsViewControls;