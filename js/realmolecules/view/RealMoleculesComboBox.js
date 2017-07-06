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
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var RichText = require( 'SCENERY_PHET/RichText' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var moleculeString = require( 'string!MOLECULE_POLARITY/molecule' );
  var pattern0LabelString = require( 'string!MOLECULE_POLARITY/pattern.0label' );
  var pattern0Symbol1NameString = require( 'string!MOLECULE_POLARITY/pattern.0symbol.1name' );

  /**
   * @param {RealMolecule[]} molecules
   * @param {Property.<RealMolecule>} moleculeProperty
   * @param {Node} listParent
   * @constructor
   */
  function RealMoleculesComboBox( molecules, moleculeProperty, listParent ) {

    // label
    var labelNode = new Text( StringUtils.format( pattern0LabelString, moleculeString ), {
      font: new PhetFont( 22 ),
      maxWidth: 150
    } );

    // items
    var items = [];
    for ( var i = 0; i < molecules.length; i++ ) {
      var molecule = molecules[ i ];
      var node = new RichText( StringUtils.format( pattern0Symbol1NameString, molecule.symbol, molecule.name ), { font: new PhetFont( 18 ) } );
      items[ i ] = ComboBox.createItem( node, molecule );
    }

    ComboBox.call( this, items, moleculeProperty, listParent, {
      labelNode: labelNode,
      listPosition: 'above',
      itemYMargin: 4,
      itemHighlightFill: 'rgb(218,255,255)',
      buttonLineWidth: 3,
      buttonCornerRadius: 10,
      maxWidth: 450
    } );
  }

  moleculePolarity.register( 'RealMoleculesComboBox', RealMoleculesComboBox );

  return inherit( ComboBox, RealMoleculesComboBox );
} );
