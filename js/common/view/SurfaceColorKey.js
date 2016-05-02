// Copyright 2014-2015, University of Colorado Boulder

/**
 * Key for a surface's color scheme.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  //strings
  var electronDensityString = require( 'string!MOLECULE_POLARITY/electronDensity' );
  var electrostaticPotentialString = require( 'string!MOLECULE_POLARITY/electrostaticPotential' );
  var lessString = require( 'string!MOLECULE_POLARITY/less' );
  var moreString = require( 'string!MOLECULE_POLARITY/more' );
  var negativeString = require( 'string!MOLECULE_POLARITY/negative' );
  var positiveString = require( 'string!MOLECULE_POLARITY/positive' );

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
    var gradient = new LinearGradient( 0, 0, options.size.width, options.size.height );
    for ( var i = 0; i < colors.length; i++ ) {
      gradient.addColorStop( i / ( colors.length - 1 ), colors[ i ] );
    }
    var spectrumNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: gradient,
      stroke: 'black'
    } );

    // title
    var titleNode = new Text( title, { fill: 'black', font: options.titleFont } );

    // range labels
    var leftLabelNode = new Text( leftLabel, { fill: 'black', font: options.rangeFont } );
    var rightLabelNode = new Text( rightLabel, { fill: 'black', font: options.rangeFont } );

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
  }

  moleculePolarity.register( 'SurfaceColorKey', SurfaceColorKey );

  return inherit( Node, SurfaceColorKey, {}, {

    // @static
    createElectronDensityColorKey: function( options ) {
      return new SurfaceColorKey( MPColors.BW_GRADIENT, electronDensityString, lessString, moreString, options );
    },

    // @static
    createElectrostaticPotentialRWBColorKey: function( options ) {
      return new SurfaceColorKey( MPColors.RWB_GRADIENT, electrostaticPotentialString, positiveString, negativeString, options );
    },

    // @static
    createElectrostaticPotentialROYGBColorKey: function( options ) {
      return new SurfaceColorKey( MPColors.ROYGB_GRADIENT, electrostaticPotentialString, positiveString, negativeString, options );
    }
  } );
} );

