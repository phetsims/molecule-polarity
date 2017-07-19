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

    // Input listeners that show arrows on mouse over, disabled by default.
    var arrowsAInputListener = new ArrowsInputListener( arrowsANode );
    var arrowsBInputListener = new ArrowsInputListener( arrowsBNode );

    // Arrows around atoms A & B are initially visible.
    // When the user interacts with any atom, make all arrows disappear, and make them appear on mouse over.
    var hideArrows = function() {

      // When the molecule is rotated the user...
      if ( dragHandler.dragging ) {

        // register mouse-over listeners
        atomANode.addInputListener( arrowsAInputListener );
        atomBNode.addInputListener( arrowsBInputListener );

        // de-register the observer
        molecule.angleProperty.unlink( hideArrows );

        // hide the arrows
        arrowsANode.visible = arrowsBNode.visible = false;
      }
    };
    molecule.angleProperty.lazyLink( hideArrows );

    // @private Resets the initial behavior of the arrows.
    this.resetArrows = function() {

      // de-register mouse-over listeners
      if ( atomANode.hasInputListener( arrowsAInputListener ) ) {
        atomANode.removeInputListener( arrowsAInputListener );
      }
      if ( atomBNode.hasInputListener( arrowsBInputListener ) ) {
        atomBNode.removeInputListener( arrowsBInputListener );
      }

      // re-register observer for the initial behavior
      if ( !molecule.angleProperty.hasListener( hideArrows ) ) {
        molecule.angleProperty.lazyLink( hideArrows );
      }

      // make the arrows visible
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

