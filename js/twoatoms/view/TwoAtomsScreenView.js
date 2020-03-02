// Copyright 2014-2020, University of Colorado Boulder

/**
 * View for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import MPConstants from '../../common/MPConstants.js';
import EFieldControl from '../../common/view/EFieldControl.js';
import ElectronegativityControl from '../../common/view/ElectronegativityControl.js';
import MPControlPanel from '../../common/view/MPControlPanel.js';
import PlateNode from '../../common/view/PlateNode.js';
import SurfaceColorKey from '../../common/view/SurfaceColorKey.js';
import SurfaceType from '../../common/view/SurfaceType.js';
import SurfaceTypeControl from '../../common/view/SurfaceTypeControl.js';
import moleculePolarity from '../../moleculePolarity.js';
import BondCharacterNode from './BondCharacterNode.js';
import DiatomicMoleculeNode from './DiatomicMoleculeNode.js';
import TwoAtomsViewControls from './TwoAtomsViewControls.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';

// constants
const PLATE_X_OFFSET = 250; // x offset of E-field plates from molecule's center, determined empirically, see #66

class TwoAtomsScreenView extends ScreenView {

  /**
   * @param {TwoAtomsModel} model
   */
  constructor( model ) {

    super( MPConstants.SCREEN_VIEW_OPTIONS );

    // view-specific Properties
    const viewProperties = new TwoAtomsViewProperties();

    // nodes
    const moleculeNode = new DiatomicMoleculeNode( model.molecule );
    const negativePlateNode = PlateNode.createNegative( model.eField );
    const positivePlateNode = PlateNode.createPositive( model.eField );
    const enControlA = new ElectronegativityControl( model.molecule.atomA, model.molecule );
    const enControlB = new ElectronegativityControl( model.molecule.atomB, model.molecule );
    const bondCharacterNode = new BondCharacterNode( model.molecule );
    const electrostaticPotentialColorKey = SurfaceColorKey.createElectrostaticPotentialRWBColorKey();
    const electronDensityColorKey = SurfaceColorKey.createElectronDensityColorKey();

    const controlPanel = new MPControlPanel( [
      new TwoAtomsViewControls( viewProperties ),
      new SurfaceTypeControl( viewProperties.surfaceTypeProperty ),
      new EFieldControl( model.eField.enabledProperty )
    ] );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput();
        model.reset();
        viewProperties.reset();
        moleculeNode.reset();
      },
      scale: 1.32
    } );

    // Parent for all nodes added to this screen
    const rootNode = new Node( {
      children: [

        // nodes are rendered in this order
        negativePlateNode,
        positivePlateNode,
        enControlA,
        enControlB,
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

    // to left of molecule, vertically centered
    negativePlateNode.right = moleculeX - PLATE_X_OFFSET;
    negativePlateNode.y = moleculeY - ( negativePlateNode.plateHeight / 2 );

    // to right of molecule, vertically centered
    positivePlateNode.left = moleculeX + PLATE_X_OFFSET;
    positivePlateNode.y = moleculeY - ( positivePlateNode.plateHeight / 2 );

    // centered below molecule
    enControlA.right = moleculeX - 5;
    enControlB.left = moleculeX + 5;
    enControlA.bottom = enControlB.bottom = this.layoutBounds.bottom - 25;

    // centered above molecule
    electrostaticPotentialColorKey.centerX = electronDensityColorKey.centerX = moleculeX;
    electrostaticPotentialColorKey.top = electronDensityColorKey.top = 25;

    // centered above EN controls
    bondCharacterNode.centerX = moleculeX;
    bondCharacterNode.bottom = enControlA.top - 10;

    // to right of positive plate, top aligned
    controlPanel.top = positivePlateNode.y;
    controlPanel.left = positivePlateNode.right + 70;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;

    // synchronization with view Properties ------------------------------

    // unlink not needed
    viewProperties.bondDipoleVisibleProperty.link( visible => {
      moleculeNode.setBondDipoleVisible( visible );
    } );

    // unlink not needed
    viewProperties.partialChargesVisibleProperty.link( visible => {
      moleculeNode.setPartialChargesVisible( visible );
    } );

    // unlink not needed
    viewProperties.bondCharacterVisibleProperty.linkAttribute( bondCharacterNode, 'visible' );

    // unlink not needed
    viewProperties.surfaceTypeProperty.link( surfaceType => {
      moleculeNode.setSurfaceType( surfaceType );
      electrostaticPotentialColorKey.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
      electronDensityColorKey.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
    } );
  }
}

moleculePolarity.register( 'TwoAtomsScreenView', TwoAtomsScreenView );

export default TwoAtomsScreenView;