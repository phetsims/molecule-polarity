// Copyright 2014-2017, University of Colorado Boulder

/**
 * View for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const ElectronegativityTableNode = require( 'MOLECULE_POLARITY/realmolecules/view/ElectronegativityTableNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const MPControlPanel = require( 'MOLECULE_POLARITY/common/view/MPControlPanel' );
  const MPQueryParameters = require( 'MOLECULE_POLARITY/common/MPQueryParameters' );
  const Node = require( 'SCENERY/nodes/Node' );
  const RealMoleculesComboBox = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesComboBox' );
  const RealMoleculesViewControls = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesViewControls' );
  const RealMoleculesViewProperties = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesViewProperties' );
  const RealMoleculeViewer = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculeViewer' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const SurfaceColorKey = require( 'MOLECULE_POLARITY/common/view/SurfaceColorKey' );
  const SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  const SurfaceTypeControl = require( 'MOLECULE_POLARITY/common/view/SurfaceTypeControl' );
  const UnderDevelopmentPlane = require( 'MOLECULE_POLARITY/realmolecules/view/UnderDevelopmentPlane' );

  /**
   * @param {TwoAtomsModel} model
   * @constructor
   */
  function RealMoleculesScreenView( model ) {

    ScreenView.call( this, MPConstants.SCREEN_VIEW_OPTIONS );

    //TODO Hide everything and show a dialog until Real Molecules screen is fully implemented, see #32
    if ( !MPQueryParameters.realMolecules ) {
      this.addChild( new UnderDevelopmentPlane( this.layoutBounds ) );
    }
    else {

      var self = this;

      // view-specific Properties
      var viewProperties = new RealMoleculesViewProperties();

      // @private
      this.moleculeViewer = new RealMoleculeViewer( model.moleculeProperty, viewProperties, {
        viewerFill: MPColors.SCREEN_BACKGROUND,
        viewerSize: new Dimension2( 450, 450 )
      } );

      var electronegativityTableNode = new ElectronegativityTableNode( this.moleculeViewer );
      var comboBoxListParent = new Node();
      var moleculesComboBox = new RealMoleculesComboBox( model.molecules, model.moleculeProperty, comboBoxListParent );

      var electrostaticPotentialColorKey = new Node();

      // unlink not needed
      MPConstants.GLOBAL_OPTIONS.surfaceColorProperty.link( function( surfaceType ) {
        electrostaticPotentialColorKey.removeAllChildren();
        if ( surfaceType === 'RWB' ) {
          electrostaticPotentialColorKey.addChild( SurfaceColorKey.createElectrostaticPotentialRWBColorKey() );
        }
        else {
          electrostaticPotentialColorKey.addChild( SurfaceColorKey.createElectrostaticPotentialROYGBColorKey() );
        }
      } );

      var electronDensityColorKey = SurfaceColorKey.createElectronDensityColorKey();

      var controlPanel = new MPControlPanel( [
        new RealMoleculesViewControls( viewProperties ),
        new SurfaceTypeControl( viewProperties.surfaceTypeProperty )
      ] );

      var resetAllButton = new ResetAllButton( {
        listener: function() {
          self.interruptSubtreeInput();
          model.reset();
          viewProperties.reset();
        },
        scale: 1.32
      } );

      // Parent for all nodes added to this screen
      var rootNode = new Node( {
        children: [
          this.moleculeViewer,
          electronegativityTableNode,
          moleculesComboBox,
          controlPanel,
          electrostaticPotentialColorKey,
          electronDensityColorKey,
          resetAllButton,
          comboBoxListParent // last, so that combo box list is on top
        ]
      } );
      this.addChild( rootNode );

      // layout ---------------------------------

      this.moleculeViewer.left = 100;

      // centered above viewer
      electronegativityTableNode.centerX = this.moleculeViewer.centerX;
      electronegativityTableNode.top = this.layoutBounds.top + 25;

      // centered below electronegativity table
      electrostaticPotentialColorKey.centerX = electronDensityColorKey.centerX = electronegativityTableNode.centerX;
      electrostaticPotentialColorKey.top = electronDensityColorKey.top = electronegativityTableNode.bottom + 15;

      // below color keys
      this.moleculeViewer.top = electrostaticPotentialColorKey.bottom + 15;

      // centered below viewer
      moleculesComboBox.centerX = this.moleculeViewer.centerX;
      moleculesComboBox.top = this.moleculeViewer.bottom + 15;

      // right of viewer
      controlPanel.left = this.moleculeViewer.right + 100;
      controlPanel.centerY = this.layoutBounds.centerY;

      // bottom-right corner of the screen
      resetAllButton.right = this.layoutBounds.right - 40;
      resetAllButton.bottom = this.layoutBounds.bottom - 20;

      // synchronization with view Properties ------------------------------

      // unlink not needed
      viewProperties.atomElectronegativitiesVisibleProperty.link( function( visible ) {
        electronegativityTableNode.visible = visible;
      } );

      // unlink not needed
      viewProperties.surfaceTypeProperty.link( function( surfaceType ) {
        electrostaticPotentialColorKey.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
        electronDensityColorKey.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
      } );
    }
  }

  moleculePolarity.register( 'RealMoleculesScreenView', RealMoleculesScreenView );

  return inherit( ScreenView, RealMoleculesScreenView );
} );