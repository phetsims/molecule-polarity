// Copyright 2020-2022, University of Colorado Boulder

/**
 * Enumeration for dipole direction.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const SurfaceColorValues = [ 'RWB', 'ROYGB' ] as const;
export type SurfaceColor = ( typeof SurfaceColorValues )[number];