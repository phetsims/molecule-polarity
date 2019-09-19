// Copyright 2014-2019, University of Colorado Boulder

/**
 * Combo box for choosing a real molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ComboBox = require( 'SUN/ComboBox' );
  const ComboBoxItem = require( 'SUN/ComboBoxItem' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const moleculeString = require( 'string!MOLECULE_POLARITY/molecule' );
  const patternSymbolNameString = require( 'string!MOLECULE_POLARITY/pattern.symbolName' );

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

  return RealMoleculesComboBox;
} );
