// Copyright 2022-2025, University of Colorado Boulder

/**
 * PlatesNode is a single plate for the E-field creation device.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import moleculePolarity from '../../moleculePolarity.js';
import { Polarity } from '../model/Polarity.js';
import MPColors from '../MPColors.js';
import PolarityIndicator from './PolarityIndicator.js';

type Perspective = 'left' | 'right';

type SelfOptions = {
  perspective?: Perspective;
  plateWidth?: number;
  plateHeight?: number;
  plateThickness?: number;
  platePerspectiveYOffset?: number; // y difference between foreground and background edges of the plate
};

export type PlateNodeOptions = SelfOptions;

export default class PlateNode extends Node {

  public readonly plateHeight: number;

  public constructor( polarity: Polarity, providedOptions?: PlateNodeOptions ) {

    const options = optionize<PlateNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      perspective: 'left',
      plateWidth: 50,
      plateHeight: 430,
      plateThickness: 5,
      platePerspectiveYOffset: 35,

      // NodeOptions
      isDisposable: false
    }, providedOptions );

    // polarity indicator
    const polarityIndicatorNode = new PolarityIndicator( polarity );

    // constants
    const plateOptions = {
      fill: MPColors.PLATE,
      stroke: 'black'
    };

    // face of a positive plate, drawn in perspective, starting at upper-left and going clockwise
    const faceNode = new Path( new Shape()
        .moveTo( 0, options.platePerspectiveYOffset )
        .lineTo( options.plateWidth, 0 )
        .lineTo( options.plateWidth, options.plateHeight )
        .lineTo( 0, options.platePerspectiveYOffset + ( options.plateHeight - 2 * options.platePerspectiveYOffset ) )
        .close(),
      plateOptions
    );

    // side edge of a positive plate
    const edgeNode = new Rectangle( options.plateWidth, 0, options.plateThickness, options.plateHeight, plateOptions );

    const plateNode = new Node( {
      children: [
        edgeNode,
        faceNode
      ]
    } );

    // The plate is drawn in perspective for positive polarity.
    // If the polarity is negative, reflect about the y axis.
    if ( polarity === 'negative' ) {
      plateNode.setScaleMagnitude( -1, 1 );
    }

    // Put the polarity indicator at the top center of the plate's face.
    polarityIndicatorNode.centerX = plateNode.centerX;
    polarityIndicatorNode.bottom = plateNode.top + ( options.platePerspectiveYOffset / 2 );

    options.children = [ polarityIndicatorNode, plateNode ];

    super( options );

    this.plateHeight = options.plateHeight;
  }
}

moleculePolarity.register( 'PlateNode', PlateNode );