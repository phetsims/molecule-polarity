// Copyright 2014-2022, University of Colorado Boulder

/**
 * Indicator of polarity (positive or negative) used on E-field plates.
 * Origin at center of cross hairs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Circle, CircleOptions, Line, Node } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import { Polarity } from '../model/Polarity.js';

export default class PolarityIndicator extends Node {

  public constructor( polarity: Polarity, radius = 20 ) {

    super();

    const pathOptions: CircleOptions = {
      lineWidth: 4,
      stroke: 'black'
    };

    // circle
    this.addChild( new Circle( radius, pathOptions ) );

    // horizontal bar for plus or minus sign
    this.addChild( new Line( -0.5 * radius, 0, 0.5 * radius, 0, pathOptions ) );

    // vertical bar for plus sign
    if ( polarity === 'positive' ) {
      this.addChild( new Line( 0, -0.5 * radius, 0, 0.5 * radius, pathOptions ) );
    }

    // vertical connecting bar
    this.addChild( new Line( 0, radius, 0, 2 * radius, pathOptions ) );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'PolarityIndicator', PolarityIndicator );