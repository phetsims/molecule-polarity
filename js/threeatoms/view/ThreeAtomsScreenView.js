// Copyright 2014-2020, University of Colorado Boulder

/**
 * View for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EFieldControl = require( 'MOLECULE_POLARITY/common/view/EFieldControl' );
  const ElectronegativityControl = require( 'MOLECULE_POLARITY/common/view/ElectronegativityControl' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const MPControlPanel = require( 'MOLECULE_POLARITY/common/view/MPControlPanel' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PlateNode = require( 'MOLECULE_POLARITY/common/view/PlateNode' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const ThreeAtomsViewControls = require( 'MOLECULE_POLARITY/threeatoms/view/ThreeAtomsViewControls' );
  const ThreeAtomsViewProperties = require( 'MOLECULE_POLARITY/threeatoms/view/ThreeAtomsViewProperties' );
  const TriatomicMoleculeNode = require( 'MOLECULE_POLARITY/threeatoms/view/TriatomicMoleculeNode' );

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

  return inherit( ScreenView, ThreeAtomsScreenView );
} );