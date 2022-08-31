// Copyright 2020-2022, University of Colorado Boulder

/**
 * Enumeration for dipole direction.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const DipoleDirectionValues = [ 'positiveToNegative', 'negativeToPositive' ] as const;
export type DipoleDirection = ( typeof DipoleDirectionValues )[number];