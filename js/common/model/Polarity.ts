// Copyright 2020-2022, University of Colorado Boulder

/**
 * Enumeration for polarity of the plates.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const PolarityValues = [ 'positive', 'negative' ] as const;
export type Polarity = ( typeof PolarityValues )[number];