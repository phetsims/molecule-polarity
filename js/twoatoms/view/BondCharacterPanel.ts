// Copyright 2014-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Displays the bond 'character' of the molecule, by placing a marker on a continuum whose extremes are "covalent"
 * and "ionic". This node is derived; the marker serves as a "readout" and is updated based on the properties
 * of the molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
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
      yMargin: 3,
      tandem: Tandem.REQUIRED
    }, options );

    // title
    const bondCharacterText = new Text( moleculePolarityStrings.bondCharacterStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: 'black',
      maxWidth: 0.3 * TRACK_WIDTH,
      tandem: options.tandem.createTandem( 'bondCharacterText' ),
      phetioVisiblePropertyInstrumented: false
    } );

    // labels
    const labelOptions = {
      font: new PhetFont( 16 ),
      fill: 'black',
      maxWidth: 0.3 * TRACK_WIDTH
    };
    const moreCovalentText = new Text( moleculePolarityStrings.moreCovalentStringProperty, merge( {
      tandem: options.tandem.createTandem( 'moreCovalentText' ),
      phetioVisiblePropertyInstrumented: false
    }, labelOptions ) );
    const moreIconicText = new Text( moleculePolarityStrings.moreIonicStringProperty, merge( {
      tandem: options.tandem.createTandem( 'moreIconicText' ),
      phetioVisiblePropertyInstrumented: false
    }, labelOptions ) );

    // marker that moves along the track, not interactive
    const markerNode = new PointerNode( molecule.atomA, molecule.atomB );

    // track
    const trackHeight = bondCharacterText.height + Y_SPACING + markerNode.height;
    const trackNode = new Rectangle( 0, 0, TRACK_WIDTH, trackHeight, {
      cornerRadius: 5,
      fill: 'transparent'
    } );

    // layout, relative to track
    bondCharacterText.centerX = trackNode.centerX;
    bondCharacterText.top = trackNode.top;
    markerNode.top = bondCharacterText.bottom + Y_SPACING;
    moreCovalentText.left = trackNode.left;
    moreCovalentText.top = trackNode.top;
    moreIconicText.right = trackNode.right;
    moreIconicText.top = trackNode.top;

    const content = new Node( {
      children: [ trackNode, markerNode, bondCharacterText, moreIconicText, moreCovalentText ]
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