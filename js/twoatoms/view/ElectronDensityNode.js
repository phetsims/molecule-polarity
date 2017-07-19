// Copyright 2014-2017, University of Colorado Boulder

/**
 * 2D surface that represents electron density for a diatomic molecule.
 * Electron density uses a 2-color gradient, so we can use a single PPath.
 * This node's look is similar to the corresponding Jmol isosurface.
 * Shapes are created in global coordinates, so this node's location should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var SurfaceNode = require( 'MOLECULE_POLARITY/twoatoms/view/SurfaceNode' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Molecule} molecule
   * @constructor
   */
  function ElectronDensityNode( molecule ) {
    SurfaceNode.call( this, molecule, MPColors.BW_GRADIENT );
  }

  moleculePolarity.register( 'ElectronDensityNode', ElectronDensityNode );

  return inherit( SurfaceNode, ElectronDensityNode, {

    /**
     * Updates the surface fill. Width of the gradient expands as the difference in EN approaches zero.
     * @private
     * @override
     */
    updateFill: function() {
      assert && assert( this.colors.length === 2, 'this implementation only works for 2 colors' );

      // scale varies from 1 to 0, approaches zero as EN difference approaches zero.
      var deltaEN = this.molecule.getDeltaEN();

      if ( deltaEN === 0 ) {

        // no difference, use neutral color that's halfway between "more" and "less" colors
        this.path.fill = MPColors.NEUTRAL_GRAY;
      }
      else {
        var scale = Math.abs( deltaEN / this.electronegativityRange.getLength() );

        var surfaceWidth = this.getSurfaceWidth();

        // compute the gradient width
        var gradientWidth = Util.linear( 1, 0, surfaceWidth, surfaceWidth * MPConstants.SURFACE_GRADIENT_WIDTH_MULTIPLIER, scale );

        // gradient endpoints prior to accounting for molecule transform
        var pointA = new Vector2( -gradientWidth / 2, 0 );
        var pointB = new Vector2( gradientWidth / 2, 0 );

        // choose colors based on polarity
        var colorA = ( deltaEN > 0 ) ? this.colors[ 1 ] : this.colors[ 0 ];
        var colorB = ( deltaEN > 0 ) ? this.colors[ 0 ] : this.colors[ 1 ];

        // create the gradient
        var gradient = new LinearGradient( pointA.x, pointA.y, pointB.x, pointB.y );
        gradient.addColorStop( 0, colorA );
        gradient.addColorStop( 1, colorB );

        this.path.fill = gradient;
      }
    }
  } );
} );