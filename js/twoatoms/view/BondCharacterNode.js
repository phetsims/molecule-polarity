// Copyright 2014-2019, University of Colorado Boulder

/**
 * Displays the bond 'character' of the molecule, by placing a marker on a continuum whose extremes are "covalent"
 * and "ionic". This node is derived; the marker serves as a "readout" and is updated based on the properties
 * of the molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import inherit from '../../../../phet-core/js/inherit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarityStrings from '../../molecule-polarity-strings.js';
import moleculePolarity from '../../moleculePolarity.js';

const bondCharacterString = moleculePolarityStrings.bondCharacter;
const moreCovalentString = moleculePolarityStrings.moreCovalent;
const moreIonicString = moleculePolarityStrings.moreIonic;

// constants
const TRACK_WIDTH = 435;
const TRACK_CORNER_RADIUS = 5;
const LABEL_X_INSET = 10;
const POINTER_X_INSET = 10;
const Y_MARGIN = 3;
const Y_SPACING = 3;

/**
 * @param {DiatomicMolecule} molecule
 * @constructor
 */
function BondCharacterNode( molecule ) {

  Node.call( this );

  // title
  const titleNode = new Text( bondCharacterString, {
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
  const leftLabelNode = new Text( moreCovalentString, labelOptions );
  const rightLabelNode = new Text( moreIonicString, labelOptions );

  // pointer that moves along the track, not interactive
  const pointerNode = new PointerNode( molecule.atomA, molecule.atomB );

  // track
  const trackHeight = ( 2 * Y_MARGIN ) + titleNode.height + Y_SPACING + pointerNode.height;
  const trackNode = new Rectangle( 0, 0, TRACK_WIDTH, trackHeight, TRACK_CORNER_RADIUS, TRACK_CORNER_RADIUS,
    { fill: 'white', stroke: 'black' } );

  // rendering order
  this.addChild( trackNode );
  this.addChild( pointerNode );
  this.addChild( titleNode );
  this.addChild( rightLabelNode );
  this.addChild( leftLabelNode );

  // layout, relative to track
  titleNode.centerX = trackNode.centerX;
  titleNode.top = trackNode.top + Y_MARGIN;
  pointerNode.top = titleNode.bottom + Y_SPACING;
  leftLabelNode.left = trackNode.left + LABEL_X_INSET;
  leftLabelNode.top = trackNode.top + Y_MARGIN;
  rightLabelNode.right = trackNode.right - LABEL_X_INSET;
  rightLabelNode.top = trackNode.top + Y_MARGIN;

  // when difference in electronegativity changes, move the pointer, unlink not needed
  molecule.bond.dipoleProperty.link( function( dipole ) {
    pointerNode.left = Utils.linear( 0, MPConstants.ELECTRONEGATIVITY_RANGE.getLength(),
      POINTER_X_INSET, TRACK_WIDTH - pointerNode.width - POINTER_X_INSET,
      dipole.magnitude );
  } );
}

moleculePolarity.register( 'BondCharacterNode', BondCharacterNode );

/**
 * Pointer looks like a horizontally aligned diatomic molecule.
 * @param {Atom} atom1
 * @param {Atom} atom2
 * @constructor
 */
function PointerNode( atom1, atom2 ) {
  Node.call( this );

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

inherit( Node, PointerNode );

inherit( Node, BondCharacterNode );
export default BondCharacterNode;