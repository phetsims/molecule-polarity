// Copyright 2021, University of Colorado Boulder

/**
 * BondDipolesCheckbox is the checkbox for controlling visibility of partial charges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import BondDipoleNode from './BondDipoleNode.js';

class BondDipolesCheckbox extends Checkbox {

  /**
   * @param {Property.<boolean>} bondDipolesVisibleProperty
   * @param {Object} [options]
   */
  constructor( bondDipolesVisibleProperty, options ) {

    options = merge( {
      singular: false,
      tandem: Tandem.REQUIRED
    }, options );

    const labelNode = createLabelNode( {
      tandem: options.tandem.createTandem( 'labelNode' )
    } );

    super( labelNode, bondDipolesVisibleProperty, options );
  }
}

/**
 * Creates the label for this checkbox.
 * @param {Object} [options]
 * @returns {HBox}
 */
function createLabelNode( options ) {

  options = merge( {
    singular: false,
    spacing: MPConstants.CONTROL_ICON_X_SPACING,
    tandem: Tandem.REQUIRED
  }, options );

  const labelString = options.singular ? moleculePolarityStrings.bondDipole : moleculePolarityStrings.bondDipoles;
  const labelText = new Text( labelString,
    merge( {
      tandem: options.tandem.createTandem( 'labelText' )
    }, MPConstants.CONTROL_TEXT_OPTIONS )
  );

  const labelIcon = BondDipoleNode.createIcon( {
    tandem: options.tandem.createTandem( 'labelIcon' )
  } );

  assert && assert( !options.children, 'createLabelNode sets children' );
  options.children = [ labelText, labelIcon ];

  return new HBox( options );
}

moleculePolarity.register( 'BondDipolesCheckbox', BondDipolesCheckbox );
export default BondDipolesCheckbox;