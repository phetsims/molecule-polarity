// Copyright 2014-2019, University of Colorado Boulder

/**
 * Slider control for electronegativity.
 * Dragging the slider continuously updates an atom's electronegativity.
 * When the slider's thumb is released, it snaps to the closest tick mark.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const HSlider = require( 'SUN/HSlider' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PointySliderThumb = require( 'MOLECULE_POLARITY/common/view/PointySliderThumb' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

  // strings
  const electronegativityString = require( 'string!MOLECULE_POLARITY/electronegativity' );
  const lessString = require( 'string!MOLECULE_POLARITY/less' );
  const moreString = require( 'string!MOLECULE_POLARITY/more' );
  const patternAtomNameString = require( 'string!MOLECULE_POLARITY/pattern.atomName' );

  /**
   * @param {Atom} atom - the atom whose electronegativity we're controlling
   * @param {Molecule} molecule - molecule that the atom belongs to, for pausing animation while this control is used
   * @param {Object} [options]
   * @constructor
   */
  function ElectronegativityControl( atom, molecule, options ) {

    options = merge( {

      // ElectronegativityControl
      range: MPConstants.ELECTRONEGATIVITY_RANGE,
      tickInterval: MPConstants.ELECTRONEGATIVITY_TICK_SPACING,
      snapToTick: true,
      thumbSize: new Dimension2( 30, 35 ),
      trackSize: new Dimension2( 150, 5 ),

      // Panel
      fill: atom.color,
      stroke: 'black',
      xMargin: 15,
      yMargin: 6
    }, options );

    // titles
    const titleNode = new Text( StringUtils.fillIn( patternAtomNameString, { name: atom.name } ), {
      font: new PhetFont( { size: 20, weight: 'bold' } ),
      maxWidth: options.trackSize.width
    } );
    const subtitleNode = new Text( electronegativityString, {
      font: new PhetFont( 18 ),
      maxWidth: options.trackSize.width
    } );

    // custom thumb
    const thumbNode = new PointySliderThumb( { size: options.thumbSize } );
    thumbNode.touchArea = thumbNode.localBounds.dilatedXY( 10, 10 );

    // slider
    const sliderNode = new HSlider( atom.electronegativityProperty, options.range, {
      thumbNode: thumbNode,
      thumbYOffset: 10,
      trackSize: options.trackSize,
      majorTickLength: 20,
      minorTickLength: 10,
      startDrag: function() {
        molecule.dragging = true;
      },
      endDrag: function() {
        molecule.dragging = false;
        if ( options.snapToTick ) {
          atom.electronegativityProperty.set( Util.toFixedNumber( atom.electronegativityProperty.get() / options.tickInterval, 0 ) * options.tickInterval );
        }
      }
    } );

    // slider tick labels
    const tickLabelOptions = {
      font: new PhetFont( 16 ),
      maxWidth: 40
    };
    sliderNode.addMajorTick( options.range.min, new Text( lessString, tickLabelOptions ) );
    sliderNode.addMajorTick( options.range.max, new Text( moreString, tickLabelOptions ) );
    const centerTick = options.range.min + ( options.range.getLength() / 2 );
    sliderNode.addMajorTick( centerTick );
    for ( let i = options.range.min + options.tickInterval; i < options.range.max; i += options.tickInterval ) {
      if ( i !== centerTick ) {
        sliderNode.addMinorTick( i );
      }
    }

    const content = new Node( { children: [ titleNode, subtitleNode, sliderNode ] } );

    // layout
    subtitleNode.centerX = sliderNode.centerX = titleNode.centerX;
    subtitleNode.top = titleNode.bottom;
    sliderNode.top = subtitleNode.bottom + 8;

    Panel.call( this, content, options );
  }

  moleculePolarity.register( 'ElectronegativityControl', ElectronegativityControl );

  return inherit( Panel, ElectronegativityControl );
} );