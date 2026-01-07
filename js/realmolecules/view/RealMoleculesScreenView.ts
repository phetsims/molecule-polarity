// Copyright 2014-2025, University of Colorado Boulder

/**
 * View for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import MobiusScreenView from '../../../../mobius/js/MobiusScreenView.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import SceneryEvent from '../../../../scenery/js/input/SceneryEvent.js';
import TInputListener from '../../../../scenery/js/input/TInputListener.js';
import animatedPanZoomSingleton from '../../../../scenery/js/listeners/animatedPanZoomSingleton.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Color from '../../../../scenery/js/util/Color.js';
import ColorProperty from '../../../../scenery/js/util/ColorProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPPreferences from '../../common/model/MPPreferences.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import RealMoleculesModel, { REAL_MOLECULES_CAMERA_POSITION } from '../model/RealMoleculesModel.js';
import ElectronegativityTableNode from './ElectronegativityTableNode.js';
import RealMoleculesColorKeyNode from './RealMoleculesColorKeyNode.js';
import RealMoleculesControl from './RealMoleculesControl.js';
import RealMoleculesControlPanel from './RealMoleculesControlPanel.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import RealMoleculeView from './RealMoleculeView.js';
import TinyEmitter from '../../../../axon/js/TinyEmitter.js';
import MPQueryParameters from '../../common/MPQueryParameters.js';
import HorizontalAquaRadioButtonGroup from '../../../../sun/js/HorizontalAquaRadioButtonGroup.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';

export default class RealMoleculesScreenView extends MobiusScreenView {

  private readonly stepEmitter = new TinyEmitter();
  private readonly moleculeView: RealMoleculeView;

  // scale applied to interaction that isn't directly tied to screen coordinates (rotation)
  private activeScale = 1;

  public constructor( model: RealMoleculesModel, tandem: Tandem ) {
    super( {
      layoutBounds: MPConstants.LAYOUT_BOUNDS,
      tandem: tandem,
      sceneNodeOptions: {
        parentMatrixProperty: animatedPanZoomSingleton.listener.matrixProperty,
        cameraPosition: REAL_MOLECULES_CAMERA_POSITION,

        // Manually tuned constant for placement (for now), since we need this on startup.
        // This will move the "center" of the molecule view down a bit to account for the thicker UI content on the
        // top of the screen.
        viewOffset: new Vector2( -141, 50 ),

        backgroundColorProperty: new ColorProperty( Color.TRANSPARENT )
      }
    } );

    // our target for drags that don't hit other UI components
    const backgroundEventTarget = Rectangle.bounds( this.layoutBounds );
    this.addChild( backgroundEventTarget );

    this.visibleBoundsProperty.link( visibleBounds => {
      backgroundEventTarget.setRectBounds( visibleBounds );

      const sx = visibleBounds.width / this.layoutBounds.width;
      const sy = visibleBounds.height / this.layoutBounds.height;
      if ( sx !== 0 && sy !== 0 ) {
        this.activeScale = sy > sx ? sx : sy;
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

    this.pdomPlayAreaNode.pdomOrder = [
    ];

    this.pdomControlAreaNode.pdomOrder = [
      electronegativityTableNode,
      moleculesComboBox,
      controlPanel,
      colorKeyNode,
      resetAllButton,
      comboBoxListParent
    ];

    // layout ---------------------------------

    // right of viewer
    controlPanel.right = this.layoutBounds.right - 25;
    controlPanel.centerY = this.layoutBounds.centerY;

    const layoutCenter = ( controlPanel.left + this.layoutBounds.left ) / 2;

    // centered above viewer
    electronegativityTableNode.centerX = layoutCenter;
    electronegativityTableNode.top = this.layoutBounds.top + 25;

    // centered below electronegativity table
    colorKeyNode.boundsProperty.link( () => {
      colorKeyNode.centerX = electronegativityTableNode.centerX;
      colorKeyNode.top = electronegativityTableNode.bottom + 15;
    } );

    // centered below viewer
    moleculesComboBox.centerX = layoutCenter;
    moleculesComboBox.bottom = this.layoutBounds.bottom - 15;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;

    if ( MPQueryParameters.debug3DModels ) {
      const createItem = ( value: string, label: string ) => {
        return {
          value: value,
          createNode: () => new Text( label, { fontSize: 16 } )
        };
      };

      const bondDipoleNode = new HBox( {
        spacing: 20,
        children: [
          new Text( 'Bond Dipole Model:', { fontSize: 16 } ),
          new HorizontalAquaRadioButtonGroup( model.bondDipoleModelProperty, [
            createItem( 'electronegativity', 'Electronegativity' ),
            createItem( 'java', 'Java' ),
            createItem( 'mulliken', 'Mulliken' ),
            createItem( 'loewdin', 'Loewdin' ),
            createItem( 'hirschfeld', 'Hirschfeld' ),
            createItem( 'mbis', 'MBIS' ),
            createItem( 'psi4', 'Psi4' )
          ], {
            spacing: 20
          } )
        ]
      } );

      rootNode.addChild( bondDipoleNode );

      bondDipoleNode.top = 1;
      bondDipoleNode.left = 1;

      const fieldNode = new HBox( {
        spacing: 20,
        children: [
          new Text( 'Field Model:', { fontSize: 16 } ),
          new HorizontalAquaRadioButtonGroup( model.fieldModelProperty, [
            createItem( 'java', 'Java' ),
            createItem( 'psi4', 'Psi4' )
          ], { spacing: 20 } )
        ]
      } );

      rootNode.addChild( fieldNode );

      fieldNode.top = bondDipoleNode.bottom + 3;
      fieldNode.left = 1;
    }

    // Camera settings
    this.sceneNode.stage.threeCamera.zoom = 1.7;
    this.sceneNode.stage.threeCamera.updateProjectionMatrix();
    this.sceneNode.stage.threeCamera.up = new THREE.Vector3( 0, 0, -1 );
    this.sceneNode.stage.threeCamera.lookAt( ThreeUtils.vectorToThree( Vector3.ZERO ) );

    // Lights
    const ambientLight = new THREE.AmbientLight( 0x333333, Math.PI );
    this.sceneNode.stage.threeScene.add( ambientLight );
    const sunLight = new THREE.DirectionalLight( 0xffffff, Math.PI );
    sunLight.position.set( -1, 1.5, 0.8 );
    this.sceneNode.stage.threeScene.add( sunLight );
    const moonLight = new THREE.DirectionalLight( 0xffffff, 0.2 * Math.PI );
    moonLight.position.set( 2.0, -1.0, 1.0 );
    this.sceneNode.stage.threeScene.add( moonLight );

    this.moleculeView = new RealMoleculeView(
      model.moleculeProperty,
      model.moleculeQuaternionProperty,
      model.bondDipoleModelProperty,
      model.fieldModelProperty,
      viewProperties,
      this.stepEmitter
    );
    this.sceneNode.stage.threeScene.add( this.moleculeView );

    let isRotating = false;
    const rotateListener: TInputListener = {
      down: ( event: SceneryEvent ) => {
        if ( !event.canStartPress() ) { return; }

        // if we are already rotating the entire molecule, no more drags can be handled
        if ( isRotating ) {
          return;
        }

        const pointer = event.pointer;

        isRotating = true;

        const lastGlobalPoint = pointer.point.copy();

        const onEndDrag = () => {
          if ( isRotating ) {
            isRotating = false;
            pointer.removeInputListener( pointerListener );
            pointer.cursor = null;
          }
        };

        const pointerListener = {
          // end drag on either up or cancel (not supporting full cancel behavior)
          up: onEndDrag,
          cancel: onEndDrag,
          interrupt: onEndDrag,

          move: () => {
            const delta = pointer.point.minus( lastGlobalPoint );
            lastGlobalPoint.set( pointer.point );

            const scale = 0.007 / this.activeScale; // tuned constant for acceptable drag motion
            const newQuaternion = new THREE.Quaternion().setFromEuler( new THREE.Euler( delta.y * scale, delta.x * scale, 0 ) );
            newQuaternion.multiply( model.moleculeQuaternionProperty.value );
            model.moleculeQuaternionProperty.value = newQuaternion;
          }
        };

        pointer.cursor = 'pointer';

        // attach the listener so that it can be interrupted from pan and zoom operations
        pointer.addInputListener( pointerListener, true );
      }
    };
    backgroundEventTarget.addInputListener( rotateListener );
  }

  public override step( dt: number ): void {
    this.stepEmitter.emit();

    super.step( dt );
  }
}

moleculePolarity.register( 'RealMoleculesScreenView', RealMoleculesScreenView );