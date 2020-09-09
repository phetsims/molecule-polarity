// Copyright 2014-2020, University of Colorado Boulder

/**
 * Visual representation of a diatomic molecule.
 * Children position themselves in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import SurfaceType from '../../common/model/SurfaceType.js';
import AtomNode from '../../common/view/AtomNode.js';
import BondDipoleNode from '../../common/view/BondDipoleNode.js';
import BondNode from '../../common/view/BondNode.js';
import MoleculeAngleDragListener from '../../common/view/MoleculeAngleDragListener.js';
import PartialChargeNode from '../../common/view/PartialChargeNode.js';
import TranslateArrowsNode from '../../common/view/TranslateArrowsNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import ElectronDensityNode from './ElectronDensityNode.js';
import ElectrostaticPotentialNode from './ElectrostaticPotentialNode.js';

class DiatomicMoleculeNode extends Node {

  /**
   * @param {DiatomicMolecule} molecule
   */
  constructor( molecule ) {

    // nodes
    const atomANode = new AtomNode( molecule.atomA );
    const atomBNode = new AtomNode( molecule.atomB );
    const bondNode = new BondNode( molecule.bond );
    const arrowsANode = new TranslateArrowsNode( molecule, molecule.atomA );
    const arrowsBNode = new TranslateArrowsNode( molecule, molecule.atomB );

    const partialChargeNodeA = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bond );
    const partialChargeNodeB = PartialChargeNode.createOppositePartialChargeNode( molecule.atomB, molecule.bond );
    const electrostaticPotentialNode = new ElectrostaticPotentialNode( molecule );
    const electronDensityNode = new ElectronDensityNode( molecule );
    const bondDipoleNode = new BondDipoleNode( molecule.bond );

    super( {
      cursor: 'pointer',
      children: [
        electrostaticPotentialNode, electronDensityNode,
        bondNode, atomANode, atomBNode,
        arrowsANode, arrowsBNode,
        partialChargeNodeA, partialChargeNodeB, bondDipoleNode
      ]
    } );

    // rotate molecule by dragging anywhere
    const dragListener = new MoleculeAngleDragListener( molecule, this );
    this.addInputListener( dragListener );

    // When the user drags any atom or bond, hide the cueing arrows.
    const hideArrows = () => {
      if ( molecule.dragging ) {
        arrowsANode.visible = arrowsBNode.visible = false;
      }
    };
    molecule.angleProperty.lazyLink( hideArrows );

    // @private makes the cueing arrows visible
    this.resetArrows = () => {
      arrowsANode.visible = arrowsBNode.visible = true;
    };

    // @private
    this.partialChargeNodeA = partialChargeNodeA;
    this.partialChargeNodeB = partialChargeNodeB;
    this.electrostaticPotentialNode = electrostaticPotentialNode;
    this.electronDensityNode = electronDensityNode;
    this.bondDipoleNode = bondDipoleNode;
  }

  // @public
  reset() {
    this.resetArrows();
  }

  /**
   * Sets whether the bond dipole is visible.
   * @param {boolean} visible
   * @public
   */
  setBondDipoleVisible( visible ) {
    this.bondDipoleNode.visible = visible;
  }

  /**
   * Sets whether partial charges are visible.
   * @param {boolean} visible
   * @public
   */
  setPartialChargesVisible( visible ) {
    this.partialChargeNodeA.visible = this.partialChargeNodeB.visible = visible;
  }

  /**
   * Sets the surface type that is visible.
   * @param {SurfaceType} surfaceType
   * @public
   */
  setSurfaceType( surfaceType ) {
    this.electrostaticPotentialNode.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
    this.electronDensityNode.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
  }
}

moleculePolarity.register( 'DiatomicMoleculeNode', DiatomicMoleculeNode );

export default DiatomicMoleculeNode;