// Copyright 2014-2015, University of Colorado Boulder

/**
 * Visual representation of a triatomic molecule.
 * Children position themselves in world coordinates, so this node's offset should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // import
  var ArrowsHandler = require( 'MOLECULE_POLARITY/threeatoms/view/ArrowsHandler' );
  var AtomNode = require( 'MOLECULE_POLARITY/common/view/AtomNode' );
  var BondAngleArrowsNode = require( 'MOLECULE_POLARITY/threeatoms/view/BondAngleArrowsNode' );
  var BondAngleHandler = require( 'MOLECULE_POLARITY/threeatoms/view/BondAngleHandler' );
  var BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  var BondNode = require( 'MOLECULE_POLARITY/common/view/BondNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MolecularDipoleNode = require( 'MOLECULE_POLARITY/common/view/MolecularDipoleNode' );
  var MoleculeAngleArrowsNode = require( 'MOLECULE_POLARITY/threeatoms/view/MoleculeAngleArrowsNode' );
  var MoleculeAngleHandler = require( 'MOLECULE_POLARITY/common/view/MoleculeAngleHandler' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PartialChargeNode = require( 'MOLECULE_POLARITY/common/view/PartialChargeNode' );

  /**
   * @param {TriatomicMolecule} molecule
   * @constructor
   */
  function TriatomicMoleculeNode( molecule ) {

    Node.call( this );

    // nodes
    var bondABNode = new BondNode( molecule.bondAB );
    var bondBCNode = new BondNode( molecule.bondBC );
    var atomANode = new AtomNode( molecule.atomA );
    var atomBNode = new AtomNode( molecule.atomB );
    var atomCNode = new AtomNode( molecule.atomC );
    var arrowsANode = new BondAngleArrowsNode( molecule, molecule.atomA );
    var arrowsCNode = new BondAngleArrowsNode( molecule, molecule.atomC );
    var arrowsBNode = new MoleculeAngleArrowsNode( molecule, molecule.atomB );
    this.partialChargeNodeA = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bondAB );
    this.partialChargeNodeB = PartialChargeNode.createCompositePartialChargeNode( molecule.atomB, molecule );
    this.partialChargeNodeC = PartialChargeNode.createOppositePartialChargeNode( molecule.atomC, molecule.bondBC );
    this.bondDipoleABNode = new BondDipoleNode( molecule.bondAB );
    this.bondDipoleBCNode = new BondDipoleNode( molecule.bondBC );
    this.molecularDipoleNode = new MolecularDipoleNode( molecule );

    Node.call( this, {
      children: [
        // rendering order
        bondABNode, bondBCNode,
        new Node( { children: [ atomANode, atomBNode, atomCNode ] } ), // because we'll be moving the dragged atom to the front
        arrowsANode, arrowsCNode, arrowsBNode,
        this.partialChargeNodeA, this.partialChargeNodeB, this.partialChargeNodeC,
        this.bondDipoleABNode, this.bondDipoleBCNode, this.molecularDipoleNode
      ]
    } );

    // rotate molecule by dragging bonds or atom B
    bondABNode.cursor = bondBCNode.cursor = atomBNode.cursor = 'pointer';
    bondABNode.addInputListener( new MoleculeAngleHandler( molecule, this ) );
    bondBCNode.addInputListener( new MoleculeAngleHandler( molecule, this ) );
    atomBNode.addInputListener( new MoleculeAngleHandler( molecule, this ) );

    // change bond angles by dragging atom A or C
    atomANode.cursor = atomCNode.cursor = 'pointer';
    atomANode.addInputListener( new BondAngleHandler( molecule, molecule.bondAngleAProperty ) );
    atomCNode.addInputListener( new BondAngleHandler( molecule, molecule.bondAngleCProperty ) );

    // arrows that act as interactivity cues
    atomANode.addInputListener( new ArrowsHandler( arrowsANode ) );
    atomBNode.addInputListener( new ArrowsHandler( arrowsBNode ) );
    atomCNode.addInputListener( new ArrowsHandler( arrowsCNode ) );

    // default state
    arrowsANode.visible = arrowsCNode.visible = arrowsBNode.visible = false;
  }

  return inherit( Node, TriatomicMoleculeNode, {

    setBondDipolesVisible: function( visible ) {
      this.bondDipoleABNode.visible = this.bondDipoleBCNode.visible = visible;
    },

    setMolecularDipoleVisible: function( visible ) {
      this.molecularDipoleNode.visible = visible;
    },

    setPartialChargesVisible: function( visible ) {
      this.partialChargeNodeA.visible = this.partialChargeNodeB.visible = this.partialChargeNodeC.visible = visible;
    }
  } );
} );