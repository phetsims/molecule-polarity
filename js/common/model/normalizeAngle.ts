// Copyright 2021-2022, University of Colorado Boulder

/**
 * Normalizes an angle to be in a range whose length is 2 * PI.
 * This was created for https://github.com/phetsims/molecule-polarity/issues/91.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import moleculePolarity from '../../moleculePolarity.js';

// Length of the range
const RANGE_LENGTH = 2 * Math.PI;

/**
 * Normalizes an angle to the range [ minAngle, minAngle + 2 * PI )
 * @param angle - the angle to normalize, in radians
 * @param [minAngle] - minimum angle, in radians
 */
function normalizeAngle( angle: number, minAngle = 0 ): number {

  // Shift to the range [0,2*PI)
  const shiftedAngle = angle - minAngle;

  // Normalize to [0,2*PI).
  let normalizedAngle = shiftedAngle % RANGE_LENGTH;
  if ( normalizedAngle < 0 ) {
    normalizedAngle = shiftedAngle + RANGE_LENGTH;
  }

  // If we're at exactly 2*PI, wrap to zero, because our range is exclusive of max.
  if ( normalizedAngle === RANGE_LENGTH ) {
    normalizedAngle = 0;
  }

  // Shift back to the desired range.
  normalizedAngle += minAngle;

  assert && assert( normalizedAngle >= minAngle && normalizedAngle < minAngle + RANGE_LENGTH,
    `unexpected normalizedAngle: ${normalizedAngle} for angle=${angle}` );
  return normalizedAngle;
}

moleculePolarity.register( 'normalizeAngle', normalizeAngle );
export default normalizeAngle;