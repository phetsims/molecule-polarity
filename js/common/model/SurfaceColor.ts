// Copyright 2020-2026, University of Colorado Boulder

/**
 * Enumeration for dipole direction.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const SurfaceColorValues = [ 'blueWhiteRed', 'rainbow' ] as const;
export type SurfaceColor = ( typeof SurfaceColorValues )[number];