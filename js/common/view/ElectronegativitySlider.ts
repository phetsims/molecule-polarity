// Copyright 2021-2022, University of Colorado Boulder

/**
 * ElectronegativitySlider is the slider for adjusting electronegativity of an atom.
 * Dragging the slider continuously updates an atom's electronegativity.
 * When the slider's thumb is released, it snaps to the closest tick mark.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import HSlider, { HSliderOptions } from '../../../../sun/js/HSlider.js';
import Slider from '../../../../sun/js/Slider.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import Atom from '../model/Atom.js';
import Molecule from '../model/Molecule.js';
import MPConstants from '../MPConstants.js';
import PointySliderThumb from './PointySliderThumb.js';

type SelfOptions = {
  tickSpacing?: number; // space between tick marks
};

type ElectronegativitySliderOptions = SelfOptions & PickRequired<HSliderOptions, 'tandem'>;

export default class ElectronegativitySlider extends HSlider {

  public constructor( molecule: Molecule, atom: Atom, providedOptions: ElectronegativitySliderOptions ) {

    const options = optionize<ElectronegativitySliderOptions, SelfOptions, HSliderOptions>()( {

      // SelfOptions
      tickSpacing: MPConstants.ELECTRONEGATIVITY_TICK_SPACING,

      // HSliderOptions
      thumbYOffset: 10,
      trackSize: new Dimension2( 150, 5 ),
      majorTickLength: 20,
      minorTickLength: 10
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
    };

    // snaps to the closest tick mark
    options.endDrag = () => {
      molecule.isDraggingProperty.value = false;
      atom.electronegativityProperty.value = Utils.roundToInterval( atom.electronegativityProperty.value, options.tickSpacing );
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
      if ( i !== centerTick ) {
        this.addMinorTick( i );
      }
    }
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'ElectronegativitySlider', ElectronegativitySlider );