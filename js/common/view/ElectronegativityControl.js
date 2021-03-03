// Copyright 2014-2020, University of Colorado Boulder

/**
 * Slider control for electronegativity.
 * Dragging the slider continuously updates an atom's electronegativity.
 * When the slider's thumb is released, it snaps to the closest tick mark.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import Atom from '../model/Atom.js';
import Molecule from '../model/Molecule.js';
import MPConstants from '../MPConstants.js';
import PointySliderThumb from './PointySliderThumb.js';

class ElectronegativityControl extends Panel {

  /**
   * @param {Atom} atom - the atom whose electronegativity we're controlling
   * @param {Molecule} molecule - molecule that the atom belongs to, for pausing animation while this control is used
   * @param {Object} [options]
   */
  constructor( atom, molecule, options ) {
    assert && assert( atom instanceof Atom, 'invalid atom' );
    assert && assert( molecule instanceof Molecule, 'invalid molecule' );

    options = merge( {

      // ElectronegativityControl
      tickInterval: MPConstants.ELECTRONEGATIVITY_TICK_SPACING,
      snapToTick: true,
      thumbSize: new Dimension2( 30, 35 ),
      trackSize: new Dimension2( 150, 5 ),

      // Panel
      fill: atom.color,
      stroke: 'black',
      xMargin: 15,
      yMargin: 6,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    // titles
    const titleText = new Text( StringUtils.fillIn( moleculePolarityStrings.pattern.atomName, { name: atom.name } ), {
      font: new PhetFont( { size: 20, weight: 'bold' } ),
      maxWidth: options.trackSize.width,
      tandem: options.tandem.createTandem( 'titleText' )
    } );
    const subtitleText = new Text( moleculePolarityStrings.electronegativity, {
      font: new PhetFont( 18 ),
      maxWidth: options.trackSize.width,
      tandem: options.tandem.createTandem( 'subtitleText' )
    } );

    // custom thumb
    const thumbNode = new PointySliderThumb( { size: options.thumbSize } );
    thumbNode.touchArea = thumbNode.localBounds.dilatedXY( 10, 10 );

    const range = atom.electronegativityProperty.range;

    // slider
    const slider = new HSlider( atom.electronegativityProperty, range, {
      thumbNode: thumbNode,
      thumbYOffset: 10,
      trackSize: options.trackSize,
      majorTickLength: 20,
      minorTickLength: 10,
      startDrag: () => {
        molecule.dragging = true;
      },
      endDrag: () => {
        molecule.dragging = false;
        if ( options.snapToTick ) {
          atom.electronegativityProperty.set( Utils.toFixedNumber( atom.electronegativityProperty.get() / options.tickInterval, 0 ) * options.tickInterval );
        }
      },
      tandem: options.tandem.createTandem( 'slider' )
    } );

    // slider tick labels
    const tickLabelOptions = {
      font: new PhetFont( 16 ),
      maxWidth: 40
    };
    slider.addMajorTick( range.min, new Text( moleculePolarityStrings.less, tickLabelOptions ) );
    slider.addMajorTick( range.max, new Text( moleculePolarityStrings.more, tickLabelOptions ) );
    const centerTick = range.min + ( range.getLength() / 2 );
    slider.addMajorTick( centerTick );
    for ( let i = range.min + options.tickInterval; i < range.max; i += options.tickInterval ) {
      if ( i !== centerTick ) {
        slider.addMinorTick( i );
      }
    }

    const content = new Node( { children: [ titleText, subtitleText, slider ] } );

    // layout
    subtitleText.centerX = slider.centerX = titleText.centerX;
    subtitleText.top = titleText.bottom;
    slider.top = subtitleText.bottom + 8;

    super( content, options );
  }
}

moleculePolarity.register( 'ElectronegativityControl', ElectronegativityControl );

export default ElectronegativityControl;