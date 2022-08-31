// Copyright 2014-2022, University of Colorado Boulder

/**
 * View for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import { HBox, Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPConstants from '../../common/MPConstants.js';
import ElectronegativityPanel from '../../common/view/ElectronegativityPanel.js';
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
    const moleculeNode = new TriatomicMoleculeNode( model.triatomicMolecule, viewProperties.bondDipolesVisibleProperty,
      viewProperties.molecularDipoleVisibleProperty, viewProperties.partialChargesVisibleProperty, {
        tandem: options.tandem.createTandem( 'moleculeNode' )
      } );
    const platesNode = new PlatesNode( model.eFieldEnabledProperty, {
      spacing: 600
    } );

    const electronegativityPanelsTandem = options.tandem.createTandem( 'electronegativityPanels' );

    const atomAElectronegativityPanel = new ElectronegativityPanel( model.triatomicMolecule.atomA, model.triatomicMolecule, {
      tandem: electronegativityPanelsTandem.createTandem( 'atomAElectronegativityPanel' )
    } );
    const atomBElectronegativityPanel = new ElectronegativityPanel( model.triatomicMolecule.atomB, model.triatomicMolecule, {
      tandem: electronegativityPanelsTandem.createTandem( 'atomBElectronegativityPanel' )
    } );
    const atomCElectronegativityPanel = new ElectronegativityPanel( model.triatomicMolecule.atomC, model.triatomicMolecule, {
      tandem: electronegativityPanelsTandem.createTandem( 'atomCElectronegativityPanel' )
    } );
    const electronegativityPanels = new HBox( {
      spacing: 10,
      children: [ atomAElectronegativityPanel, atomBElectronegativityPanel, atomCElectronegativityPanel ],
      tandem: electronegativityPanelsTandem
    } );

    const controlPanel = new ThreeAtomsControlPanel( viewProperties, model.eFieldEnabledProperty, {
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
        electronegativityPanels,
        controlPanel,
        moleculeNode,
        resetAllButton
      ]
    } );
    this.addChild( rootNode );

    // layout, based on molecule position ---------------------------------

    const moleculeX = model.triatomicMolecule.position.x;
    const moleculeY = model.triatomicMolecule.position.y;

    platesNode.centerX = moleculeX;
    platesNode.bottom = moleculeY + ( platesNode.plateHeight / 2 );

    // centered below molecule
    electronegativityPanels.centerX = moleculeX;
    electronegativityPanels.bottom = this.layoutBounds.bottom - 25;

    // to right of positive plate, top aligned
    controlPanel.left = platesNode.right + 25;
    controlPanel.top = platesNode.bottom - platesNode.plateHeight;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;
  }
}

moleculePolarity.register( 'ThreeAtomsScreenView', ThreeAtomsScreenView );
export default ThreeAtomsScreenView;