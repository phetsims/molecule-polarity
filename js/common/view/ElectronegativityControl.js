// Copyright 2014-2017, University of Colorado Boulder

/**
 * Slider control for electronegativity.
 * Dragging the slider continuously updates an atom's electronegativity.
 * When the slider's thumb is released, it snaps to the closest tick mark.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Shape = require( 'KITE/Shape' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var electronegativityString = require( 'string!MOLECULE_POLARITY/electronegativity' );
  var lessString = require( 'string!MOLECULE_POLARITY/less' );
  var moreString = require( 'string!MOLECULE_POLARITY/more' );
  var patternAtomNameString = require( 'string!MOLECULE_POLARITY/pattern.atomName' );

  /**
   * @param {Atom} atom - the atom whose electronegativity we're controlling
   * @param {Molecule} molecule - molecule that the atom belongs to, for pausing animation while this control is used
   * @param {Object} [options]
   * @constructor
   */
  function ElectronegativityControl( atom, molecule, options ) {

    options = _.extend( {

      // ElectronegativityControl
      range: MPConstants.ELECTRONEGATIVITY_RANGE,
      tickInterval: MPConstants.ELECTRONEGATIVITY_TICK_SPACING,
      snapToTick: true,
      trackSize: new Dimension2( 150, 5 ),

      // Panel
      fill: atom.color,
      stroke: 'black',
      xMargin: 15,
      yMargin: 6
    }, options );

    // titles
    var titleNode = new Text( StringUtils.fillIn( patternAtomNameString, { name: atom.name } ), {
      font: new PhetFont( { size: 20, weight: 'bold' } ),
      maxWidth: options.trackSize.width
    } );
    var subtitleNode = new Text( electronegativityString, {
      font: new PhetFont( 18 ),
      maxWidth: options.trackSize.width
    } );

    // custom thumb
    var thumbNode = new PointyThumb( 30, 35 );
    thumbNode.touchArea = thumbNode.localBounds.dilatedXY( 10, 10 );

    // slider
    var sliderNode = new HSlider( atom.electronegativityProperty, options.range, {
      thumbNode: thumbNode,
      thumbYOffset: 10,
      trackSize: options.trackSize,
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
    var tickLabelOptions = {
      font: new PhetFont( 16 ),
      maxWidth: 40
    };
    sliderNode.addMajorTick( options.range.min, new Text( lessString, tickLabelOptions ) );
    sliderNode.addMajorTick( options.range.max, new Text( moreString, tickLabelOptions ) );
    var centerTick = options.range.min + ( options.range.getLength() / 2 );
    sliderNode.addMajorTick( centerTick );
    for ( var i = options.range.min + options.tickInterval; i < options.range.max; i += options.tickInterval ) {
      if ( i !== centerTick ) {
        sliderNode.addMinorTick( i );
      }
    }

    var content = new Node( { children: [ titleNode, subtitleNode, sliderNode ] } );

    // layout
    subtitleNode.centerX = sliderNode.centerX = titleNode.centerX;
    subtitleNode.top = titleNode.bottom;
    sliderNode.top = subtitleNode.bottom + 8;

    Panel.call( this, content, options );
  }

  moleculePolarity.register( 'ElectronegativityControl', ElectronegativityControl );

  inherit( Panel, ElectronegativityControl );

  /**
   * The slider thumb, origin at top center.
   *
   * @param {number} width
   * @param {number} height
   * @param {Object} [options]
   * @constructor
   */
  function PointyThumb( width, height, options ) {

    var self = this;

    options = _.extend( {
      stroke: 'black',
      lineWidth: 1,
      fill: 'rgb(50,145,184)',
      fillHighlighted: 'rgb(71,207,255)'
    }, options );

    // Set the radius of the arcs based on the height or width, whichever is smaller.
    var radiusScale = 0.15;
    var radius = ( width < height ) ? radiusScale * width : radiusScale * height;

    // Calculate some parameters of the upper triangles of the thumb for getting arc offsets.
    var hypotenuse = Math.sqrt( Math.pow( 0.5 * width, 2 ) + Math.pow( 0.3 * height, 2 ) );
    var angle = Math.acos( width * 0.5 / hypotenuse );
    var heightOffset = radius * Math.sin( angle );

    // Draw the thumb shape starting at the right upper corner of the pentagon below the arc,
    // this way we can get the arc coordinates for the arc in this corner from the other side,
    // which will be easier to calculate arcing from bottom to top.
    var shape = new Shape()
      .moveTo( 0.5 * width, 0.3 * height + heightOffset )
      .lineTo( 0.5 * width, height - radius )
      .arc( 0.5 * width - radius, height - radius, radius, 0, Math.PI / 2 )
      .lineTo( -0.5 * width + radius, height )
      .arc( -0.5 * width + radius, height - radius, radius, Math.PI / 2, Math.PI )
      .lineTo( -0.5 * width, 0.3 * height + heightOffset )
      .arc( -0.5 * width + radius, 0.3 * height + heightOffset, radius, Math.PI, Math.PI + angle );

    // Save the coordinates for the point above the left side arc, for use on the other side.
    var sideArcPoint = shape.getLastPoint();

    shape.lineTo( 0, 0 )
      .lineTo( -sideArcPoint.x, sideArcPoint.y )
      .arc( 0.5 * width - radius, 0.3 * height + heightOffset, radius, -angle, 0 )
      .close();

    Path.call( this, shape, options );

    // highlight thumb on pointer over
    this.addInputListener( new ButtonListener( {
      over: function( event ) {
        self.fill = options.fillHighlighted;
      },
      up: function( event ) {
        self.fill = options.fill;
      }
    } ) );
  }

  inherit( Path, PointyThumb );

  return ElectronegativityControl;
} );