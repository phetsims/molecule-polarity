// Copyright 2014-2020, University of Colorado Boulder

/**
 * Visual representation of a triatomic molecule.
 * Children position themselves in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
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
   * @param {Object} [options]
   */
  constructor( molecule, options ) {
    assert && assert( molecule instanceof TriatomicMolecule, 'invalid molecule' );

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    // nodes
    const bondABNode = new BondNode( molecule.bondAB, {
      tandem: options.tandem.createTandem( 'bondABNode' )
    } );
    const bondBCNode = new BondNode( molecule.bondBC, {
      tandem: options.tandem.createTandem( 'bondBCNode' )
    } );
    const atomANode = new AtomNode( molecule.atomA, {
      tandem: options.tandem.createTandem( 'atomANode' )
    } );
    const atomBNode = new AtomNode( molecule.atomB, {
      tandem: options.tandem.createTandem( 'atomBNode' )
    } );
    const atomCNode = new AtomNode( molecule.atomC, {
      tandem: options.tandem.createTandem( 'atomCNode' )
    } );
    const arrowsANode = new TranslateArrowsNode( molecule, molecule.atomA, {
      tandem: options.tandem.createTandem( 'arrowsANode' )
    } );
    const arrowsCNode = new TranslateArrowsNode( molecule, molecule.atomC, {
      tandem: options.tandem.createTandem( 'arrowsCNode' )
    } );
    const arrowsBNode = new RotateArrowsNode( molecule, molecule.atomB, {
      tandem: options.tandem.createTandem( 'arrowsBNode' )
    } );

    // We'll be moving the dragged atom to the front, because A & C can overlap
    const atomsParent = new Node( { children: [ atomANode, atomBNode, atomCNode ] } );

    // @private nodes whose visibility may change
    const partialChargeANode = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bondAB, {
      tandem: options.tandem.createTandem( 'partialChargeANode' )
    } );
    const partialChargeBNode = PartialChargeNode.createCompositePartialChargeNode( molecule.atomB, molecule, {
      tandem: options.tandem.createTandem( 'partialChargeBNode' )
    } );
    const partialChargeCNode = PartialChargeNode.createOppositePartialChargeNode( molecule.atomC, molecule.bondBC, {
      tandem: options.tandem.createTandem( 'partialChargeCNode' )
    } );
    const bondDipoleABNode = new BondDipoleNode( molecule.bondAB, {
      tandem: options.tandem.createTandem( 'bondDipoleABNode' )
    } );
    const bondDipoleBCNode = new BondDipoleNode( molecule.bondBC, {
      tandem: options.tandem.createTandem( 'bondDipoleBCNode' )
    } );
    const molecularDipoleNode = new MolecularDipoleNode( molecule, {
      tandem: options.tandem.createTandem( 'molecularDipoleNode' )
    } );

    assert && assert( !options.children, 'TriatomicMoleculeNode sets children' );
    options.children = [
      bondABNode, bondBCNode,
      atomsParent,
      arrowsANode, arrowsCNode, arrowsBNode,
      partialChargeANode, partialChargeBNode, partialChargeCNode,
      bondDipoleABNode, bondDipoleBCNode, molecularDipoleNode
    ];

    super( options );

    // @private nodes whose visibility may change
    this.partialChargeANode = partialChargeANode;
    this.partialChargeBNode = partialChargeBNode;
    this.partialChargeCNode = partialChargeCNode;
    this.bondDipoleABNode = bondDipoleABNode;
    this.bondDipoleBCNode = bondDipoleBCNode;
    this.molecularDipoleNode = molecularDipoleNode;

    // cursors
    atomANode.cursor = atomBNode.cursor = atomCNode.cursor = 'pointer'; // atoms
    bondABNode.cursor = bondBCNode.cursor = 'pointer'; // bonds

    // rotate molecule by dragging atom B or bonds
    const atomBDragListener = new MoleculeAngleDragListener( molecule, this, {
      phetioDocumentation: 'dragging atom B rotates the molecule',
      tandem: options.tandem.createTandem( 'atomBDragListener' )
    } );
    const bondABDragListener = new MoleculeAngleDragListener( molecule, this, {
      phetioDocumentation: 'dragging the bond that connects atoms A and C rotates the molecule',
      tandem: options.tandem.createTandem( 'bondABDragListener' )
    } );
    const bondBCDragListener = new MoleculeAngleDragListener( molecule, this, {
      phetioDocumentation: 'dragging the bond that connects atoms B and C rotates the molecule',
      tandem: options.tandem.createTandem( 'bondBCDragListener' )
    } );
    atomBNode.addInputListener( atomBDragListener );
    bondABNode.addInputListener( bondABDragListener );
    bondBCNode.addInputListener( bondBCDragListener );

    // change bond angles by dragging atom A or C
    const atomADragListener = new BondAngleDragListener( molecule, molecule.bondAngleAProperty, atomANode, {
      phetioDocumentation: 'dragging atom A changes the angle of the bond that connects atoms A and B',
      tandem: options.tandem.createTandem( 'atomADragListener' )
    } );
    const atomCDragListener = new BondAngleDragListener( molecule, molecule.bondAngleCProperty, atomCNode, {
      phetioDocumentation: 'dragging atom C changes the angle of the bond that connects atoms B and C',
      tandem: options.tandem.createTandem( 'atomCDragListener' )
    } );
    atomANode.addInputListener( atomADragListener );
    atomCNode.addInputListener( atomCDragListener );

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
    this.partialChargeANode.visible = this.partialChargeBNode.visible = this.partialChargeCNode.visible = visible;
  }
}

moleculePolarity.register( 'TriatomicMoleculeNode', TriatomicMoleculeNode );

export default TriatomicMoleculeNode;