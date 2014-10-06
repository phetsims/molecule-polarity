// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var ElectronegativityTableNode = require( 'MOLECULE_POLARITY/realmolecules/view/ElectronegativityTableNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var JSmolViewerNode = require( 'MOLECULE_POLARITY/realmolecules/view/JSmolViewerNode' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var MPQueryParameters = require( 'MOLECULE_POLARITY/common/MPQueryParameters' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PropertySet = require( 'AXON/PropertySet' );
  var RealMoleculesComboBox = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesComboBox' );
  var RealMoleculesControlPanel = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesControlPanel' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SurfaceColorKey = require( 'MOLECULE_POLARITY/common/view/SurfaceColorKey' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );

  /**
   * @param {TwoAtomsModel} model
   * @constructor
   */
  function RealMoleculesView( model ) {

    var thisView = this;
    ScreenView.call( thisView, MPConstants.SCREEN_VIEW_OPTIONS );

    // view-specific properties
    var viewProperties = new PropertySet( {
      bondDipolesVisible: false,
      molecularDipoleVisible: false,
      partialChargesVisible: false,
      atomElectronegativitiesVisible: false,
      atomLabelsVisible: true,
      surfaceType: SurfaceType.NONE
    } );

    // @private
    this.jsmolViewerNode = new JSmolViewerNode( model.moleculeProperty, viewProperties, {
      viewerFill: MPColors.SCREEN_BACKGROUND,
      viewerSize: new Dimension2( 450, 450 )
    } );

    var electronegativityTableNode = new ElectronegativityTableNode( this.jsmolViewerNode );
    var comboBoxListParent = new Node();
    var moleculesComboBox = new RealMoleculesComboBox( model.molecules, model.moleculeProperty, comboBoxListParent );
    var electrostaticPotentialColorKey = MPQueryParameters.SURFACE_COLOR === 'ROYGB' ? SurfaceColorKey.createElectrostaticPotentialROYGBColorKey() : SurfaceColorKey.createElectrostaticPotentialRWBColorKey();
    var electronDensityColorKey = SurfaceColorKey.createElectronDensityColorKey();
    var controlPanel = new RealMoleculesControlPanel( viewProperties );
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      scale: 1.32
    } );

    // Parent for all nodes added to this screen
    var rootNode = new Node( { children: [
      // nodes are rendered in this order
      this.jsmolViewerNode,
      electronegativityTableNode,
      moleculesComboBox,
      controlPanel,
      electrostaticPotentialColorKey,
      electronDensityColorKey,
      resetAllButton,
      comboBoxListParent // last, so that combo box list is on top
    ] } );
    thisView.addChild( rootNode );

    // layout ---------------------------------

    this.jsmolViewerNode.left = 75;

    // centered above viewer
    electronegativityTableNode.centerX = this.jsmolViewerNode.centerX;
    electronegativityTableNode.top = this.layoutBounds.top + 25;

    // centered below electronegativity table
    electrostaticPotentialColorKey.centerX = electronDensityColorKey.centerX = electronegativityTableNode.centerX;
    electrostaticPotentialColorKey.top = electronDensityColorKey.top = electronegativityTableNode.bottom + 15;

    // below color keys
    this.jsmolViewerNode.top = electrostaticPotentialColorKey.bottom + 15;

    // centered below viewer
    moleculesComboBox.centerX = this.jsmolViewerNode.centerX;
    moleculesComboBox.top = this.jsmolViewerNode.bottom + 15;

    // right of viewer
    controlPanel.left = this.jsmolViewerNode.right + 100;
    controlPanel.centerY = this.layoutBounds.centerY;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;

    // synchronization with view properties ------------------------------

    viewProperties.atomElectronegativitiesVisibleProperty.link( function( visible ) {
      electronegativityTableNode.visible = visible;
    } );

    viewProperties.surfaceTypeProperty.link( function( surfaceType ) {
      electrostaticPotentialColorKey.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
      electronDensityColorKey.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
    } );
  }

  return inherit( ScreenView, RealMoleculesView );
} );