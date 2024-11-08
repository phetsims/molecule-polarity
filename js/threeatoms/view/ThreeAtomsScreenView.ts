// Copyright 2014-2023, University of Colorado Boulder

/**
 * View for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
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

export default class ThreeAtomsScreenView extends ScreenView {

  public constructor( model: ThreeAtomsModel, tandem: Tandem ) {

    super( {
      layoutBounds: MPConstants.LAYOUT_BOUNDS,
      tandem: tandem
    } );

    // view-specific Properties
    const viewProperties = new ThreeAtomsViewProperties( {
      tandem: tandem.createTandem( 'viewProperties' )
    } );

    // nodes
    const moleculeNode = new TriatomicMoleculeNode( model.triatomicMolecule, viewProperties.bondDipolesVisibleProperty,
      viewProperties.molecularDipoleVisibleProperty, viewProperties.partialChargesVisibleProperty, {
        tandem: tandem.createTandem( 'moleculeNode' )
      } );
    const platesNode = new PlatesNode( model.eFieldEnabledProperty, {
      spacing: 600
    } );

    const electronegativityPanelsTandem = tandem.createTandem( 'electronegativityPanels' );

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
      tandem: electronegativityPanelsTandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    const controlPanel = new ThreeAtomsControlPanel( viewProperties, model.eFieldEnabledProperty, {
      tandem: tandem.createTandem( 'controlPanel' )
    } );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput();
        model.reset();
        viewProperties.reset();
        moleculeNode.reset();
      },
      scale: 1.32,
      tandem: tandem.createTandem( 'resetAllButton' )
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
    electronegativityPanels.boundsProperty.link( () => {
      electronegativityPanels.centerX = moleculeX;
      electronegativityPanels.bottom = this.layoutBounds.bottom - 25;
    } );

    // to right of positive plate, top aligned
    controlPanel.left = platesNode.right + 25;
    controlPanel.top = platesNode.bottom - platesNode.plateHeight;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;
  }
}

moleculePolarity.register( 'ThreeAtomsScreenView', ThreeAtomsScreenView );