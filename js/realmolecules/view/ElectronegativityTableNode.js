// Copyright 2014-2019, University of Colorado Boulder

/**
 * Table that shows electronegativity for a set of elements.
 * By default, all cells in the table are the same color.
 * Colors for specific cells can be set, so that they match the colors of the atoms displayed by Jmol.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // constants
  var CELL_SIZE = new Dimension2( 50, 50 );
  var BACKGROUND_COLOR = new Color( 210, 210, 210 );
  var NORMAL_TEXT_COLOR = BACKGROUND_COLOR.darkerColor();
  var HIGHLIGHTED_TEXT_COLOR = Color.BLACK;

  // strings
  var atomElectronegativitiesString = require( 'string!MOLECULE_POLARITY/atomElectronegativities' );

  /**
   * @param {RealMoleculeViewer} moleculeViewer
   * @constructor
   */
  function ElectronegativityTableNode( moleculeViewer ) {

    Node.call( this );

    var titleNode = new Text( atomElectronegativitiesString, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      maxWidth: 300
    } );
    this.addChild( titleNode );

    // @private
    this.cells = [
      new Cell( 'H', 1, 2.1 ),
      new Cell( 'B', 5, 2.0 ),
      new Cell( 'C', 6, 2.5 ),
      new Cell( 'N', 7, 3.0 ),
      new Cell( 'O', 8, 3.5 ),
      new Cell( 'F', 9, 4.0 ),
      new Cell( 'Cl', 17, 3.0 )
    ];

    // layout cells, first and last cells are horizontally separated from others
    var xGap = 12;
    var x = 0;
    var y = 0;
    var firstCell = this.cells[ 0 ];
    this.addChild( firstCell );
    firstCell.x = x;
    firstCell.y = y;
    x = x + firstCell.width + xGap;
    for ( var i = 1; i < this.cells.length - 1; i++ ) {
      var cell = this.cells[ i ];
      this.addChild( cell );
      cell.x = x;
      cell.y = y;
      x = cell.right;
    }
    x += xGap;
    var lastCell = this.cells[ this.cells.length - 1 ];
    this.addChild( lastCell );
    lastCell.x = x;
    lastCell.y = y;

    // center title below cells
    titleNode.centerX = ( lastCell.right - firstCell.left ) / 2;
    titleNode.top = firstCell.bottom + 4;

    // highlight elements displayed by the viewer
    var self = this;
    moleculeViewer.elementsProperty.lazyLink( function( elements ) {
      self.resetCells();
      elements.forEach( function( element ) {
        self.setColor( element.elementNumber, element.color );
      } );
    } );
  }

  moleculePolarity.register( 'ElectronegativityTableNode', ElectronegativityTableNode );

  inherit( Node, ElectronegativityTableNode, {

    // @private
    resetCells: function() {
      this.cells.forEach( function( cell ) {
        cell.disable();
      } );
    },

    // @private Sets the {Color} color of a specified {number} element
    setColor: function( elementNumber, color ) {
      for ( var i = 0; i < this.cells.length; i++ ) {
        if ( this.cells[ i ].elementNumber === elementNumber ) {
          this.cells[ i ].enable( color );
          break;
        }
      }
    }
  } );

  /**
   * A cell in the table, displays element name and number, color can be set.
   *
   * @param {string} symbol - element's symbol in the periodic table
   * @param {number} elementNumber - element's number in the periodic table
   * @param {number} electronegativity
   * @constructor
   */
  function Cell( symbol, elementNumber, electronegativity ) {

    this.elementNumber = elementNumber;

    // @private nodes
    this.backgroundNode = new Rectangle( 0, 0, CELL_SIZE.width, CELL_SIZE.height, {
      fill: BACKGROUND_COLOR,
      stroke: 'black'
    } );
    this.symbolNode = new Text( symbol, {
      font: new PhetFont( { size: 22, weight: 'bold' } ),
      fill: NORMAL_TEXT_COLOR
    } );
    this.electronegativityNode = new Text( Util.toFixedNumber( electronegativity, 1 ), {
      font: new PhetFont( 16 ),
      fill: NORMAL_TEXT_COLOR
    } );

    Node.call( this, { children: [ this.backgroundNode, this.symbolNode, this.electronegativityNode ] } );

    // layout
    this.symbolNode.centerX = this.electronegativityNode.centerX = this.backgroundNode.centerX;
    this.symbolNode.top = 3;
    this.electronegativityNode.bottom = this.backgroundNode.bottom - 3;
  }

  inherit( Node, Cell, {

    // @public makes the cell appear enabled
    enable: function( color ) {
      this.backgroundNode.fill = color;
      this.symbolNode.fill = this.electronegativityNode.fill = HIGHLIGHTED_TEXT_COLOR;
    },

    // @public makes the cell appear disabled
    disable: function() {
      this.backgroundNode.fill = BACKGROUND_COLOR;
      this.symbolNode.fill = this.electronegativityNode.fill = NORMAL_TEXT_COLOR;
    }
  } );

  return ElectronegativityTableNode;
} );

