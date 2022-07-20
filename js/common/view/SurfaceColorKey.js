// Copyright 2014-2021, University of Colorado Boulder

/**
 * Key for a surface's color scheme. This legend is a rectangular box with a gradient fill that matches the surface
 * in the Molecule. Each label is a unit for a color.
 * Uses static factory methods to supply the needed instances for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { LinearGradient, Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import MPColors from '../MPColors.js';

class SurfaceColorKey extends Node {

  /**
   * @param {ColorDef[]} colors colors used for the gradient, in left-to-right order
   * @param {string} title
   * @param {string} leftLabel
   * @param {string} rightLabel
   * @param {Object} [options]
   */
  constructor( colors, title, leftLabel, rightLabel, options ) {
    assert && assert( Array.isArray( colors ), 'invalid colors' );
    assert && assert( typeof title === 'string', 'invalid title' );
    assert && assert( typeof leftLabel === 'string', 'invalid leftLabel' );
    assert && assert( typeof rightLabel === 'string', 'rightLabel title' );

    options = merge( {
      size: new Dimension2( 420, 20 ),
      titleVisible: true,
      titleFont: new PhetFont( { size: 16, weight: 'bold' } ),
      rangeFont: new PhetFont( 16 ),
      xMargin: 0,
      ySpacing: 2,
      tandem: Tandem.OPTIONAL
    }, options );

    super();

    // gradient rectangle
    const gradient = new LinearGradient( 0, 0, options.size.width, options.size.height );

    for ( let i = 0; i < colors.length; i++ ) {

      // colors are ordered negative to positive, so apply in reverse order
      const color = colors[ colors.length - i - 1 ];
      gradient.addColorStop( i / ( colors.length - 1 ), color );
    }
    const spectrumNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: gradient,
      stroke: 'black'
    } );

    // title
    const titleNode = new Text( title, {
      fill: 'black',
      font: options.titleFont,
      maxWidth: 0.5 * options.size.width // i18n, determined empirically
    } );

    // range labels
    const labelOptions = {
      fill: 'black',
      font: options.rangeFont,
      maxWidth: 0.2 * options.size.width // i18n, determined empirically
    };
    const leftLabelNode = new Text( leftLabel, labelOptions );
    const rightLabelNode = new Text( rightLabel, labelOptions );

    // rendering order
    this.addChild( spectrumNode );
    this.addChild( leftLabelNode );
    this.addChild( rightLabelNode );
    if ( options.titleVisible ) {
      this.addChild( titleNode );
    }

    // layout
    titleNode.centerX = spectrumNode.centerX;
    leftLabelNode.left = spectrumNode.left + options.xMargin;
    rightLabelNode.right = spectrumNode.right - options.xMargin;
    titleNode.top = leftLabelNode.top = rightLabelNode.top = spectrumNode.bottom + options.ySpacing;

    this.mutate( options );
  }

  /**
   * Creates the color key for black-&-white gradient.
   * @param options
   * @returns {SurfaceColorKey}
   * @public
   * @static
   */
  static createElectronDensityColorKey( options ) {
    return new SurfaceColorKey( MPColors.BW_GRADIENT, moleculePolarityStrings.electronDensity,
      moleculePolarityStrings.less, moleculePolarityStrings.more, options );
  }

  /**
   * Creates the color key for red-white-blue gradient.
   * @param options
   * @returns {SurfaceColorKey}
   * @public
   * @static
   */
  static createElectrostaticPotentialRWBColorKey( options ) {
    return new SurfaceColorKey( MPColors.RWB_GRADIENT, moleculePolarityStrings.electrostaticPotential,
      moleculePolarityStrings.positive, moleculePolarityStrings.negative, options );
  }

  /**
   * Creates the color key for ROYGB gradient.
   * @param options
   * @returns {SurfaceColorKey}
   * @public
   * @static
   */
  static createElectrostaticPotentialROYGBColorKey( options ) {
    return new SurfaceColorKey( MPColors.ROYGB_GRADIENT, moleculePolarityStrings.electrostaticPotential,
      moleculePolarityStrings.positive, moleculePolarityStrings.negative, options );
  }
}

moleculePolarity.register( 'SurfaceColorKey', SurfaceColorKey );
export default SurfaceColorKey;