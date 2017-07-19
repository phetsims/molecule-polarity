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
  var ArrowsInputListener = require( 'MOLECULE_POLARITY/common/view/ArrowsInputListener' );
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
  var TranslateArrowsNode = require( 'MOLECULE_POLARITY/common/view/TranslateArrowsNode' );

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

    // 'Cueing' arrows around atoms A, B and C are initially visible.
    // When the user interacts with any atom, make the arrows disappear, and make them appear on mouse over.
    // See https://github.com/phetsims/molecule-polarity/issues/50
    var hideArrows = function() {

      // When the user is dragging with any atom or bond ...
      if ( dragHandlerA.dragging || dragHandlerB.dragging || dragHandlerC.dragging || dragHandlerAB.dragging || dragHandlerBC.dragging ) {

        // hide the arrows
        arrowsANode.visible = arrowsBNode.visible = arrowsCNode.visible = false;

        // unlink this listener
        molecule.bondAngleAProperty.unlink( hideArrows );
        molecule.bondAngleCProperty.unlink( hideArrows );
        molecule.angleProperty.unlink( hideArrows );

        // make arrows appear on mouse over
        atomANode.addInputListener( new ArrowsInputListener( arrowsANode ) );
        atomBNode.addInputListener( new ArrowsInputListener( arrowsBNode ) );
        atomCNode.addInputListener( new ArrowsInputListener( arrowsCNode ) );
      }
    };
    molecule.bondAngleAProperty.lazyLink( hideArrows );
    molecule.bondAngleCProperty.lazyLink( hideArrows );
    molecule.angleProperty.lazyLink( hideArrows );
  }

  moleculePolarity.register( 'TriatomicMoleculeNode', TriatomicMoleculeNode );

  return inherit( Node, TriatomicMoleculeNode, {

    // @public
    reset: function() {
      //TODO reset cueing arrows #59               
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