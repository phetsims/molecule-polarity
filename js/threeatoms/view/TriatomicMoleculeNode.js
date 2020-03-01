// Copyright 2014-2020, University of Colorado Boulder

/**
 * Visual representation of a triatomic molecule.
 * Children position themselves in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */


// import
import Node from '../../../../scenery/js/nodes/Node.js';
import AtomNode from '../../common/view/AtomNode.js';
import BondDipoleNode from '../../common/view/BondDipoleNode.js';
import BondNode from '../../common/view/BondNode.js';
import MolecularDipoleNode from '../../common/view/MolecularDipoleNode.js';
import MoleculeAngleDragHandler from '../../common/view/MoleculeAngleDragHandler.js';
import PartialChargeNode from '../../common/view/PartialChargeNode.js';
import TranslateArrowsNode from '../../common/view/TranslateArrowsNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import BondAngleDragHandler from './BondAngleDragHandler.js';
import RotateArrowsNode from './RotateArrowsNode.js';

class TriatomicMoleculeNode extends Node {
  /**
   * @param {TriatomicMolecule} molecule
   */
  constructor( molecule ) {

    // nodes
    const bondABNode = new BondNode( molecule.bondAB );
    const bondBCNode = new BondNode( molecule.bondBC );
    const atomANode = new AtomNode( molecule.atomA );
    const atomBNode = new AtomNode( molecule.atomB );
    const atomCNode = new AtomNode( molecule.atomC );
    const arrowsANode = new TranslateArrowsNode( molecule, molecule.atomA );
    const arrowsCNode = new TranslateArrowsNode( molecule, molecule.atomC );
    const arrowsBNode = new RotateArrowsNode( molecule, molecule.atomB );

    // We'll be moving the dragged atom to the front, because A & C can overlap
    const atomsParent = new Node( { children: [ atomANode, atomBNode, atomCNode ] } );

    // @private nodes whose visibility may change
    const partialChargeNodeA = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bondAB );
    const partialChargeNodeB = PartialChargeNode.createCompositePartialChargeNode( molecule.atomB, molecule );
    const partialChargeNodeC = PartialChargeNode.createOppositePartialChargeNode( molecule.atomC, molecule.bondBC );
    const bondDipoleABNode = new BondDipoleNode( molecule.bondAB );
    const bondDipoleBCNode = new BondDipoleNode( molecule.bondBC );
    const molecularDipoleNode = new MolecularDipoleNode( molecule );

    super( {
      children: [
        bondABNode, bondBCNode,
        atomsParent,
        arrowsANode, arrowsCNode, arrowsBNode,
        partialChargeNodeA, partialChargeNodeB, partialChargeNodeC,
        bondDipoleABNode, bondDipoleBCNode, molecularDipoleNode
      ]
    } );

    // @private nodes whose visibility may change
    this.partialChargeNodeA = partialChargeNodeA;
    this.partialChargeNodeB = partialChargeNodeB;
    this.partialChargeNodeC = partialChargeNodeC;
    this.bondDipoleABNode = bondDipoleABNode;
    this.bondDipoleBCNode = bondDipoleBCNode;
    this.molecularDipoleNode = molecularDipoleNode;

    // cursors
    atomANode.cursor = atomBNode.cursor = atomCNode.cursor = 'pointer'; // atoms
    bondABNode.cursor = bondBCNode.cursor = 'pointer'; // bonds

    // rotate molecule by dragging atom B or bonds
    const dragHandlerB = new MoleculeAngleDragHandler( molecule, this );
    const dragHandlerAB = new MoleculeAngleDragHandler( molecule, this );
    const dragHandlerBC = new MoleculeAngleDragHandler( molecule, this );
    atomBNode.addInputListener( dragHandlerB );
    bondABNode.addInputListener( dragHandlerAB );
    bondBCNode.addInputListener( dragHandlerBC );

    // change bond angles by dragging atom A or C
    const dragHandlerA = new BondAngleDragHandler( molecule, molecule.bondAngleAProperty );
    const dragHandlerC = new BondAngleDragHandler( molecule, molecule.bondAngleCProperty );
    atomANode.addInputListener( dragHandlerA );
    atomCNode.addInputListener( dragHandlerC );

    // When the user drags any atom or bond, hide the cueing arrows.
    const hideArrows = () => {
      if ( dragHandlerA.dragging || dragHandlerB.dragging || dragHandlerC.dragging || dragHandlerAB.dragging || dragHandlerBC.dragging ) {
        arrowsANode.visible = arrowsBNode.visible = arrowsCNode.visible = false;
      }
    };
    molecule.angleProperty.lazyLink( hideArrows );
    molecule.bondAngleAProperty.lazyLink( hideArrows );
    molecule.bondAngleCProperty.lazyLink( hideArrows );

    // @private makes the cueing arrows visible
    this.resetArrows = () => {
      arrowsANode.visible = arrowsBNode.visible = arrowsCNode.visible = true;
    };
  }

  // @public
  reset() {
    this.resetArrows();
  }

  /**
   * Sets whether bond dipoles are visible.
   * @param {boolean} visible
   * @public
   */
  setBondDipolesVisible( visible ) {
    this.bondDipoleABNode.visible = this.bondDipoleBCNode.visible = visible;
  }

  /**
   * Sets whether the molecular dipole is visible.
   * @param {boolean} visible
   * @public
   */
  setMolecularDipoleVisible( visible ) {
    this.molecularDipoleNode.visible = visible;
  }

  /**
   * Sets whether partial charges are visible.
   * @param {boolean} visible
   * @public
   */
  setPartialChargesVisible( visible ) {
    this.partialChargeNodeA.visible = this.partialChargeNodeB.visible = this.partialChargeNodeC.visible = visible;
  }
}

moleculePolarity.register( 'TriatomicMoleculeNode', TriatomicMoleculeNode );

export default TriatomicMoleculeNode;