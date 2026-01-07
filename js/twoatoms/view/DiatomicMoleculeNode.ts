// Copyright 2014-2026, University of Colorado Boulder

/**
 * Visual representation of a diatomic molecule.
 * Children position themselves in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import { SurfaceType } from '../../common/model/SurfaceType.js';
import MPQueryParameters from '../../common/MPQueryParameters.js';
import AtomNode from '../../common/view/AtomNode.js';
import BondDipoleNode from '../../common/view/BondDipoleNode.js';
import BondNode from '../../common/view/BondNode.js';
import MoleculeAngleDragListener from '../../common/view/MoleculeAngleDragListener.js';
import MPAccessibleSlider, { MPAccessibleSliderOptions } from '../../common/view/MPAccessibleSlider.js';
import PartialChargeNode from '../../common/view/PartialChargeNode.js';
import TranslateArrowsNode from '../../common/view/TranslateArrowsNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import DiatomicMolecule from '../model/DiatomicMolecule.js';
import ElectronDensitySurfaceNode from './ElectronDensitySurfaceNode.js';
import ElectrostaticPotentialSurfaceNode from './ElectrostaticPotentialSurfaceNode.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';

type SelfOptions = EmptySelfOptions;

export type DiatomicMoleculeNodeOptions = SelfOptions & MPAccessibleSliderOptions;

export default class DiatomicMoleculeNode extends MPAccessibleSlider {

  private readonly resetDiatomicMoleculeNode: () => void;

  public constructor( molecule: DiatomicMolecule,
                      viewProperties: TwoAtomsViewProperties,
                      providedOptions: DiatomicMoleculeNodeOptions ) {

    const options = optionize<DiatomicMoleculeNodeOptions, SelfOptions, MPAccessibleSliderOptions>()(
      {
        // NodeOptions
        cursor: 'pointer',
        phetioInputEnabledPropertyInstrumented: true,
        isDisposable: false,
        accessibleName: MoleculePolarityStrings.a11y.twoAtomsScreen.rotateMoleculeSlider.accessibleNameStringProperty,
        accessibleHelpText: MoleculePolarityStrings.a11y.twoAtomsScreen.rotateMoleculeSlider.accessibleHelpTextStringProperty
      }, providedOptions );

    // atoms
    const atomANode = new AtomNode( molecule.atomA, molecule.angleProperty, {
      tandem: options.tandem.createTandem( 'atomANode' ),
      focusable: false
    } );
    const atomBNode = new AtomNode( molecule.atomB, molecule.angleProperty, {
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

    super( molecule.angleProperty, options );

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
      moleculeHasChanged = true;
      updateHintArrows();
    };

    let lastDirection: 'clockwise' | 'counterclockwise' | null = null;

    // Utility function to emit accessible responses based on rotation direction and context.
    const emitRotationResponse = ( direction: 'clockwise' | 'counterclockwise' ) => {
      if ( molecule.isRotatingDueToEFieldProperty.value ) {

        // Context response for E-field rotations
        this.addAccessibleContextResponse(
          MoleculePolarityFluent.a11y.twoAtomsScreen.rotateMoleculeSlider.electricFieldContext.format( {
            direction: direction
          } )
        );
      }
      else {

        // Normal object response for manual rotations
        this.addAccessibleObjectResponse(
          MoleculePolarityFluent.a11y.rotation.format( { direction: direction } )
        );
      }
      lastDirection = direction;
    };

    // Reset lastDirection when E-field rotation state changes.
    molecule.isRotatingDueToEFieldProperty.lazyLink( () => {
      lastDirection = null;
    } );

    // Storing the dipole to track direction of angle changes.
    let lastDipole = molecule.dipoleProperty.value;

    molecule.angleProperty.lazyLink( () => {
      hideArrows();

      const dipole = molecule.dipoleProperty.value;

      // Using the cross product of the dipole to determine wether the dipole change due to the angle
      // is rotating the molecule clockwise or counterclockwise.
      // We do not listen directly to the dipole because we don't want magnitude changes to trigger
      // these accessible responses.
      if ( dipole.crossScalar( lastDipole ) < 0 ) {
        if ( lastDirection !== 'clockwise' ) {
          emitRotationResponse( 'clockwise' );
        }
      }
      else {
        if ( lastDirection !== 'counterclockwise' ) {
          emitRotationResponse( 'counterclockwise' );
        }
      }

      lastDipole = dipole;
    } );

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

    Multilink.multilink(
      [
        molecule.angleProperty,
        viewProperties.surfaceTypeProperty
      ], ( angle: number, surfaceType: SurfaceType ) => {

        // Dimensions of the focus highlight ellipse
        let radiusX = 150;
        let radiusY = 100;
        if ( surfaceType !== 'none' ) {
          radiusX = 200;
          radiusY = 150;
        }

        // Update the focus highlight to match the current angle and surface type
        this.focusHighlight = new Shape().ellipse(
          this.center,
          radiusX,
          radiusY,
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