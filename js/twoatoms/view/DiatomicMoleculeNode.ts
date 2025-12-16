// Copyright 2014-2025, University of Colorado Boulder

/**
 * Visual representation of a diatomic molecule.
 * Children position themselves in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import { toDegrees } from '../../../../dot/js/util/toDegrees.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import AccessibleSlider, { AccessibleSliderOptions } from '../../../../sun/js/accessibility/AccessibleSlider.js';
import MPQueryParameters from '../../common/MPQueryParameters.js';
import AtomNode from '../../common/view/AtomNode.js';
import BondDipoleNode from '../../common/view/BondDipoleNode.js';
import BondNode from '../../common/view/BondNode.js';
import MoleculeAngleDragListener from '../../common/view/MoleculeAngleDragListener.js';
import PartialChargeNode from '../../common/view/PartialChargeNode.js';
import TranslateArrowsNode from '../../common/view/TranslateArrowsNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import DiatomicMolecule from '../model/DiatomicMolecule.js';
import ElectronDensitySurfaceNode from './ElectronDensitySurfaceNode.js';
import ElectrostaticPotentialSurfaceNode from './ElectrostaticPotentialSurfaceNode.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';

type SelfOptions = EmptySelfOptions;

type ParentOptions = NodeOptions & AccessibleSliderOptions;

export type DiatomicMoleculeNodeOptions = SelfOptions & StrictOmit<ParentOptions, 'interactiveHighlightEnabled' | 'enabledRangeProperty' | 'valueProperty' | 'startDrag' | 'endDrag'>;

export default class DiatomicMoleculeNode extends AccessibleSlider( Node, 0 ) {

  private readonly resetDiatomicMoleculeNode: () => void;

  public constructor( molecule: DiatomicMolecule,
                      viewProperties: TwoAtomsViewProperties,
                      providedOptions: DiatomicMoleculeNodeOptions ) {

    const options = optionize<DiatomicMoleculeNodeOptions, SelfOptions, ParentOptions>()(
      {
        // NodeOptions
        cursor: 'pointer',
        phetioInputEnabledPropertyInstrumented: true,
        isDisposable: false,
        accessibleHeading: MoleculePolarityStrings.a11y.twoAtomsScreen.rotateMoleculeSlider.accessibleNameStringProperty,
        accessibleHelpText: MoleculePolarityStrings.a11y.twoAtomsScreen.rotateMoleculeSlider.accessibleHelpTextStringProperty,

        // AccessibleSliderOptions
        enabledRangeProperty: new Property( new Range( -Math.PI, Math.PI ) ),
        valueProperty: molecule.angleProperty,
        keyboardStep: Math.PI / 8,
        shiftKeyboardStep: Math.PI / 8,
        createAriaValueText: angle => {
          angle *= -1; // Inverting the angle to have +Y pointing up
          angle = toDegrees( angle < 0 ? angle + 2 * Math.PI : angle ); // Mapping to [0-360]
          return toFixed( angle, 1 ); // Rounding
        }
      }, providedOptions );

    // atoms
    const atomANode = new AtomNode( molecule.atomA, {
      tandem: options.tandem.createTandem( 'atomANode' ),
      focusable: false
    } );
    const atomBNode = new AtomNode( molecule.atomB, {
      tandem: options.tandem.createTandem( 'atomBNode' ),
      focusable: false
    } );

    // bond
    const bondNode = new BondNode( molecule.bond, {
      tandem: options.tandem.createTandem( 'bondNode' )
    } );

    // arrows to provide interaction hints
    const hintArrowsTandem = options.tandem.createTandem( 'hintArrowsNode' );
    const hintArrowANode = new TranslateArrowsNode( molecule, molecule.atomA, {
      pickable: false,
      tandem: hintArrowsTandem.createTandem( 'hintArrowANode' )
    } );
    const hintArrowBNode = new TranslateArrowsNode( molecule, molecule.atomB, {
      pickable: false,
      tandem: hintArrowsTandem.createTandem( 'hintArrowBNode' )
    } );
    const hintArrowsNode = new Node( {
      children: [ hintArrowANode, hintArrowBNode ],
      tandem: hintArrowsTandem,
      visiblePropertyOptions: {
        phetioFeatured: true,
        phetioDocumentation: 'Set to false to permanently hide hint arrows.'
      }
    } );

    // partial charge
    const partialChargeANode = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bond, {
      visibleProperty: viewProperties.partialChargesVisibleProperty
    } );
    const partialChargeBNode = PartialChargeNode.createOppositePartialChargeNode( molecule.atomB, molecule.bond, {
      visibleProperty: viewProperties.partialChargesVisibleProperty
    } );

    // surfaces
    const electrostaticPotentialSurfaceNode = new ElectrostaticPotentialSurfaceNode( molecule, {
      tandem: options.tandem.createTandem( 'electrostaticPotentialSurfaceNode' )
    } );
    const electronDensitySurfaceNode = new ElectronDensitySurfaceNode( molecule, {
      tandem: options.tandem.createTandem( 'electronDensitySurfaceNode' )
    } );

    // dipole
    const bondDipoleNode = new BondDipoleNode( molecule.bond, {
      visibleProperty: viewProperties.bondDipoleVisibleProperty
    } );

    options.children = [
      electrostaticPotentialSurfaceNode, electronDensitySurfaceNode,
      bondNode, atomANode, atomBNode,
      hintArrowsNode,
      partialChargeANode, partialChargeBNode, bondDipoleNode
    ];

    super( options );

    // rotate molecule by dragging anywhere
    const dragListener = new MoleculeAngleDragListener( molecule, this, {
      tandem: options.tandem.createTandem( 'dragListener' )
    } );
    this.addInputListener( dragListener );

    viewProperties.surfaceTypeProperty.link( surfaceType => {
      electrostaticPotentialSurfaceNode.visible = ( surfaceType === 'electrostaticPotential' );
      electronDensitySurfaceNode.visible = ( surfaceType === 'electronDensity' );
    } );

    // {boolean} Set to true when the molecule has been changed by the user.
    let moleculeHasChanged = false;

    // Hides the hint arrows if the molecule becomes non-interactive.
    // Set the hint arrows individually, because hintArrowsNode.visibleProperty is for use by PhET-iO.
    const updateHintArrows = () => {
      hintArrowANode.visible = hintArrowBNode.visible = ( !moleculeHasChanged && this.inputEnabled );
    };

    // When the user drags any atom or bond, hide the hint arrows.
    const hideArrows = () => {
      if ( molecule.isDraggingProperty.value ) {
        moleculeHasChanged = true;
        updateHintArrows();
      }
    };
    molecule.angleProperty.lazyLink( hideArrows );

    this.inputEnabledProperty.link( () => updateHintArrows() );

    // Show molecule angle as an arrow that points from the center to the atom in the direction of angle.
    if ( MPQueryParameters.showMoleculeAngle ) {
      const arrowNode = new ArrowNode( 0, 0, 100, 0, {
        fill: 'red',
        translation: molecule.position
      } );
      this.addChild( arrowNode );
      molecule.angleProperty.link( angle => arrowNode.setRotation( angle ) );
    }

    this.resetDiatomicMoleculeNode = () => {
      moleculeHasChanged = false;
      updateHintArrows();
    };

    // ------------------------------------ Accessibility ---------------------------------------

    molecule.angleProperty.link( angle => {
      // Create a focus highlight that looks like an ellipse around the molecule
      this.focusHighlight = new Shape().ellipse(
        this.center,
        150,
        100,
        angle
      );
    } );
  }

  public override reset(): void {
    super.reset();
    this.resetDiatomicMoleculeNode();
  }
}

moleculePolarity.register( 'DiatomicMoleculeNode', DiatomicMoleculeNode );