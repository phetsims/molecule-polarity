// Copyright 2014-2015, University of Colorado Boulder

/**
 * Displays the bond 'character', by placing a marker on a continuum whose extremes are "covalent" and "ionic".
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var bondCharacterString = require( 'string!MOLECULE_POLARITY/bondCharacter' );
  var covalentString = require( 'string!MOLECULE_POLARITY/covalent' );
  var ionicString = require( 'string!MOLECULE_POLARITY/ionic' );

  // constants
  var TRACK_WIDTH = 435;
  var TRACK_CORNER_RADIUS = 5;
  var LABEL_X_INSET = 10;
  var POINTER_X_INSET = 10;
  var Y_MARGIN = 3;
  var Y_SPACING = 3;

  /**
   * @param {DiatomicMolecule} molecule
   * @constructor
   */
  function BondCharacterNode( molecule ) {

    Node.call( this );

    // title
    var titleNode = new Text( bondCharacterString, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: 'black',
      maxWidth: 0.3 * TRACK_WIDTH
    } );

    // labels
    var labelOptions = {
      font: new PhetFont( 16 ),
      fill: 'black',
      maxWidth:  0.3 * TRACK_WIDTH
    };
    var leftLabelNode = new Text( covalentString, labelOptions );
    var rightLabelNode = new Text( ionicString, labelOptions );

    // pointer that moves along the track, not interactive
    var pointerNode = new PointerNode( molecule.atomA, molecule.atomB );

    // track
    var trackHeight = ( 2 * Y_MARGIN ) + titleNode.height + Y_SPACING + pointerNode.height;
    var trackNode = new Rectangle( 0, 0, TRACK_WIDTH, trackHeight, TRACK_CORNER_RADIUS, TRACK_CORNER_RADIUS,
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
      pointerNode.left = Util.linear( 0, MPConstants.ELECTRONEGATIVITY_RANGE.getLength(),
        POINTER_X_INSET, TRACK_WIDTH - pointerNode.width - POINTER_X_INSET,
        dipole.magnitude() );
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

    var atomRadius = 5;
    var bondNode = new Line( 0, 0, 7, 0, { lineWidth: 3, stroke: 'rgb(128,128,128)' } );
    var atom1Node = new Circle( atomRadius, { fill: atom1.color, stroke: 'black' } );
    var atom2Node = new Circle( atomRadius, { fill: atom2.color, stroke: 'black' } );

    this.addChild( bondNode );
    this.addChild( atom1Node );
    this.addChild( atom2Node );

    bondNode.left = atom1Node.right - 1;
    bondNode.centerY = atom1Node.centerY;
    atom2Node.left = bondNode.right - 1;
    atom2Node.centerY = atom1Node.centerY;
  }

  moleculePolarity.register( 'BondCharacterNode.PointerNode', PointerNode );

  inherit( Node, PointerNode );

  return inherit( Node, BondCharacterNode );
} );