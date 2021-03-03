// Copyright 2017-2021, University of Colorado Boulder

/**
 * 'View' controls for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPConstants from '../../common/MPConstants.js';
import BondDipolesCheckbox from '../../common/view/BondDipolesCheckbox.js';
import MolecularDipoleCheckbox from '../../common/view/MolecularDipoleCheckbox.js';
import PartialChargesCheckbox from '../../common/view/PartialChargesCheckbox.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import ThreeAtomsViewProperties from './ThreeAtomsViewProperties.js';

class ThreeAtomsViewControls extends VBox {

  /**
   * @param {ThreeAtomsViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( viewProperties, options ) {
    assert && assert( viewProperties instanceof ThreeAtomsViewProperties, 'invalid viewProperties' );

    options = merge( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, options );

    // title
    const titleText = new Text( moleculePolarityStrings.view,
      merge( {
        tandem: options.tandem.createTandem( 'titleText' )
      }, MPConstants.CONTROL_PANEL_TITLE_OPTIONS ) );

    // Checkboxes
    const bondDipolesCheckbox = new BondDipolesCheckbox( viewProperties.bondDipolesVisibleProperty, {
      tandem: options.tandem.createTandem( 'bondDipolesCheckbox' )
    } );
    const molecularDipoleCheckbox = new MolecularDipoleCheckbox( viewProperties.molecularDipoleVisibleProperty, {
      tandem: options.tandem.createTandem( 'molecularDipoleCheckbox' )
    } );
    const partialChargesCheckbox = new PartialChargesCheckbox( viewProperties.partialChargesVisibleProperty, {
      tandem: options.tandem.createTandem( 'partialChargesCheckbox' )
    } );

    assert && assert( !options.children, 'ThreeAtomsViewControls sets children' );
    options.children = [
      titleText,
      bondDipolesCheckbox,
      molecularDipoleCheckbox,
      partialChargesCheckbox
    ];

    super( options );
  }
}

moleculePolarity.register( 'ThreeAtomsViewControls', ThreeAtomsViewControls );

export default ThreeAtomsViewControls;