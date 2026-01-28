// Copyright 2025-2026, University of Colorado Boulder

/**
 * Color functions used for real molecules
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Element from '../../../../nitroglycerin/js/Element.js';
import MPColors from '../../common/MPColors.js';
import { clamp } from '../../../../dot/js/util/clamp.js';
import Color from '../../../../scenery/js/util/Color.js';
import { roundSymmetric } from '../../../../dot/js/util/roundSymmetric.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { linear } from '../../../../dot/js/util/linear.js';

export const elementToColorProperty = ( element: Element ): TReadOnlyProperty<Color> => {
  switch( element.symbol ) {
    case 'B':
      return MPColors.boronProperty;
    case 'C':
      return MPColors.carbonProperty;
    case 'Cl':
      return MPColors.chlorineProperty;
    case 'F':
      return MPColors.fluorineProperty;
    case 'H':
      return MPColors.hydrogenProperty;
    case 'N':
      return MPColors.nitrogenProperty;
    case 'O':
      return MPColors.oxygenProperty;
    default:
      throw new Error( `No color property defined for element: ${element.symbol}` );
  }
};

export const elementToForegroundColorProperty = ( element: Element ): TReadOnlyProperty<Color> => {
  switch( element.symbol ) {
    case 'B':
      return MPColors.boronForegroundProperty;
    case 'C':
      return MPColors.carbonForegroundProperty;
    case 'Cl':
      return MPColors.chlorineForegroundProperty;
    case 'F':
      return MPColors.fluorineForegroundProperty;
    case 'H':
      return MPColors.hydrogenForegroundProperty;
    case 'N':
      return MPColors.nitrogenForegroundProperty;
    case 'O':
      return MPColors.oxygenForegroundProperty;
    default:
      throw new Error( `No color property defined for element: ${element.symbol}` );
  }
};

export const colorToLinear = ( color: Color ): Color => {
  const redScaled = color.red / 255;
  const greenScaled = color.green / 255;
  const blueScaled = color.blue / 255;

  const rescale = ( n: number ) => {
    return roundSymmetric( n * 255 );
  };

  return new Color(
    rescale( redScaled <= 0.0404482362771082 ? redScaled / 12.92 : Math.pow( ( redScaled + 0.055 ) / 1.055, 2.4 ) ),
    rescale( greenScaled <= 0.0404482362771082 ? greenScaled / 12.92 : Math.pow( ( greenScaled + 0.055 ) / 1.055, 2.4 ) ),
    rescale( blueScaled <= 0.0404482362771082 ? blueScaled / 12.92 : Math.pow( ( blueScaled + 0.055 ) / 1.055, 2.4 ) )
  );
};

// So we don't have to track disposal, we'll proactively create DerivedProperties for linear colors
export const boronLinearColorProperty = new DerivedProperty( [ MPColors.boronProperty ], boronColor => colorToLinear( boronColor ) );
export const carbonLinearColorProperty = new DerivedProperty( [ MPColors.carbonProperty ], carbonColor => colorToLinear( carbonColor ) );
export const chlorineLinearColorProperty = new DerivedProperty( [ MPColors.chlorineProperty ], chlorineColor => colorToLinear( chlorineColor ) );
export const fluorineLinearColorProperty = new DerivedProperty( [ MPColors.fluorineProperty ], fluorineColor => colorToLinear( fluorineColor ) );
export const hydrogenLinearColorProperty = new DerivedProperty( [ MPColors.hydrogenProperty ], hydrogenColor => colorToLinear( hydrogenColor ) );
export const nitrogenLinearColorProperty = new DerivedProperty( [ MPColors.nitrogenProperty ], nitrogenColor => colorToLinear( nitrogenColor ) );
export const oxygenLinearColorProperty = new DerivedProperty( [ MPColors.oxygenProperty ], oxygenColor => colorToLinear( oxygenColor ) );

// So we don't have to track disposal, we'll proactively create DerivedProperties for linear colors
export const boronForegroundLinearColorProperty = new DerivedProperty( [ MPColors.boronForegroundProperty ], boronColor => colorToLinear( boronColor ) );
export const carbonForegroundLinearColorProperty = new DerivedProperty( [ MPColors.carbonForegroundProperty ], carbonColor => colorToLinear( carbonColor ) );
export const chlorineForegroundLinearColorProperty = new DerivedProperty( [ MPColors.chlorineForegroundProperty ], chlorineColor => colorToLinear( chlorineColor ) );
export const fluorineForegroundLinearColorProperty = new DerivedProperty( [ MPColors.fluorineForegroundProperty ], fluorineColor => colorToLinear( fluorineColor ) );
export const hydrogenForegroundLinearColorProperty = new DerivedProperty( [ MPColors.hydrogenForegroundProperty ], hydrogenColor => colorToLinear( hydrogenColor ) );
export const nitrogenForegroundLinearColorProperty = new DerivedProperty( [ MPColors.nitrogenForegroundProperty ], nitrogenColor => colorToLinear( nitrogenColor ) );
export const oxygenForegroundLinearColorProperty = new DerivedProperty( [ MPColors.oxygenForegroundProperty ], oxygenColor => colorToLinear( oxygenColor ) );

export const elementToLinearColorProperty = ( element: Element ): TReadOnlyProperty<Color> => {
  switch( element.symbol ) {
    case 'B':
      return boronLinearColorProperty;
    case 'C':
      return carbonLinearColorProperty;
    case 'Cl':
      return chlorineLinearColorProperty;
    case 'F':
      return fluorineLinearColorProperty;
    case 'H':
      return hydrogenLinearColorProperty;
    case 'N':
      return nitrogenLinearColorProperty;
    case 'O':
      return oxygenLinearColorProperty;
    default:
      throw new Error( `No color property defined for element: ${element.symbol}` );
  }
};

export const elementToForegroundLinearColorProperty = ( element: Element ): TReadOnlyProperty<Color> => {
  switch( element.symbol ) {
    case 'B':
      return boronForegroundLinearColorProperty;
    case 'C':
      return carbonForegroundLinearColorProperty;
    case 'Cl':
      return chlorineForegroundLinearColorProperty;
    case 'F':
      return fluorineForegroundLinearColorProperty;
    case 'H':
      return hydrogenForegroundLinearColorProperty;
    case 'N':
      return nitrogenForegroundLinearColorProperty;
    case 'O':
      return oxygenForegroundLinearColorProperty;
    default:
      throw new Error( `No color property defined for element: ${element.symbol}` );
  }
};

export const directColorsToLinear = ( color: number[] ): number[] => {
  return [
    color[ 0 ] <= 0.0404482362771082 ? color[ 0 ] / 12.92 : Math.pow( ( color[ 0 ] + 0.055 ) / 1.055, 2.4 ),
    color[ 1 ] <= 0.0404482362771082 ? color[ 1 ] / 12.92 : Math.pow( ( color[ 1 ] + 0.055 ) / 1.055, 2.4 ),
    color[ 2 ] <= 0.0404482362771082 ? color[ 2 ] / 12.92 : Math.pow( ( color[ 2 ] + 0.055 ) / 1.055, 2.4 )
  ];
};

/**
 * Red-White-Blue bipolar palette for electrostatic potential.
 * Positive -> blue, Negative -> red. Input is the raw ESP value; scaling matches existing view logic.
 * Returns normalized RGB components in [0,1].
 */
