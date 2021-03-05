// Copyright 2021, University of Colorado Boulder

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
 * @param {number} angle - the angle to normalize, in radians
 * @param {number} [minAngle] - minimum angle, in radians
 * @returns {number}
 */
function normalizeAngle( angle, minAngle = 0 ) {

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