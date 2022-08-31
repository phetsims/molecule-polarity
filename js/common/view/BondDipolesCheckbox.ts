// Copyright 2021-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * BondDipolesCheckbox is the checkbox for controlling visibility of one or more bond dipoles.
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
import BondDipoleNode from './BondDipoleNode.js';

export default class BondDipolesCheckbox extends Checkbox {

  /**
   * @param {Property.<boolean>} bondDipolesVisibleProperty
   * @param {Object} [options]
   */
  constructor( bondDipolesVisibleProperty, options ) {
    assert && AssertUtils.assertPropertyOf( bondDipolesVisibleProperty, 'boolean' );

    options = merge( {
      singular: false,
      tandem: Tandem.REQUIRED
    }, options );

    const stringProperty = options.singular ?
                           moleculePolarityStrings.bondDipolesStringProperty :
                           moleculePolarityStrings.bondDipoleStringProperty;

    const textNode = new Text( stringProperty, merge( {
      tandem: options.tandem.createTandem( 'textNode' ),
      phetioVisiblePropertyInstrumented: false
    }, MPConstants.CONTROL_TEXT_OPTIONS ) );

    const iconNode = BondDipoleNode.createIcon();

    const content = new HBox( {
      children: [ textNode, iconNode ],
      spacing: MPConstants.CONTROL_ICON_X_SPACING
    } );

    super( bondDipolesVisibleProperty, content, options );
  }
}

moleculePolarity.register( 'BondDipolesCheckbox', BondDipolesCheckbox );