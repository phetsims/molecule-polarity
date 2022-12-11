// Copyright 2014-2022, University of Colorado Boulder

/**
 * Displays the bond 'character' of the molecule, by placing a marker on a continuum whose extremes are "covalent"
 * and "ionic". This node is derived; the marker serves as a "readout" and is updated based on the properties
 * of the molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Circle, Line, Node, Rectangle, Text, TextOptions } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Atom from '../../common/model/Atom.js';
import DiatomicMolecule from '../model/DiatomicMolecule.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';

// constants
const TRACK_WIDTH = 415;
const Y_SPACING = 3;

type SelfOptions = EmptySelfOptions;

type BondCharacterPanelOptions = SelfOptions &
  PickRequired<PanelOptions, 'tandem'> &
  PickOptional<PanelOptions, 'visibleProperty'>;

export default class BondCharacterPanel extends Panel {

  public constructor( molecule: DiatomicMolecule, providedOptions: BondCharacterPanelOptions ) {

    const options = optionize<BondCharacterPanelOptions, SelfOptions, PanelOptions>()( {

      // PanelOptions
      cornerRadius: 5,
      fill: 'white',
      stroke: 'black',
      xMargin: 10,
      yMargin: 3
    }, providedOptions );

    // title
    const bondCharacterText = new Text( MoleculePolarityStrings.bondCharacterStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: 'black',
      maxWidth: 0.3 * TRACK_WIDTH,
      tandem: options.tandem.createTandem( 'bondCharacterText' )
    } );

    // labels
    const labelOptions = {
      font: new PhetFont( 16 ),
      fill: 'black',
      maxWidth: 0.3 * TRACK_WIDTH
    };
    const moreCovalentText = new Text( MoleculePolarityStrings.moreCovalentStringProperty,
      combineOptions<TextOptions>( {}, labelOptions, {
        tandem: options.tandem.createTandem( 'moreCovalentText' )
      } ) );
    const moreIconicText = new Text( MoleculePolarityStrings.moreIonicStringProperty,
      combineOptions<TextOptions>( {}, labelOptions, {
        tandem: options.tandem.createTandem( 'moreIconicText' )
      } ) );

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

    // When difference in electronegativity changes, move the pointer.
    molecule.bond.dipoleProperty.link( dipole => {
      markerNode.left = Utils.linear(
        0, MPConstants.ELECTRONEGATIVITY_RANGE.getLength(),
        0, TRACK_WIDTH - markerNode.width,
        dipole.magnitude );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

/**
 * PointerNode looks like a horizontally aligned diatomic molecule.
 */
class PointerNode extends Node {

  public constructor( atom1: Atom, atom2: Atom ) {
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