// Copyright 2014-2022, University of Colorado Boulder

/**
 * Indicator of polarity (positive or negative) used on E-field plates.
 * Origin at center of cross hairs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Circle, Line, Node } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';

class PolarityIndicator extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      polarity: 'positive',
      radius: 20,
      lineWidth: 4,
      stroke: 'black'
    }, options );

    super();

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
}

moleculePolarity.register( 'PolarityIndicator', PolarityIndicator );
export default PolarityIndicator;