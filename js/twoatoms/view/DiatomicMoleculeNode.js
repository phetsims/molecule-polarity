// Copyright 2014-2020, University of Colorado Boulder

/**
 * Visual representation of a diatomic molecule.
 * Children position themselves in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import AtomNode from '../../common/view/AtomNode.js';
import BondDipoleNode from '../../common/view/BondDipoleNode.js';
import BondNode from '../../common/view/BondNode.js';
import MoleculeAngleDragHandler from '../../common/view/MoleculeAngleDragHandler.js';
import PartialChargeNode from '../../common/view/PartialChargeNode.js';
import SurfaceType from '../../common/view/SurfaceType.js';
import TranslateArrowsNode from '../../common/view/TranslateArrowsNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import ElectronDensityNode from './ElectronDensityNode.js';
import ElectrostaticPotentialNode from './ElectrostaticPotentialNode.js';

/**
 * @param {DiatomicMolecule} molecule
 * @constructor
 */
function DiatomicMoleculeNode( molecule ) {

  // nodes
  const atomANode = new AtomNode( molecule.atomA );
  const atomBNode = new AtomNode( molecule.atomB );
  const bondNode = new BondNode( molecule.bond );
  const arrowsANode = new TranslateArrowsNode( molecule, molecule.atomA );
  const arrowsBNode = new TranslateArrowsNode( molecule, molecule.atomB );

  // @private
  this.partialChargeNodeA = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bond );
  this.partialChargeNodeB = PartialChargeNode.createOppositePartialChargeNode( molecule.atomB, molecule.bond );
  this.electrostaticPotentialNode = new ElectrostaticPotentialNode( molecule );
  this.electronDensityNode = new ElectronDensityNode( molecule );
  this.bondDipoleNode = new BondDipoleNode( molecule.bond );

  Node.call( this, {
    cursor: 'pointer',
    children: [
      this.electrostaticPotentialNode, this.electronDensityNode,
      bondNode, atomANode, atomBNode,
      arrowsANode, arrowsBNode,
      this.partialChargeNodeA, this.partialChargeNodeB, this.bondDipoleNode
    ]
  } );

  // rotate molecule by dragging anywhere
  const dragHandler = new MoleculeAngleDragHandler( molecule, this );
  this.addInputListener( dragHandler );

  // When the user drags any atom or bond, hide the cueing arrows.
  const hideArrows = function() {
    if ( dragHandler.dragging ) {
      arrowsANode.visible = arrowsBNode.visible = false;
    }
  };
  molecule.angleProperty.lazyLink( hideArrows );

  // @private makes the cueing arrows visible
  this.resetArrows = function() {
    arrowsANode.visible = arrowsBNode.visible = true;
  };
}

moleculePolarity.register( 'DiatomicMoleculeNode', DiatomicMoleculeNode );

export default inherit( Node, DiatomicMoleculeNode, {

  // @public
  reset: function() {
    this.resetArrows();
  },

  /**
   * Sets whether the bond dipole is visible.
   * @param {boolean} visible
   * @public
   */
  setBondDipoleVisible: function( visible ) {
    this.bondDipoleNode.visible = visible;
  },

  /**
   * Sets whether partial charges are visible.
   * @param {boolean} visible
   * @public
   */
  setPartialChargesVisible: function( visible ) {
    this.partialChargeNodeA.visible = this.partialChargeNodeB.visible = visible;
  },

  /**
   * Sets the surface type that is visible.
   * @param {SurfaceType} surfaceType
   * @public
   */
  setSurfaceType: function( surfaceType ) {
    this.electrostaticPotentialNode.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
    this.electronDensityNode.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
  }
} );