// Copyright 2021-2025, University of Colorado Boulder

/**
 * ElectronegativitySlider is the slider for adjusting electronegativity of an atom.
 * Dragging the slider continuously updates an atom's electronegativity.
 * When the slider's thumb is released, it snaps to the closest tick mark.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import HSlider, { HSliderOptions } from '../../../../sun/js/HSlider.js';
import Slider from '../../../../sun/js/Slider.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import Atom from '../model/Atom.js';
import Molecule from '../model/Molecule.js';
import MPConstants from '../MPConstants.js';
import DescriptionMaps from './DescriptionMaps.js';
import PointySliderThumb from './PointySliderThumb.js';

type SelfOptions = {
  tickSpacing?: number; // space between tick marks
};

type ElectronegativitySliderOptions = SelfOptions & WithRequired<HSliderOptions, 'tandem'>;

export default class ElectronegativitySlider extends HSlider {

  public constructor(
    atom: Atom,
    molecule: Molecule,
    providedOptions: ElectronegativitySliderOptions ) {

    // Values to store state before the drag for context responses
    let previousEN: number;
    let previousDipole: Vector2;

    const options = optionize<ElectronegativitySliderOptions, SelfOptions, HSliderOptions>()( {

      // SelfOptions
      tickSpacing: MPConstants.ELECTRONEGATIVITY_TICK_SPACING,

      // HSliderOptions
      thumbYOffset: 10,
      trackSize: new Dimension2( 150, 5 ),
      majorTickLength: 20,
      minorTickLength: 10,
      constrainValue: value => roundToInterval( value, 0.2 ), // rounds to nearest 0.2
      shiftKeyboardStep: 0.2,
      keyboardStep: 0.4,
      visiblePropertyOptions: {
        phetioFeatured: false
      },
      isDisposable: false,
      accessibleName: MoleculePolarityFluent.a11y.common.electronegativitySlider.accessibleName.createProperty( {
        atomName: atom.labelStringProperty
      } ),
      accessibleHelpText: MoleculePolarityFluent.a11y.common.electronegativitySlider.accessibleHelpText.createProperty( {
        atomName: atom.labelStringProperty
      } ),

      createAriaValueText: value => {
        return DescriptionMaps.formatElectronegativityString( value );
      }
    }, providedOptions );

    // custom thumb
    const thumbNode = new PointySliderThumb( {
      size: new Dimension2( 30, 35 ),
      tandem: options.tandem.createTandem( Slider.THUMB_NODE_TANDEM_NAME )
    } );
    thumbNode.touchArea = thumbNode.localBounds.dilatedXY( 10, 10 );

    options.thumbNode = thumbNode;

    options.startDrag = () => {
      molecule.isDraggingProperty.value = true;
      // Store the current EN value at the start of the drag
      previousEN = atom.electronegativityProperty.value;
      previousDipole = molecule.dipoleProperty.value;
    };
    options.endDrag = () => {
      // Setting the previous EN property at the END of the drag, to trigger context responses
      atom.previousElectronegativityProperty.value = previousEN;
      molecule.previousDipoleProperty.value = previousDipole;

      // snaps to the closest tick mark
      atom.electronegativityProperty.value = roundToInterval( atom.electronegativityProperty.value, options.tickSpacing );
      molecule.isDraggingProperty.value = false;
    };

    const range = atom.electronegativityProperty.range;

    super( atom.electronegativityProperty, range, options );

    // tick labels
    const tickLabelOptions = {
      font: new PhetFont( 16 ),
      maxWidth: 40
    };
    this.addMajorTick( range.min, new Text( MoleculePolarityStrings.lessStringProperty, tickLabelOptions ) );
    this.addMajorTick( range.max, new Text( MoleculePolarityStrings.moreStringProperty, tickLabelOptions ) );
    const centerTick = range.min + ( range.getLength() / 2 );
    this.addMajorTick( centerTick );
    for ( let i = range.min + options.tickSpacing; i < range.max; i += options.tickSpacing ) {
      if ( roundToInterval( i, 0.1 ) !== centerTick ) {
        this.addMinorTick( i );
      }
    }
  }
}

moleculePolarity.register( 'ElectronegativitySlider', ElectronegativitySlider );