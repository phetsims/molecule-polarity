// Copyright 2014-2017, University of Colorado Boulder

/**
 * Visual representation of a triatomic molecule.
 * Children position themselves in global coordinates, so this node's location should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // import
  var ArrowsHandler = require( 'MOLECULE_POLARITY/common/view/ArrowsHandler' );
  var AtomNode = require( 'MOLECULE_POLARITY/common/view/AtomNode' );
  var BondAngleDragHandler = require( 'MOLECULE_POLARITY/threeatoms/view/BondAngleDragHandler' );
  var BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  var BondNode = require( 'MOLECULE_POLARITY/common/view/BondNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MolecularDipoleNode = require( 'MOLECULE_POLARITY/common/view/MolecularDipoleNode' );
  var RotateArrowsNode = require( 'MOLECULE_POLARITY/threeatoms/view/RotateArrowsNode' );
  var MoleculeAngleDragHandler = require( 'MOLECULE_POLARITY/common/view/MoleculeAngleDragHandler' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PartialChargeNode = require( 'MOLECULE_POLARITY/common/view/PartialChargeNode' );
  var TranslateArrowsNode = require( 'MOLECULE_POLARITY/threeatoms/view/TranslateArrowsNode' );

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
    var arrowsANode = new TranslateArrowsNode( molecule, molecule.atomA );
    var arrowsCNode = new TranslateArrowsNode( molecule, molecule.atomC );
    var arrowsBNode = new RotateArrowsNode( molecule, molecule.atomB );

    // @private nodes whose visibility may change
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
    bondABNode.addInputListener( new MoleculeAngleDragHandler( molecule, this ) );
    bondBCNode.addInputListener( new MoleculeAngleDragHandler( molecule, this ) );
    atomBNode.addInputListener( new MoleculeAngleDragHandler( molecule, this ) );

    // change bond angles by dragging atom A or C
    atomANode.cursor = atomCNode.cursor = 'pointer';
    atomANode.addInputListener( new BondAngleDragHandler( molecule, molecule.bondAngleAProperty ) );
    atomCNode.addInputListener( new BondAngleDragHandler( molecule, molecule.bondAngleCProperty ) );

    // arrows that act as interactivity cues
    atomANode.addInputListener( new ArrowsHandler( arrowsANode ) );
    atomBNode.addInputListener( new ArrowsHandler( arrowsBNode ) );
    atomCNode.addInputListener( new ArrowsHandler( arrowsCNode ) );

    // default state
    arrowsANode.visible = arrowsCNode.visible = arrowsBNode.visible = false;
  }

  moleculePolarity.register( 'TriatomicMoleculeNode', TriatomicMoleculeNode );

  return inherit( Node, TriatomicMoleculeNode, {

    /**
     * Sets whether bond dipoles are visible.
     * @param {boolean} visible
     * @public
     */
    setBondDipolesVisible: function( visible ) {
      this.bondDipoleABNode.visible = this.bondDipoleBCNode.visible = visible;
    },

    /**
     * Sets whether the molecular dipole is visible.
     * @param {boolean} visible
     * @public
     */
    setMolecularDipoleVisible: function( visible ) {
      this.molecularDipoleNode.visible = visible;
    },

    /**
     * Sets whether partial charges are visible.
     * @param {boolean} visible
     * @public
     */
    setPartialChargesVisible: function( visible ) {
      this.partialChargeNodeA.visible = this.partialChargeNodeB.visible = this.partialChargeNodeC.visible = visible;
    }
  } );
} );