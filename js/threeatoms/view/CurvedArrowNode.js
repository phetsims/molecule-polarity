// Copyright 2002-2014, University of Colorado Boulder

/**
 * A single- or double-headed curved arrow.
 * Arrow heads are not curved, their tips are perpendicular to the ends of the arrow tail.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CurvedArrowShape = require( 'MOLECULE_POLARITY/threeatoms/view/CurvedArrowShape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );

  /**
   * @param {Number} radius radius at the center of the arrow's tail
   * @param {Number} startAngle starting angle, in radians (at tail, or base of optional arrow)
   * @param {Number} endAngle end angle, in radians (at base of arrow)
   * @param {Object} [options]
   * @constructor
   */
  function CurvedArrowNode( radius, startAngle, endAngle, options ) {

    options = _.extend( {
      fill: 'black',
      stroke: 'black',
      lineWidth: 1
    }, options );

    Path.call( this, new CurvedArrowShape( radius, startAngle, endAngle, options ), options );
  }

  return inherit( Path, CurvedArrowNode );
} );
