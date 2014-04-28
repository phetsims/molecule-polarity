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
   * @param centerX
   * @param centerY
   * @param distance
   * @returns {Vector2}
   */
  var computePerpendicularPoint = function( x1, y1, x2, y2, centerX, centerY, distance ) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    var dist = Math.sqrt( dx * dx + dy * dy );
    dx /= dist;
    dy /= dist;
    var x = centerX + distance * dy;
    var y = centerY - distance * dx;
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

    // temporary vars for computing arrow tips
    var dx, dy, dist;

    var shape = new Shape();

    // optional head at startAngle
    if ( options.doubleHead ) {

      // points on the base of the arrow head at startAngle
      var startArcCenterX = Math.cos( startAngle ) * radius;
      var startArcCenterY = Math.sin( startAngle ) * radius;
      var startArcInnerX = Math.cos( startAngle ) * ( radius - options.headWidth / 2 );
      var startArcInnerY = Math.sin( startAngle ) * ( radius - options.headWidth / 2 );
      var startArcOuterX = Math.cos( startAngle ) * ( radius + options.headWidth / 2 );
      var startArcOuterY = Math.sin( startAngle ) * ( radius + options.headWidth / 2 );

      // tip of the arrow head at startAngle
      var startTip = computePerpendicularPoint( startArcOuterX, startArcOuterY, startArcInnerX, startArcInnerY, startArcCenterX, startArcCenterY, options.headHeight );

      // head at startAngle
      shape.moveTo( startArcInnerX, startArcInnerY )
        .lineTo( startTip.x, startTip.y )
        .lineTo( startArcOuterX, startArcOuterY );
    }

    // outer arc from startAngle to endAngle
    shape.arc( 0, 0, radius + options.tailWidth / 2, startAngle, endAngle, options.anticlockwise );

    // points on the base of the arrow head at endAngle
    var endArcCenterX = Math.cos( endAngle ) * radius;
    var endArcCenterY = Math.sin( endAngle ) * radius;
    var endArcInnerX = Math.cos( endAngle ) * ( radius - options.headWidth / 2 );
    var endArcInnerY = Math.sin( endAngle ) * ( radius - options.headWidth / 2 );
    var endArcOuterX = Math.cos( endAngle ) * ( radius + options.headWidth / 2 );
    var endArcOuterY = Math.sin( endAngle ) * ( radius + options.headWidth / 2 );

    // tip of the arrow head at endAngle
    var endTip = computePerpendicularPoint( endArcInnerX, endArcInnerY, endArcOuterX, endArcOuterY, endArcCenterX, endArcCenterY, options.headHeight );

    // arrow head at endAngle
    shape.lineTo( endArcOuterX, endArcOuterY )
      .lineTo( endTip.x, endTip.y )
      .lineTo( endArcInnerX, endArcInnerY );

    // inner arc from endAngle to startAngle
    shape.arc( 0, 0, radius - options.tailWidth / 2, endAngle, startAngle, !options.anticlockwise )
      .close();

    Path.call( this, shape, options );
  }

  return inherit( Path, CurvedArrowNode );
} );
