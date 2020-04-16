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
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';

class TwoAtomsViewControls extends VBox {

  /**
   * @param {TwoAtomsViewProperties} viewProperties
   */
  constructor( viewProperties ) {

    // title
    const titleNode = new Text( moleculePolarityStrings.view, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // Checkbox labels
    const bondDipoleLabel = new HBox( {
      children: [ new Text( moleculePolarityStrings.bondDipole, MPConstants.CONTROL_TEXT_OPTIONS ), BondDipoleNode.createIcon() ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );
    const partialChargesLabel = new Text( moleculePolarityStrings.partialCharges, MPConstants.CONTROL_TEXT_OPTIONS );
    const bondCharacterLabel = new Text( moleculePolarityStrings.bondCharacter, MPConstants.CONTROL_TEXT_OPTIONS );

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