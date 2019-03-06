// Copyright 2014-2019, University of Colorado Boulder

/**
 * Abstract base type for visual representation of 2D dipoles.
 * The dipole is created at (0,0) with proper length and orientation, and the subtype is responsible
 * for positioning the dipole.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );
  var Vector2Property = require( 'DOT/Vector2Property' );

  // constants
  // Note: heights are parallel to dipole axis, widths are perpendicular.
  var REFERENCE_MAGNITUDE = MPConstants.ELECTRONEGATIVITY_RANGE.getLength(); // model value
  var REFERENCE_LENGTH = 135; // view size that corresponds to REFERENCE_MAGNITUDE
  var HEAD_SIZE = new Dimension2( 12, 20 ); // similar to Jmol
  var CROSS_SIZE = new Dimension2( 10, 10 ); // similar to Jmol
  var REFERENCE_CROSS_OFFSET = 20; // offset from the tail of the arrow when arrow length is REFERENCE_LENGTH
  var TAIL_WIDTH = 4; // similar to Jmol
  var FRACTIONAL_HEAD_HEIGHT = 0.4; // when the head height is more than FRACTIONAL_HEAD_HEIGHT * length, a 'unit dipole' will be scaled.

  /**
   * @param {Vector2Property} dipoleProperty
   * @param {Color|String} color
   * @constructor
   * @abstract
   */
  function DipoleNode( dipoleProperty, color ) {

    var self = this;

    Path.call( this, null, { fill: color, stroke: 'black' } );

    this.referenceMagnitude = REFERENCE_MAGNITUDE; // @protected
    this.referenceLength = REFERENCE_LENGTH; // @protected

    // unlink not needed
    dipoleProperty.link( function( dipole ) {
      if ( dipole.magnitude === 0 ) {
          self.shape = null;
        }
        else {

          // Determine parameters for the shape.
        var desiredLength = dipole.magnitude * ( REFERENCE_LENGTH / REFERENCE_MAGNITUDE );
          var adjustedLength = desiredLength;
          var scale = 1;
          if ( HEAD_SIZE.height > FRACTIONAL_HEAD_HEIGHT * desiredLength ) {
            // We'll be drawing a unit dipole and scaling it.
            adjustedLength = HEAD_SIZE.height / FRACTIONAL_HEAD_HEIGHT;
            scale = desiredLength / adjustedLength;
          }
          var crossOffset = scale * REFERENCE_CROSS_OFFSET * adjustedLength / REFERENCE_LENGTH;
          var crossWidth = scale * CROSS_SIZE.width * adjustedLength / REFERENCE_LENGTH;

          // Draw a dipole that points from left to right, starting at upper-left end of tail and moving clockwise.
          self.shape = new Shape()
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
          self.setScaleMagnitude( scale, scale );
          self.setRotation( dipole.angle );
        }
      }
    );
  }

  moleculePolarity.register( 'DipoleNode', DipoleNode );

  return inherit( Path, DipoleNode, {}, {

    /*
     * Creates a dipole icon, with arrow pointing to the right.
     * @param {Color} color
     * @returns {Node}
     * @public
     * @static
     */
    createIcon: function( color ) {
      return new DipoleNode( new Vector2Property( new Vector2( 0.65, 0 ) ), color );
    }
  } );
} );


