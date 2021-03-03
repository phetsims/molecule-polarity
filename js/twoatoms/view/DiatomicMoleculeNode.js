// Copyright 2014-2021, University of Colorado Boulder

/**
 * Visual representation of a diatomic molecule.
 * Children position themselves in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import SurfaceType from '../../common/model/SurfaceType.js';
import AtomNode from '../../common/view/AtomNode.js';
import BondDipoleNode from '../../common/view/BondDipoleNode.js';
import BondNode from '../../common/view/BondNode.js';
import MoleculeAngleDragListener from '../../common/view/MoleculeAngleDragListener.js';
import PartialChargeNode from '../../common/view/PartialChargeNode.js';
import TranslateArrowsNode from '../../common/view/TranslateArrowsNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import DiatomicMolecule from '../model/DiatomicMolecule.js';
import ElectronDensityNode from './ElectronDensityNode.js';
import ElectrostaticPotentialNode from './ElectrostaticPotentialNode.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';

class DiatomicMoleculeNode extends Node {

  /**
   * @param {DiatomicMolecule} molecule
   * @param {TwoAtomsViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( molecule, viewProperties, options ) {
    assert && assert( molecule instanceof DiatomicMolecule, 'invalid molecule' );
    assert && assert( viewProperties instanceof TwoAtomsViewProperties, 'invalid viewProperties' );

    options = merge( {
      cursor: 'pointer',
      tandem: Tandem.REQUIRED
    }, options );

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

    // cueing arrows
    const arrowsANode = new TranslateArrowsNode( molecule, molecule.atomA, {
      tandem: options.tandem.createTandem( 'arrowsANode' )
    } );
    const arrowsBNode = new TranslateArrowsNode( molecule, molecule.atomB, {
      tandem: options.tandem.createTandem( 'arrowsBNode' )
    } );

    // partial charge
    const partialChargeANode = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bond, {
      visibleProperty: viewProperties.partialChargesVisibleProperty,
      tandem: options.tandem.createTandem( 'partialChargeANode' )
    } );
    const partialChargeBNode = PartialChargeNode.createOppositePartialChargeNode( molecule.atomB, molecule.bond, {
      visibleProperty: viewProperties.partialChargesVisibleProperty,
      tandem: options.tandem.createTandem( 'partialChargeBNode' )
    } );

    // surfaces
    const electrostaticPotentialNode = new ElectrostaticPotentialNode( molecule, {
      tandem: options.tandem.createTandem( 'electrostaticPotentialNode' )
    } );
    const electronDensityNode = new ElectronDensityNode( molecule, {
      tandem: options.tandem.createTandem( 'electronDensityNode' )
    } );

    // dipole
    const bondDipoleNode = new BondDipoleNode( molecule.bond, {
      visibleProperty: viewProperties.bondDipoleVisibleProperty,
      tandem: options.tandem.createTandem( 'bondDipoleNode' )
    } );

    assert && assert( !options.children, 'DiatomicMoleculeNode sets children' );
    options.children = [
      electrostaticPotentialNode, electronDensityNode,
      bondNode, atomANode, atomBNode,
      arrowsANode, arrowsBNode,
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
      electrostaticPotentialNode.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
      electronDensityNode.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
    } );

    // When the user drags any atom or bond, hide the cueing arrows.
    const hideArrows = () => {
      if ( molecule.isDraggingProperty.value ) {
        arrowsANode.visible = arrowsBNode.visible = false;
      }
    };
    molecule.angleProperty.lazyLink( hideArrows );

    // @private makes the cueing arrows visible
    this.resetArrows = () => {
      arrowsANode.visible = arrowsBNode.visible = true;
    };
  }

  // @public
  reset() {
    this.resetArrows();
  }
}

moleculePolarity.register( 'DiatomicMoleculeNode', DiatomicMoleculeNode );

export default DiatomicMoleculeNode;