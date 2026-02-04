// Copyright 2014-2026, University of Colorado Boulder

/**
 * View for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPConstants from '../../common/MPConstants.js';
import DescriptionMaps from '../../common/view/DescriptionMaps.js';
import ElectronegativityPanel from '../../common/view/ElectronegativityPanel.js';
import MoleculeContextResponsesNode from '../../common/view/MoleculeContextResponsesNode.js';
import PlatesNode from '../../common/view/PlatesNode.js';
import RotationResponseNode from '../../common/view/RotationResponseNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import TwoAtomsModel from '../model/TwoAtomsModel.js';
import BondCharacterPanel from './BondCharacterPanel.js';
import DiatomicMoleculeAccessibleListNode from './DiatomicMoleculeAccessibleListNode.js';
import DiatomicMoleculeNode from './DiatomicMoleculeNode.js';
import TwoAtomsColorKeyNode from './TwoAtomsColorKeyNode.js';
import TwoAtomsControlPanel from './TwoAtomsControlPanel.js';
import TwoAtomsElectronegativityAccessibleListNode from './TwoAtomsElectronegativityAccessibleListNode.js';
import TwoAtomsScreenSummaryContentNode from './TwoAtomsScreenSummaryContentNode.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';

export default class TwoAtomsScreenView extends ScreenView {

  public constructor( model: TwoAtomsModel, tandem: Tandem ) {

    super( {
      layoutBounds: MPConstants.LAYOUT_BOUNDS,
      tandem: tandem,
      screenSummaryContent: new TwoAtomsScreenSummaryContentNode( model )
    } );

    // view-specific Properties
    const viewProperties = new TwoAtomsViewProperties(
      model.eFieldEnabledProperty,
      {
        tandem: tandem.createTandem( 'viewProperties' )
      } );

    const moleculeNode = new DiatomicMoleculeNode( model.diatomicMolecule, viewProperties, {
      tandem: tandem.createTandem( 'moleculeNode' )
    } );

    const moleculeDescriptionNode = new Node( {
      accessibleHeading: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.headingStringProperty
    } );

    // Molecule description
    moleculeDescriptionNode.addChild(
      new DiatomicMoleculeAccessibleListNode( model.diatomicMolecule, viewProperties )
    );

    // Adding the node that will emit context responses due to rotations
    this.addChild(
      new RotationResponseNode(
        model.diatomicMolecule.angleProperty,
        model.diatomicMolecule.dipoleProperty,
        model.diatomicMolecule.isRotatingDueToEFieldProperty,
        model.eFieldEnabledProperty
      )
    );

    // Current polarity description
    this.addChild( moleculeDescriptionNode );

    const platesNode = new PlatesNode( model.eFieldEnabledProperty );

    const electronegativityPanelsTandem = tandem.createTandem( 'electronegativityPanels' );

    const atomAElectronegativityPanel = new ElectronegativityPanel(
      model.diatomicMolecule.atomA,
      model.diatomicMolecule,
      {
        tandem: electronegativityPanelsTandem.createTandem( 'atomAElectronegativityPanel' )
      } );
    const atomBElectronegativityPanel = new ElectronegativityPanel(
      model.diatomicMolecule.atomB,
      model.diatomicMolecule,
      {
        tandem: electronegativityPanelsTandem.createTandem( 'atomBElectronegativityPanel' )
      } );
    const electronegativityPanels = new HBox( {
      spacing: 10,
      children: [ atomAElectronegativityPanel, atomBElectronegativityPanel ],
      tandem: electronegativityPanelsTandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    model.diatomicMolecule.angleProperty.link( angle => {

      if ( model.diatomicMolecule.deltaENProperty.value === 0 ) { return; } // no dipole, no context response

      // If deltaEN is negative and atom is inverted, we need to add PI. If it's positive and not inverted we dont.
      angle = model.diatomicMolecule.deltaENProperty.value < 0 ? angle + Math.PI : angle;

      this.addAccessibleContextResponse(
        MoleculePolarityFluent.a11y.common.bondDipoleDirection.format( {
          bond: 'AB',
          position: DescriptionMaps.formatOrientationString( angle, 'toAngle' )
        } ), {
          interruptible: true
        }
      );
    } );

    // Context responses for electronegativity changes
    // Atom A has invertMapping: true because changes to atom A affect deltaEN inversely
    this.addChild( new MoleculeContextResponsesNode(
      model.diatomicMolecule.atomA,
      model.diatomicMolecule,
      [ model.diatomicMolecule.bond ],
      viewProperties,
      true
    ) );

    // Atom B uses default mapping
    this.addChild( new MoleculeContextResponsesNode(
      model.diatomicMolecule.atomB,
      model.diatomicMolecule,
      [ model.diatomicMolecule.bond ],
      viewProperties,
      false
    ) );

    const electronegativityDescriptionNode = new Node( {
      accessibleHeading: MoleculePolarityFluent.a11y.common.electronegativity.headingStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.electronegativity.accessibleHelpTextStringProperty
    } );
    this.addChild( electronegativityDescriptionNode );

    electronegativityDescriptionNode.addChild(
      new TwoAtomsElectronegativityAccessibleListNode( model.diatomicMolecule )
    );

    const bondCharacterPanel = new BondCharacterPanel( model.diatomicMolecule, {
      visibleProperty: viewProperties.bondCharacterVisibleProperty,
      tandem: tandem.createTandem( 'bondCharacterPanel' )
    } );

    const panelsVBox = new VBox( {
      excludeInvisibleChildrenFromBounds: false,
      children: [ bondCharacterPanel, electronegativityPanels ],
      spacing: 10
    } );

    const colorKeyNode = new TwoAtomsColorKeyNode( viewProperties.surfaceTypeProperty,
      tandem.createTandem( 'colorKeyNode' ) );

    const controlPanel = new TwoAtomsControlPanel( viewProperties, model.eFieldEnabledProperty, {
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
        controlPanel,
        panelsVBox,
        colorKeyNode,
        moleculeNode,
        resetAllButton
      ]
    } );
    this.addChild( rootNode );

    this.pdomPlayAreaNode.pdomOrder = [
      moleculeDescriptionNode,
      moleculeNode,
      electronegativityDescriptionNode,
      panelsVBox
    ];

    this.pdomControlAreaNode.pdomOrder = [
      platesNode,
      controlPanel,
      colorKeyNode,
      resetAllButton
    ];

    // layout, based on molecule position ---------------------------------

    const moleculeX = model.diatomicMolecule.position.x;
    const moleculeY = model.diatomicMolecule.position.y;

    platesNode.centerX = moleculeX;
    platesNode.bottom = moleculeY + ( platesNode.plateHeight / 2 );

    // centered below molecule
    panelsVBox.boundsProperty.link( () => {
      panelsVBox.centerX = moleculeX;
      panelsVBox.bottom = this.layoutBounds.bottom - 25;
    } );

    // centered above molecule
    colorKeyNode.boundsProperty.link( () => {
      colorKeyNode.centerX = moleculeX;
      colorKeyNode.top = 25;
    } );

    // to right of positive plate, top aligned
    controlPanel.left = platesNode.right + 70;
    controlPanel.top = platesNode.bottom - platesNode.plateHeight;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;
  }
}

moleculePolarity.register( 'TwoAtomsScreenView', TwoAtomsScreenView );