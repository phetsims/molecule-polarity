// Copyright 2025, University of Colorado Boulder

/**
 * Color functions used for real molecules
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Element from '../../../../nitroglycerin/js/Element.js';
import MPColors from '../../common/MPColors.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import { clamp } from '../../../../dot/js/util/clamp.js';
import { USE_REAL_VALUES } from './RealMolecule.js';

export const elementToColor = ( element: Element ): TColor => {
  return element === Element.C ? MPColors.CARBON : element.color;
};

export const elementToForegroundColor = ( element: Element ): TColor => {
  return [ Element.N, Element.O, Element.C ].includes( element ) ? 'white' : 'black';
};

/**
 * Red-White-Blue bipolar palette for electrostatic potential.
 * Positive -> blue, Negative -> red. Input is the raw ESP value; scaling matches existing view logic.
 * Returns normalized RGB components in [0,1].
 */
export const colorizeElectrostaticPotentialRWB = ( espValue: number ): number[] => {
  const scaled = espValue * 15; // match existing scale

  if ( scaled > 0 ) {
    const v = clamp( 1 - scaled, 0, 1 );
    return [ v, v, 1 ];
  }
  else {
    const v = clamp( 1 + scaled, 0, 1 );
    return [ 1, v, v ];
  }
};

/**
 * Rainbow ROYGB palette for electrostatic potential.
 * We normalize similarly to RWB, then interpolate across [red, orange, yellow, green, blue].
 * Returns normalized RGB components in [0,1].
 */
export const colorizeElectrostaticPotentialROYGB = ( espValue: number ): number[] => {
  // Normalize to [0,1] with same scale and center at 0
  const scaled = clamp( ( espValue * 8 + 1 ) / 2, 0, 1 );

  const t = scaled * ( MPColors.ROYGB_GRADIENT.length - 1 );
  const i = Math.floor( t );
  const f = t - i;

  const color0 = MPColors.ROYGB_GRADIENT[ Math.max( 0, Math.min( i, MPColors.ROYGB_GRADIENT.length - 1 ) ) ];
  const color1 = MPColors.ROYGB_GRADIENT[ Math.max( 0, Math.min( i + 1, MPColors.ROYGB_GRADIENT.length - 1 ) ) ];

  return [
    ( color0.r * ( 1 - f ) + color1.r * f ) / 255,
    ( color0.g * ( 1 - f ) + color1.g * f ) / 255,
    ( color0.b * ( 1 - f ) + color1.b * f ) / 255
  ];
};

/**
 * Grayscale palette for electron density.
 */
export const colorizeElectronDensity = ( densityValue: number ): number[] => {
  if ( USE_REAL_VALUES ) {
    densityValue *= 200;

    const clampedValue = clamp( 1 - densityValue, 0, 1 );
    return [ clampedValue, clampedValue, clampedValue ];
  }
  else {
    const clampedValue = clamp( 15 * densityValue / 2 + 0.5, 0, 1 );
    return [ clampedValue, clampedValue, clampedValue ];
  }
};