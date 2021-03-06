// Copyright 2014-2021, University of Colorado Boulder

/**
 * Visual representation of a triatomic molecule.
 * Children position themselves in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPQueryParameters from '../../common/MPQueryParameters.js';
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
   * @param {Property.<boolean>} bondDipolesVisibleProperty
   * @param {Property.<boolean>} molecularDipoleVisibleProperty
   * @param {Property.<boolean>} partialChargesVisibleProperty
   * @param {Object} [options]
   */
  constructor( molecule, bondDipolesVisibleProperty, molecularDipoleVisibleProperty, partialChargesVisibleProperty, options ) {
    assert && assert( molecule instanceof TriatomicMolecule, 'invalid molecule' );
    assert && AssertUtils.assertPropertyOf( bondDipolesVisibleProperty, 'boolean' );
    assert && AssertUtils.assertPropertyOf( molecularDipoleVisibleProperty, 'boolean' );
    assert && AssertUtils.assertPropertyOf( partialChargesVisibleProperty, 'boolean' );

    options = merge( {
      tandem: Tandem.REQUIRED,
      phetioInputEnabledPropertyInstrumented: true
    }, options );

    // atoms
    const atomANode = new AtomNode( molecule.atomA, {
      tandem: options.tandem.createTandem( 'atomANode' ),
      phetioInputEnabledPropertyInstrumented: true
    } );
    const atomBNode = new AtomNode( molecule.atomB, {
      tandem: options.tandem.createTandem( 'atomBNode' ),
      phetioInputEnabledPropertyInstrumented: true
    } );
    const atomCNode = new AtomNode( molecule.atomC, {
      tandem: options.tandem.createTandem( 'atomCNode' ),
      phetioInputEnabledPropertyInstrumented: true
    } );

    // bonds
    const bondABNode = new BondNode( molecule.bondAB, {
      tandem: options.tandem.createTandem( 'bondABNode' ),
      phetioInputEnabledPropertyInstrumented: true
    } );
    const bondBCNode = new BondNode( molecule.bondBC, {
      tandem: options.tandem.createTandem( 'bondBCNode' ),
      phetioInputEnabledPropertyInstrumented: true
    } );

    // arrows to provide interaction hints
    const hintArrowsTandem = options.tandem.createTandem( 'hintArrowsNode' );
    const hintArrowANode = new TranslateArrowsNode( molecule, molecule.atomA, {
      tandem: hintArrowsTandem.createTandem( 'hintArrowANode' )
    } );
    const hintArrowCNode = new TranslateArrowsNode( molecule, molecule.atomC, {
      tandem: hintArrowsTandem.createTandem( 'hintArrowCNode' )
    } );
    const hintArrowBNode = new RotateArrowsNode( molecule, molecule.atomB, {
      tandem: hintArrowsTandem.createTandem( 'hintArrowBNode' )
    } );
    const hintArrowsNode = new Node( {
      children: [ hintArrowANode, hintArrowCNode, hintArrowBNode ],
      tandem: hintArrowsTandem,
      visiblePropertyOptions: {
        phetioDocumentation: 'Set to false to permanently hide hint arrows.'
      }
    } );

    // We'll be moving the dragged atom to the front, because A & C can overlap
    const atomsParent = new Node( { children: [ atomANode, atomBNode, atomCNode ] } );

    // partial charge
    const partialChargeANode = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bondAB, {
      visibleProperty: partialChargesVisibleProperty
    } );
    const partialChargeBNode = PartialChargeNode.createCompositePartialChargeNode( molecule.atomB, molecule, {
      visibleProperty: partialChargesVisibleProperty
    } );
    const partialChargeCNode = PartialChargeNode.createOppositePartialChargeNode( molecule.atomC, molecule.bondBC, {
      visibleProperty: partialChargesVisibleProperty
    } );

    // dipoles
    const bondDipoleABNode = new BondDipoleNode( molecule.bondAB, {
      visibleProperty: bondDipolesVisibleProperty
    } );
    const bondDipoleBCNode = new BondDipoleNode( molecule.bondBC, {
      visibleProperty: bondDipolesVisibleProperty
    } );
    const molecularDipoleNode = new MolecularDipoleNode( molecule, {
      visibleProperty: molecularDipoleVisibleProperty
    } );

    assert && assert( !options.children, 'TriatomicMoleculeNode sets children' );
    options.children = [
      bondABNode, bondBCNode,
      atomsParent,
      hintArrowsNode,
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

    // Put all DragListeners under one parent in the Studio tree.
    const dragListenersTandem = options.tandem.createTandem( 'dragListeners' );

    // rotate molecule by dragging atom B or bonds
    const atomBDragListener = new MoleculeAngleDragListener( molecule, this, {
      phetioDocumentation: 'dragging atom B rotates the molecule',
      tandem: dragListenersTandem.createTandem( 'atomBDragListener' )
    } );
    const bondABDragListener = new MoleculeAngleDragListener( molecule, this, {
      phetioDocumentation: 'dragging the bond between atoms A and C rotates the molecule',
      tandem: dragListenersTandem.createTandem( 'bondABDragListener' )
    } );
    const bondBCDragListener = new MoleculeAngleDragListener( molecule, this, {
      phetioDocumentation: 'dragging the bond between atoms B and C rotates the molecule',
      tandem: dragListenersTandem.createTandem( 'bondBCDragListener' )
    } );
    atomBNode.addInputListener( atomBDragListener );
    bondABNode.addInputListener( bondABDragListener );
    bondBCNode.addInputListener( bondBCDragListener );

    // change bond angles by dragging atom A or C
    const atomADragListener = new BondAngleDragListener( molecule, molecule.bondAngleABProperty, atomANode, {
      phetioDocumentation: 'dragging atom A changes the angle of the bond between atoms A and B',
      tandem: dragListenersTandem.createTandem( 'atomADragListener' )
    } );
    const atomCDragListener = new BondAngleDragListener( molecule, molecule.bondAngleBCProperty, atomCNode, {
      phetioDocumentation: 'dragging atom C changes the angle of the bond between atoms B and C',
      tandem: dragListenersTandem.createTandem( 'atomCDragListener' )
    } );
    atomANode.addInputListener( atomADragListener );
    atomCNode.addInputListener( atomCDragListener );

    // {boolean} Set to true when the molecule has been changed by the user.
    let moleculeHasChanged = false;

    /**
     * Updates the visibility of one hint arrow.
     * @param {Node} hintArrowNode - the hint arrow
     * @param {Node} atomNode - the atom that the hint arrow is associated with
     */
    const updateOneHintArrow = ( hintArrowNode, atomNode ) => {
      hintArrowNode.visible = ( !moleculeHasChanged && this.inputEnabled && atomNode.inputEnabled );
    };

    // Updates the visibility of all hint arrows.
    // Set the hint arrows individually, because hintArrowsNode.visibleProperty is for use by PhET-iO.
    const updateAllHintArrows = () => {
      updateOneHintArrow( hintArrowANode, atomANode );
      updateOneHintArrow( hintArrowBNode, atomBNode );
      updateOneHintArrow( hintArrowCNode, atomCNode );
    };

    // When the user drags any atom or bond, hide the hint arrows. unlink is not needed.
    const hideArrows = () => {
      if ( molecule.isDraggingProperty.value ) {
        moleculeHasChanged = true;
        updateAllHintArrows();
      }
    };
    molecule.angleProperty.lazyLink( hideArrows );
    molecule.bondAngleABProperty.lazyLink( hideArrows );
    molecule.bondAngleBCProperty.lazyLink( hideArrows );

    // Update a hint arrow when the molecule inputEnabled or atom inputEnabled changes.
    // unmultilink is not needed.
    const createMultilink = ( hintArrowNode, atomNode ) => {
      Property.multilink( [ this.inputEnabledProperty, atomNode.inputEnabledProperty ],
        () => updateOneHintArrow( hintArrowNode, atomNode )
      );
    };
    createMultilink( hintArrowANode, atomANode );
    createMultilink( hintArrowBNode, atomBNode );
    createMultilink( hintArrowCNode, atomCNode );

    // Show molecule angle as an arrow that points from the center to the atom in the direction of angle.
    if ( MPQueryParameters.showMoleculeAngle ) {
      const arrowNode = new ArrowNode( 0, 0, 100, 0, {
        fill: 'red',
        translation: molecule.position
      } );
      this.addChild( arrowNode );
      molecule.angleProperty.link( angle => arrowNode.setRotation( angle ) );
    }

    // @private
    this.resetTriatomicMoleculeNode = () => {
      moleculeHasChanged = false;
      updateAllHintArrows();
    };
  }

  // @public
  reset() {
    this.resetTriatomicMoleculeNode();
  }
}

moleculePolarity.register( 'TriatomicMoleculeNode', TriatomicMoleculeNode );
export default TriatomicMoleculeNode;