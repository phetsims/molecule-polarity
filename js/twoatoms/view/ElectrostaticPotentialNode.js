// Copyright 2014-2017, University of Colorado Boulder

/**
 * 2D surface that represents electrostatic potential for a diatomic molecule.
 * Electron density uses a 3-color gradient, so we use 2 Path nodes that meet in the middle.
 * This node's look is similar to the corresponding Jmol isosurface.
 * Shapes are created in global coordinates, so this node's location should be (0,0).
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
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Molecule} molecule
   * @constructor
   */
  function ElectrostaticPotentialNode( molecule ) {
    SurfaceNode.call( this, molecule, MPColors.RWB_GRADIENT );
  }

  moleculePolarity.register( 'ElectrostaticPotentialNode', ElectrostaticPotentialNode );

  return inherit( SurfaceNode, ElectrostaticPotentialNode, {

    /**
     * Updates the surface fill. Width of the gradient expands as the difference in EN approaches zero.
     * @private
     * @override
     */
    updateFill: function() {
      assert && assert( this.colors.length === 3, 'this implementation only works for 3 colors' );

      // scale varies from 1 to 0, approaches zero as EN difference approaches zero.
      const deltaEN = this.molecule.getDeltaEN();
      if ( deltaEN === 0 ) {
        this.path.fill = this.colors[ 1 ];
      }
      else {
        const scale = Math.abs( deltaEN / this.electronegativityRange.getLength() );

        const surfaceWidth = this.getSurfaceWidth();

        // compute the gradient width
        const gradientWidth = Util.linear( 1, 0, surfaceWidth / 2, surfaceWidth * MPConstants.SURFACE_GRADIENT_WIDTH_MULTIPLIER, scale );

        // gradient endpoints prior to accounting for molecule transform
        const pointA = new Vector2( -gradientWidth / 2, 0 );
        const pointB = new Vector2( gradientWidth / 2, 0 );

        // choose colors based on polarity
        const colorCenter = this.colors[ 1 ];
        const colorA = ( deltaEN > 0 ) ? this.colors[ 2 ] : this.colors[ 0 ];
        const colorB = ( deltaEN > 0 ) ? this.colors[ 0 ] : this.colors[ 2 ];

        // create the gradients
        const gradient = new LinearGradient( pointA.x, pointA.y, pointB.x, pointB.y );
        gradient.addColorStop( 0, colorA );
        gradient.addColorStop( 0.5, colorCenter );
        gradient.addColorStop( 1, colorB );

        this.path.fill = gradient;
      }
    }
  } );
} );