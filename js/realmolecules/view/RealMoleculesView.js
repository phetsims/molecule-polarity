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
  var JSmolProperties = require( 'MOLECULE_POLARITY/realmolecules/view/JSmolProperties' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RealMoleculesComboBox = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesComboBox' );
  var RealMoleculesControlPanel = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesControlPanel' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
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
    var jsmolProperties = new JSmolProperties();

    // nodes
    var viewerNode = new JSmolViewerNode( model.moleculeProperty, jsmolProperties, {
      backgroundColor: MPColors.SCREEN_BACKGROUND,
      viewerSize: new Dimension2( 450, 450 )
    } );
    var electronegativityTableNode = new ElectronegativityTableNode( viewerNode );
    var comboBoxListParent = new Node();
    var moleculesComboBox = new RealMoleculesComboBox( model.molecules, model.moleculeProperty, comboBoxListParent );
    var electrostaticPotentialRWBColorKey = SurfaceColorKey.createElectrostaticPotentialRWBColorKey();
    var electrostaticPotentialROYGBColorKey = SurfaceColorKey.createElectrostaticPotentialROYGBColorKey();
    var electronDensityColorKey = SurfaceColorKey.createElectronDensityColorKey();
    var controlPanel = new RealMoleculesControlPanel( jsmolProperties );
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        jsmolProperties.reset();
      },
      scale: 1.32
    } );

    // Parent for all nodes added to this screen
    var rootNode = new Node( { children: [
      // nodes are rendered in this order
      viewerNode,
      electronegativityTableNode,
      moleculesComboBox,
      controlPanel,
      electrostaticPotentialRWBColorKey,
      electrostaticPotentialROYGBColorKey,
      electronDensityColorKey,
      resetAllButton,
      comboBoxListParent // last, so that combo box list is on top
    ] } );
    thisView.addChild( rootNode );

    // layout ---------------------------------

    viewerNode.left = 75;

    // centered above viewer
    electronegativityTableNode.centerX = viewerNode.centerX;
    electronegativityTableNode.top = this.layoutBounds.top + 25;

    // centered below electronegativity table
    electrostaticPotentialRWBColorKey.centerX = electrostaticPotentialROYGBColorKey.centerX = electronDensityColorKey.centerX = electronegativityTableNode.centerX;
    electrostaticPotentialRWBColorKey.top = electrostaticPotentialROYGBColorKey.top = electronDensityColorKey.top = electronegativityTableNode.bottom + 15;

    // below color keys
    viewerNode.top = electrostaticPotentialRWBColorKey.bottom + 15;

    // centered below viewer
    moleculesComboBox.centerX = viewerNode.centerX;
    moleculesComboBox.top = viewerNode.bottom + 15;

    // right of viewer
    controlPanel.left = viewerNode.right + 100;
    controlPanel.centerY = this.layoutBounds.centerY;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;

    // synchronization with view properties ------------------------------

    jsmolProperties.atomElectronegativitiesVisibleProperty.link( function( visible ) {
      electronegativityTableNode.visible = visible;
    } );

    jsmolProperties.surfaceTypeProperty.link( function( surfaceType ) {
      electrostaticPotentialRWBColorKey.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL_RWB );
      electrostaticPotentialROYGBColorKey.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL_ROYGB );
      electronDensityColorKey.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
    } );
  }

  return inherit( ScreenView, RealMoleculesView );
} );