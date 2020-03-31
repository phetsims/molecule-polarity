// Copyright 2014-2020, University of Colorado Boulder

/**
 * Combo box for choosing a real molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import ComboBoxItem from '../../../../sun/js/ComboBoxItem.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import moleculePolarity from '../../moleculePolarity.js';

// strings
const moleculeString = moleculePolarityStrings.molecule;
const patternSymbolNameString = moleculePolarityStrings.pattern.symbolName;

class RealMoleculesComboBox extends ComboBox {

  /**
   * @param {RealMolecule[]} molecules
   * @param {Property.<RealMolecule>} moleculeProperty
   * @param {Node} listParent
   * @constructor
   */
  constructor( molecules, moleculeProperty, listParent ) {

    // label
    const labelNode = new Text( moleculeString, {
      font: new PhetFont( 22 ),
      maxWidth: 150
    } );

    // {ComboBoxItem[]}
    const items = molecules.map( createItem );

    super( items, moleculeProperty, listParent, {
      labelNode: labelNode,
      listPosition: 'above',
      highlightFill: 'rgb(218,255,255)',
      cornerRadius: 8,
      maxWidth: 450
    } );
  }
}

moleculePolarity.register( 'RealMoleculesComboBox', RealMoleculesComboBox );

/**
 * Creates an item for the combo box.
 * @param {RealMolecule} molecule
 * @returns {ComboBoxItem}
 */
function createItem( molecule ) {

  const text = StringUtils.fillIn( patternSymbolNameString, {
    symbol: molecule.symbol,
    name: molecule.name
  } );

  const node = new RichText( text, {
    maxWidth: 200,
    font: new PhetFont( 18 )
  } );

  return new ComboBoxItem( node, molecule );
}

export default RealMoleculesComboBox;