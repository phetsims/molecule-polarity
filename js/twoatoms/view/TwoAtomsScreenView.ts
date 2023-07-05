// Copyright 2014-2023, University of Colorado Boulder

/**
 * View for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import { HBox, Node } from '../../../../scenery/js/imports.js';
import MPConstants from '../../common/MPConstants.js';
import ElectronegativityPanel from '../../common/view/ElectronegativityPanel.js';
import PlatesNode from '../../common/view/PlatesNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import TwoAtomsModel from '../model/TwoAtomsModel.js';
import BondCharacterPanel from './BondCharacterPanel.js';
import DiatomicMoleculeNode from './DiatomicMoleculeNode.js';
import TwoAtomsControlPanel from './TwoAtomsControlPanel.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';
import TwoAtomsColorKeyNode from './TwoAtomsColorKeyNode.js';

type SelfOptions = EmptySelfOptions;

type TwoAtomsViewControlsOptions = SelfOptions & PickRequired<ScreenView, 'tandem'>;

export default class TwoAtomsScreenView extends ScreenView {

  public constructor( model: TwoAtomsModel, providedOptions: TwoAtomsViewControlsOptions ) {

    const options = optionize<TwoAtomsViewControlsOptions, SelfOptions, ScreenViewOptions>()( {
      layoutBounds: MPConstants.LAYOUT_BOUNDS,
      isDisposable: false
    }, providedOptions );

    super( options );

    // view-specific Properties
    const viewProperties = new TwoAtomsViewProperties( {
      tandem: options.tandem.createTandem( 'viewProperties' )
    } );

    const moleculeNode = new DiatomicMoleculeNode( model.diatomicMolecule, viewProperties, {
      tandem: options.tandem.createTandem( 'moleculeNode' )
    } );

    const platesNode = new PlatesNode( model.eFieldEnabledProperty );

    const electronegativityPanelsTandem = options.tandem.createTandem( 'electronegativityPanels' );

    const atomAElectronegativityPanel = new ElectronegativityPanel( model.diatomicMolecule.atomA, model.diatomicMolecule, {
      tandem: electronegativityPanelsTandem.createTandem( 'atomAElectronegativityPanel' )
    } );
    const atomBElectronegativityPanel = new ElectronegativityPanel( model.diatomicMolecule.atomB, model.diatomicMolecule, {
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

    const bondCharacterPanel = new BondCharacterPanel( model.diatomicMolecule, {
      visibleProperty: viewProperties.bondCharacterVisibleProperty,
      tandem: options.tandem.createTandem( 'bondCharacterPanel' )
    } );

    const colorKeyNode = new TwoAtomsColorKeyNode( viewProperties.surfaceTypeProperty,
      options.tandem.createTandem( 'colorKeyNode' ) );

    const controlPanel = new TwoAtomsControlPanel( viewProperties, model.eFieldEnabledProperty, {
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
        bondCharacterPanel,
        colorKeyNode,
        moleculeNode,
        resetAllButton
      ]
    } );
    this.addChild( rootNode );

    // layout, based on molecule position ---------------------------------

    const moleculeX = model.diatomicMolecule.position.x;
    const moleculeY = model.diatomicMolecule.position.y;

    platesNode.centerX = moleculeX;
    platesNode.bottom = moleculeY + ( platesNode.plateHeight / 2 );

    Multilink.multilink( [ electronegativityPanels.boundsProperty, bondCharacterPanel.boundsProperty ], () => {

      // centered below molecule
      electronegativityPanels.centerX = moleculeX;
      electronegativityPanels.bottom = this.layoutBounds.bottom - 25;

      // centered above EN controls
      bondCharacterPanel.centerX = moleculeX;
      bondCharacterPanel.bottom = electronegativityPanels.top - 10;
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