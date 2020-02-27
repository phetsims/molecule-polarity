// Copyright 2014-2020, University of Colorado Boulder

/**
 * View for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import inherit from '../../../../phet-core/js/inherit.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import MPConstants from '../../common/MPConstants.js';
import EFieldControl from '../../common/view/EFieldControl.js';
import ElectronegativityControl from '../../common/view/ElectronegativityControl.js';
import MPControlPanel from '../../common/view/MPControlPanel.js';
import PlateNode from '../../common/view/PlateNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import ThreeAtomsViewControls from './ThreeAtomsViewControls.js';
import ThreeAtomsViewProperties from './ThreeAtomsViewProperties.js';
import TriatomicMoleculeNode from './TriatomicMoleculeNode.js';

// constants
const PLATE_X_OFFSET = 300; // x offset of E-field plates from molecule's center, determined empirically, see #66

/**
 * @param {ThreeAtomsModel} model
 * @constructor
 */
function ThreeAtomsScreenView( model ) {

  const self = this;

  ScreenView.call( this, MPConstants.SCREEN_VIEW_OPTIONS );

  // view-specific Properties
  const viewProperties = new ThreeAtomsViewProperties();

  // nodes
  const moleculeNode = new TriatomicMoleculeNode( model.molecule );
  const negativePlateNode = PlateNode.createNegative( model.eField );
  const positivePlateNode = PlateNode.createPositive( model.eField );
  const enControlA = new ElectronegativityControl( model.molecule.atomA, model.molecule );
  const enControlB = new ElectronegativityControl( model.molecule.atomB, model.molecule );
  const enControlC = new ElectronegativityControl( model.molecule.atomC, model.molecule );

  const controlPanel = new MPControlPanel( [
    new ThreeAtomsViewControls( viewProperties ),
    new EFieldControl( model.eField.enabledProperty )
  ] );

  const resetAllButton = new ResetAllButton( {
    listener: function() {
      self.interruptSubtreeInput();
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
      enControlC,
      controlPanel,
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
  enControlB.centerX = moleculeX;
  enControlA.right = enControlB.left - 10;
  enControlC.left = enControlB.right + 10;
  enControlA.bottom = enControlB.bottom = enControlC.bottom = this.layoutBounds.bottom - 25;

  // to right of positive plate, top aligned
  controlPanel.top = positivePlateNode.y;
  controlPanel.left = positivePlateNode.right + 25;

  // bottom-right corner of the screen
  resetAllButton.right = this.layoutBounds.right - 40;
  resetAllButton.bottom = this.layoutBounds.bottom - 20;

  // synchronization with view Properties ------------------------------

  // unlink not needed
  viewProperties.bondDipolesVisibleProperty.link( function( visible ) {
    moleculeNode.setBondDipolesVisible( visible );
  } );

  // unlink not needed
  viewProperties.molecularDipoleVisibleProperty.link( function( visible ) {
    moleculeNode.setMolecularDipoleVisible( visible );
  } );

  // unlink not needed
  viewProperties.partialChargesVisibleProperty.link( function( visible ) {
    moleculeNode.setPartialChargesVisible( visible );
  } );
}

moleculePolarity.register( 'ThreeAtomsScreenView', ThreeAtomsScreenView );

inherit( ScreenView, ThreeAtomsScreenView );
export default ThreeAtomsScreenView;