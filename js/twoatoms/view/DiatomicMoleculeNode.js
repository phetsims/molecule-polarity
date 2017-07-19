// Copyright 2014-2017, University of Colorado Boulder

/**
 * Visual representation of a diatomic molecule.
 * Children position themselves in global coordinates, so this node's location should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowsInputListener = require( 'MOLECULE_POLARITY/common/view/ArrowsInputListener' );
  var AtomNode = require( 'MOLECULE_POLARITY/common/view/AtomNode' );
  var BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  var BondNode = require( 'MOLECULE_POLARITY/common/view/BondNode' );
  var ElectronDensityNode = require( 'MOLECULE_POLARITY/twoatoms/view/ElectronDensityNode' );
  var ElectrostaticPotentialNode = require( 'MOLECULE_POLARITY/twoatoms/view/ElectrostaticPotentialNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeAngleDragHandler = require( 'MOLECULE_POLARITY/common/view/MoleculeAngleDragHandler' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PartialChargeNode = require( 'MOLECULE_POLARITY/common/view/PartialChargeNode' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var TranslateArrowsNode = require( 'MOLECULE_POLARITY/common/view/TranslateArrowsNode' );

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

    // Arrows around atoms A & B are initially visible.
    // When the molecule is rotated by the user, hide both arrows, and make them appear on mouse over.
    // See https://github.com/phetsims/molecule-polarity/issues/50
    var hideArrows = function() {

      // When the molecule is rotated the user...
      if ( dragHandler.dragging ) {

        // hide the arrows
        arrowsANode.visible = arrowsBNode.visible = false;

        // unlink this listener
        molecule.angleProperty.unlink( hideArrows );

        // make arrows appear on mouse over
        atomANode.addInputListener( new ArrowsInputListener( arrowsANode ) );
        atomBNode.addInputListener( new ArrowsInputListener( arrowsBNode ) );
      }
    };
    molecule.angleProperty.lazyLink( hideArrows );
  }

  moleculePolarity.register( 'DiatomicMoleculeNode', DiatomicMoleculeNode );

  return inherit( Node, DiatomicMoleculeNode, {

    // @public
    reset: function() {
      //TODO reset cueing arrows #59
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