export const colorizeElectrostaticPotentialRWB = ( espValue: number ): number[] => {
  const scaled = espValue * 15; // match existing scale

  const white = MPColors.surfaceRWBWhiteProperty.value;

  if ( scaled > 0 ) {
    const blue = MPColors.surfaceRWBBlueProperty.value;

    const v = clamp( 1 - scaled, 0, 1 );

    return [
      ( blue.r + ( white.r - blue.r ) * v ) / 255,
      ( blue.g + ( white.g - blue.g ) * v ) / 255,
      ( blue.b + ( white.b - blue.b ) * v ) / 255
    ];
  }
  else {
    const red = MPColors.surfaceRWBRedProperty.value;

    const v = clamp( 1 + scaled, 0, 1 );

    return [
      ( red.r + ( white.r - red.r ) * v ) / 255,
      ( red.g + ( white.g - red.g ) * v ) / 255,
      ( red.b + ( white.b - red.b ) * v ) / 255
    ];
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

export const colorizeRealElectronDensity = ( densityValue: number ): number[] => {
  densityValue *= 200;

  const white = MPColors.surfaceBWWhiteProperty.value;
  const black = MPColors.surfaceBWBlackProperty.value;

  const easing = ( n: number, t: number ): number => {
    if ( t <= 0.5 ) {
      return 0.5 * Math.pow( 2 * t, n );
    }
    else {
      return 1 - easing( n, 1 - t );
    }
  };

  const clampedValue = easing( 3, clamp( linear( 0.1, 0.9, 1, 0, densityValue ), 0, 1 ) );

  return [
    ( black.r + ( white.r - black.r ) * clampedValue ) / 255,
    ( black.g + ( white.g - black.g ) * clampedValue ) / 255,
    ( black.b + ( white.b - black.b ) * clampedValue ) / 255
  ];
};

export const colorizeJavaElectronDensity = ( densityValue: number ): number[] => {
  const white = MPColors.surfaceBWWhiteProperty.value;
  const black = MPColors.surfaceBWBlackProperty.value;

  const clampedValue = clamp( 15 * densityValue / 2 + 0.5, 0, 1 );

  return [
    ( black.r + ( white.r - black.r ) * clampedValue ) / 255,
    ( black.g + ( white.g - black.g ) * clampedValue ) / 255,
    ( black.b + ( white.b - black.b ) * clampedValue ) / 255
  ];
};