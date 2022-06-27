// Copyright 2014-2022, University of Colorado Boulder

/**
 * Combo box for choosing a real molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, RichText, Text } from '../../../../scenery/js/imports.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import RealMolecule from '../model/RealMolecule.js';

class RealMoleculesComboBox extends ComboBox {

  /**
   * @param {Property.<RealMolecule>} moleculeProperty
   * @param {RealMolecule[]} molecules
   * @param {Node} listParent
   * @param {Object} [options]
   * @constructor
   */
  constructor( moleculeProperty, molecules, listParent, options ) {
    assert && AssertUtils.assertArrayOf( molecules, RealMolecule );
    assert && AssertUtils.assertPropertyOf( moleculeProperty, RealMolecule );
    assert && assert( listParent instanceof Node, 'invalid listParent' );

    options = merge( {
      listPosition: 'above',
      highlightFill: 'rgb(218,255,255)',
      cornerRadius: 8,
      maxWidth: 450,
      tandem: Tandem.REQUIRED
    }, options );

    // label
    assert && assert( !options.children, 'RealMoleculesComboBox sets labelNode' );
    options.labelNode = new Text( moleculePolarityStrings.molecule, {
      font: new PhetFont( 22 ),
      maxWidth: 150,
      tandem: options.tandem.createTandem( 'labelNode' )
    } );

    // {ComboBoxItem[]}
    const items = molecules.map( createItem );

    super( moleculeProperty, items, listParent, options );
  }
}

/**
 * Creates an item for the combo box.
 * @param {RealMolecule} molecule
 * @returns {ComboBoxItem}
 */
function createItem( molecule ) {
  assert && assert( molecule instanceof RealMolecule, 'invalid molecule' );

  const text = StringUtils.fillIn( moleculePolarityStrings.pattern.symbolName, {
    symbol: molecule.symbol,
    name: molecule.fullName
  } );

  const node = new RichText( text, {
    maxWidth: 200,
    font: new PhetFont( 18 )
  } );

  return {
    value: molecule,
    node: node,
    tandemName: `${molecule.tandem.name}${ComboBox.ITEM_TANDEM_NAME_SUFFIX}`
  };
}

moleculePolarity.register( 'RealMoleculesComboBox', RealMoleculesComboBox );
export default RealMoleculesComboBox;