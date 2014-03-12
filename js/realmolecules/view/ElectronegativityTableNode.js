// Copyright 2002-2014, University of Colorado Boulder

/**
 * Table that shows electronegativity for a set of elements.
 * By default, all cells in the table are the same color.
 * Colors for specific cells can be set, so that they match the colors of the atoms displayed by Jmol.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // constants
  var CELL_SIZE = new Dimension2( 50, 65 );
  var BACKGROUND_COLOR = new Color( 210, 210, 210 );
  var NORMAL_TEXT_COLOR = BACKGROUND_COLOR.darkerColor();
  var HIGHLIGHTED_TEXT_COLOR = Color.BLACK;

  // strings
  var atomElectronegativitiesString = require( 'string!MOLECULE_POLARITY/atomElectronegativities' );

  /**
   * A cell in the table, displays element name and number, color can be set.
   *
   * @param {String} symbol element's symbol in the periodic table
   * @param {Number} elementNumber element's number in the periodic table
   * @param {Number} electronegativity
   * @constructor
   */
  function Cell( symbol, elementNumber, electronegativity ) {

    this.elementNumber = elementNumber;

    // nodes
    this.backgroundNode = new Rectangle( 0, 0, CELL_SIZE.width, CELL_SIZE.height, { fill: BACKGROUND_COLOR, stroke: 'black' } );
    this.symbolNode = new Text( symbol, { font: new PhetFont( { size: 24, weight: 'bold' } ), fill: NORMAL_TEXT_COLOR } );
    this.electronegativityNode = new Text( Util.toFixed( electronegativity, 1 ), { font: new PhetFont( 18 ), fill: NORMAL_TEXT_COLOR } );

    Node.call( this, { children: [ this.backgroundNode, this.symbolNode, this.electronegativityNode ] } );

    // layout
    this.symbolNode.centerX = this.electronegativityNode.centerX = this.backgroundNode.centerX;
    this.symbolNode.top = 3;
    this.electronegativityNode.bottom = this.backgroundNode.bottom - 3;
  }

  inherit( Node, Cell, {

    // makes the cell appear enabled
    enable: function( color ) {
      this.backgroundNode.fill = color;
      this.symbolNode.fill = this.electronegativityNode.fill = HIGHLIGHTED_TEXT_COLOR;
    },

    // makes the cell appear disabled
    disable: function() {
      this.backgroundNode.fill = BACKGROUND_COLOR;
      this.symbolNode.fill = this.electronegativityNode.fill = NORMAL_TEXT_COLOR;
    }
  } );

  /**
   * @param {JSmolViewerNode} viewerNode
   * @constructor
   */
  function ElectronegativityTableNode( viewerNode ) {

    var thisNode = this;
    Node.call( thisNode );

    var titleNode = new Text( atomElectronegativitiesString, { font: new PhetFont( 16 ) } );
    thisNode.addChild( titleNode );

    thisNode.cells = [
      new Cell( "H", 1, 2.1 ),
      new Cell( "B", 5, 2.0 ),
      new Cell( "C", 6, 2.5 ),
      new Cell( "N", 7, 3.0 ),
      new Cell( "O", 8, 3.5 ),
      new Cell( "F", 9, 4.0 ),
      new Cell( "Cl", 17, 3.0 )
    ];

    // layout cells, first and last cells are horizontally separated from others
    var xGap = 12;
    var x = 0;
    var y = 0;
    var firstCell = thisNode.cells[0];
    thisNode.addChild( firstCell );
    firstCell.x = x;
    firstCell.y = y;
    x = x + firstCell.width + xGap;
    for ( var i = 1; i < thisNode.cells.length - 1; i++ ) {
      var cell = thisNode.cells[i];
      thisNode.addChild( cell );
      cell.x = x;
      cell.y = y;
      x = cell.right;
    }
    x += xGap;
    var lastCell = thisNode.cells[ thisNode.cells.length - 1 ];
    thisNode.addChild( lastCell );
    lastCell.x = x;
    lastCell.y = y;

    // center title below cells
    titleNode.centerX = ( lastCell.right - firstCell.left ) / 2;
    titleNode.top = firstCell.bottom + 4;

    // when the molecule changes, ask Jmol for the molecule's elements and colors, and highlight the corresponding cells
    viewerNode.moleculeProperty.link( function( molecule ) {
      thisNode.resetCells();
      var elements = viewerNode.getElements();
      elements.forEach( function( element ) {
        thisNode.setColor( element.elementNumber, element.color );
      } );
    } );
  }

  return inherit( Node, ElectronegativityTableNode, {

    // @private
    resetCells: function() {
      this.cells.forEach( function( cell ) {
        cell.disable();
      } );
    },

    // @private Sets the {Color} color of a specified {Number} element
    setColor: function( elementNumber, color ) {
      for ( var i = 0; i < this.cells.length; i++ ) {
        if ( this.cells[i].elementNumber === elementNumber ) {
          this.cells[i].enable( color );
          break;
        }
      }
    }
  } );
} );

