// Copyright 2002-2014, University of Colorado Boulder

/**
 * A single- or double-headed curved arrow.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  //TODO for single-head, is tip at startAngle or endAngle?
  /**
   * @param {Number}radius radius at the center of the arrow's tail
   * @param {Number} startAngle starting angle, in radians
   * @param {Number} endAngle end angle, in radians
   * @param {*} options
   * @constructor
   */
  function CurvedArrowNode( radius, startAngle, endAngle, options ) {

    // default options
    options = _.extend( {
      headHeight: 10,
      headWidth: 10,
      tailWidth: 5,
      doubleHead: false, // true puts heads on both ends of the arrow, false puts a head at the tip
      fill: 'black',
      stroke: 'black',
      lineWidth: 1,
      anticlockwise: false //TODO does this work correctly?
    }, options );

    //TODO verify that tail length is > 0

    var shape = new Shape()
      .arc( 0, 0, radius + options.tailWidth / 2, startAngle, endAngle, options.anticlockwise )
      .arc( 0, 0, radius - options.tailWidth / 2, endAngle, startAngle, !options.anticlockwise )
      .close();

    Path.call( this, shape, options );
  }

  return inherit( Path, CurvedArrowNode );
} );
