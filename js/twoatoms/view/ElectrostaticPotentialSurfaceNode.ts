// Copyright 2014-2022, University of Colorado Boulder

/**
 * 2D surface that represents electrostatic potential for a diatomic molecule.
 * Electron density uses a 3-color gradient, so we use 2 Path nodes that meet in the middle.
 * This node's look is similar to the corresponding Jmol isosurface.
 * Shapes are created in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { LinearGradient } from '../../../../scenery/js/imports.js';
import MPColors from '../../common/MPColors.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import SurfaceNode, { SurfaceNodeOptions } from './SurfaceNode.js';
import DiatomicMolecule from '../model/DiatomicMolecule.js';

type ElectrostaticPotentialSurfaceNodeOptions = SurfaceNodeOptions;

export default class ElectrostaticPotentialSurfaceNode extends SurfaceNode {

  public constructor( molecule: DiatomicMolecule, providedOptions: ElectrostaticPotentialSurfaceNodeOptions ) {
    super( molecule, MPColors.RWB_GRADIENT, providedOptions );
  }

  /**
   * Updates the surface fill.
   */
  protected override updateFill(): void {
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
      const gradientWidth = Utils.linear( 1, 0, surfaceWidth / 2, surfaceWidth * MPConstants.SURFACE_GRADIENT_WIDTH_MULTIPLIER, scale );

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
}

moleculePolarity.register( 'ElectrostaticPotentialSurfaceNode', ElectrostaticPotentialSurfaceNode );