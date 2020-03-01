// Copyright 2017-2020, University of Colorado Boulder

/**
 * 'View' controls for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import HBox from '../../../../scenery/js/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import MPConstants from '../../common/MPConstants.js';
import BondDipoleNode from '../../common/view/BondDipoleNode.js';
import moleculePolarityStrings from '../../molecule-polarity-strings.js';
import moleculePolarity from '../../moleculePolarity.js';

const bondCharacterString = moleculePolarityStrings.bondCharacter;
const bondDipoleString = moleculePolarityStrings.bondDipole;
const partialChargesString = moleculePolarityStrings.partialCharges;
const viewString = moleculePolarityStrings.view;

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

moleculePolarity.register( 'TwoAtomsViewControls', TwoAtomsViewControls );

export default TwoAtomsViewControls;