// Copyright 2014-2026, University of Colorado Boulder

/**
 * View for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPConstants from '../../common/MPConstants.js';
import ElectronegativityPanel from '../../common/view/ElectronegativityPanel.js';
import MoleculeContextResponsesNode from '../../common/view/MoleculeContextResponsesNode.js';
import PlatesNode from '../../common/view/PlatesNode.js';
import RotationResponseNode from '../../common/view/RotationResponseNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import ThreeAtomsModel from '../model/ThreeAtomsModel.js';
import ThreeAtomsControlPanel from './ThreeAtomsControlPanel.js';
import ThreeAtomsElectronegativityAccessibleListNode from './ThreeAtomsElectronegativityAccessibleListNode.js';
import ThreeAtomsRotationalContextResponses from './ThreeAtomsRotationalContextResponses.js';
import ThreeAtomsScreenSummaryContentNode from './ThreeAtomsScreenSummaryContentNode.js';
import ThreeAtomsViewProperties from './ThreeAtomsViewProperties.js';
import TriatomicMoleculeAccessibleListNode from './TriatomicMoleculeAccessibleListNode.js';
import TriatomicMoleculeNode from './TriatomicMoleculeNode.js';

export default class ThreeAtomsScreenView extends ScreenView {

  public constructor( model: ThreeAtomsModel, tandem: Tandem ) {

    super( {
      layoutBounds: MPConstants.LAYOUT_BOUNDS,
      tandem: tandem,
      screenSummaryContent: new ThreeAtomsScreenSummaryContentNode( model )
    } );

    // view-specific Properties
    const viewProperties = new ThreeAtomsViewProperties(
      model.eFieldEnabledProperty,
      {
        tandem: tandem.createTandem( 'viewProperties' )
      } );

    // nodes
    const moleculeNode = new TriatomicMoleculeNode( model.triatomicMolecule, viewProperties.bondDipolesVisibleProperty,
      viewProperties.molecularDipoleVisibleProperty, viewProperties.partialChargesVisibleProperty, {
        tandem: tandem.createTandem( 'moleculeNode' )
      } );


    const moleculeDescriptionNode = new Node( {
      accessibleHeading: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.headingStringProperty
    } );

    moleculeDescriptionNode.addChild(
      new ThreeAtomsRotationalContextResponses( model.triatomicMolecule, viewProperties )
    );

    // Molecule description
    moleculeDescriptionNode.addChild(
      new TriatomicMoleculeAccessibleListNode( model.triatomicMolecule, viewProperties )
    );

    // Adding the node that will emit context responses due to rotations
    this.addChild(
      new RotationResponseNode(
        model.triatomicMolecule.angleProperty,
        model.triatomicMolecule.dipoleProperty,
        model.triatomicMolecule.isRotatingDueToEFieldProperty,
        model.eFieldEnabledProperty
      )
    );

    // Current polarity description
    this.addChild( moleculeDescriptionNode );

    const electronegativityDescriptionNode = new Node( {
      accessibleHeading: MoleculePolarityFluent.a11y.common.electronegativity.headingStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.electronegativity.accessibleHelpTextStringProperty
    } );
    this.addChild( electronegativityDescriptionNode );

    electronegativityDescriptionNode.addChild(
      new ThreeAtomsElectronegativityAccessibleListNode( model.triatomicMolecule )
    );


    const platesNode = new PlatesNode( model.eFieldEnabledProperty, {
      spacing: 600
    } );

    const electronegativityPanelsTandem = tandem.createTandem( 'electronegativityPanels' );

    const atomAElectronegativityPanel = new ElectronegativityPanel(
      model.triatomicMolecule.atomA,
      model.triatomicMolecule,
      {
        tandem: electronegativityPanelsTandem.createTandem( 'atomAElectronegativityPanel' )
      } );
    const atomBElectronegativityPanel = new ElectronegativityPanel(
      model.triatomicMolecule.atomB,
      model.triatomicMolecule,
      {
        tandem: electronegativityPanelsTandem.createTandem( 'atomBElectronegativityPanel' )
      } );
    const atomCElectronegativityPanel = new ElectronegativityPanel(
      model.triatomicMolecule.atomC,
      model.triatomicMolecule,
      {
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

    // Context responses for electronegativity changes
    // Atom A has invertMapping: true because changes to atom A affect deltaEN inversely
    this.addChild( new MoleculeContextResponsesNode(
      model.triatomicMolecule.atomA,
      model.triatomicMolecule,
      [ model.triatomicMolecule.bondAB ],
      viewProperties,
      true
    ) );

    // Atom B uses default mapping
    this.addChild( new MoleculeContextResponsesNode(
      model.triatomicMolecule.atomB,
      model.triatomicMolecule,
      [ model.triatomicMolecule.bondAB, model.triatomicMolecule.bondBC ],
      viewProperties,
      false
    ) );

    // Atom C
    this.addChild( new MoleculeContextResponsesNode(
      model.triatomicMolecule.atomC,
      model.triatomicMolecule,
      [ model.triatomicMolecule.bondBC ],
      viewProperties,
      false
    ) );

    const controlPanel = new ThreeAtomsControlPanel( viewProperties, model.eFieldEnabledProperty, {
      tandem: tandem.createTandem( 'controlPanel' )
    } );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
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

    this.pdomPlayAreaNode.pdomOrder = [
      moleculeDescriptionNode,
      moleculeNode,
      electronegativityDescriptionNode,
      electronegativityPanels
    ];

    this.pdomControlAreaNode.pdomOrder = [
      platesNode,
      controlPanel,
      resetAllButton
    ];

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