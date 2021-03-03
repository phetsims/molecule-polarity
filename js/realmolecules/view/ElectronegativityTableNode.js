// Copyright 2014-2021, University of Colorado Boulder

/**
 * Table that shows electronegativity for a set of elements.
 * By default, all cells in the table are the same color.
 * Colors for specific cells can be set, so that they match the colors of the atoms displayed by Jmol.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Color from '../../../../scenery/js/util/Color.js';
import HSeparator from '../../../../sun/js/HSeparator.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import RealMoleculeViewer from './RealMoleculeViewer.js';

// constants
const CELL_SIZE = new Dimension2( 50, 50 );
const BACKGROUND_COLOR = new Color( 210, 210, 210 );
const NORMAL_TEXT_COLOR = BACKGROUND_COLOR.darkerColor();
const HIGHLIGHTED_TEXT_COLOR = Color.BLACK;

class ElectronegativityTableNode extends Node {

  /**
   * @param {RealMoleculeViewer} moleculeViewer
   * @param {Object} [options]
   */
  constructor( moleculeViewer, options ) {
    assert && assert( moleculeViewer instanceof RealMoleculeViewer, 'invalid moleculeViewer' );

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    const titleText = new Text( moleculePolarityStrings.atomElectronegativities, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      maxWidth: 300,
      tandem: options.tandem.createTandem( 'titleText' )
    } );

    const cells = [
      new Cell( 'H', 1, 2.1 ),
      new HSeparator( 12 ),
      new Cell( 'B', 5, 2.0 ),
      new Cell( 'C', 6, 2.5 ),
      new Cell( 'N', 7, 3.0 ),
      new Cell( 'O', 8, 3.5 ),
      new Cell( 'F', 9, 4.0 ),
      new HSeparator( 12 ),
      new Cell( 'Cl', 17, 3.0 )
    ];

    // Horizontal layout of cells, with title centered below the cel
    assert && assert( !options.children, 'ElectronegativityTableNode sets children' );
    options.children = [
      new VBox( {
        spacing: 4,
        children: [
          new HBox( {
            spacing: 0,
            children: cells
          } ),
          titleText
        ]
      } )
    ];

    super( options );

    // @private
    this.cells = cells;

    // highlight elements displayed by the viewer
    moleculeViewer.elementsProperty.lazyLink( elements => {
      this.resetCells();
      elements.forEach( element => {
        this.setColor( element.elementNumber, element.color );
      } );
    } );
  }

  // @private
  resetCells() {
    this.cells.forEach( cell => cell.disable() );
  }

  // @private Sets the {Color} color of a specified {number} element
  setColor( elementNumber, color ) {
    for ( let i = 0; i < this.cells.length; i++ ) {
      if ( this.cells[ i ].elementNumber === elementNumber ) {
        this.cells[ i ].enable( color );
        break;
      }
    }
  }
}

/**
 * A cell in the table, displays element name and number, color can be set.
 */
class Cell extends Node {

  /**
   * @param {string} symbol - element's symbol in the periodic table
   * @param {number} elementNumber - element's number in the periodic table
   * @param {number} electronegativity
   */
  constructor( symbol, elementNumber, electronegativity ) {

    super();

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
    this.electronegativityNode = new Text( Utils.toFixedNumber( electronegativity, 1 ), {
      font: new PhetFont( 16 ),
      fill: NORMAL_TEXT_COLOR
    } );

    this.children = [ this.backgroundNode, this.symbolNode, this.electronegativityNode ];

    // layout
    this.symbolNode.centerX = this.electronegativityNode.centerX = this.backgroundNode.centerX;
    this.symbolNode.top = 3;
    this.electronegativityNode.bottom = this.backgroundNode.bottom - 3;
  }

  // @public makes the cell appear enabled
  enable( color ) {
    this.backgroundNode.fill = color;
    this.symbolNode.fill = this.electronegativityNode.fill = HIGHLIGHTED_TEXT_COLOR;
  }

  // @public makes the cell appear disabled
  disable() {
    this.backgroundNode.fill = BACKGROUND_COLOR;
    this.symbolNode.fill = this.electronegativityNode.fill = NORMAL_TEXT_COLOR;
  }
}

moleculePolarity.register( 'ElectronegativityTableNode', ElectronegativityTableNode );

export default ElectronegativityTableNode;