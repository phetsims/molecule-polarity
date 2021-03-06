// Copyright 2014-2021, University of Colorado Boulder

/**
 * Combo box for choosing a real molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import ComboBoxItem from '../../../../sun/js/ComboBoxItem.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import RealMolecule from '../model/RealMolecule.js';

class RealMoleculesComboBox extends ComboBox {

  /**
   * @param {RealMolecule[]} molecules
   * @param {Property.<RealMolecule>} moleculeProperty
   * @param {Node} listParent
   * @param {Object} [options]
   * @constructor
   */
  constructor( molecules, moleculeProperty, listParent, options ) {
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

    super( items, moleculeProperty, listParent, options );
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

  return new ComboBoxItem( node, molecule, {
    tandemName: `${molecule.tandem.name}Item`
  } );
}

moleculePolarity.register( 'RealMoleculesComboBox', RealMoleculesComboBox );
export default RealMoleculesComboBox;