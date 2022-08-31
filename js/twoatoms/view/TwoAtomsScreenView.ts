// Copyright 2014-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * View for the 'Two Atoms' screen.
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
import SurfaceColorKey from '../../common/view/SurfaceColorKey.js';
import moleculePolarity from '../../moleculePolarity.js';
import TwoAtomsModel from '../model/TwoAtomsModel.js';
import BondCharacterPanel from './BondCharacterPanel.js';
import DiatomicMoleculeNode from './DiatomicMoleculeNode.js';
import TwoAtomsControlPanel from './TwoAtomsControlPanel.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';

class TwoAtomsScreenView extends ScreenView {

  /**
   * @param {TwoAtomsModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {
    assert && assert( model instanceof TwoAtomsModel, 'invalid model' );

    options = merge( {
      tandem: Tandem.REQUIRED
    }, MPConstants.SCREEN_VIEW_OPTIONS, options );

    super( options );

    // view-specific Properties
    const viewProperties = new TwoAtomsViewProperties( {
      tandem: options.tandem.createTandem( 'viewProperties' )
    } );

    const moleculeNode = new DiatomicMoleculeNode( model.molecule, viewProperties, {
      tandem: options.tandem.createTandem( 'moleculeNode' )
    } );

    const platesNode = new PlatesNode( model.eFieldEnabledProperty );

    const electronegativityPanelsTandem = options.tandem.createTandem( 'electronegativityPanels' );

    const atomAElectronegativityPanel = new ElectronegativityPanel( model.molecule.atomA, model.molecule, {
      tandem: electronegativityPanelsTandem.createTandem( 'atomAElectronegativityPanel' )
    } );
    const atomBElectronegativityPanel = new ElectronegativityPanel( model.molecule.atomB, model.molecule, {
      tandem: electronegativityPanelsTandem.createTandem( 'atomBElectronegativityPanel' )
    } );
    const electronegativityPanels = new HBox( {
      spacing: 10,
      children: [ atomAElectronegativityPanel, atomBElectronegativityPanel ],
      tandem: electronegativityPanelsTandem
    } );

    const bondCharacterPanel = new BondCharacterPanel( model.molecule, {
      visibleProperty: viewProperties.bondCharacterVisibleProperty,
      tandem: options.tandem.createTandem( 'bondCharacterPanel' )
    } );

    // Group color keys under a common parent, so that PhET-iO can hide the color key.
    const colorKeysTandem = options.tandem.createTandem( 'colorKeys' );

    const electrostaticPotentialColorKey = SurfaceColorKey.createElectrostaticPotentialRWBColorKey( {
      tandem: colorKeysTandem.createTandem( 'electrostaticPotentialColorKey' ),
      phetioVisiblePropertyInstrumented: false
    } );

    const electronDensityColorKey = SurfaceColorKey.createElectronDensityColorKey( {
      tandem: colorKeysTandem.createTandem( 'electronDensityColorKey' ),
      visiblePropertyOptions: { readOnly: true }
    } );

    const colorKeysNode = new Node( {
      children: [ electrostaticPotentialColorKey, electronDensityColorKey ]
    } );

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
        colorKeysNode,
        moleculeNode,
        resetAllButton
      ]
    } );
    this.addChild( rootNode );

    // layout, based on molecule position ---------------------------------

    const moleculeX = model.molecule.position.x;
    const moleculeY = model.molecule.position.y;

    platesNode.centerX = moleculeX;
    platesNode.bottom = moleculeY + ( platesNode.plateHeight / 2 );

    // centered below molecule
    electronegativityPanels.centerX = moleculeX;
    electronegativityPanels.bottom = this.layoutBounds.bottom - 25;

    // centered above molecule
    electrostaticPotentialColorKey.centerX = electronDensityColorKey.centerX = moleculeX;
    electrostaticPotentialColorKey.top = electronDensityColorKey.top = 25;

    // centered above EN controls
    bondCharacterPanel.centerX = moleculeX;
    bondCharacterPanel.bottom = electronegativityPanels.top - 10;

    // to right of positive plate, top aligned
    controlPanel.left = platesNode.right + 70;
    controlPanel.top = platesNode.bottom - platesNode.plateHeight;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;

    // synchronization with view Properties ------------------------------

    // unlink not needed
    viewProperties.surfaceTypeProperty.link( surfaceType => {
      electrostaticPotentialColorKey.visible = ( surfaceType === 'electrostaticPotential' );
      electronDensityColorKey.visible = ( surfaceType === 'electronDensity' );
    } );
  }
}

moleculePolarity.register( 'TwoAtomsScreenView', TwoAtomsScreenView );
export default TwoAtomsScreenView;