// Copyright 2026, University of Colorado Boulder

/**
 * Represents a vertex on the molecular (van-der-waals) surface.
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

import Vector3 from '../../../../dot/js/Vector3.js';

export class SurfaceVertex {
  public constructor(
    public readonly position: Vector3,
    public readonly normal: Vector3,

    // Electrostatic potential value at this vertex
    public readonly electrostaticPotentialValue: number,

    // Electron density value at this vertex
    public readonly electronDensityValue: number
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
