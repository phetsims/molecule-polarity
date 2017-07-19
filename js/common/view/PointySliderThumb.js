// Copyright 2017, University of Colorado Boulder

/**
 * Slider thumb that points up, rounded corners, origin at top center.
 * See https://github.com/phetsims/molecule-polarity/issues/39
 */
define( function( require ) {
  'use strict';

  // modules
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function PointySliderThumb( options ) {

    var self = this;

    options = _.extend( {
      size: new Dimension2( 30, 35 ),
      stroke: 'black',
      lineWidth: 1,
      fill: 'rgb( 50, 145, 184 )',
      fillHighlighted: 'rgb( 71, 207, 255 )'
    }, options );

    // To improve readability
    var width = options.size.width;
    var height = options.size.height;

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

  moleculePolarity.register( 'PointySliderThumb', PointySliderThumb );

  return inherit( Path, PointySliderThumb );
} );
