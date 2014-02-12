// Copyright 2002-2014, University of Colorado Boulder

/**
 * Base class for visual representation of 2D dipoles.
 * The dipole is created at (0,0) with proper length and orientation, and it's up to subclasses to position the dipole.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  // Note: heights are parallel to dipole axis, widths are perpendicular.
  var REFERENCE_MAGNITUDE = MPConstants.ELECTRONEGATIVITY_RANGE.getLength(); // model value
  var REFERENCE_LENGTH = 135; // view size that corresponds to REFERENCE_MAGNITUDE
  var HEAD_SIZE = new Dimension2( 12, 20 ); // similar to Jmol
  var CROSS_SIZE = new Dimension2( 10, 10 ); // similar to Jmol
  var REFERENCE_CROSS_OFFSET = 20; // offset from the tail of the arrow when arrow length is REFERENCE_LENGTH
  var TAIL_WIDTH = 4; // similar to Jmol
  var FRACTIONAL_HEAD_HEIGHT = 0.4; // when the head size is more than fractionalHeadHeight * arrow length, a 'unit dipole' will be scaled.

  /**
   * @param {Property<Vector2>} dipoleProperty
   * @param {Color|String} color
   * @constructor
   */
  function DipoleNode( dipoleProperty, color ) {

    var thisNode = this;
    Path.call( thisNode, null, { fill: color, stroke: 'black' } );

    this.referenceMagnitude = REFERENCE_MAGNITUDE; // @protected
    this.referenceLength = REFERENCE_LENGTH; // @protected

    dipoleProperty.link( function( dipole ) {
        if ( dipole.magnitude() === 0 ) {
          thisNode.shape = null;
        }
        else {

          // Determine parameters for the shape.
          var desiredLength = dipole.magnitude() * ( REFERENCE_LENGTH / REFERENCE_MAGNITUDE );
          var adjustedLength = desiredLength;
          var scale = 1;
          if ( HEAD_SIZE.height > FRACTIONAL_HEAD_HEIGHT * desiredLength ) {
            // We'll be drawing a unit dipole and scaling it.
            adjustedLength = HEAD_SIZE.height / FRACTIONAL_HEAD_HEIGHT;
            scale = desiredLength/ adjustedLength;
          }
          var crossOffset = scale * REFERENCE_CROSS_OFFSET * adjustedLength / REFERENCE_LENGTH;
          var crossWidth = scale * CROSS_SIZE.width;

          // Draw a dipole that points from left to right, starting at upper-left end of tail and moving clockwise.
          thisNode.shape = new Shape()
            .moveTo( 0, -TAIL_WIDTH / 2 )
            .lineTo( crossOffset, -TAIL_WIDTH / 2 )
            .lineTo( crossOffset, -CROSS_SIZE.height / 2 )
            .lineTo( crossOffset + crossWidth, -CROSS_SIZE.height / 2 )
            .lineTo( crossOffset + crossWidth, -TAIL_WIDTH / 2 )
            .lineTo( adjustedLength - HEAD_SIZE.height, -TAIL_WIDTH / 2  )
            .lineTo( adjustedLength - HEAD_SIZE.height, -HEAD_SIZE.width / 2 )
            .lineTo( adjustedLength, 0 )
            .lineTo( adjustedLength - HEAD_SIZE.height, HEAD_SIZE.width / 2 )
            .lineTo( adjustedLength - HEAD_SIZE.height, TAIL_WIDTH / 2  )
            .lineTo( crossOffset + crossWidth, TAIL_WIDTH / 2 )
            .lineTo( crossOffset + crossWidth, CROSS_SIZE.height / 2 )
            .lineTo( crossOffset, CROSS_SIZE.height / 2 )
            .lineTo( crossOffset, TAIL_WIDTH / 2 )
            .lineTo( 0, TAIL_WIDTH / 2 )
            .close();

          // Adjust for proper scale and orientation.
          thisNode.setScaleMagnitude( scale, scale );
          thisNode.setRotation( dipole.angle() );
        }
      }
    );
  }

  return inherit( Path, DipoleNode, {}, {

    /*
     * Creates a dipole icon, with arrow pointing to the right.
     * @static
     * @param {Color} color
     * @return {Node}
     */
    createIcon: function( color ) {
      return new DipoleNode( new Property( new Vector2( 0.5, 0 ) ), color );
    }
  } );
} );


