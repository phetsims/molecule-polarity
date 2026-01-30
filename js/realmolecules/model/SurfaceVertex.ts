// Copyright 2026, University of Colorado Boulder

/**
 * Represents a vertex on the molecular (van-der-waals) surface.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Vector3 from '../../../../dot/js/Vector3.js';
import moleculePolarity from '../../moleculePolarity.js';

export class SurfaceVertex {
  public constructor(
    public readonly position: Vector3,
    public readonly normal: Vector3,

    // Electrostatic potential value at this vertex
    public readonly espValue: number,

    // Electron density value at this vertex
    public readonly dtValue: number
  ) {}

  // Convenience getter for three.js attributes
  public getPositionArray(): number[] {
    return [ this.position.x, this.position.y, this.position.z ];
  }

  // Convenience getter for three.js attributes
  public getNormalArray(): number[] {
    return [ this.normal.x, this.normal.y, this.normal.z ];
  }
}

moleculePolarity.register( 'SurfaceVertex', SurfaceVertex );