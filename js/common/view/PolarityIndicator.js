// Copyright 2014-2019, University of Colorado Boulder

/**
 * Indicator of polarity (positive or negative) used on E-field plates.
 * Origin at center of cross hairs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'SCENERY/nodes/Line' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function PolarityIndicator( options ) {

    options = _.extend( {
      polarity: 'positive', // 'positive' or 'negative'
      radius: 20,
      lineWidth: 4,
      stroke: 'black'
    }, options );

    assert && assert ( options.polarity === 'negative' || options.polarity === 'positive' ,
      'invalid polarity: ' + options.polarity );

    Node.call( this );

    const pathOptions = { stroke: options.stroke, lineWidth: options.lineWidth };

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

  moleculePolarity.register( 'PolarityIndicator', PolarityIndicator );

  return inherit( Node, PolarityIndicator );
} );

