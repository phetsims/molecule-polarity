// Copyright 2014-2020, University of Colorado Boulder

/**
 * Plate for E-field creation device.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Shape from '../../../../kite/js/Shape.js';
import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import EField from '../model/EField.js';
import Polarity from '../model/Polarity.js';
import MPColors from '../MPColors.js';
import PolarityIndicator from './PolarityIndicator.js';

// constants
const PLATE_OPTIONS = {
  fill: MPColors.PLATE,
  stroke: 'black'
};

class PlateNode extends Node {

  /**
   * @param {EField} eField
   * @param {Object} [options]
   */
  constructor( eField, options ) {

    options = merge( {
      polarity: Polarity.NEGATIVE,
      perspective: 'left', // 'left' or 'right'
      plateWidth: 50,
      plateHeight: 430,
      plateThickness: 5,
      platePerspectiveYOffset: 35, // y difference between foreground and background edges of the plate

      // phet-io
      tandem: Tandem.REQUIRED,
      visiblePropertyOptions: { phetioReadOnly: true }
    }, options );

    assert && assert( options.perspective === 'right' || options.perspective === 'left',
      'invalid perspective: ' + options.perspective );

    super( options );

    this.plateHeight = options.plateHeight; // @public used in view layout

    // polarity indicator
    const polarityIndicatorNode = new PolarityIndicator( { polarity: options.polarity } );

    // face of a positive plate, drawn in perspective, starting at upper-left and going clockwise
    const faceNode = new Path( new Shape()
        .moveTo( 0, options.platePerspectiveYOffset )
        .lineTo( options.plateWidth, 0 )
        .lineTo( options.plateWidth, options.plateHeight )
        .lineTo( 0, options.platePerspectiveYOffset + ( options.plateHeight - 2 * options.platePerspectiveYOffset ) )
        .close(),
      PLATE_OPTIONS
    );

    // side edge of a positive plate
    const edgeNode = new Rectangle( options.plateWidth, 0, options.plateThickness, options.plateHeight, PLATE_OPTIONS );

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

    // rendering order
    this.addChild( polarityIndicatorNode );
    this.addChild( plateNode );

    // Put the polarity indicator at the top center of the plate's face.
    polarityIndicatorNode.centerX = plateNode.centerX;
    polarityIndicatorNode.bottom = plateNode.top + ( options.platePerspectiveYOffset / 2 );

    // show/hide when the field is enabled/disabled... (unlink not needed)
    eField.enabledProperty.link( enabled => {
      this.visible = enabled;
    } );
  }

  /**
   * Creates a positive plate.
   * @param {EField} eField
   * @param {Object} [options]
   * @returns {PlateNode}
   * @public
   */
  static createPositive( eField, options ) {
    assert && assert( eField instanceof EField, 'invalid eField' );
    assert && assert( !options || !options.polarity, 'createPositive sets polarity' );
    assert && assert( !options || !options.perspective, 'createPositive sets perspective' );

    return new PlateNode( eField, merge( {
      polarity: Polarity.POSITIVE,
      perspective: 'right'
    }, options ) );
  }

  /**
   * Creates a negative plate.
   * @param {EField} eField
   * @param {Object} [options]
   * @returns {PlateNode}
   * @public
   */
  static createNegative( eField, options ) {
    assert && assert( eField instanceof EField, 'invalid eField' );
    assert && assert( !options || !options.polarity, 'createNegative sets polarity' );
    assert && assert( !options || !options.perspective, 'createNegative sets perspective' );

    return new PlateNode( eField, merge( {
      polarity: Polarity.NEGATIVE,
      perspective: 'left'
    }, options ) );
  }
}

moleculePolarity.register( 'PlateNode', PlateNode );

export default PlateNode;