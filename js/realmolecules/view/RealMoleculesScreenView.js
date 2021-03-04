// Copyright 2014-2021, University of Colorado Boulder

/**
 * View for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import SurfaceColor from '../../common/model/SurfaceColor.js';
import SurfaceType from '../../common/model/SurfaceType.js';
import MPColors from '../../common/MPColors.js';
import MPConstants from '../../common/MPConstants.js';
import MPQueryParameters from '../../common/MPQueryParameters.js';
import SurfaceColorKey from '../../common/view/SurfaceColorKey.js';
import moleculePolarity from '../../moleculePolarity.js';
import RealMoleculesModel from '../model/RealMoleculesModel.js';
import ElectronegativityTableNode from './ElectronegativityTableNode.js';
import RealMoleculesComboBox from './RealMoleculesComboBox.js';
import RealMoleculesControlPanel from './RealMoleculesControlPanel.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import RealMoleculeViewer from './RealMoleculeViewer.js';
import UnderDevelopmentPlane from './UnderDevelopmentPlane.js';

class RealMoleculesScreenView extends ScreenView {

  /**
   * @param {RealMoleculesModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {
    assert && assert( model instanceof RealMoleculesModel, 'invalid model' );

    options = merge( {
      tandem: Tandem.REQUIRED
    }, MPConstants.SCREEN_VIEW_OPTIONS, options );

    super( options );

    // view-specific Properties
    const viewProperties = new RealMoleculesViewProperties( {
      tandem: options.tandem.createTandem( 'viewProperties' )
    } );

    // @private
    this.moleculeViewer = new RealMoleculeViewer( model.moleculeProperty, viewProperties, {
      viewerFill: MPColors.SCREEN_BACKGROUND,
      viewerSize: new Dimension2( 450, 450 ),
      tandem: options.tandem.createTandem( 'moleculeViewer' )
    } );

    const electronegativityTableNode = new ElectronegativityTableNode( this.moleculeViewer, {
      visibleProperty: viewProperties.atomElectronegativitiesVisibleProperty,
      tandem: options.tandem.createTandem( 'electronegativityTableNode' )
    } );

    const comboBoxListParent = new Node();
    const moleculesComboBox = new RealMoleculesComboBox( model.molecules, model.moleculeProperty, comboBoxListParent, {
      tandem: options.tandem.createTandem( 'moleculesComboBox' )
    } );

    const electrostaticPotentialRWBColorKey = SurfaceColorKey.createElectrostaticPotentialRWBColorKey();
    const electrostaticPotentialROYGBColorKey = SurfaceColorKey.createElectrostaticPotentialROYGBColorKey();
    const electrostaticPotentialColorKeyParent = new Node( {
      children: [
        electrostaticPotentialRWBColorKey,
        electrostaticPotentialROYGBColorKey
      ],
      tandem: options.tandem.createTandem( 'electrostaticPotentialColorKey' )
    } );

    // unlink not needed
    MPConstants.GLOBAL_OPTIONS.electrostaticPotentialSurfaceColorProperty.link( surfaceColor => {
      electrostaticPotentialRWBColorKey.visible = ( surfaceColor === SurfaceColor.RWB );
      electrostaticPotentialROYGBColorKey.visible = ( surfaceColor === SurfaceColor.ROYGB );
    } );

    const electronDensityColorKey = SurfaceColorKey.createElectronDensityColorKey( {
      tandem: options.tandem.createTandem( 'electronDensityColorKey' )
    } );

    const controlPanel = new RealMoleculesControlPanel( viewProperties, {
      tandem: options.tandem.createTandem( 'controlPanel' )
    } );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput();
        model.reset();
        viewProperties.reset();
      },
      scale: 1.32,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    // Parent for all nodes added to this screen
    const rootNode = new Node( {
      children: [
        this.moleculeViewer,
        electronegativityTableNode,
        moleculesComboBox,
        controlPanel,
        electrostaticPotentialColorKeyParent,
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
    electrostaticPotentialColorKeyParent.centerX = electronDensityColorKey.centerX = electronegativityTableNode.centerX;
    electrostaticPotentialColorKeyParent.top = electronDensityColorKey.top = electronegativityTableNode.bottom + 15;

    // below color keys
    this.moleculeViewer.top = electrostaticPotentialColorKeyParent.bottom + 15;

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
    viewProperties.surfaceTypeProperty.link( surfaceType => {
      electrostaticPotentialColorKeyParent.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
      electronDensityColorKey.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
    } );

    //TODO see https://github.com/phetsims/molecule-polarity/issues/32
    // Until the Real Molecules screen is fully implemented, hide everything that was created above, and display
    // a message. We're continuing to create everything to reduce the possibility that regressions creep in.
    if ( !MPQueryParameters.realMolecules ) {
      rootNode.visible = false;
      this.addChild( new UnderDevelopmentPlane( this.layoutBounds ) );
    }
  }
}

moleculePolarity.register( 'RealMoleculesScreenView', RealMoleculesScreenView );

export default RealMoleculesScreenView;