// Copyright 2014-2017, University of Colorado Boulder

/**
 * Combo box for choosing a real molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ComboBox = require( 'SUN/ComboBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var moleculeString = require( 'string!MOLECULE_POLARITY/molecule' );
  var patternSymbolNameString = require( 'string!MOLECULE_POLARITY/pattern.symbolName' );

  /**
   * @param {RealMolecule[]} molecules
   * @param {Property.<RealMolecule>} moleculeProperty
   * @param {Node} listParent
   * @constructor
   */
  function RealMoleculesComboBox( molecules, moleculeProperty, listParent ) {

    // label
    var labelNode = new Text( moleculeString, {
      font: new PhetFont( 22 ),
      maxWidth: 150
    } );

    // items
    var items = [];
    for ( var i = 0; i < molecules.length; i++ ) {

      var molecule = molecules[ i ];

      var text = StringUtils.fillIn( patternSymbolNameString, {
        symbol: molecule.symbol,
        name: molecule.name
      } );

      var node = new RichText( text, {
        maxWidth: 200,
        font: new PhetFont( 18 )
      } );

      items[ i ] = ComboBox.createItem( node, molecule );
    }

    ComboBox.call( this, items, moleculeProperty, listParent, {
      labelNode: labelNode,
      listPosition: 'above',
      highlightFill: 'rgb(218,255,255)',
      maxWidth: 450
    } );
  }

  moleculePolarity.register( 'RealMoleculesComboBox', RealMoleculesComboBox );

  return inherit( ComboBox, RealMoleculesComboBox );
} );
