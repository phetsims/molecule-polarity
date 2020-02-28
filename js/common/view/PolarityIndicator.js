// Copyright 2014-2020, University of Colorado Boulder

/**
 * Indicator of polarity (positive or negative) used on E-field plates.
 * Origin at center of cross hairs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import moleculePolarity from '../../moleculePolarity.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function PolarityIndicator( options ) {

  options = merge( {
    polarity: 'positive', // 'positive' or 'negative'
    radius: 20,
    lineWidth: 4,
    stroke: 'black'
  }, options );

  assert && assert( options.polarity === 'negative' || options.polarity === 'positive',
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

inherit( Node, PolarityIndicator );
export default PolarityIndicator;