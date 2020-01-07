// Copyright 2014-2019, University of Colorado Boulder

/**
 * View for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BondCharacterNode = require( 'MOLECULE_POLARITY/twoatoms/view/BondCharacterNode' );
  const DiatomicMoleculeNode = require( 'MOLECULE_POLARITY/twoatoms/view/DiatomicMoleculeNode' );
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
  const SurfaceColorKey = require( 'MOLECULE_POLARITY/common/view/SurfaceColorKey' );
  const SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  const SurfaceTypeControl = require( 'MOLECULE_POLARITY/common/view/SurfaceTypeControl' );
  const TwoAtomsViewControls = require( 'MOLECULE_POLARITY/twoatoms/view/TwoAtomsViewControls' );
  const TwoAtomsViewProperties = require( 'MOLECULE_POLARITY/twoatoms/view/TwoAtomsViewProperties' );
  
  // constants
  const PLATE_X_OFFSET = 250; // x offset of E-field plates from molecule's center, determined empirically, see #66

  /**
   * @param {TwoAtomsModel} model
   * @constructor
   */
  function TwoAtomsScreenView( model ) {

    const self = this;

    ScreenView.call( this, MPConstants.SCREEN_VIEW_OPTIONS );

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
    viewProperties.bondDipoleVisibleProperty.link( function( visible ) {
      moleculeNode.setBondDipoleVisible( visible );
    } );

    // unlink not needed
    viewProperties.partialChargesVisibleProperty.link( function( visible ) {
      moleculeNode.setPartialChargesVisible( visible );
    } );

    // unlink not needed
    viewProperties.bondCharacterVisibleProperty.linkAttribute( bondCharacterNode, 'visible' );

    // unlink not needed
    viewProperties.surfaceTypeProperty.link( function( surfaceType ) {
      moleculeNode.setSurfaceType( surfaceType );
      electrostaticPotentialColorKey.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
      electronDensityColorKey.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
    } );
  }

  moleculePolarity.register( 'TwoAtomsScreenView', TwoAtomsScreenView );

  return inherit( ScreenView, TwoAtomsScreenView );
} );