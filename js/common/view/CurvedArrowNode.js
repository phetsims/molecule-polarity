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
      clockwise: true
    }, options );

    var shape = new Shape()
      .arc( 0, 0, radius + options.headWidth / 2, startAngle, endAngle, false )
      .arc( 0, 0, radius - options.headWidth / 2, endAngle, startAngle, true )
      .close();

    Path.call( this, shape, options );
  }

  return inherit( Path, CurvedArrowNode );
} );
