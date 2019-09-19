// Copyright 2014-2017, University of Colorado Boulder

/**
 * Visual representation of a diatomic molecule.
 * Children position themselves in global coordinates, so this node's location should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AtomNode = require( 'MOLECULE_POLARITY/common/view/AtomNode' );
  const BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  const BondNode = require( 'MOLECULE_POLARITY/common/view/BondNode' );
  const ElectronDensityNode = require( 'MOLECULE_POLARITY/twoatoms/view/ElectronDensityNode' );
  const ElectrostaticPotentialNode = require( 'MOLECULE_POLARITY/twoatoms/view/ElectrostaticPotentialNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MoleculeAngleDragHandler = require( 'MOLECULE_POLARITY/common/view/MoleculeAngleDragHandler' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PartialChargeNode = require( 'MOLECULE_POLARITY/common/view/PartialChargeNode' );
  const SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  const TranslateArrowsNode = require( 'MOLECULE_POLARITY/common/view/TranslateArrowsNode' );

  /**
   * @param {DiatomicMolecule} molecule
   * @constructor
   */
  function DiatomicMoleculeNode( molecule ) {

    // nodes
    var atomANode = new AtomNode( molecule.atomA );
    var atomBNode = new AtomNode( molecule.atomB );
    var bondNode = new BondNode( molecule.bond );
    var arrowsANode = new TranslateArrowsNode( molecule, molecule.atomA );
    var arrowsBNode = new TranslateArrowsNode( molecule, molecule.atomB );

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
    var dragHandler = new MoleculeAngleDragHandler( molecule, this );
    this.addInputListener( dragHandler );

    // When the user drags any atom or bond, hide the cueing arrows.
    var hideArrows = function() {
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

  return inherit( Node, DiatomicMoleculeNode, {

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
} );

