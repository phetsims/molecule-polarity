// Copyright 2014-2020, University of Colorado Boulder

/**
 * 2D surface that represents electron density for a diatomic molecule.
 * Electron density uses a 2-color gradient, so we can use a single PPath.
 * This node's look is similar to the corresponding Jmol isosurface.
 * Shapes are created in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const LinearGradient = require( 'SCENERY/util/LinearGradient' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const SurfaceNode = require( 'MOLECULE_POLARITY/twoatoms/view/SurfaceNode' );
  const Utils = require( 'DOT/Utils' );
  const Vector2 = require( 'DOT/Vector2' );

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
      const deltaEN = this.molecule.getDeltaEN();

      if ( deltaEN === 0 ) {

        // no difference, use neutral color that's halfway between "more" and "less" colors
        this.path.fill = MPColors.NEUTRAL_GRAY;
      }
      else {
        const scale = Math.abs( deltaEN / this.electronegativityRange.getLength() );

        const surfaceWidth = this.getSurfaceWidth();

        // compute the gradient width
        const gradientWidth = Utils.linear( 1, 0, surfaceWidth, surfaceWidth * MPConstants.SURFACE_GRADIENT_WIDTH_MULTIPLIER, scale );

        // gradient endpoints prior to accounting for molecule transform
        const pointA = new Vector2( -gradientWidth / 2, 0 );
        const pointB = new Vector2( gradientWidth / 2, 0 );

        // choose colors based on polarity
        const colorA = ( deltaEN > 0 ) ? this.colors[ 1 ] : this.colors[ 0 ];
        const colorB = ( deltaEN > 0 ) ? this.colors[ 0 ] : this.colors[ 1 ];

        // create the gradient
        const gradient = new LinearGradient( pointA.x, pointA.y, pointB.x, pointB.y );
        gradient.addColorStop( 0, colorA );
        gradient.addColorStop( 1, colorB );

        this.path.fill = gradient;
      }
    }
  } );
} );