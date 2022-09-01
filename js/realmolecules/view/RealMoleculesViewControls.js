// Copyright 2017-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * 'View' controls for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPConstants from '../../common/MPConstants.js';
import BondDipolesCheckbox from '../../common/view/BondDipolesCheckbox.js';
import MolecularDipoleCheckbox from '../../common/view/MolecularDipoleCheckbox.js';
import PartialChargesCheckbox from '../../common/view/PartialChargesCheckbox.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import AtomElectronegativitiesCheckbox from './AtomElectronegativitiesCheckbox.js';
import AtomLabelsCheckbox from './AtomLabelsCheckbox.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';

class RealMoleculesViewControls extends VBox {

  /**
   * @param {RealMoleculesViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( viewProperties, options ) {
    assert && assert( viewProperties instanceof RealMoleculesViewProperties, 'invalid viewProperties' );

    options = merge( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, options );

    // title
    const titleText = new Text( moleculePolarityStrings.viewStringProperty, merge( {
      tandem: options.tandem.createTandem( 'titleText' ),
      phetioVisiblePropertyInstrumented: false
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
    const atomLabelsCheckbox = new AtomLabelsCheckbox( viewProperties.atomLabelsVisibleProperty, {
      tandem: options.tandem.createTandem( 'atomLabelsCheckbox' )
    } );
    const atomElectronegativitiesCheckbox = new AtomElectronegativitiesCheckbox( viewProperties.atomElectronegativitiesVisibleProperty, {
      tandem: options.tandem.createTandem( 'atomElectronegativitiesCheckbox' )
    } );

    assert && assert( !options.children, 'RealMoleculesViewControls sets children' );
    options.children = [
      titleText,
      bondDipolesCheckbox,
      molecularDipoleCheckbox,
      partialChargesCheckbox,
      atomLabelsCheckbox,
      atomElectronegativitiesCheckbox
    ];

    super( options );
  }
}

moleculePolarity.register( 'RealMoleculesViewControls', RealMoleculesViewControls );
export default RealMoleculesViewControls;