// Copyright 2017-2021, University of Colorado Boulder

/**
 * 'View' controls for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Text } from '../../../../scenery/js/imports.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPConstants from '../../common/MPConstants.js';
import BondDipolesCheckbox from '../../common/view/BondDipolesCheckbox.js';
import PartialChargesCheckbox from '../../common/view/PartialChargesCheckbox.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import BondCharacterCheckbox from './BondCharacterCheckbox.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';

class TwoAtomsViewControls extends VBox {

  /**
   * @param {TwoAtomsViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( viewProperties, options ) {
    assert && assert( viewProperties instanceof TwoAtomsViewProperties, 'invalid viewProperties' );

    options = merge( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, options );

    // title
    const titleText = new Text( moleculePolarityStrings.view,
      merge( {
        tandem: options.tandem.createTandem( 'titleText' )
      }, MPConstants.CONTROL_PANEL_TITLE_OPTIONS )
    );

    // Checkboxes
    const bondDipoleCheckbox = new BondDipolesCheckbox( viewProperties.bondDipoleVisibleProperty, {
      singular: true,
      tandem: options.tandem.createTandem( 'bondDipoleCheckbox' )
    } );
    const partialChargesCheckbox = new PartialChargesCheckbox( viewProperties.partialChargesVisibleProperty, {
      tandem: options.tandem.createTandem( 'partialChargesCheckbox' )
    } );
    const bondCharacterCheckbox = new BondCharacterCheckbox( viewProperties.bondCharacterVisibleProperty, {
      tandem: options.tandem.createTandem( 'bondCharacterCheckbox' )
    } );

    assert && assert( !options.children, 'NAME sets children' );
    options.children = [
      titleText,
      bondDipoleCheckbox,
      partialChargesCheckbox,
      bondCharacterCheckbox
    ];

    super( options );
  }
}

moleculePolarity.register( 'TwoAtomsViewControls', TwoAtomsViewControls );
export default TwoAtomsViewControls;