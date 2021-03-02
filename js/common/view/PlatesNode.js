// Copyright 2014-2020, University of Colorado Boulder

/**
 * PlatesNode displays the plates for the E-field creation device.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Shape from '../../../../kite/js/Shape.js';
import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import moleculePolarity from '../../moleculePolarity.js';
import EField from '../model/EField.js';
import Polarity from '../model/Polarity.js';
import MPColors from '../MPColors.js';
import PolarityIndicator from './PolarityIndicator.js';

class PlatesNode extends Node {

  /**
   * @param {EField} eField
   * @param {Object} [options]
   */
  constructor( eField, options ) {
    assert && assert( eField instanceof EField, 'invalid eField' );

    options = merge( {
      align: 'bottom',
      spacing: 500,
      plateOptions: {
        plateWidth: 50,
        plateHeight: 430,
        plateThickness: 5,
        platePerspectiveYOffset: 35
      }
    }, options );

    const negativePlateNode = new PlateNode( eField, merge( {
      polarity: Polarity.NEGATIVE,
      perspective: 'left'
    }, options.plateOptions ) );

    const positivePlateNode = new PlateNode( eField, merge( {
      polarity: Polarity.POSITIVE,
      perspective: 'right',
      left: negativePlateNode.right + options.spacing,
      bottom: negativePlateNode.bottom
    }, options.plateOptions ) );

    assert && assert( !options.children, 'PlateNodes sets children' );
    options.children = [ negativePlateNode, positivePlateNode ];

    super( options );

    // @public for layout
    this.plateHeight = options.plateOptions.plateHeight;
  }
}

/**
 * PlateNode is a single plate.
 */
class PlateNode extends Node {

  /**
   * @param {EField} eField
   * @param {Object} [options]
   */
  constructor( eField, options ) {
    assert && assert( eField instanceof EField, 'invalid eField' );

    options = merge( {
      polarity: Polarity.NEGATIVE,
      perspective: 'left', // 'left' or 'right'
      plateWidth: 50,
      plateHeight: 430,
      plateThickness: 5,
      platePerspectiveYOffset: 35 // y difference between foreground and background edges of the plate
    }, options );

    assert && assert( options.perspective === 'right' || options.perspective === 'left',
      'invalid perspective: ' + options.perspective );

    // polarity indicator
    const polarityIndicatorNode = new PolarityIndicator( { polarity: options.polarity } );

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
    if ( options.polarity === Polarity.NEGATIVE ) {
      plateNode.setScaleMagnitude( -1, 1 );
    }

    // Put the polarity indicator at the top center of the plate's face.
    polarityIndicatorNode.centerX = plateNode.centerX;
    polarityIndicatorNode.bottom = plateNode.top + ( options.platePerspectiveYOffset / 2 );

    assert && assert( !options.children, 'PlateNode sets children' );
    options.children = [ polarityIndicatorNode, plateNode ];

    super( options );

    // show/hide when the field is enabled/disabled... (unlink not needed)
    eField.enabledProperty.link( enabled => {
      this.visible = enabled;
    } );
  }
}

moleculePolarity.register( 'PlatesNode', PlatesNode );
export default PlatesNode;