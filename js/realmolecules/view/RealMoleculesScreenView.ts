// Copyright 2014-2026, University of Colorado Boulder

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
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
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
import HighlightPath from '../../../../scenery/js/accessibility/HighlightPath.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import SoundKeyboardDragListener from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import MPColors from '../../common/MPColors.js';
import Property from '../../../../axon/js/Property.js';
import Color from '../../../../scenery/js/util/Color.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';

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

        // Convert the background color into linear sRGB so that it will render fully correctly!
        // backgroundColorProperty: new DerivedProperty( [ MPColors.screenBackgroundColorProperty ], colorToLinear )
        // NOTE: Using TRANSPARENT for now due to needing to apply the background AFTER the outline pass.
        backgroundColorProperty: new Property( Color.TRANSPARENT )
      }
    } );

    const moleculeNodeTandem = tandem.createTandem( 'moleculeNode' );

    // Our "fake" Node for the molecule, for target for drags that don't hit other UI components (and keyboard drag)
    const moleculeNode = new ( InteractiveHighlighting( Rectangle ) )( combineOptions<NodeOptions>( {}, AccessibleDraggableOptions, {
      focusable: true,
      tagName: 'div',
      focusHighlight: 'invisible',
      tandem: moleculeNodeTandem
    } ) );
    this.addChild( moleculeNode );

    this.visibleBoundsProperty.link( visibleBounds => {
      moleculeNode.setRectBounds( visibleBounds );

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

    const keyboardDragListener = new SoundKeyboardDragListener( {
      moveOnHoldDelay: 0,
      moveOnHoldInterval: 20,
      drag: ( event, listener ) => {
        const scale = 0.005;
        const newQuaternion = new THREE.Quaternion().setFromEuler( new THREE.Euler( listener.modelDelta.y * scale, listener.modelDelta.x * scale, 0 ) );
        newQuaternion.multiply( model.moleculeQuaternionProperty.value );
        model.moleculeQuaternionProperty.value = newQuaternion;
      },
      tandem: moleculeNodeTandem.createTandem( 'keyboardDragListener' )
    } );
    moleculeNode.addInputListener( keyboardDragListener );

    this.pdomPlayAreaNode.pdomOrder = [
      moleculeNode
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
    const ambientLight = new THREE.AmbientLight();
    this.sceneNode.stage.threeScene.add( ambientLight );
    const sunLight = new THREE.DirectionalLight();
    sunLight.position.set( -1, 1.5, 0.8 );
    this.sceneNode.stage.threeScene.add( sunLight );
    const moonLight = new THREE.DirectionalLight();
    moonLight.position.set( 2.0, -1.0, 1.0 );
    this.sceneNode.stage.threeScene.add( moonLight );

    MPColors.ambientLightProperty.link( color => {
      ambientLight.color = ThreeUtils.colorToThree( color );
      ambientLight.intensity = 2 * Math.PI * color.alpha;
    } );
    MPColors.sunLightProperty.link( color => {
      sunLight.color = ThreeUtils.colorToThree( color );
      sunLight.intensity = 2 * Math.PI * color.alpha;
    } );
    MPColors.moonLightProperty.link( color => {
      moonLight.color = ThreeUtils.colorToThree( color );
      moonLight.intensity = 2 * Math.PI * color.alpha;
    } );

    this.moleculeView = new RealMoleculeView(
      model.moleculeProperty,
      model.moleculeQuaternionProperty,
      model.bondDipoleModelProperty,
      model.fieldModelProperty,
      viewProperties,
      this.stepEmitter
    );
    this.sceneNode.stage.threeScene.add( this.moleculeView );

    if ( this.sceneNode.stage.threeRenderer && MPQueryParameters.focusHighlight3D ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - FROM three-r160-addon-outlinepass
      const EffectComposer = window.ThreeEffectComposer;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - FROM three-r160-addon-outlinepass
      const OutlinePass = window.ThreeOutlinePass;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - FROM three-r160-addon-outlinepass
      const RenderPass = window.ThreeRenderPass;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - FROM three-r160-addon-outlinepass
      const OutputPass = window.ThreeOutputPass;

      const composer = new EffectComposer( this.sceneNode.stage.threeRenderer );
      composer.renderToScreen = true;

      const renderPass = new RenderPass( this.sceneNode.stage.threeScene, this.sceneNode.stage.threeCamera );
      composer.addPass( renderPass );

      const outlinePass = new OutlinePass(
        // eslint-disable-next-line phet/bad-sim-text
        new THREE.Vector2( window.innerWidth, window.innerHeight ),
        this.sceneNode.stage.threeScene,
        this.sceneNode.stage.threeCamera
      );
      composer.addPass( outlinePass );

      const backgroundCompositePass = new BackgroundCompositePass( ThreeUtils.colorToThree( MPColors.screenBackgroundColorProperty.value ) );
      composer.addPass( backgroundCompositePass );

      MPColors.screenBackgroundColorProperty.link( color => {
        backgroundCompositePass.setBackgroundColor( ThreeUtils.colorToThree( color ) );
      } );

      const outputPass = new OutputPass();
      composer.addPass( outputPass );

      outlinePass.edgeStrength = 8.0;
      outlinePass.edgeGlow = 1.0;
      outlinePass.edgeThickness = 3.0;
      outlinePass.visibleEdgeColor.set( ThreeUtils.colorToThree( HighlightPath.OUTER_FOCUS_COLOR ) );
      outlinePass.hiddenEdgeColor.set( 0x190a05 );

      let lastWidth = 0;
      let lastHeight = 0;

      const resize = () => {
        const width = this.sceneNode.stage.width;
        const height = this.sceneNode.stage.height;

        if ( lastWidth === width && lastHeight === height ) {
          return;
        }

        outlinePass.setSize( width, height );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error - FROM three-r160-addon-postprocessing
        backgroundCompositePass.setSize( width, height );
        outputPass.setSize( width, height );
        composer.setSize( width, height );
        lastWidth = width;
        lastHeight = height;
      };

      this.sceneNode.stage.render = ( target: THREE.WebGLRenderTarget | undefined, autoClear = false ) => {
        this.sceneNode.stage.threeRenderer!.setRenderTarget( target || null );

        outlinePass.selectedObjects = ( moleculeNode.isFocused() || moleculeNode.isInteractiveHighlightActiveProperty.value ) ? [ this.moleculeView ] : [];

        if ( target ) {
          // For now, pretend like we don't have a composer
          this.sceneNode.stage.threeRenderer!.render( this.sceneNode.stage.threeScene, this.sceneNode.stage.threeCamera );
          this.sceneNode.stage.threeRenderer!.autoClear = autoClear;
        }
        else {
          resize();
          composer.render();
        }
      };
    }

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
    moleculeNode.addInputListener( rotateListener );
  }

  public override step( dt: number ): void {
    this.stepEmitter.emit();

    super.step( dt );
  }
}

moleculePolarity.register( 'RealMoleculesScreenView', RealMoleculesScreenView );

/**
 * A custom pass that composites the rendered scene over a solid background color,
 * to handle the case where we want to have correct alpha compositing over a non-transparent background.
 *
 * This is required because we (a) need to apply the outline pass BEFORE compositing over the background.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - FROM three-r160-addon-postprocessing
class BackgroundCompositePass extends window.ThreePass {

  private uniforms: {
    tDiffuse: { value: THREE.Texture | null };
    uBg: { value: THREE.Vector3 };
  };
  private material: THREE.RawShaderMaterial;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error - FROM three-r160-addon-postprocessing
  private fsQuad: typeof window.ThreeFullScreenQuad;

  public constructor( private backgroundColor: THREE.Color ) {
    super();

    this.uniforms = {
      tDiffuse: { value: null },
      uBg: { value: new THREE.Vector3(
        this.backgroundColor.r,
        this.backgroundColor.g,
        this.backgroundColor.b
      ) }
    };

    this.material = new THREE.RawShaderMaterial( {
      uniforms: this.uniforms,
      vertexShader: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform sampler2D tDiffuse;
        uniform vec3 uBg;
        varying vec2 vUv;

        void main() {
          vec4 src = texture2D(tDiffuse, vUv);
          vec3 rgb = mix(uBg, src.rgb, src.a);
          gl_FragColor = vec4(rgb, 1.0);
        }
      `,
      depthTest: false,
      depthWrite: false
    } );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error - FROM three-r160-addon-postprocessing
    this.fsQuad = new window.ThreeFullScreenQuad( this.material );
  }

  public setBackgroundColor( color: THREE.Color ): void {
    this.backgroundColor.copy( color );
    this.uniforms.uBg.value.set( color.r, color.g, color.b );
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error - FROM three-r160-addon-postprocessing
  public render( renderer: THREE.WebGLRenderer, writeBuffer, readBuffer ): void {
    this.uniforms.tDiffuse.value = readBuffer.texture;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error - FROM three-r160-addon-postprocessing
    renderer.setRenderTarget( this.renderToScreen ? null : writeBuffer );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error - FROM three-r160-addon-postprocessing
    if ( this.clear ) {
      renderer.clear();
    }
    this.fsQuad.render( renderer );
  }

  public dispose(): void {
    this.material.dispose();
    this.fsQuad.dispose();
  }
}