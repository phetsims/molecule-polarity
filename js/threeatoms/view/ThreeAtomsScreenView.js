// Copyright 2014-2020, University of Colorado Boulder

/**
 * View for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPConstants from '../../common/MPConstants.js';
import ElectronegativityControl from '../../common/view/ElectronegativityControl.js';
import PlatesNode from '../../common/view/PlatesNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import ThreeAtomsModel from '../model/ThreeAtomsModel.js';
import ThreeAtomsControlPanel from './ThreeAtomsControlPanel.js';
import ThreeAtomsViewProperties from './ThreeAtomsViewProperties.js';
import TriatomicMoleculeNode from './TriatomicMoleculeNode.js';

class ThreeAtomsScreenView extends ScreenView {

  /**
   * @param {ThreeAtomsModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {
    assert && assert( model instanceof ThreeAtomsModel, 'invalid model' );

    options = merge( {
      tandem: Tandem.REQUIRED
    }, MPConstants.SCREEN_VIEW_OPTIONS, options );

    super( options );

    // view-specific Properties
    const viewProperties = new ThreeAtomsViewProperties( {
      tandem: options.tandem.createTandem( 'viewProperties' )
    } );

    // nodes
    const moleculeNode = new TriatomicMoleculeNode( model.molecule, viewProperties.bondDipolesVisibleProperty,
      viewProperties.molecularDipoleVisibleProperty, viewProperties.partialChargesVisibleProperty, {
        tandem: options.tandem.createTandem( 'moleculeNode' )
      } );
    const platesNode = new PlatesNode( model.eField, {
      spacing: 600,
      visibleProperty: model.eField.enabledProperty,
      tandem: options.tandem.createTandem( 'platesNode' )
    } );
    const atomAElectronegativityControl = new ElectronegativityControl( model.molecule.atomA, model.molecule, {
      tandem: options.tandem.createTandem( 'atomAElectronegativityControl' )
    } );
    const atomBElectronegativityControl = new ElectronegativityControl( model.molecule.atomB, model.molecule, {
      tandem: options.tandem.createTandem( 'atomBElectronegativityControl' )
    } );
    const atomCElectronegativityControl = new ElectronegativityControl( model.molecule.atomC, model.molecule, {
      tandem: options.tandem.createTandem( 'atomCElectronegativityControl' )
    } );

    const controlPanel = new ThreeAtomsControlPanel( viewProperties, model.eField.enabledProperty, {
      tandem: options.tandem.createTandem( 'controlPanel' )
    } );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput();
        model.reset();
        viewProperties.reset();
        moleculeNode.reset();
      },
      scale: 1.32,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    // Parent for all nodes added to this screen
    const rootNode = new Node( {
      children: [

        // nodes are rendered in this order
        platesNode,
        atomAElectronegativityControl,
        atomBElectronegativityControl,
        atomCElectronegativityControl,
        controlPanel,
        moleculeNode,
        resetAllButton
      ]
    } );
    this.addChild( rootNode );

    // layout, based on molecule position ---------------------------------

    const moleculeX = model.molecule.position.x;
    const moleculeY = model.molecule.position.y;

    platesNode.centerX = moleculeX;
    platesNode.y = moleculeY - ( platesNode.plateHeight / 2 );

    // centered below molecule
    atomBElectronegativityControl.centerX = moleculeX;
    atomAElectronegativityControl.right = atomBElectronegativityControl.left - 10;
    atomCElectronegativityControl.left = atomBElectronegativityControl.right + 10;
    atomAElectronegativityControl.bottom = atomBElectronegativityControl.bottom = atomCElectronegativityControl.bottom = this.layoutBounds.bottom - 25;

    // to right of positive plate, top aligned
    controlPanel.left = platesNode.right + 25;
    controlPanel.top = platesNode.y;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;

    // synchronization with view Properties ------------------------------

    // unlink not needed
    viewProperties.bondDipolesVisibleProperty.link( visible => {
      moleculeNode.setBondDipolesVisible( visible );
    } );

    // unlink not needed
    viewProperties.molecularDipoleVisibleProperty.link( visible => {
      moleculeNode.setMolecularDipoleVisible( visible );
    } );

    // unlink not needed
    viewProperties.partialChargesVisibleProperty.link( visible => {
      moleculeNode.setPartialChargesVisible( visible );
    } );
  }
}

moleculePolarity.register( 'ThreeAtomsScreenView', ThreeAtomsScreenView );

export default ThreeAtomsScreenView;