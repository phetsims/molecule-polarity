// Copyright 2002-2014, University of Colorado Boulder

/**
 * Indicator of polarity (positive or negative) used on E-field plates.
 * Origin at center of cross hairs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );

  function PolarityIndicator( options ) {

    options = _.extend( {
      polarity: 'positive', // 'positive' or 'negative'
      radius: 20,
      lineWidth: 4,
      stroke: 'black'
    }, options );

    Node.call( this );
    
    var pathOptions = { stroke: options.stroke, lineWidth: options.lineWidth };

    // circle
    this.addChild( new Circle( options.radius, pathOptions ) );

    // horizontal bar for plus or minus sign
    this.addChild( new Line( -0.5 * options.radius, 0, 0.5 * options.radius, 0, pathOptions ) );

    // vertical bar for plus sign
    if ( options.polarity === 'positive' ) {
      this.addChild( new Line( 0, -0.5 * options.radius, 0, 0.5 * options.radius, pathOptions ) );
    }
    
    // vertical connecting bar
    this.addChild( new Line( 0, options.radius, 0, 2 * options.radius, pathOptions ) );

    this.mutate( options );
  }

  return inherit( Node, PolarityIndicator );
} );

