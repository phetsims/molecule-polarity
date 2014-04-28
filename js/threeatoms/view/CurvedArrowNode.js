// Copyright 2002-2014, University of Colorado Boulder

/**
 * A single- or double-headed curved arrow.
 * Arrow heads are not curved, their tips are perpendicular to the ends of the arrow tail.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * This is a general algorithm, used herein to compute the point for an arrow's tip.
   * Given 2 points that define a line segment (the arrow's base), compute the point (the tip) that
   * is a specified distance away from a perpendicular line that runs through the center point
   * of the line segment.
   *
   * @param x1
   * @param y1
   * @param x2
   * @param y2
   * @param distance
   * @returns {Vector2}
   */
  var computePerpendicularPoint = function( x1, y1, x2, y2, distance ) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    var r = Math.sqrt( dx * dx + dy * dy );
    // midpoint + distance * unitVector
    var x = ( x1 + x2 ) / 2 + ( distance * dy / r );
    var y = ( y1 + y2 ) / 2 - ( distance * dx / r );
    return new Vector2( x, y );
  };

  /**
   * @param {Number} radius radius at the center of the arrow's tail
   * @param {Number} startAngle starting angle, in radians (at tail, or base of optional arrow)
   * @param {Number} endAngle end angle, in radians (at base of arrow)
   * @param {*} options
   * @constructor
   */
  function CurvedArrowNode( radius, startAngle, endAngle, options ) {

    // default options
    options = _.extend( {
      headHeight: 10,
      headWidth: 10,
      tailWidth: 5,
      doubleHead: false, // true puts heads on both ends of the arrow, false puts a head at endAngle
      fill: 'black',
      stroke: 'black',
      lineWidth: 1
    }, options );
    
    var shape = new Shape();
    
    // Points that define the base of an arrow head. 'inner' is closer to the center of the circle, 'outer' is farther away.
    var baseInnerX, baseInnerY, baseOuterX, baseOuterY;

    // optional head at startAngle
    if ( options.doubleHead ) {

      // base of the arrow head at startAngle
      baseInnerX = Math.cos( startAngle ) * ( radius - options.headWidth / 2 );
      baseInnerY = Math.sin( startAngle ) * ( radius - options.headWidth / 2 );
      baseOuterX = Math.cos( startAngle ) * ( radius + options.headWidth / 2 );
      baseOuterY = Math.sin( startAngle ) * ( radius + options.headWidth / 2 );

      // tip of the arrow head at startAngle
      var startTip = computePerpendicularPoint( baseOuterX, baseOuterY, baseInnerX, baseInnerY, options.headHeight );

      // head at startAngle
      shape.moveTo( baseInnerX, baseInnerY )
        .lineTo( startTip.x, startTip.y )
        .lineTo( baseOuterX, baseOuterY );
    }

    // outer arc from startAngle to endAngle
    shape.arc( 0, 0, radius + options.tailWidth / 2, startAngle, endAngle, options.anticlockwise );

    // base of the arrow head at endAngle
    baseInnerX = Math.cos( endAngle ) * ( radius - options.headWidth / 2 );
    baseInnerY = Math.sin( endAngle ) * ( radius - options.headWidth / 2 );
    baseOuterX = Math.cos( endAngle ) * ( radius + options.headWidth / 2 );
    baseOuterY = Math.sin( endAngle ) * ( radius + options.headWidth / 2 );

    // tip of the arrow head at endAngle
    var endTip = computePerpendicularPoint( baseInnerX, baseInnerY, baseOuterX, baseOuterY, options.headHeight );

    // arrow head at endAngle
    shape.lineTo( baseOuterX, baseOuterY )
      .lineTo( endTip.x, endTip.y )
      .lineTo( baseInnerX, baseInnerY );

    // inner arc from endAngle to startAngle
    shape.arc( 0, 0, radius - options.tailWidth / 2, endAngle, startAngle, !options.anticlockwise )
      .close();

    Path.call( this, shape, options );
  }

  return inherit( Path, CurvedArrowNode );
} );
