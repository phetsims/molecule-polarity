// Copyright 2014-2023, University of Colorado Boulder

/**
 * Visual representation of a diatomic molecule.
 * Children position themselves in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import MPQueryParameters from '../../common/MPQueryParameters.js';
import AtomNode from '../../common/view/AtomNode.js';
import BondDipoleNode from '../../common/view/BondDipoleNode.js';
import BondNode from '../../common/view/BondNode.js';
import MoleculeAngleDragListener from '../../common/view/MoleculeAngleDragListener.js';
import PartialChargeNode from '../../common/view/PartialChargeNode.js';
import TranslateArrowsNode from '../../common/view/TranslateArrowsNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import DiatomicMolecule from '../model/DiatomicMolecule.js';
import ElectronDensitySurfaceNode from './ElectronDensitySurfaceNode.js';
import ElectrostaticPotentialSurfaceNode from './ElectrostaticPotentialSurfaceNode.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';

type SelfOptions = EmptySelfOptions;

type DiatomicMoleculeNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class DiatomicMoleculeNode extends Node {

  private readonly resetDiatomicMoleculeNode: () => void;

  public constructor( molecule: DiatomicMolecule,
                      viewProperties: TwoAtomsViewProperties,
                      providedOptions: DiatomicMoleculeNodeOptions ) {

    const options = optionize<DiatomicMoleculeNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      cursor: 'pointer',
      phetioInputEnabledPropertyInstrumented: true
    }, providedOptions );

    // atoms
    const atomANode = new AtomNode( molecule.atomA, {
      tandem: options.tandem.createTandem( 'atomANode' )
    } );
    const atomBNode = new AtomNode( molecule.atomB, {
      tandem: options.tandem.createTandem( 'atomBNode' )
    } );

    // bond
    const bondNode = new BondNode( molecule.bond, {
      tandem: options.tandem.createTandem( 'bondNode' )
    } );

    // arrows to provide interaction hints
    const hintArrowsTandem = options.tandem.createTandem( 'hintArrowsNode' );
    const hintArrowANode = new TranslateArrowsNode( molecule, molecule.atomA, {
      pickable: false,
      tandem: hintArrowsTandem.createTandem( 'hintArrowANode' )
    } );
    const hintArrowBNode = new TranslateArrowsNode( molecule, molecule.atomB, {
      pickable: false,
      tandem: hintArrowsTandem.createTandem( 'hintArrowBNode' )
    } );
    const hintArrowsNode = new Node( {
      children: [ hintArrowANode, hintArrowBNode ],
      tandem: hintArrowsTandem,
      visiblePropertyOptions: {
        phetioDocumentation: 'Set to false to permanently hide hint arrows.'
      }
    } );

    // partial charge
    const partialChargeANode = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bond, {
      visibleProperty: viewProperties.partialChargesVisibleProperty
    } );
    const partialChargeBNode = PartialChargeNode.createOppositePartialChargeNode( molecule.atomB, molecule.bond, {
      visibleProperty: viewProperties.partialChargesVisibleProperty
    } );

    // surfaces
    const electrostaticPotentialSurfaceNode = new ElectrostaticPotentialSurfaceNode( molecule, {
      tandem: options.tandem.createTandem( 'electrostaticPotentialSurfaceNode' )
    } );
    const electronDensitySurfaceNode = new ElectronDensitySurfaceNode( molecule, {
      tandem: options.tandem.createTandem( 'electronDensitySurfaceNode' )
    } );

    // dipole
    const bondDipoleNode = new BondDipoleNode( molecule.bond, {
      visibleProperty: viewProperties.bondDipoleVisibleProperty
    } );

    options.children = [
      electrostaticPotentialSurfaceNode, electronDensitySurfaceNode,
      bondNode, atomANode, atomBNode,
      hintArrowsNode,
      partialChargeANode, partialChargeBNode, bondDipoleNode
    ];

    super( options );

    // rotate molecule by dragging anywhere
    const dragListener = new MoleculeAngleDragListener( molecule, this, {
      phetioDocumentation: 'rotates the molecule by dragging anywhere on it',
      tandem: options.tandem.createTandem( 'dragListener' )
    } );
    this.addInputListener( dragListener );

    viewProperties.surfaceTypeProperty.link( surfaceType => {
      electrostaticPotentialSurfaceNode.visible = ( surfaceType === 'electrostaticPotential' );
      electronDensitySurfaceNode.visible = ( surfaceType === 'electronDensity' );
    } );

    // {boolean} Set to true when the molecule has been changed by the user.
    let moleculeHasChanged = false;

    // Hides the hint arrows if the molecule becomes non-interactive.
    // Set the hint arrows individually, because hintArrowsNode.visibleProperty is for use by PhET-iO.
    const updateHintArrows = () => {
      hintArrowANode.visible = hintArrowBNode.visible = ( !moleculeHasChanged && this.inputEnabled );
    };

    // When the user drags any atom or bond, hide the hint arrows.
    const hideArrows = () => {
      if ( molecule.isDraggingProperty.value ) {
        moleculeHasChanged = true;
        updateHintArrows();
      }
    };
    molecule.angleProperty.lazyLink( hideArrows );

    this.inputEnabledProperty.link( () => updateHintArrows() );

    // Show molecule angle as an arrow that points from the center to the atom in the direction of angle.
    if ( MPQueryParameters.showMoleculeAngle ) {
      const arrowNode = new ArrowNode( 0, 0, 100, 0, {
        fill: 'red',
        translation: molecule.position
      } );
      this.addChild( arrowNode );
      molecule.angleProperty.link( angle => arrowNode.setRotation( angle ) );
    }

    this.resetDiatomicMoleculeNode = () => {
      moleculeHasChanged = false;
      updateHintArrows();
    };
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public reset(): void {
    this.resetDiatomicMoleculeNode();
  }
}

moleculePolarity.register( 'DiatomicMoleculeNode', DiatomicMoleculeNode );