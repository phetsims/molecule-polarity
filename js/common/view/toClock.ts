// Copyright 2025, University of Colorado Boulder

/**
 * Utility function for converting radians to clock representation
 *
 * @author Agustín Vallejo
 */

import { moduloBetweenDown } from '../../../../dot/js/util/moduloBetweenDown.js';
import { roundSymmetric } from '../../../../dot/js/util/roundSymmetric.js';
import { toDegrees } from '../../../../dot/js/util/toDegrees.js';
import moleculePolarity from '../../moleculePolarity.js';

export const toClock = ( radians: number ): number => {
  return roundSymmetric( // Rounds to integer values
    moduloBetweenDown( // Constrains to [0,360)°
      toDegrees( radians + Math.PI / 2 ), // Rad to degrees with +X Axis starts as 90° (3 o clock)
      0, 360 ) // Constrains to [0,360)°
    / 30 // Each hour represents 30°
  ) % 12 || 12; // Modulo 12 for good measure and map 0 to 12
};

moleculePolarity.register( 'toClock', toClock );