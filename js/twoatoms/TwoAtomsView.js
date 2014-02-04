// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var BondCharacterNode = require( 'MOLECULE_POLARITY/common/view/BondCharacterNode' );
  var DiatomicMoleculeNode = require( 'MOLECULE_POLARITY/common/view/DiatomicMoleculeNode' );
  var EFieldControls = require( 'MOLECULE_POLARITY/common/view/EFieldControls' );
  var ElectronDensityColorKey = require( 'MOLECULE_POLARITY/common/view/ElectronDensityColorKey' );
  var ElectronegativityControl = require( 'MOLECULE_POLARITY/common/view/ElectronegativityControl' );
  var ElectrostaticPotentialColorKey = require( 'MOLECULE_POLARITY/common/view/ElectrostaticPotentialColorKey' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var MPViewProperties = require( 'MOLECULE_POLARITY/common/view/MPViewProperties' );
  var NegativePlateNode = require( 'MOLECULE_POLARITY/common/view/NegativePlateNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PositivePlateNode = require( 'MOLECULE_POLARITY/common/view/PositivePlateNode' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SurfaceControls = require( 'MOLECULE_POLARITY/common/view/SurfaceControls' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var ViewControls = require( 'MOLECULE_POLARITY/common/view/ViewControls' );

  /**
   * @param {TwoAtomsModel} model
   * @constructor
   */
  function TwoAtomsView( model ) {

    var thisView = this;
    ScreenView.call( thisView, { renderer: 'svg' } );

    // view-specific properties
    var viewProperties = new MPViewProperties( { bondDipolesVisible: true } );

    // nodes
    var moleculeNode = new DiatomicMoleculeNode( model.molecule );
    var negativePlateNode = new NegativePlateNode( model.eField );
    var positivePlateNode = new PositivePlateNode( model.eField );
    var enControlA = new ElectronegativityControl( model.molecule.atomA, model.molecule, MPConstants.ELECTRONEGATIVITY_RANGE, MPConstants.ELECTRONEGATIVITY_SNAP_INTERVAL );
    var enControlB = new ElectronegativityControl( model.molecule.atomB, model.molecule, MPConstants.ELECTRONEGATIVITY_RANGE, MPConstants.ELECTRONEGATIVITY_SNAP_INTERVAL );
    var bondTypeNode = new BondCharacterNode( model.molecule );
    var electrostaticPotentialColorKey = new ElectrostaticPotentialColorKey();
    var electronDensityColorKey = new ElectronDensityColorKey();
    var resetAllButton = new ResetAllButton( function() {
      model.reset();
      viewProperties.reset();
    } );

    // control panels
    var viewControls = new ViewControls( viewProperties.bondDipolesVisibleProperty, viewProperties.partialChargesVisibleProperty, viewProperties.bondCharacterVisibleProperty );
    var surfaceControls = new SurfaceControls( viewProperties.surfaceTypeProperty );
    var eFieldControls = new EFieldControls( model.eField );

    // Parent for all nodes added to this screen
    var rootNode = new Node( { children: [
      // nodes are rendered in this order
      negativePlateNode,
      positivePlateNode,
      enControlA,
      enControlB,
      viewControls,
      surfaceControls,
      eFieldControls,
      bondTypeNode,
      electrostaticPotentialColorKey,
      electronDensityColorKey,
      moleculeNode,
      resetAllButton
    ] } );
    thisView.addChild( rootNode );

    // layout, based on molecule location
    {
      var moleculeX = model.molecule.location.x;
      var moleculeY = model.molecule.location.y;
      var plateXOffset = 250; // x offset from molecule

      // molecule
      moleculeNode.x = moleculeX;
      moleculeNode.y = moleculeY;

      // to left of molecule, vertically centered
      negativePlateNode.right = moleculeX - plateXOffset;
      negativePlateNode.centerY = moleculeY;

      // to right of molecule, vertically centered
      positivePlateNode.left = moleculeX + plateXOffset;
      positivePlateNode.centerY = moleculeY;

      // centered above molecule
      enControlA.right = moleculeX - 5;
      enControlB.left = moleculeX + 5;
      enControlA.top = enControlB.top = 30;

      // centered below molecule
      electrostaticPotentialColorKey.centerX = electronDensityColorKey.centerX = moleculeX;
      electrostaticPotentialColorKey.top = electronDensityColorKey.top = negativePlateNode.bottom - 10;

      // centered below EN controls
      bondTypeNode.centerX = moleculeX;
      bondTypeNode.top = enControlA.bottom + 10;

      // to right of positive plate, top aligned
      viewControls.top = positivePlateNode.y;
      viewControls.left = positivePlateNode.right + 40;
      surfaceControls.left = viewControls.left;
      surfaceControls.top = viewControls.bottom + 10;
      eFieldControls.left = surfaceControls.left;
      eFieldControls.top = surfaceControls.bottom + 10;

      // bottom-right corner of the screen
      resetAllButton.right = this.layoutBounds.right - 40;
      resetAllButton.bottom = this.layoutBounds.bottom - 20;
    }

    // synchronization with view properties
    {
      viewProperties.bondDipolesVisibleProperty.link( function( visible ) {
        moleculeNode.setBondDipoleVisible( visible );
      } );

      viewProperties.partialChargesVisibleProperty.link( function( visible ) {
        moleculeNode.setPartialChargesVisible( visible );
      } );

      viewProperties.bondCharacterVisibleProperty.linkAttribute( bondTypeNode, 'visible' );

      viewProperties.surfaceTypeProperty.link( function( surfaceType ) {
        moleculeNode.setSurfaceType( surfaceType );
        electrostaticPotentialColorKey.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
        electronDensityColorKey.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
      } );
    }

    //XXX test code, delete me
    var AtomNode = require( 'MOLECULE_POLARITY/common/view/AtomNode' );
    var BondNode = require( 'MOLECULE_POLARITY/common/view/BondNode' );
    rootNode.addChild( new BondNode( model.molecule.bond ) );
    rootNode.addChild( new AtomNode( model.molecule.atomA ) );
    rootNode.addChild( new AtomNode( model.molecule.atomB ) );
  }

  return inherit( ScreenView, TwoAtomsView, { layoutBounds: MPConstants.LAYOUT_BOUNDS } );
} );