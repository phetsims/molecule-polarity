// Copyright 2025-2026, University of Colorado Boulder

/**
 * Utility function for converting radians to clock representation.
 *
 * Mapping assigns 0° as 3:00 and 90° as 6:00. We also round to nearest 5 degrees, or 30mins.
 *
 * So for example 95° (90° + 5°) is 6:30.
 *
 * @author Agustín Vallejo
 */

import { roundSymmetric } from '../../../../dot/js/util/roundSymmetric.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import { toDegrees } from '../../../../dot/js/util/toDegrees.js';
import moleculePolarity from '../../moleculePolarity.js';
import normalizeAngle from '../model/normalizeAngle.js';

export const toClock = ( radians: number ): string => {

  const degrees = roundToInterval( toDegrees( normalizeAngle( radians + Math.PI / 2 ) ), 5 ); // Round to nearest 5 degrees

  const hours = Math.floor( degrees / 30 ) || 12;

  if ( degrees % 30 !== 0 ) {
    // Non-exact hour case
    const minutes = roundSymmetric( ( degrees % 30 ) * 2 );
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${minutesString}`;
  }
  else {
    // Exact hour case
    return `${hours}`; // Map 0 to 12
  }
};

moleculePolarity.register( 'toClock', toClock );