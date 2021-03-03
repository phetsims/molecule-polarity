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
import MoleculeAngleDragListener from '../../common/view/MoleculeAngleDragListener.js';
import PartialChargeNode from '../../common/view/PartialChargeNode.js';
import TranslateArrowsNode from '../../common/view/TranslateArrowsNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import TriatomicMolecule from '../model/TriatomicMolecule.js';
import BondAngleDragListener from './BondAngleDragListener.js';
import RotateArrowsNode from './RotateArrowsNode.js';

class TriatomicMoleculeNode extends Node {

  /**
   * @param {TriatomicMolecule} molecule
   */
  constructor( molecule ) {
    assert && assert( molecule instanceof TriatomicMolecule, 'invalid molecule' );

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
    const dragListenerB = new MoleculeAngleDragListener( molecule, this );
    const dragListenerAB = new MoleculeAngleDragListener( molecule, this );
    const dragListenerBC = new MoleculeAngleDragListener( molecule, this );
    atomBNode.addInputListener( dragListenerB );
    bondABNode.addInputListener( dragListenerAB );
    bondBCNode.addInputListener( dragListenerBC );

    // change bond angles by dragging atom A or C
    const dragListenerA = new BondAngleDragListener( molecule, molecule.bondAngleAProperty, atomANode );
    const dragListenerC = new BondAngleDragListener( molecule, molecule.bondAngleCProperty, atomCNode );
    atomANode.addInputListener( dragListenerA );
    atomCNode.addInputListener( dragListenerC );

    // When the user drags any atom or bond, hide the cueing arrows.
    const hideArrows = () => {
      if ( molecule.dragging ) {
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