// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PropertySet = require( 'AXON/PropertySet' );
  var RealMoleculesControlPanel = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesControlPanel' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );

  /**
   * @param {TwoAtomsModel} model
   * @constructor
   */
  function RealMoleculesView( model ) {

    var thisView = this;
    ScreenView.call( thisView, { renderer: 'svg' } );

    // view-specific properties
    var viewProperties = new PropertySet( {
      bondDipolesVisible: false,
      molecularDipoleVisible: false,
      partialChargesVisible: false,
      atomElectronegativitiesVisible: false,
      atomLabelsVisible: true,
      surfaceType: SurfaceType.NONE
    } );

    // nodes
    var controlPanel = new RealMoleculesControlPanel( viewProperties );
    var resetAllButton = new ResetAllButton( function() {
      model.reset();
      viewProperties.reset();
    } );

    // Parent for all nodes added to this screen
    var rootNode = new Node( { children: [
      // nodes are rendered in this order
      controlPanel,
      resetAllButton
    ] } );
    thisView.addChild( rootNode );

    // layout
    {
      // right center
      controlPanel.right = this.layoutBounds.right - 50;
      controlPanel.centerY = this.layoutBounds.centerY;

      // bottom-right corner of the screen
      resetAllButton.right = this.layoutBounds.right - 40;
      resetAllButton.bottom = this.layoutBounds.bottom - 20;
    }

    // synchronization with view properties
    {
      viewProperties.bondDipolesVisibleProperty.link( function( visible ) {
        //TODO
//        moleculeNode.setBondDipolesVisible( visible );
      } );

      viewProperties.molecularDipoleVisibleProperty.link( function( visible ) {
        //TODO
//        moleculeNode.setMolecularDipoleVisible( visible );
      } );

      viewProperties.partialChargesVisibleProperty.link( function( visible ) {
        //TODO
//        moleculeNode.setPartialChargesVisible( visible );
      } );

      viewProperties.atomElectronegativitiesVisibleProperty.link( function( visible ) {
        //TODO
//        moleculeNode.setAtomElectronegativitiesVisible( visible );
      } );

      viewProperties.atomLabelsVisibleProperty.link( function( visible ) {
        //TODO
//        moleculeNode.setAtomLabelsVisible( visible );
      } );

      viewProperties.surfaceTypeProperty.link( function( surfaceType ) {
        //TODO
//        moleculeNode.setSurfaceType( surfaceType );
//        electrostaticPotentialColorKey.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL_RWB );
//        electronDensityColorKey.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
      } );
    }
  }

  return inherit( ScreenView, RealMoleculesView, { layoutBounds: MPConstants.LAYOUT_BOUNDS } );
} );