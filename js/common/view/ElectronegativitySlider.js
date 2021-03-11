// Copyright 2021, University of Colorado Boulder

/**
 * ElectronegativitySlider is the slider for adjusting electronegativity of an atom.
 * Dragging the slider continuously updates an atom's electronegativity.
 * When the slider's thumb is released, it snaps to the closest tick mark.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import Atom from '../model/Atom.js';
import Molecule from '../model/Molecule.js';
import MPConstants from '../MPConstants.js';
import PointySliderThumb from './PointySliderThumb.js';

class ElectronegativitySlider extends HSlider {

  /**
   * @param {Molecule} molecule
   * @param {Atom} atom
   * @param {Object} [options]
   */
  constructor( molecule, atom, options ) {
    assert && assert( molecule instanceof Molecule, 'invalid molecule' );
    assert && assert( atom instanceof Atom, 'invalid atom' );

    const electronegativityProperty = atom.electronegativityProperty;
    const range = electronegativityProperty.range;
    assert && assert( range, 'range is required' );

    options = merge( {
      tickInterval: MPConstants.ELECTRONEGATIVITY_TICK_SPACING,
      snapInterval: MPConstants.ELECTRONEGATIVITY_SNAP_INTERVAL,

      // HSlider options
      thumbYOffset: 10,
      trackSize: new Dimension2( 150, 5 ),
      majorTickLength: 20,
      minorTickLength: 10,
      tandem: Tandem.REQUIRED
    }, options );

    // custom thumb
    const thumbNode = new PointySliderThumb( {
      size: new Dimension2( 30, 35 ),
      tandem: options.tandem.createTandem( 'thumbNode' )
    } );
    thumbNode.touchArea = thumbNode.localBounds.dilatedXY( 10, 10 );

    assert && assert( !options.thumbNode, 'ElectronegativitySlider sets thumbNode' );
    options.thumbNode = thumbNode;

    assert && assert( !options.startDrag, 'ElectronegativitySlider sets startDrag' );
    options.startDrag = () => {
      molecule.isDraggingProperty.value = true;
    };

    assert && assert( !options.endDrag, 'ElectronegativitySlider sets endDrag' );
    options.endDrag = () => {
      molecule.isDraggingProperty.value = false;
      atom.electronegativityProperty.value = Utils.roundToInterval( atom.electronegativityProperty.value, options.snapInterval );
    };

    super( electronegativityProperty, range, options );

    // tick labels
    const tickLabelOptions = {
      font: new PhetFont( 16 ),
      maxWidth: 40
    };
    this.addMajorTick( range.min, new Text( moleculePolarityStrings.less, tickLabelOptions ) );
    this.addMajorTick( range.max, new Text( moleculePolarityStrings.more, tickLabelOptions ) );
    const centerTick = range.min + ( range.getLength() / 2 );
    this.addMajorTick( centerTick );
    for ( let i = range.min + options.tickInterval; i < range.max; i += options.tickInterval ) {
      if ( i !== centerTick ) {
        this.addMinorTick( i );
      }
    }
  }
}

moleculePolarity.register( 'ElectronegativitySlider', ElectronegativitySlider );
export default ElectronegativitySlider;