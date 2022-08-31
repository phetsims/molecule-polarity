// Copyright 2014-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Abstract base type for visual representation of 2D dipoles.
 * The dipole is created at (0,0) with proper length and orientation, and the subtype is responsible
 * for positioning the dipole.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import { Shape } from '../../../../kite/js/imports.js';
import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import { Path } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';

// constants
// Note: heights are parallel to dipole axis, widths are perpendicular.
const REFERENCE_MAGNITUDE = MPConstants.ELECTRONEGATIVITY_RANGE.getLength(); // model value
const REFERENCE_LENGTH = 135; // view size that corresponds to REFERENCE_MAGNITUDE
const HEAD_SIZE = new Dimension2( 12, 20 ); // similar to Jmol
const CROSS_SIZE = new Dimension2( 10, 10 ); // similar to Jmol
const REFERENCE_CROSS_OFFSET = 20; // offset from the tail of the arrow when arrow length is REFERENCE_LENGTH
const TAIL_WIDTH = 4; // similar to Jmol
const FRACTIONAL_HEAD_HEIGHT = 0.4; // when the head height is more than FRACTIONAL_HEAD_HEIGHT * length, a 'unit dipole' will be scaled.

class DipoleNode extends Path {

  /**
   * @param {ReadOnlyProperty.<Vector2>} dipoleProperty
   * @param {Object} [options]
   * @abstract
   */
  constructor( dipoleProperty, options ) {
    assert && AssertUtils.assertAbstractPropertyOf( dipoleProperty, Vector2 );

    options = merge( {
      fill: 'black',
      stroke: 'black'
    }, options );

    super( null, options );

    this.referenceMagnitude = REFERENCE_MAGNITUDE; // @protected
    this.referenceLength = REFERENCE_LENGTH; // @protected

    // unlink not needed
    dipoleProperty.link( dipole => {
      if ( dipole.magnitude === 0 ) {
        this.shape = null;
      }
      else {

        // Determine parameters for the shape.
        const desiredLength = dipole.magnitude * ( REFERENCE_LENGTH / REFERENCE_MAGNITUDE );
        let adjustedLength = desiredLength;
        let scale = 1;
        if ( HEAD_SIZE.height > FRACTIONAL_HEAD_HEIGHT * desiredLength ) {
          // We'll be drawing a unit dipole and scaling it.
          adjustedLength = HEAD_SIZE.height / FRACTIONAL_HEAD_HEIGHT;
          scale = desiredLength / adjustedLength;
        }
        const crossOffset = scale * REFERENCE_CROSS_OFFSET * adjustedLength / REFERENCE_LENGTH;
        const crossWidth = scale * CROSS_SIZE.width * adjustedLength / REFERENCE_LENGTH;

        // Draw a dipole that points from left to right, starting at upper-left end of tail and moving clockwise.
        this.shape = new Shape()
          .moveTo( 0, -TAIL_WIDTH / 2 )
          .lineTo( crossOffset, -TAIL_WIDTH / 2 )
          .lineTo( crossOffset, -CROSS_SIZE.height / 2 )
          .lineTo( crossOffset + crossWidth, -CROSS_SIZE.height / 2 )
          .lineTo( crossOffset + crossWidth, -TAIL_WIDTH / 2 )
          .lineTo( adjustedLength - HEAD_SIZE.height, -TAIL_WIDTH / 2 )
          .lineTo( adjustedLength - HEAD_SIZE.height, -HEAD_SIZE.width / 2 )
          .lineTo( adjustedLength, 0 )
          .lineTo( adjustedLength - HEAD_SIZE.height, HEAD_SIZE.width / 2 )
          .lineTo( adjustedLength - HEAD_SIZE.height, TAIL_WIDTH / 2 )
          .lineTo( crossOffset + crossWidth, TAIL_WIDTH / 2 )
          .lineTo( crossOffset + crossWidth, CROSS_SIZE.height / 2 )
          .lineTo( crossOffset, CROSS_SIZE.height / 2 )
          .lineTo( crossOffset, TAIL_WIDTH / 2 )
          .lineTo( 0, TAIL_WIDTH / 2 )
          .close();

        // Adjust for proper scale and orientation.
        this.setScaleMagnitude( scale, scale );
        this.setRotation( dipole.angle );
      }
    } );
  }

  /**
   * Creates a dipole icon, with arrow pointing to the right.
   * @param {Object} [options] - options to DipoleNode
   * @returns {Node}
   * @public
   * @static
   */
  static createIcon( options ) {
    return new DipoleNode( new Vector2Property( new Vector2( 0.65, 0 ) ), options );
  }
}

moleculePolarity.register( 'DipoleNode', DipoleNode );
export default DipoleNode;