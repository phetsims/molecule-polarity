// Copyright 2014-2022, University of Colorado Boulder

/**
 * Visual representation of a triatomic molecule.
 * Children position themselves in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
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

type SelfOptions = EmptySelfOptions;

type TriatomicMoleculeNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class TriatomicMoleculeNode extends Node {

  private readonly resetTriatomicMoleculeNode: () => void;

  public constructor( molecule: TriatomicMolecule,
                      bondDipolesVisibleProperty: Property<boolean>,
                      molecularDipoleVisibleProperty: Property<boolean>,
                      partialChargesVisibleProperty: Property<boolean>,
                      providedOptions: TriatomicMoleculeNodeOptions ) {

    const options = optionize<TriatomicMoleculeNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      phetioInputEnabledPropertyInstrumented: true
    }, providedOptions );

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
    const hintArrowBNode = new RotateArrowsNode( molecule.atomB, {
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

    options.children = [
      bondABNode, bondBCNode,
      atomsParent,
      hintArrowsNode,
      partialChargeANode, partialChargeBNode, partialChargeCNode,
      bondDipoleABNode, bondDipoleBCNode, molecularDipoleNode
    ];

    super( options );

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
     * @param hintArrowNode - the hint arrow
     * @param atomNode - the atom that the hint arrow is associated with
     */
    const updateOneHintArrow = ( hintArrowNode: Node, atomNode: Node ) => {
      hintArrowNode.visible = ( !moleculeHasChanged && this.inputEnabled && atomNode.inputEnabled );
    };

    // Updates the visibility of all hint arrows.
    // Set the hint arrows individually, because hintArrowsNode.visibleProperty is for use by PhET-iO.
    const updateAllHintArrows = () => {
      updateOneHintArrow( hintArrowANode, atomANode );
      updateOneHintArrow( hintArrowBNode, atomBNode );
      updateOneHintArrow( hintArrowCNode, atomCNode );
    };

    // When the user drags any atom or bond, hide the hint arrows.
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
    const createMultilink = ( hintArrowNode: Node, atomNode: Node ) => {
      Multilink.multilink( [ this.inputEnabledProperty, atomNode.inputEnabledProperty ],
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

    this.resetTriatomicMoleculeNode = () => {
      moleculeHasChanged = false;
      updateAllHintArrows();
    };
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public reset(): void {
    this.resetTriatomicMoleculeNode();
  }
}

moleculePolarity.register( 'TriatomicMoleculeNode', TriatomicMoleculeNode );