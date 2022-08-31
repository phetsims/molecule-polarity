// Copyright 2014-2022, University of Colorado Boulder

/**
 * Type of surface rendered in the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const SurfaceTypeValues = [ 'none', 'electrostaticPotential', 'electronDensity' ] as const;
export type SurfaceType = ( typeof SurfaceTypeValues )[number];