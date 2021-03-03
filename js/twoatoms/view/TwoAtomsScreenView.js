// Copyright 2014-2020, University of Colorado Boulder

/**
 * View for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import SurfaceType from '../../common/model/SurfaceType.js';
import MPConstants from '../../common/MPConstants.js';
import ElectronegativityPanel from '../../common/view/ElectronegativityPanel.js';
import PlatesNode from '../../common/view/PlatesNode.js';
import SurfaceColorKey from '../../common/view/SurfaceColorKey.js';
import moleculePolarity from '../../moleculePolarity.js';
import TwoAtomsModel from '../model/TwoAtomsModel.js';
import BondCharacterNode from './BondCharacterNode.js';
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

    const platesNode = new PlatesNode( model.eField, {
      tandem: options.tandem.createTandem( 'platesNode' )
    } );

    const atomAElectronegativityPanel = new ElectronegativityPanel( model.molecule.atomA, model.molecule, {
      tandem: options.tandem.createTandem( 'atomAElectronegativityPanel' )
    } );
    const atomBElectronegativityPanel = new ElectronegativityPanel( model.molecule.atomB, model.molecule, {
      tandem: options.tandem.createTandem( 'atomBElectronegativityPanel' )
    } );

    const bondCharacterNode = new BondCharacterNode( model.molecule, {
      visibleProperty: viewProperties.bondCharacterVisibleProperty,
      tandem: options.tandem.createTandem( 'bondCharacterNode' )
    } );

    const electrostaticPotentialColorKey = SurfaceColorKey.createElectrostaticPotentialRWBColorKey( {
      tandem: options.tandem.createTandem( 'electrostaticPotentialColorKey' ),
      phetioReadOnly: true
    } );
    const electronDensityColorKey = SurfaceColorKey.createElectronDensityColorKey( {
      tandem: options.tandem.createTandem( 'electronDensityColorKey' ),
      phetioReadOnly: true
    } );

    const controlPanel = new TwoAtomsControlPanel( viewProperties, model.eField.enabledProperty, {
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
        atomAElectronegativityPanel,
        atomBElectronegativityPanel,
        controlPanel,
        bondCharacterNode,
        electrostaticPotentialColorKey,
        electronDensityColorKey,
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
    atomAElectronegativityPanel.right = moleculeX - 5;
    atomBElectronegativityPanel.left = moleculeX + 5;
    atomAElectronegativityPanel.bottom = atomBElectronegativityPanel.bottom = this.layoutBounds.bottom - 25;

    // centered above molecule
    electrostaticPotentialColorKey.centerX = electronDensityColorKey.centerX = moleculeX;
    electrostaticPotentialColorKey.top = electronDensityColorKey.top = 25;

    // centered above EN controls
    bondCharacterNode.centerX = moleculeX;
    bondCharacterNode.bottom = atomAElectronegativityPanel.top - 10;

    // to right of positive plate, top aligned
    controlPanel.left = platesNode.right + 70;
    controlPanel.top = platesNode.y;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;

    // synchronization with view Properties ------------------------------

    // unlink not needed
    viewProperties.surfaceTypeProperty.link( surfaceType => {
      electrostaticPotentialColorKey.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
      electronDensityColorKey.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
    } );
  }
}

moleculePolarity.register( 'TwoAtomsScreenView', TwoAtomsScreenView );

export default TwoAtomsScreenView;