// Copyright 2014-2017, University of Colorado Boulder

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
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RealMoleculesComboBox = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesComboBox' );
  var RealMoleculesControlPanel = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesControlPanel' );
  var RealMoleculesViewProperties = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesViewProperties' );
  var RealMoleculeViewer = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculeViewer' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SurfaceColorKey = require( 'MOLECULE_POLARITY/common/view/SurfaceColorKey' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var UnderDevelopmentPlane = require( 'MOLECULE_POLARITY/realmolecules/view/UnderDevelopmentPlane' );

  /**
   * @param {TwoAtomsModel} model
   * @constructor
   */
  function RealMoleculesScreenView( model ) {

    ScreenView.call( this, MPConstants.SCREEN_VIEW_OPTIONS );

    // view-specific properties
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
    var controlPanel = new RealMoleculesControlPanel( viewProperties );
    var resetAllButton = new ResetAllButton( {
      listener: function() {
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

    // synchronization with view properties ------------------------------

    // unlink not needed
    viewProperties.atomElectronegativitiesVisibleProperty.link( function( visible ) {
      electronegativityTableNode.visible = visible;
    } );

    // unlink not needed
    viewProperties.surfaceTypeProperty.link( function( surfaceType ) {
      electrostaticPotentialColorKey.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
      electronDensityColorKey.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
    } );

    //TODO Hide everything and show a dialog until this screen is fully implemented, see https://github.com/phetsims/molecule-polarity/issues/15
    this.removeChild( rootNode );
    this.addChild( new UnderDevelopmentPlane( this.layoutBounds ) );
  }

  moleculePolarity.register( 'RealMoleculesScreenView', RealMoleculesScreenView );

  return inherit( ScreenView, RealMoleculesScreenView );
} );