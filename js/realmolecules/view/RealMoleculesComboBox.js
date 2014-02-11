// Copyright 2002-2014, University of Colorado Boulder

/**
 * Combo box for choosing a real molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ComboBox = require( 'SUN/ComboBox' );
  var HTMLText = require( 'SCENERY/nodes/HTMLText' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var moleculeString = require( 'string!MOLECULE_POLARITY/molecule' );
  var pattern_0label = require( 'string!MOLECULE_POLARITY/pattern.0label' );
  var pattern_0symbol_1name = require( 'string!MOLECULE_POLARITY/pattern.0symbol.1name' );

  /**
   * @param {Array<RealMolecule>} molecules
   * @param {Property<RealMolecule>} selectedMolecule
   * @param {Node} listParent
   * @constructor
   */
  function RealMoleculesComboBox( molecules, selectedMolecule, listParent ) {

    // label
    var lableNode = new Text( StringUtils.format( pattern_0label, moleculeString ), { font: new PhetFont( 22 ) } );
    // items
    var items = [];
    for ( var i = 0; i < molecules.length; i++ ) {
      var molecule = molecules[i];
      var node = new HTMLText( StringUtils.format( pattern_0symbol_1name, molecule.symbol, molecule.name ), { font: new PhetFont( 16 ) } );
      items[i] = ComboBox.createItem( node, molecule );
    }

    ComboBox.call( this, items, selectedMolecule, listParent, {
      labelNode: lableNode,
      listPosition: 'above',
      itemYMargin: 6,
      itemHighlightFill: 'rgb(218,255,255)',
      buttonLineWidth: 3,
      buttonCornerRadius: 10
    } );
  }

  return inherit( ComboBox, RealMoleculesComboBox );
} );
