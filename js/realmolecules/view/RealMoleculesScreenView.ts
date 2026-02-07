// Copyright 2014-2026, University of Colorado Boulder

/**
 * View for the 'Real Molecules' screen.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Property from '../../../../axon/js/Property.js';
import TinyEmitter from '../../../../axon/js/TinyEmitter.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import MobiusScreenView from '../../../../mobius/js/MobiusScreenView.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import HighlightPath from '../../../../scenery/js/accessibility/HighlightPath.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Pointer from '../../../../scenery/js/input/Pointer.js';
import animatedPanZoomSingleton from '../../../../scenery/js/listeners/animatedPanZoomSingleton.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Color from '../../../../scenery/js/util/Color.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPPreferences from '../../common/model/MPPreferences.js';
import MPColors from '../../common/MPColors.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import RealMolecule from '../model/RealMolecule.js';
import RealMoleculesModel, { REAL_MOLECULES_CAMERA_POSITION } from '../model/RealMoleculesModel.js';
import ElectronegativityTableNode from './ElectronegativityTableNode.js';
import RealMoleculeAccessibleListNode from './RealMoleculeAccessibleListNode.js';
import RealMoleculeAdvancedAccessibleListNode from './RealMoleculeAdvancedAccessibleListNode.js';
import RealMoleculesColorKeyNode from './RealMoleculesColorKeyNode.js';
import RealMoleculesControl from './RealMoleculesControl.js';
import RealMoleculesControlPanel from './RealMoleculesControlPanel.js';
import RealMoleculesElectronegativityAccessibleListNode from './RealMoleculesElectronegativityAccessibleListNode.js';
import RealMoleculesScreenSummaryContentNode from './RealMoleculesScreenSummaryContentNode.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import RealMoleculeView from './RealMoleculeView.js';
import BackgroundCompositePass from './BackgroundCompositePass.js';
import AtomLabelRenderPass from './AtomLabelRenderPass.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import MoleculeRotationListener from './MoleculeRotationListener.js';
import MoleculeKeyboardRotationListener from './MoleculeKeyboardRotationListener.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';

const HORIZONTAL_MARGIN = 40;
const VERTICAL_MARGIN = 20;

export default class RealMoleculesScreenView extends MobiusScreenView {

  private readonly stepEmitter = new TinyEmitter();
  private readonly moleculeView: RealMoleculeView;

  // Scale applied to interaction that isn't directly tied to screen coordinates (rotation). This helps to "normalize"
  // interactions across different screen sizes.
  private readonly activeScaleProperty = new NumberProperty( 1 );

  public constructor( model: RealMoleculesModel, tandem: Tandem ) {
    // Our stage's main rendering function, defined here so we can pass a reference in the super() call and later
    // override it if WebGL is enabled.
    let renderOverride: ( ( target: THREE.WebGLRenderTarget | undefined, autoClear?: boolean ) => void ) | null = null;

    super( {
      layoutBounds: MPConstants.LAYOUT_BOUNDS,
      tandem: tandem,
      screenSummaryContent: new RealMoleculesScreenSummaryContentNode( model ),
      sceneNodeOptions: {
        parentMatrixProperty: animatedPanZoomSingleton.listener.matrixProperty,
        cameraPosition: REAL_MOLECULES_CAMERA_POSITION,

        // Manually tuned constant for placement (for now), since we need this on startup.
        // This will move the "center" of the molecule view down a bit to account for the thicker UI content on the
        // top of the screen.
        viewOffset: new Vector2( -141, 50 ),

        // NOTE: Using TRANSPARENT for now due to needing to apply the background AFTER the outline pass. We don't want
        // this to be applied "early" in the 3d rendering.
        backgroundColorProperty: new Property( Color.TRANSPARENT ),

        renderOverride: ( target: THREE.WebGLRenderTarget | undefined, autoClear = false ) => renderOverride?.( target, autoClear )
      }
    } );

    // Using a dynamic property so we can change the name both if the molecule changes and if the language changes
    const dynamicMoleculeNameProperty = new DynamicProperty<string, unknown, RealMolecule>( model.moleculeProperty, {
      derive: 'fullNameProperty'
    } );

    const moleculeNodeTandem = tandem.createTandem( 'moleculeNode' );

    // Our "fake" Node for the molecule, for target for drags that don't hit other UI components (and keyboard drag)
    const moleculeNode = new ( InteractiveHighlighting( Rectangle ) )( combineOptions<NodeOptions>( {}, AccessibleDraggableOptions, {
      focusable: true,
      tagName: 'div',
      focusHighlight: 'invisible',
      tandem: moleculeNodeTandem,
      accessibleName: MoleculePolarityFluent.a11y.realMoleculesScreen.draggableMolecule.accessibleName.createProperty( {
        moleculeName: dynamicMoleculeNameProperty
      } ),
      accessibleHelpText: MoleculePolarityFluent.a11y.realMoleculesScreen.draggableMolecule.accessibleHelpTextStringProperty
    } ) );

    // Adjust the moleculeNode bounds to cover all of the layout bounds, and adjust activeScale
    this.visibleBoundsProperty.link( visibleBounds => {
      moleculeNode.setRectBounds( visibleBounds );

      const sx = visibleBounds.width / this.layoutBounds.width;
      const sy = visibleBounds.height / this.layoutBounds.height;
      if ( sx !== 0 && sy !== 0 ) {
        this.activeScaleProperty.value = sy > sx ? sx : sy;
      }
    } );

    const viewProperties = new RealMoleculesViewProperties( {
      tandem: tandem.createTandem( 'viewProperties' )
    } );

    const electronegativityTableNode = new ElectronegativityTableNode( model.moleculeProperty, {
      visibleProperty: viewProperties.atomElectronegativitiesVisibleProperty
    } );

    const comboBoxListParent = new Node();
    const moleculeComboBox = new RealMoleculesControl( model.moleculeProperty, model.molecules, comboBoxListParent, {
      comboBoxOptions: {
        tandem: tandem.createTandem( 'moleculeComboBox' ),
        accessibleName: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculeComboBox.accessibleNameStringProperty,
        accessibleHelpText: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculeComboBox.accessibleHelpTextStringProperty
      }
    } );

    const colorKeyNode = new RealMoleculesColorKeyNode( viewProperties.surfaceTypeProperty,
      MPPreferences.surfaceColorProperty, tandem.createTandem( 'colorKeyNode' ) );

    const controlPanel = new RealMoleculesControlPanel( model.isAdvancedProperty, viewProperties, {
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

    const pointerRotationListener = new MoleculeRotationListener(
      model.moleculeQuaternionProperty,
      this.activeScaleProperty
    );
    // Don't add listeners if we don't have WebGL - we need the "WebGL warning" to be clickable
    if ( this.sceneNode.stage.threeRenderer ) {
      moleculeNode.addInputListener( pointerRotationListener );
    }

    const keyboardDragListener = new MoleculeKeyboardRotationListener(
      model.moleculeQuaternionProperty,
      moleculeNode,
      moleculeNodeTandem.createTandem( 'keyboardDragListener' )
    );
    // Don't add listeners if we don't have WebGL - we need the "WebGL warning" to be clickable
    if ( this.sceneNode.stage.threeRenderer ) {
      moleculeNode.addInputListener( keyboardDragListener );
    }

    const moleculeDescriptionNode = new Node( {
      accessibleHeading: MoleculePolarityFluent.a11y.realMoleculesScreen.realMolecule.createProperty( {
        moleculeName: new DerivedProperty( [ dynamicMoleculeNameProperty ], name => {
          const words = name.split( ' ' );
          const capitalizedWords = words.map( word => StringUtils.capitalize( word ) );
          return capitalizedWords.join( ' ' );
        } )
      } )
    } );

    // Molecule description
    moleculeDescriptionNode.addChild(
      new RealMoleculeAccessibleListNode( model.moleculeProperty, viewProperties,
        { visibleProperty: DerivedProperty.not( model.isAdvancedProperty ) } )
    );

    // Molecule description (advanced mode)
    moleculeDescriptionNode.addChild(
      new RealMoleculeAdvancedAccessibleListNode( model.moleculeProperty, viewProperties,
        { visibleProperty: model.isAdvancedProperty } )
    );

    const electronegativityDescriptionNode = new Node( {
      accessibleHeading: MoleculePolarityFluent.a11y.common.electronegativity.headingStringProperty,
      accessibleParagraph: MoleculePolarityFluent.a11y.realMoleculesScreen.electronegativitiesTableStringProperty,
      visibleProperty: viewProperties.atomElectronegativitiesVisibleProperty
    } );

    electronegativityDescriptionNode.addChild(
      new RealMoleculesElectronegativityAccessibleListNode( model.moleculeProperty )
    );

    // Accessible and Visual order
    {
      this.pdomPlayAreaNode.pdomOrder = [
        moleculeDescriptionNode,
        moleculeNode,
        moleculeComboBox,
        comboBoxListParent,
        electronegativityDescriptionNode
      ];

      this.pdomControlAreaNode.pdomOrder = [
        controlPanel,
        colorKeyNode,
        resetAllButton
      ];

      // Add main children as a single node so that we don't disturb webgl failure or other warning nodes put into the scene.
      this.addChild( new Node( {
        children: [
          moleculeNode,
          electronegativityTableNode,
          moleculeComboBox,
          controlPanel,
          colorKeyNode,
          new AlignBox( resetAllButton, {
            alignBounds: this.layoutBounds,
            xAlign: 'right',
            yAlign: 'bottom',
            xMargin: HORIZONTAL_MARGIN,
            yMargin: VERTICAL_MARGIN
          } ),
          moleculeDescriptionNode,
          electronegativityDescriptionNode,
          comboBoxListParent // last, so that combo box list is on top
        ]
      } ) );
    }

    // Layout
    ManualConstraint.create( this, [
      controlPanel, electronegativityTableNode, colorKeyNode, moleculeComboBox
    ], (
      controlPanelProxy, electronegativityTableNodeProxy, colorKeyNodeProxy, moleculeComboBoxProxy
    ) => {
      // right of viewer
      controlPanelProxy.right = this.layoutBounds.right - HORIZONTAL_MARGIN;
      controlPanelProxy.centerY = this.layoutBounds.centerY - resetAllButton.height;

      const layoutCenterX = ( controlPanelProxy.left + this.layoutBounds.left ) / 2;

      // centered above viewer
      electronegativityTableNodeProxy.centerX = layoutCenterX;
      electronegativityTableNodeProxy.top = this.layoutBounds.top + VERTICAL_MARGIN;

      colorKeyNodeProxy.centerX = electronegativityTableNodeProxy.centerX;
      colorKeyNodeProxy.top = electronegativityTableNodeProxy.bottom + VERTICAL_MARGIN;

      // centered below viewer
      moleculeComboBoxProxy.centerX = layoutCenterX;
      moleculeComboBoxProxy.bottom = this.layoutBounds.bottom - VERTICAL_MARGIN;
    } );

    this.adjustCamera();
    this.addLights();

    // Objects to provide a black stroked outline around (e.g. molecular dipole arrows) - the RealMoleculeView will be
    // responsible for mutating this.
    const blackStrokedObjects: THREE.Object3D[] = [];

    this.moleculeView = new RealMoleculeView(
      model.moleculeProperty,
      model.moleculeQuaternionProperty,
      model.isAdvancedProperty,
      moleculeNode.visibleProperty,
      viewProperties,
      blackStrokedObjects,
      this.stepEmitter
    );
    this.sceneNode.stage.threeScene.add( this.moleculeView );

    // If we don't have a threeRenderer, WebGL is presumably not available, and we should no-op
    if ( this.sceneNode.stage.threeRenderer ) {
      const EffectComposer = window.ThreeEffectComposer;
      const OutlinePass = window.ThreeOutlinePass;
      const RenderPass = window.ThreeRenderPass;
      const OutputPass = window.ThreeOutputPass;

      const composer = new EffectComposer( this.sceneNode.stage.threeRenderer );
      composer.renderToScreen = true;

      // Pass #1: The main rendering pass (renders most 3D objects, with the exception of the overlay text and strokes)
      const renderPass = new RenderPass( this.sceneNode.stage.threeScene, this.sceneNode.stage.threeCamera );
      composer.addPass( renderPass );

      // Pass #2: Focus outline pass for the molecule (which has the surface always writing to the depth buffer, so that
      // the outline doesn't change when the surface is off.
      const focusOutlinePass = new OutlinePass(
        // eslint-disable-next-line phet/bad-sim-text
        new THREE.Vector2( window.innerWidth, window.innerHeight ),
        this.sceneNode.stage.threeScene,
        this.sceneNode.stage.threeCamera
      );
      focusOutlinePass.edgeStrength = 8.0;
      focusOutlinePass.edgeGlow = 1.0;
      focusOutlinePass.edgeThickness = 3.0;
      focusOutlinePass.visibleEdgeColor.set( ThreeUtils.colorToThree( HighlightPath.OUTER_FOCUS_COLOR ) );
      focusOutlinePass.hiddenEdgeColor.set( ThreeUtils.colorToThree( HighlightPath.OUTER_FOCUS_COLOR ) );
      composer.addPass( focusOutlinePass );

      // Pass #3: Composite the background color in, since without this the next outline pass gets wildly incorrect
      // blending. This will make everything opaque.
      const backgroundCompositePass = new BackgroundCompositePass( ThreeUtils.colorToThree( MPColors.screenBackgroundColorProperty.value ) );
      composer.addPass( backgroundCompositePass );
      // We'll need to update the background color when it changes.
      MPColors.screenBackgroundColorProperty.link( color => {
        backgroundCompositePass.setBackgroundColor( ThreeUtils.colorToThree( color ) );
      } );

      // Pass #4: Stroked outline for the molecular dipole.
      const molecularDipoleOutlinePass = new OutlinePass(
        // eslint-disable-next-line phet/bad-sim-text
        new THREE.Vector2( window.innerWidth, window.innerHeight ),
        this.sceneNode.stage.threeScene,
        this.sceneNode.stage.threeCamera
      );
      molecularDipoleOutlinePass.edgeStrength = 2;
      molecularDipoleOutlinePass.edgeGlow = 0.3;
      molecularDipoleOutlinePass.edgeThickness = 1.2;
      molecularDipoleOutlinePass.visibleEdgeColor.set( 0 );
      molecularDipoleOutlinePass.hiddenEdgeColor.set( 0x0 );
      composer.addPass( molecularDipoleOutlinePass );

      // Pass #5: Render the atom labels on top of everything else. NOTE: We EXPLICITLY need the depth buffer from above
      // to still be active, so that the atom labels will interact with the depth buffer (i.e. atoms in front of atom
      // labels will occlude them, even though the atom labels are on top of everything else).
      const laterRenderPass = new AtomLabelRenderPass( this.sceneNode.stage.threeScene, this.sceneNode.stage.threeCamera );
      composer.addPass( laterRenderPass );

      // Pass #6: Output pass, which handles color conversions and actually writing to the screen.
      const outputPass = new OutputPass();
      composer.addPass( outputPass );

      // Handle pass resizing lazily, if the size changes. This is important to avoid expensive resizing operations
      // unless the user is resizing the window.
      let lastWidth = 0;
      let lastHeight = 0;
      const resize = () => {
        const width = this.sceneNode.stage.width;
        const height = this.sceneNode.stage.height;

        if ( lastWidth === width && lastHeight === height ) {
          return;
        }

        composer.setSize( width, height ); // This sets the size of all passes, so we don't need to do it for each one.
        lastWidth = width;
        lastHeight = height;
      };

      // Set the render override
      renderOverride = ( target: THREE.WebGLRenderTarget | undefined, autoClear = false ) => {
        this.sceneNode.stage.threeRenderer!.setRenderTarget( target || null );

        // Whether we should show the highlight due to interactive highlighting (whether it is rotating or has a pointer over it)
        let isInteractiveHighlighted = false;
        if ( moleculeNode.isInteractiveHighlightActiveProperty.value ) {
          // Avoid this computational work unless we have interactive highlighting enabled

          // See if any pointer is over the molecule view.
          const pointers = this.getConnectedDisplays().flatMap( display => display.getPointers() );
          const hasPointerOver = pointers.some( ( pointer: Pointer ) => {
            const ray = this.sceneNode.getRayFromScreenPoint( pointer.point );

            const raycaster = new THREE.Raycaster( ThreeUtils.vectorToThree( ray.position ), ThreeUtils.vectorToThree( ray.direction ) );
            const intersections: THREE.Intersection<THREE.Group>[] = [];

            raycaster.intersectObject( this.moleculeView, true, intersections );

            return intersections.length > 0;
          } );

          isInteractiveHighlighted = moleculeNode.isInteractiveHighlightActiveProperty.value && (
            pointerRotationListener.isRotatingProperty.value ||
            keyboardDragListener.isPressedProperty.value ||
            hasPointerOver
          );
        }

        // We'll also show the highlight if it is focused directly.
        focusOutlinePass.selectedObjects = ( moleculeNode.isFocused() || isInteractiveHighlighted ) ? [ this.moleculeView ] : [];

        molecularDipoleOutlinePass.selectedObjects = blackStrokedObjects;

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
  }

  private adjustCamera(): void {
    this.sceneNode.stage.threeCamera.zoom = 1.7;
    this.sceneNode.stage.threeCamera.updateProjectionMatrix();
    this.sceneNode.stage.threeCamera.up = new THREE.Vector3( 0, 0, -1 );
    this.sceneNode.stage.threeCamera.lookAt( ThreeUtils.vectorToThree( Vector3.ZERO ) );
  }

  private addLights(): void {
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
  }

  public override step( dt: number ): void {
    this.stepEmitter.emit();

    super.step( dt );
  }
}

moleculePolarity.register( 'RealMoleculesScreenView', RealMoleculesScreenView );