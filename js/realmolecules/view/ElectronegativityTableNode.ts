// Copyright 2014-2022, University of Colorado Boulder

/**
 * Table that shows electronegativity for a set of elements.
 * By default, all cells in the table are the same color.
 * Colors for specific cells can be set, so that they match the colors of the atoms displayed by Jmol.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Color, HBox, Node, NodeOptions, Rectangle, TColor, Text, VBox } from '../../../../scenery/js/imports.js';
import HSeparator from '../../../../sun/js/HSeparator.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import RealMoleculeViewer from './RealMoleculeViewer.js';

// constants
const CELL_SIZE = new Dimension2( 50, 50 );
const BACKGROUND_COLOR = new Color( 210, 210, 210 );
const NORMAL_TEXT_COLOR = BACKGROUND_COLOR.darkerColor();
const HIGHLIGHTED_TEXT_COLOR = Color.BLACK;

type SelfOptions = EmptySelfOptions;

export type ElectronegativityTableNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class ElectronegativityTableNode extends Node {

  private readonly cells: Node[];

  public constructor( moleculeViewer: RealMoleculeViewer, providedOptions: ElectronegativityTableNodeOptions ) {

    const options = optionize<ElectronegativityTableNodeOptions, SelfOptions, NodeOptions>()( {
      // This no-op optionize call is needed in order to set options.children below.
    }, providedOptions );

    const titleText = new Text( moleculePolarityStrings.atomElectronegativitiesStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      maxWidth: 300,
      tandem: options.tandem.createTandem( 'titleText' ),
      phetioVisiblePropertyInstrumented: false
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

    this.cells = cells;

    // highlight elements displayed by the viewer
    moleculeViewer.elementsProperty.lazyLink( elements => {
      this.resetCells();
      elements.forEach( element => this.setColor( element.elementNumber, element.color ) );
    } );
  }

  private resetCells(): void {
    this.cells.forEach( cell => {
      if ( cell instanceof Cell ) {
        cell.disable();
      }
    } );
  }

  // Sets the {Color} color of a specified {number} element
  private setColor( elementNumber: number, color: TColor ): void {
    for ( let i = 0; i < this.cells.length; i++ ) {
      const cell = this.cells[ i ];
      if ( cell instanceof Cell ) {
        if ( cell.elementNumber === elementNumber ) {
          cell.enable( color );
          break;
        }
      }
    }
  }
}

/**
 * A cell in the table, displays element name and number, color can be set.
 */
class Cell extends Node {

  public readonly elementNumber: number;
  private readonly backgroundNode: Rectangle;
  private readonly symbolNode: Text;
  private readonly electronegativityNode: Text;

  /**
   * @param symbol - element's symbol in the periodic table
   * @param elementNumber - element's number in the periodic table
   * @param electronegativity
   */
  public constructor( symbol: string, elementNumber: number, electronegativity: number ) {

    super();

    this.elementNumber = elementNumber;

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

  // makes the cell appear enabled
  public enable( color: TColor ): void {
    this.backgroundNode.fill = color;
    this.symbolNode.fill = this.electronegativityNode.fill = HIGHLIGHTED_TEXT_COLOR;
  }

  // makes the cell appear disabled
  public disable(): void {
    this.backgroundNode.fill = BACKGROUND_COLOR;
    this.symbolNode.fill = this.electronegativityNode.fill = NORMAL_TEXT_COLOR;
  }
}

moleculePolarity.register( 'ElectronegativityTableNode', ElectronegativityTableNode );