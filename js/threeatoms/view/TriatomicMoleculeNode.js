// Copyright 2014-2017, University of Colorado Boulder

/**
 * Visual representation of a triatomic molecule.
 * Children position themselves in global coordinates, so this node's location should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // import
  const AtomNode = require( 'MOLECULE_POLARITY/common/view/AtomNode' );
  const BondAngleDragHandler = require( 'MOLECULE_POLARITY/threeatoms/view/BondAngleDragHandler' );
  const BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  const BondNode = require( 'MOLECULE_POLARITY/common/view/BondNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MolecularDipoleNode = require( 'MOLECULE_POLARITY/common/view/MolecularDipoleNode' );
  const MoleculeAngleDragHandler = require( 'MOLECULE_POLARITY/common/view/MoleculeAngleDragHandler' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PartialChargeNode = require( 'MOLECULE_POLARITY/common/view/PartialChargeNode' );
  const RotateArrowsNode = require( 'MOLECULE_POLARITY/threeatoms/view/RotateArrowsNode' );
  const TranslateArrowsNode = require( 'MOLECULE_POLARITY/common/view/TranslateArrowsNode' );

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

    // We'll be moving the dragged atom to the front, because A & C can overlap
    var atomsParent = new Node( { children: [ atomANode, atomBNode, atomCNode ] } );

    // @private nodes whose visibility may change
    this.partialChargeNodeA = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bondAB );
    this.partialChargeNodeB = PartialChargeNode.createCompositePartialChargeNode( molecule.atomB, molecule );
    this.partialChargeNodeC = PartialChargeNode.createOppositePartialChargeNode( molecule.atomC, molecule.bondBC );
    this.bondDipoleABNode = new BondDipoleNode( molecule.bondAB );
    this.bondDipoleBCNode = new BondDipoleNode( molecule.bondBC );
    this.molecularDipoleNode = new MolecularDipoleNode( molecule );

    Node.call( this, {
      children: [
        bondABNode, bondBCNode,
        atomsParent,
        arrowsANode, arrowsCNode, arrowsBNode,
        this.partialChargeNodeA, this.partialChargeNodeB, this.partialChargeNodeC,
        this.bondDipoleABNode, this.bondDipoleBCNode, this.molecularDipoleNode
      ]
    } );

    // cursors
    atomANode.cursor = atomBNode.cursor = atomCNode.cursor = 'pointer'; // atoms
    bondABNode.cursor = bondBCNode.cursor = 'pointer'; // bonds

    // rotate molecule by dragging atom B or bonds
    var dragHandlerB = new MoleculeAngleDragHandler( molecule, this );
    var dragHandlerAB = new MoleculeAngleDragHandler( molecule, this );
    var dragHandlerBC = new MoleculeAngleDragHandler( molecule, this );
    atomBNode.addInputListener( dragHandlerB );
    bondABNode.addInputListener( dragHandlerAB );
    bondBCNode.addInputListener( dragHandlerBC );

    // change bond angles by dragging atom A or C
    var dragHandlerA = new BondAngleDragHandler( molecule, molecule.bondAngleAProperty );
    var dragHandlerC = new BondAngleDragHandler( molecule, molecule.bondAngleCProperty );
    atomANode.addInputListener( dragHandlerA );
    atomCNode.addInputListener( dragHandlerC );

    // When the user drags any atom or bond, hide the cueing arrows.
    var hideArrows = function() {
      if ( dragHandlerA.dragging || dragHandlerB.dragging || dragHandlerC.dragging || dragHandlerAB.dragging || dragHandlerBC.dragging ) {
        arrowsANode.visible = arrowsBNode.visible = arrowsCNode.visible = false;
      }
    };
    molecule.angleProperty.lazyLink( hideArrows );
    molecule.bondAngleAProperty.lazyLink( hideArrows );
    molecule.bondAngleCProperty.lazyLink( hideArrows );
    
    // @private makes the cueing arrows visible
    this.resetArrows = function() {
      arrowsANode.visible = arrowsBNode.visible = arrowsCNode.visible = true;
    };
  }

  moleculePolarity.register( 'TriatomicMoleculeNode', TriatomicMoleculeNode );

  return inherit( Node, TriatomicMoleculeNode, {

    // @public
    reset: function() {
      this.resetArrows();
    },

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