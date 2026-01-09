// Copyright 2025-2026, University of Colorado Boulder

/**
 * Utility function for converting radians to clock representation
 *
 * @author Agustín Vallejo
 */

import { moduloBetweenDown } from '../../../../dot/js/util/moduloBetweenDown.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import { toDegrees } from '../../../../dot/js/util/toDegrees.js';
import moleculePolarity from '../../moleculePolarity.js';

export const toClock = ( radians: number ): string => {

  const hours = roundToInterval(
    moduloBetweenDown( // Constrains to [0,360)°
      toDegrees( radians + Math.PI / 2 ), // Rad to degrees with +X Axis starts as 90° (3 o clock)
      0, 360 ) / 30, 0.5 ); // Each hour represents 30°

  if ( hours % 1 !== 0 ) {
    // Half hour case
    const hourFloor = Math.floor( hours ) || 12; // Map 0 to 12
    return `${hourFloor}:30`;
  }
  else {
    // Exact hour case
    return `${hours || 12}`; // Map 0 to 12
  }
};

moleculePolarity.register( 'toClock', toClock );