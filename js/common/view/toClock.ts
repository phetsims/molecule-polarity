// Copyright 2025-2026, University of Colorado Boulder

/**
 * Utility function for converting radians to clock representation.
 *
 * Mapping assigns 0° as 3:00 and 90° as 6:00.
 *
 * Non exact hours return 'Between X and Y' format.
 *
 * @author Agustín Vallejo
 */

import { toDegrees } from '../../../../dot/js/util/toDegrees.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import normalizeAngle from '../model/normalizeAngle.js';

export const toClock = ( radians: number ): string => {

  const degrees = toFixedNumber( toDegrees( normalizeAngle( radians + Math.PI / 2 ) ), 1 ); // Round to nearest 5 degrees

  const hoursLower = Math.floor( degrees / 30 ) || 12;
  const hoursUpper = ( hoursLower % 12 ) + 1;

  if ( degrees % 30 !== 0 ) {

    // If not an exact hour, return 'between X and Y' format
    return MoleculePolarityFluent.a11y.betweenAngles.format( {
      angle1: hoursLower,
      angle2: hoursUpper
    } );
  }
  else {
    // Exact hour case
    return `${hoursLower}`; // Map 0 to 12
  }
};

moleculePolarity.register( 'toClock', toClock );