// Copyright 2014-2017, University of Colorado Boulder

/**
 * Visual representation of a diatomic molecule.
 * Children position themselves in world coordinates, so this node's offset should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomNode = require( 'MOLECULE_POLARITY/common/view/AtomNode' );
  var BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  var BondNode = require( 'MOLECULE_POLARITY/common/view/BondNode' );
  var ElectronDensityNode = require( 'MOLECULE_POLARITY/twoatoms/view/ElectronDensityNode' );
  var ElectrostaticPotentialNode = require( 'MOLECULE_POLARITY/twoatoms/view/ElectrostaticPotentialNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeAngleHandler = require( 'MOLECULE_POLARITY/common/view/MoleculeAngleHandler' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PartialChargeNode = require( 'MOLECULE_POLARITY/common/view/PartialChargeNode' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );

  /**
   * @param {DiatomicMolecule} molecule
   * @constructor
   */
  function DiatomicMoleculeNode( molecule ) {

    // nodes
    var atomANode = new AtomNode( molecule.atomA );
    var atomBNode = new AtomNode( molecule.atomB );
    var bondNode = new BondNode( molecule.bond );

    // @private nodes whose visibility may change
    this.partialChargeNodeA = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bond ); // @private
    this.partialChargeNodeB = PartialChargeNode.createOppositePartialChargeNode( molecule.atomB, molecule.bond ); // @private
    this.electrostaticPotentialNode = new ElectrostaticPotentialNode( molecule ); // @private
    this.electronDensityNode = new ElectronDensityNode( molecule ); // @private
    this.bondDipoleNode = new BondDipoleNode( molecule.bond ); // @private

    Node.call( this, {
      children: [
        // rendering order
        this.electrostaticPotentialNode, this.electronDensityNode,
        bondNode, atomANode, atomBNode,
        this.partialChargeNodeA, this.partialChargeNodeB, this.bondDipoleNode
      ]
    } );

    // rotate molecule by dragging anywhere
    this.cursor = 'pointer';
    this.addInputListener( new MoleculeAngleHandler( molecule, this ) );
  }

  moleculePolarity.register( 'DiatomicMoleculeNode', DiatomicMoleculeNode );

  return inherit( Node, DiatomicMoleculeNode, {

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

