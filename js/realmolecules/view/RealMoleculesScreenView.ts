// Copyright 2014-2025, University of Colorado Boulder

/**
 * View for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPPreferences from '../../common/model/MPPreferences.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import RealMoleculesModel from '../model/RealMoleculesModel.js';
import ElectronegativityTableNode from './ElectronegativityTableNode.js';
import RealMoleculesColorKeyNode from './RealMoleculesColorKeyNode.js';
import RealMoleculesControl from './RealMoleculesControl.js';
import RealMoleculesControlPanel from './RealMoleculesControlPanel.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import MobiusScreenView from '../../../../mobius/js/MobiusScreenView.js';
import animatedPanZoomSingleton from '../../../../scenery/js/listeners/animatedPanZoomSingleton.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ColorProperty from '../../../../scenery/js/util/ColorProperty.js';
import Color from '../../../../scenery/js/util/Color.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';

export default class RealMoleculesScreenView extends MobiusScreenView {

  public constructor( model: RealMoleculesModel, tandem: Tandem ) {
    super( {
      layoutBounds: MPConstants.LAYOUT_BOUNDS,
      tandem: tandem,
      sceneNodeOptions: {
        parentMatrixProperty: animatedPanZoomSingleton.listener.matrixProperty,
        cameraPosition: new Vector3( 0, 0.2, 2 ),
        viewOffset: new Vector2( 0, 0 ),
        backgroundColorProperty: new ColorProperty( Color.TRANSPARENT )
      }
    } );

    // view-specific Properties
    const viewProperties = new RealMoleculesViewProperties( {
      tandem: tandem.createTandem( 'viewProperties' )
    } );

    const electronegativityTableNode = new ElectronegativityTableNode( model.moleculeProperty, {
      visibleProperty: viewProperties.atomElectronegativitiesVisibleProperty,
      tandem: tandem.createTandem( 'electronegativityTableNode' )
    } );

    const comboBoxListParent = new Node();
    const moleculesComboBox = new RealMoleculesControl( model.moleculeProperty, model.molecules, comboBoxListParent, {
      comboBoxOptions: {
        tandem: tandem.createTandem( 'moleculesComboBox' )
      }
    } );

    const colorKeyNode = new RealMoleculesColorKeyNode( viewProperties.surfaceTypeProperty,
      MPPreferences.surfaceColorProperty, tandem.createTandem( 'colorKeyNode' ) );

    const controlPanel = new RealMoleculesControlPanel( viewProperties, {
      tandem: tandem.createTandem( 'controlPanel' )
    } );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        viewProperties.reset();
      },
      scale: 1.32,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    // Parent for all nodes added to this screen
    const rootNode = new Node( {
      children: [
        electronegativityTableNode,
        moleculesComboBox,
        controlPanel,
        colorKeyNode,
        resetAllButton,
        comboBoxListParent // last, so that combo box list is on top
      ]
    } );
    this.addChild( rootNode );

    // layout ---------------------------------

    // centered above viewer
    electronegativityTableNode.centerX = this.layoutBounds.centerX;
    electronegativityTableNode.top = this.layoutBounds.top + 25;

    // centered below electronegativity table
    colorKeyNode.boundsProperty.link( () => {
      colorKeyNode.centerX = electronegativityTableNode.centerX;
      colorKeyNode.top = electronegativityTableNode.bottom + 15;
    } );

    // centered below viewer
    moleculesComboBox.centerX = this.layoutBounds.centerX;
    moleculesComboBox.bottom = this.layoutBounds.bottom - 15;

    // right of viewer
    controlPanel.right = this.layoutBounds.right - 25;
    controlPanel.centerY = this.layoutBounds.centerY;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;

    // Camera settings
    this.sceneNode.stage.threeCamera.zoom = 1.7;
    this.sceneNode.stage.threeCamera.updateProjectionMatrix();
    this.sceneNode.stage.threeCamera.up = new THREE.Vector3( 0, 0, -1 );
    this.sceneNode.stage.threeCamera.lookAt( ThreeUtils.vectorToThree( Vector3.ZERO ) );

    // Lights
    const ambientLight = new THREE.AmbientLight( 0x333333 );
    this.sceneNode.stage.threeScene.add( ambientLight );
    const sunLight = new THREE.DirectionalLight( 0xffffff, 1 );
    sunLight.position.set( -1, 1.5, 0.8 );
    this.sceneNode.stage.threeScene.add( sunLight );
    const moonLight = new THREE.DirectionalLight( 0xffffff, 0.2 );
    moonLight.position.set( 2.0, -1.0, 1.0 );
    this.sceneNode.stage.threeScene.add( moonLight );

    const cubeGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    const cubeMaterial = new THREE.MeshLambertMaterial( {
      color: 0xFF0000
    } );

    // Create a mesh with the geometry and material
    const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial );
    this.sceneNode.stage.threeScene.add( cubeMesh );
  }
}

moleculePolarity.register( 'RealMoleculesScreenView', RealMoleculesScreenView );