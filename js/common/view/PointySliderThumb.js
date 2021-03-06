// Copyright 2017-2021, University of Colorado Boulder

/**
 * Slider thumb that points up, rounded corners, origin at top center.
 * See https://github.com/phetsims/molecule-polarity/issues/39
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Shape from '../../../../kite/js/Shape.js';
import merge from '../../../../phet-core/js/merge.js';
import PressListener from '../../../../scenery/js/listeners/PressListener.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';

class PointySliderThumb extends Path {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      size: new Dimension2( 30, 35 ),
      stroke: 'black',
      lineWidth: 1,
      fill: 'rgb( 50, 145, 184 )',
      fillHighlighted: 'rgb( 71, 207, 255 )',
      tandem: Tandem.REQUIRED
    }, options );

    // To improve readability
    const width = options.size.width;
    const height = options.size.height;

    // Set the radius of the arcs based on the height or width, whichever is smaller.
    const radiusScale = 0.15;
    const radius = ( width < height ) ? radiusScale * width : radiusScale * height;

    // Calculate some parameters of the upper triangles of the thumb for getting arc offsets.
    const hypotenuse = Math.sqrt( Math.pow( 0.5 * width, 2 ) + Math.pow( 0.3 * height, 2 ) );
    const angle = Math.acos( width * 0.5 / hypotenuse );
    const heightOffset = radius * Math.sin( angle );

    // Draw the thumb shape starting at the right upper corner of the pentagon below the arc,
    // this way we can get the arc coordinates for the arc in this corner from the other side,
    // which will be easier to calculate arcing from bottom to top.
    const shape = new Shape()
      .moveTo( 0.5 * width, 0.3 * height + heightOffset )
      .lineTo( 0.5 * width, height - radius )
      .arc( 0.5 * width - radius, height - radius, radius, 0, Math.PI / 2 )
      .lineTo( -0.5 * width + radius, height )
      .arc( -0.5 * width + radius, height - radius, radius, Math.PI / 2, Math.PI )
      .lineTo( -0.5 * width, 0.3 * height + heightOffset )
      .arc( -0.5 * width + radius, 0.3 * height + heightOffset, radius, Math.PI, Math.PI + angle );

    // Save the coordinates for the point above the left side arc, for use on the other side.
    const sideArcPoint = shape.getLastPoint();

    shape.lineTo( 0, 0 )
      .lineTo( -sideArcPoint.x, sideArcPoint.y )
      .arc( 0.5 * width - radius, 0.3 * height + heightOffset, radius, -angle, 0 )
      .close();

    super( shape, options );

    // highlight thumb on pointer over
    const pressListener = new PressListener( {
      attach: false,
      tandem: options.tandem.createTandem( 'pressListener' )
    } );
    pressListener.isHighlightedProperty.link( isHighlighted => {
      this.fill = isHighlighted ? options.fillHighlighted : options.fill;
    } );
    this.addInputListener( pressListener );
  }
}

moleculePolarity.register( 'PointySliderThumb', PointySliderThumb );
export default PointySliderThumb;