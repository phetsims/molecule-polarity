// Copyright 2014-2020, University of Colorado Boulder

/**
 * Visual representation of a diatomic molecule.
 * Children position themselves in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
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

class DiatomicMoleculeNode extends Node {

  /**
   * @param {DiatomicMolecule} molecule
   * @param {Property.<boolean>} dipoleVisibleProperty
   * @param {Property.<boolean>} partialChargesVisibleProperty
   * @param {Object} [options]
   */
  constructor( molecule, dipoleVisibleProperty, partialChargesVisibleProperty, options ) {
    assert && assert( molecule instanceof DiatomicMolecule, 'invalid molecule' );
    assert && AssertUtils.assertPropertyOf( dipoleVisibleProperty, 'boolean' );
    assert && AssertUtils.assertPropertyOf( partialChargesVisibleProperty, 'boolean' );

    options = merge( {
      cursor: 'pointer',
      tandem: Tandem.REQUIRED
    }, options );

    // nodes
    const atomANode = new AtomNode( molecule.atomA, {
      tandem: options.tandem.createTandem( 'atomANode' )
    } );
    const atomBNode = new AtomNode( molecule.atomB, {
      tandem: options.tandem.createTandem( 'atomBNode' )
    } );

    const bondNode = new BondNode( molecule.bond, {
      tandem: options.tandem.createTandem( 'bondNode' )
    } );

    const arrowsANode = new TranslateArrowsNode( molecule, molecule.atomA, {
      tandem: options.tandem.createTandem( 'arrowsANode' )
    } );
    const arrowsBNode = new TranslateArrowsNode( molecule, molecule.atomB, {
      tandem: options.tandem.createTandem( 'arrowsBNode' )
    } );

    const partialChargeANode = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bond, {
      visibleProperty: partialChargesVisibleProperty,
      tandem: options.tandem.createTandem( 'partialChargeANode' )
    } );
    const partialChargeBNode = PartialChargeNode.createOppositePartialChargeNode( molecule.atomB, molecule.bond, {
      visibleProperty: partialChargesVisibleProperty,
      tandem: options.tandem.createTandem( 'partialChargeBNode' )
    } );

    const electrostaticPotentialNode = new ElectrostaticPotentialNode( molecule, {
      tandem: options.tandem.createTandem( 'electrostaticPotentialNode' )
    } );
    const electronDensityNode = new ElectronDensityNode( molecule, {
      tandem: options.tandem.createTandem( 'electronDensityNode' )
    } );

    const bondDipoleNode = new BondDipoleNode( molecule.bond, {
      visibleProperty: dipoleVisibleProperty,
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

    // When the user drags any atom or bond, hide the cueing arrows.
    const hideArrows = () => {
      if ( molecule.dragging ) {
        arrowsANode.visible = arrowsBNode.visible = false;
      }
    };
    molecule.angleProperty.lazyLink( hideArrows );

    // @private makes the cueing arrows visible
    this.resetArrows = () => {
      arrowsANode.visible = arrowsBNode.visible = true;
    };

    // @private
    this.partialChargeANode = partialChargeANode;
    this.partialChargeBNode = partialChargeBNode;
    this.electrostaticPotentialNode = electrostaticPotentialNode;
    this.electronDensityNode = electronDensityNode;
    this.bondDipoleNode = bondDipoleNode;
  }

  // @public
  reset() {
    this.resetArrows();
  }

  /**
   * Sets whether the bond dipole is visible.
   * @param {boolean} visible
   * @public
   */
  setBondDipoleVisible( visible ) {
    this.bondDipoleNode.visible = visible;
  }

  /**
   * Sets whether partial charges are visible.
   * @param {boolean} visible
   * @public
   */
  setPartialChargesVisible( visible ) {
    this.partialChargeANode.visible = this.partialChargeBNode.visible = visible;
  }

  /**
   * Sets the surface type that is visible.
   * @param {SurfaceType} surfaceType
   * @public
   */
  setSurfaceType( surfaceType ) {
    assert && assert( SurfaceType.includes( surfaceType ), 'invalid surfaceType' );
    this.electrostaticPotentialNode.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
    this.electronDensityNode.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
  }
}

moleculePolarity.register( 'DiatomicMoleculeNode', DiatomicMoleculeNode );

export default DiatomicMoleculeNode;