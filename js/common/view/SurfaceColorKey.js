// Copyright 2014-2017, University of Colorado Boulder

/**
 * Key for a surface's color scheme. This legend is a rectangular box with a gradient fill that matches the surface
 * in the Molecule. Each label is a unit for a color.
 * Uses static factory methods to supply the needed instances for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LinearGradient = require( 'SCENERY/util/LinearGradient' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );

  //strings
  const electronDensityString = require( 'string!MOLECULE_POLARITY/electronDensity' );
  const electrostaticPotentialString = require( 'string!MOLECULE_POLARITY/electrostaticPotential' );
  const lessString = require( 'string!MOLECULE_POLARITY/less' );
  const moreString = require( 'string!MOLECULE_POLARITY/more' );
  const negativeString = require( 'string!MOLECULE_POLARITY/negative' );
  const positiveString = require( 'string!MOLECULE_POLARITY/positive' );

  /**
   * @param {Color[]} colors colors used for the gradient, in left-to-right order
   * @param {string} title
   * @param {string} leftLabel
   * @param {string} rightLabel
   * @param {Object} [options]
   * @constructor
   */
  function SurfaceColorKey( colors, title, leftLabel, rightLabel, options ) {

    options = _.extend( {
      size: new Dimension2( 420, 20 ),
      titleVisible: true,
      titleFont: new PhetFont( { size: 16, weight: 'bold' } ),
      rangeFont: new PhetFont( 16 ),
      xMargin: 0,
      ySpacing: 2
    }, options );

    Node.call( this );

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

  moleculePolarity.register( 'SurfaceColorKey', SurfaceColorKey );

  return inherit( Node, SurfaceColorKey, {}, {

    /**
     * Creates the color key for black-&-white gradient.
     * @param options
     * @returns {SurfaceColorKey}
     * @public
     * @static
     */
    createElectronDensityColorKey: function( options ) {
      return new SurfaceColorKey( MPColors.BW_GRADIENT, electronDensityString, lessString, moreString, options );
    },

    /**
     * Creates the color key for red-white-blue gradient.
     * @param options
     * @returns {SurfaceColorKey}
     * @public
     * @static
     */
    createElectrostaticPotentialRWBColorKey: function( options ) {
      return new SurfaceColorKey( MPColors.RWB_GRADIENT, electrostaticPotentialString, positiveString, negativeString, options );
    },

    /**
     * Creates the color key for ROYGB gradient.
     * @param options
     * @returns {SurfaceColorKey}
     * @public
     * @static
     */
    createElectrostaticPotentialROYGBColorKey: function( options ) {
      return new SurfaceColorKey( MPColors.ROYGB_GRADIENT, electrostaticPotentialString, positiveString, negativeString, options );
    }
  } );
} );

