// Copyright 2014-2020, University of Colorado Boulder

/**
 * View for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import inherit from '../../../../phet-core/js/inherit.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import MPColors from '../../common/MPColors.js';
import MPConstants from '../../common/MPConstants.js';
import MPQueryParameters from '../../common/MPQueryParameters.js';
import MPControlPanel from '../../common/view/MPControlPanel.js';
import SurfaceColorKey from '../../common/view/SurfaceColorKey.js';
import SurfaceType from '../../common/view/SurfaceType.js';
import SurfaceTypeControl from '../../common/view/SurfaceTypeControl.js';
import moleculePolarity from '../../moleculePolarity.js';
import ElectronegativityTableNode from './ElectronegativityTableNode.js';
import RealMoleculesComboBox from './RealMoleculesComboBox.js';
import RealMoleculesViewControls from './RealMoleculesViewControls.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import RealMoleculeViewer from './RealMoleculeViewer.js';
import UnderDevelopmentPlane from './UnderDevelopmentPlane.js';

/**
 * @param {TwoAtomsModel} model
 * @constructor
 */
function RealMoleculesScreenView( model ) {

  ScreenView.call( this, MPConstants.SCREEN_VIEW_OPTIONS );

  //TODO Hide everything and show a dialog until Real Molecules screen is fully implemented, see https://github.com/phetsims/molecule-polarity/issues/32
  if ( !MPQueryParameters.realMolecules ) {
    this.addChild( new UnderDevelopmentPlane( this.layoutBounds ) );
  }
  else {

    const self = this;

    // view-specific Properties
    const viewProperties = new RealMoleculesViewProperties();

    // @private
    this.moleculeViewer = new RealMoleculeViewer( model.moleculeProperty, viewProperties, {
      viewerFill: MPColors.SCREEN_BACKGROUND,
      viewerSize: new Dimension2( 450, 450 )
    } );

    const electronegativityTableNode = new ElectronegativityTableNode( this.moleculeViewer );
    const comboBoxListParent = new Node();
    const moleculesComboBox = new RealMoleculesComboBox( model.molecules, model.moleculeProperty, comboBoxListParent );

    const electrostaticPotentialColorKey = new Node();

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

    const electronDensityColorKey = SurfaceColorKey.createElectronDensityColorKey();

    const controlPanel = new MPControlPanel( [
      new RealMoleculesViewControls( viewProperties ),
      new SurfaceTypeControl( viewProperties.surfaceTypeProperty )
    ] );

    const resetAllButton = new ResetAllButton( {
      listener: function() {
        self.interruptSubtreeInput();
        model.reset();
        viewProperties.reset();
      },
      scale: 1.32
    } );

    // Parent for all nodes added to this screen
    const rootNode = new Node( {
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

inherit( ScreenView, RealMoleculesScreenView );
export default RealMoleculesScreenView;