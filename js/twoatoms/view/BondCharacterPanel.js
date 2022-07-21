// Copyright 2014-2022, University of Colorado Boulder

/**
 * Displays the bond 'character' of the molecule, by placing a marker on a continuum whose extremes are "covalent"
 * and "ionic". This node is derived; the marker serves as a "readout" and is updated based on the properties
 * of the molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Circle, Line, Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import DiatomicMolecule from '../model/DiatomicMolecule.js';

// constants
const TRACK_WIDTH = 415;
const Y_SPACING = 3;

class BondCharacterPanel extends Panel {

  /**
   * @param {DiatomicMolecule} molecule
   * @param {Object} [options]
   */
  constructor( molecule, options ) {
    assert && assert( molecule instanceof DiatomicMolecule, 'invalid molecule' );

    options = merge( {
      cornerRadius: 5,
      fill: 'white',
      stroke: 'black',
      xMargin: 10,
      yMargin: 3
    }, options );

    // title
    const titleNode = new Text( moleculePolarityStrings.bondCharacter, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: 'black',
      maxWidth: 0.3 * TRACK_WIDTH
    } );

    // labels
    const labelOptions = {
      font: new PhetFont( 16 ),
      fill: 'black',
      maxWidth: 0.3 * TRACK_WIDTH
    };
    const leftLabelNode = new Text( moleculePolarityStrings.moreCovalent, labelOptions );
    const rightLabelNode = new Text( moleculePolarityStrings.moreIonic, labelOptions );

    // marker that moves along the track, not interactive
    const markerNode = new PointerNode( molecule.atomA, molecule.atomB );

    // track
    const trackHeight = titleNode.height + Y_SPACING + markerNode.height;
    const trackNode = new Rectangle( 0, 0, TRACK_WIDTH, trackHeight, {
      cornerRadius: 5,
      fill: 'transparent'
    } );

    // layout, relative to track
    titleNode.centerX = trackNode.centerX;
    titleNode.top = trackNode.top;
    markerNode.top = titleNode.bottom + Y_SPACING;
    leftLabelNode.left = trackNode.left;
    leftLabelNode.top = trackNode.top;
    rightLabelNode.right = trackNode.right;
    rightLabelNode.top = trackNode.top;

    const content = new Node( {
      children: [ trackNode, markerNode, titleNode, rightLabelNode, leftLabelNode ]
    } );

    super( content, options );

    // when difference in electronegativity changes, move the pointer, unlink not needed
    molecule.bond.dipoleProperty.link( dipole => {
      markerNode.left = Utils.linear(
        0, MPConstants.ELECTRONEGATIVITY_RANGE.getLength(),
        0, TRACK_WIDTH - markerNode.width,
        dipole.magnitude );
    } );
  }
}

/**
 * PointerNode looks like a horizontally aligned diatomic molecule.
 */
class PointerNode extends Node {

  /**
   * @param {Atom} atom1
   * @param {Atom} atom2
   */
  constructor( atom1, atom2 ) {
    super();

    const atomRadius = 5;
    const bondNode = new Line( 0, 0, 7, 0, { lineWidth: 3, stroke: 'rgb(128,128,128)' } );
    const atom1Node = new Circle( atomRadius, { fill: atom1.color, stroke: 'black' } );
    const atom2Node = new Circle( atomRadius, { fill: atom2.color, stroke: 'black' } );

    this.addChild( bondNode );
    this.addChild( atom1Node );
    this.addChild( atom2Node );

    bondNode.left = atom1Node.right - 1;
    bondNode.centerY = atom1Node.centerY;
    atom2Node.left = bondNode.right - 1;
    atom2Node.centerY = atom1Node.centerY;
  }
}

moleculePolarity.register( 'BondCharacterPanel', BondCharacterPanel );
export default BondCharacterPanel;