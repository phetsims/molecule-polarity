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
      dx = startArcOuterX - startArcInnerX;
      dy = startArcOuterY - startArcInnerY;
      dist = Math.sqrt( dx * dx + dy * dy );
      dx /= dist;
      dy /= dist;
      var startTipX = startArcCenterX + options.headHeight * dy;
      var startTipY = startArcCenterY - options.headHeight * dx;

      // head at startAngle
      shape.moveTo( startArcInnerX, startArcInnerY )
        .lineTo( startTipX, startTipY )
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
    dx = endArcInnerX - endArcOuterX;
    dy = endArcInnerY - endArcOuterY;
    dist = Math.sqrt( dx * dx + dy * dy );
    dx /= dist;
    dy /= dist;
    var endTipX = endArcCenterX + options.headHeight * dy;
    var endTipY = endArcCenterY - options.headHeight * dx;

    // arrow head at endAngle
    shape.lineTo( endArcOuterX, endArcOuterY )
      .lineTo( endTipX, endTipY )
      .lineTo( endArcInnerX, endArcInnerY );

    // inner arc from endAngle to startAngle
    shape.arc( 0, 0, radius - options.tailWidth / 2, endAngle, startAngle, !options.anticlockwise )
      .close();

    Path.call( this, shape, options );
  }

  return inherit( Path, CurvedArrowNode );
} );
