// Copyright 2021-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * MolecularDipoleCheckbox is the checkbox for controlling visibility of the molecular dipole.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import { HBox, Text } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import MolecularDipoleNode from './MolecularDipoleNode.js';

export default class MolecularDipoleCheckbox extends Checkbox {

  /**
   * @param {Property.<boolean>} molecularDipoleVisibleProperty
   * @param {Object} [options]
   */
  constructor( molecularDipoleVisibleProperty, options ) {
    assert && AssertUtils.assertPropertyOf( molecularDipoleVisibleProperty, 'boolean' );

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    const textNode = new Text( moleculePolarityStrings.molecularDipoleStringProperty, merge( {
      tandem: options.tandem.createTandem( 'textNode' ),
      phetioVisiblePropertyInstrumented: false
    }, MPConstants.CONTROL_TEXT_OPTIONS ) );

    const iconNode = MolecularDipoleNode.createIcon();

    const content = new HBox( {
      children: [ textNode, iconNode ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );

    super( molecularDipoleVisibleProperty, content, options );
  }
}

moleculePolarity.register( 'MolecularDipoleCheckbox', MolecularDipoleCheckbox );