// Copyright 2014-2025, University of Colorado Boulder

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
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import RealMolecule from '../model/RealMolecule.js';
import Element from '../../../../nitroglycerin/js/Element.js';
import { elementToColorProperty, elementToForegroundColorProperty } from '../model/RealMoleculeColors.js';

// constants
const CELL_SIZE = new Dimension2( 50, 50 );
const BACKGROUND_COLOR = new Color( 210, 210, 210 );
const NORMAL_TEXT_COLOR = BACKGROUND_COLOR.darkerColor();

type SelfOptions = EmptySelfOptions;

type ElectronegativityTableNodeOptions = SelfOptions &
  PickRequired<NodeOptions, 'tandem' | 'visibleProperty'>;

export default class ElectronegativityTableNode extends Node {

  private readonly cells: Node[];

  public constructor( moleculeProperty: TReadOnlyProperty<RealMolecule>, providedOptions: ElectronegativityTableNodeOptions ) {

    const options = optionize<ElectronegativityTableNodeOptions, SelfOptions, NodeOptions>()( {
      // This no-op optionize call is needed in order to set options.children below.
    }, providedOptions );

    const titleText = new Text( MoleculePolarityStrings.atomElectronegativitiesStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      maxWidth: 300
    } );

    const cells = [
      new Cell( 'H', Element.H, 2.1 ),
      new Line( 0, 0, 12, 0, { stroke: 'rgb( 100, 100, 100 )' } ),
      new Cell( 'B', Element.B, 2.0 ),
      new Cell( 'C', Element.C, 2.5 ),
      new Cell( 'N', Element.N, 3.0 ),
      new Cell( 'O', Element.O, 3.5 ),
      new Cell( 'F', Element.F, 4.0 ),
      new Line( 0, 0, 12, 0, { stroke: 'rgb( 100, 100, 100 )' } ),
      new Cell( 'Cl', Element.Cl, 3.0 )
    ];

    // Horizontal layout of cells, with title centered below the cells
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
    moleculeProperty.link( molecule => {
      this.resetCells();

      for ( const atom of molecule.atoms ) {
        // TODO: This can be renamed and replaced by passing in the atom, https://github.com/phetsims/molecule-polarity/issues/32
        this.setColor( atom.element, elementToColorProperty( atom.element ), elementToForegroundColorProperty( atom.element ) );
      }
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
  private setColor( element: Element, color: TColor, foregroundColor: TColor ): void {
    for ( let i = 0; i < this.cells.length; i++ ) {
      const cell = this.cells[ i ];
      if ( cell instanceof Cell ) {
        if ( cell.element === element ) {
          cell.enable( color, foregroundColor );
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

  public readonly element: Element;
  private readonly backgroundNode: Rectangle;
  private readonly symbolText: Text;
  private readonly electronegativityText: Text;

  /**
   * @param symbol - element's symbol in the periodic table
   * @param elementNumber - element's number in the periodic table
   * @param electronegativity
   */
  public constructor( symbol: string, element: Element, electronegativity: number ) {

    super();

    this.element = element;

    this.backgroundNode = new Rectangle( 0, 0, CELL_SIZE.width, CELL_SIZE.height, {
      fill: BACKGROUND_COLOR,
      stroke: 'black'
    } );

    this.symbolText = new Text( symbol, {
      font: new PhetFont( { size: 22, weight: 'bold' } ),
      fill: NORMAL_TEXT_COLOR
    } );

    this.electronegativityText = new Text( Utils.toFixedNumber( electronegativity, 1 ), {
      font: new PhetFont( 16 ),
      fill: NORMAL_TEXT_COLOR
    } );

    this.children = [ this.backgroundNode, this.symbolText, this.electronegativityText ];

    // layout
    this.symbolText.centerX = this.electronegativityText.centerX = this.backgroundNode.centerX;
    this.symbolText.top = 3;
    this.electronegativityText.bottom = this.backgroundNode.bottom - 3;
  }

  // makes the cell appear enabled
  public enable( color: TColor, foregroundColor: TColor ): void {
    this.backgroundNode.fill = color;
    this.symbolText.fill = this.electronegativityText.fill = foregroundColor;
  }

  // makes the cell appear disabled
  public disable(): void {
    this.backgroundNode.fill = BACKGROUND_COLOR;
    this.symbolText.fill = this.electronegativityText.fill = NORMAL_TEXT_COLOR;
  }
}

moleculePolarity.register( 'ElectronegativityTableNode', ElectronegativityTableNode );