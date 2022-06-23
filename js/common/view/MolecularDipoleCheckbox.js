// Copyright 2021, University of Colorado Boulder

/**
 * MolecularDipoleCheckbox is the checkbox for controlling visibility of the molecular dipole.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import { HBox } from '../../../../scenery/js/imports.js';
import { Text } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import MolecularDipoleNode from './MolecularDipoleNode.js';

class MolecularDipoleCheckbox extends Checkbox {

  /**
   * @param {Property.<boolean>} molecularDipoleVisibleProperty
   * @param {Object} [options]
   */
  constructor( molecularDipoleVisibleProperty, options ) {
    assert && AssertUtils.assertPropertyOf( molecularDipoleVisibleProperty, 'boolean' );

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    const labelNode = createLabelNode( {
      tandem: options.tandem.createTandem( 'labelNode' )
    } );

    super( molecularDipoleVisibleProperty, labelNode, options );
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

  const labelText = new Text( moleculePolarityStrings.molecularDipole,
    merge( {
      tandem: options.tandem.createTandem( 'labelText' )
    }, MPConstants.CONTROL_TEXT_OPTIONS )
  );

  const labelIcon = MolecularDipoleNode.createIcon();

  assert && assert( !options.children, 'createLabelNode sets children' );
  options.children = [ labelText, labelIcon ];

  return new HBox( options );
}

moleculePolarity.register( 'MolecularDipoleCheckbox', MolecularDipoleCheckbox );
export default MolecularDipoleCheckbox;