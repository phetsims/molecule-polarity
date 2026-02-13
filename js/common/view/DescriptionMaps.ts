// Copyright 2025-2026, University of Colorado Boulder
/**
 * Static function collection to map continuous numerical values such as deltaEN or angle into discrete descriptions.
 *
 * Each mapping defines a createStringProperty function as well as a formatString function for convenience.
 *
 * @author Agustín Vallejo
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { toDegrees } from '../../../../dot/js/util/toDegrees.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import { MoleculeGeometry } from '../../realmolecules/model/RealMolecule.js';
import { toClock } from './toClock.js';

// DESCRIPTION TYPES //

// Bond
type BondCharacter = 'nonpolarCovalent' | 'nearlyNonpolarCovalent' | 'slightlyPolarCovalent' | 'polarCovalent' | 'slightlyIonic' | 'mostlyIonic';
type BondDipole = 'no' | 'verySmall' | 'small' | 'medium' | 'fairlyLarge' | 'large';
type Polarity = 'nonpolar' | 'veryWeaklyPolar' | 'weaklyPolar' | 'polar' | 'stronglyPolar' | 'veryStronglyPolar';

// Molecular
type MolecularDipole = 'no' | 'verySmall' | 'small' | 'medium' | 'fairlyLarge' | 'large' | 'veryLarge' | 'extremelyLarge';
type MolecularPolarity = 'nonpolar' | 'weaklyPolar' | 'polar' | 'moderatelyPolar' | 'stronglyPolar' | 'veryStronglyPolar';
type PartialChargeMagnitude = 'zero' | 'verySmall' | 'small' | 'medium' | 'fairlyLarge' | 'large' | 'veryLarge' | 'extremelyLarge';

// Surface properties
type ElectrostaticPotential = 'no' | 'verySmall' | 'small' | 'medium' | 'fairlyLarge' | 'large';
type ElectrostaticRegions = 'verySlightly' | 'slightly' | 'moderately' | 'highly' | 'veryHighly';
type ElectronDensity = 'evenlyShared' | 'nearlyEvenlyShared' | 'slightlyUnevenlyShared' | 'unevenlyShared' | 'veryUnevenlyShared' | 'mostUnevenlyShared';
type ElectronDensityShift = 'shiftedSlightly' | 'shifted' | 'shiftedMuchMore' | 'shiftedAlmostCompletely';
type Electronegativity = 'veryLow' | 'low' | 'mediumLow' | 'mediumHigh' | 'high' | 'veryHigh';

// Shapes and Directions
type Shape = 'linear' | 'nearlyLinear' | 'slightlyBent' | 'bent' | 'veryBent' | 'extremelyBentSlightOverlap' | 'atomsOverlap';

// Progress. i.e. more/less positive/negative.
export type EPProgress = 'morePositive' | 'lessPositive' | 'neutral' | 'lessNegative' | 'moreNegative';

// Approximation of zero to avoid issues with floating point precision as well as leaving room for manually obtaining zero
const ZERO = 0.05;

// Rounds the absolute value of a number, used to avoid issues with floating point precision and maintain the absolute value of deltaEN
const roundAbs = ( value: number ) => toFixedNumber( Math.abs( value ), 2 );

export default class DescriptionMaps {
  public constructor() {
    // no-op
  }

  private static deltaENtoBondDipole( deltaEN: number ): BondDipole {
    deltaEN = roundAbs( deltaEN );
    return deltaEN <= ZERO ? 'no' :
           deltaEN <= 0.4 ? 'verySmall' :
           deltaEN <= 0.8 ? 'small' :
           deltaEN <= 1.2 ? 'medium' :
           deltaEN <= 1.6 ? 'fairlyLarge' :
           'large';
  }

  private static deltaENtoPolarity( deltaEN: number ): Polarity {
    deltaEN = roundAbs( deltaEN );
    return deltaEN <= ZERO ? 'nonpolar' :
           deltaEN <= 0.4 ? 'veryWeaklyPolar' :
           deltaEN <= 0.8 ? 'weaklyPolar' :
           deltaEN <= 1.2 ? 'polar' :
           deltaEN <= 1.6 ? 'stronglyPolar' :
           'veryStronglyPolar';
  }

  private static deltaENtoPartialCharges( deltaEN: number ): PartialChargeMagnitude {
    deltaEN = roundAbs( deltaEN );
      return deltaEN <= ZERO ? 'zero' :
             deltaEN <= 0.4 ? 'verySmall' :
             deltaEN <= 0.8 ? 'small' :
             deltaEN <= 1.2 ? 'medium' :
             deltaEN <= 1.6 ? 'fairlyLarge' :
             deltaEN <= 2.4 ? 'large' :
             deltaEN <= 3.2 ? 'veryLarge' :
             'extremelyLarge';
  }

  private static deltaENtoMolecularDipole( deltaEN: number ): MolecularDipole {
    deltaEN = roundAbs( deltaEN );
    return deltaEN <= ZERO ? 'no' :
           deltaEN <= 0.4 ? 'verySmall' :
           deltaEN <= 0.8 ? 'small' :
           deltaEN <= 1.2 ? 'medium' :
           deltaEN <= 1.6 ? 'fairlyLarge' :
           deltaEN <= 2.4 ? 'large' :
           deltaEN <= 3.2 ? 'veryLarge' :
           'extremelyLarge';
  }

  private static deltaENtoMolecularPolarity( deltaEN: number ): MolecularPolarity {
    deltaEN = roundAbs( deltaEN );
    return deltaEN <= ZERO ? 'nonpolar' :
           deltaEN <= 0.8 ? 'weaklyPolar' :
           deltaEN <= 1.6 ? 'polar' :
           deltaEN <= 2.4 ? 'moderatelyPolar' :
           deltaEN <= 3.2 ? 'stronglyPolar' :
           'veryStronglyPolar';
  }

  private static deltaENtoBondCharacter( deltaEN: number ): BondCharacter {
    deltaEN = roundAbs( deltaEN );
    return deltaEN <= ZERO ? 'nonpolarCovalent' :
           deltaEN <= 0.4 ? 'nearlyNonpolarCovalent' :
           deltaEN <= 0.8 ? 'slightlyPolarCovalent' :
           deltaEN <= 1.2 ? 'polarCovalent' :
           deltaEN <= 1.6 ? 'slightlyIonic' :
           'mostlyIonic';
  }

  private static deltaENtoElectrostaticPotential( deltaEN: number ): ElectrostaticPotential {
    deltaEN = roundAbs( deltaEN );
    return deltaEN <= ZERO ? 'no' :
           deltaEN <= 0.4 ? 'verySmall' :
           deltaEN <= 0.8 ? 'small' :
           deltaEN <= 1.2 ? 'medium' :
           deltaEN <= 1.6 ? 'fairlyLarge' :
           'large';
  }

  private static deltaENtoElectrostaticRegions( deltaEN: number ): ElectrostaticRegions {
    deltaEN = roundAbs( deltaEN );
    return deltaEN <= 0.4 ? 'verySlightly' :
           deltaEN <= 0.8 ? 'slightly' :
           deltaEN <= 1.2 ? 'moderately' :
           deltaEN <= 1.6 ? 'highly' :
           'veryHighly';
  }

  private static deltaENtoElectronDensity( deltaEN: number ): ElectronDensity {
    deltaEN = roundAbs( deltaEN );
    return deltaEN <= ZERO ? 'evenlyShared' :
           deltaEN <= 0.4 ? 'nearlyEvenlyShared' :
           deltaEN <= 0.8 ? 'slightlyUnevenlyShared' :
           deltaEN <= 1.2 ? 'unevenlyShared' :
           deltaEN <= 1.6 ? 'veryUnevenlyShared' :
           'mostUnevenlyShared';
  }

  private static deltaENtoElectronDensityShift( deltaEN: number ): ElectronDensityShift {
    deltaEN = roundAbs( deltaEN );
    return deltaEN <= 0.8 ? 'shiftedSlightly' :
           deltaEN <= 1.2 ? 'shifted' :
           deltaEN <= 1.6 ? 'shiftedMuchMore' :
           'shiftedAlmostCompletely';
  }

  private static ENtoQualitative( EN: number ): Electronegativity {
    return EN === 2.0 ? 'veryLow' :
           EN <= 2.4 ? 'low' :
           EN <= 2.8 ? 'mediumLow' :
           EN <= 3.2 ? 'mediumHigh' :
           EN <= 3.6 ? 'high' :
           'veryHigh';
  }

  private static angleToShape( angle: number ): Shape {
    const absAngle = Math.abs( angle );
    return absAngle <= 1e-5 * Math.PI ? 'atomsOverlap' :
           absAngle <= 0.2 * Math.PI ? 'extremelyBentSlightOverlap' :
           absAngle <= 0.4 * Math.PI ? 'veryBent' :
           absAngle <= 0.6 * Math.PI ? 'bent' :
           absAngle <= 0.9 * Math.PI ? 'slightlyBent' :
           absAngle <= 0.95 * Math.PI ? 'nearlyLinear' :
           'linear';
  }

  public static createOrientationStringProperty( angleProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return new DerivedProperty(
      [ angleProperty ], angle => {
        return DescriptionMaps.formatOrientationString( angle );
      }
    );
  }

  public static formatOrientationString( angle: number, atAngleOrTwoAngle: 'atAngle' | 'toAngle' = 'atAngle' ): string {
    const angleDeg = toFixedNumber( toDegrees( angle ), 1 );
    if ( angleDeg % 30 !== 0 ) {
      return toClock( angle );
    }
    else {
      if ( atAngleOrTwoAngle === 'atAngle' ) {
        return MoleculePolarityFluent.a11y.atAngle.format( {
          angle: toClock( angle )
        } );
      }
      else {
        return MoleculePolarityFluent.a11y.toAngle.format( {
          angle: toClock( angle )
        } );
      }
    }
  }

  public static createShapeGeometryStringProperty( geometry: TReadOnlyProperty<MoleculeGeometry> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.shapeGeometry.createProperty( {
      geometry: geometry
    } );
  }

  public static createPolarityStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.polarity.createProperty( {
      polarity: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoPolarity( deltaEN ) )
    } );
  }

  public static createBondDipoleStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.bondDipole.createProperty( {
      magnitude: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoBondDipole( deltaEN ) )
    } );
  }

  public static createPartialChargesStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.partialChargeMagnitude.createProperty( {
      magnitude: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoPartialCharges( deltaEN ) )
    } );
  }

  public static createMolecularDipoleStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.molecularDipole.createProperty( {
      magnitude: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoMolecularDipole( deltaEN ) )
    } );
  }

  public static createMolecularPolarityStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.molecularPolarity.createProperty( {
      polarity: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoMolecularPolarity( deltaEN ) )
    } );
  }

  public static createBondCharacterStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.bondCharacter.createProperty( {
      bondCharacter: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoBondCharacter( deltaEN ) )
    } );
  }

  public static createElectrostaticPotentialStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electrostaticPotentialUppercase.createProperty( {
      potential: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoElectrostaticPotential( deltaEN ) )
    } );
  }

  public static createElectrostaticRegionsStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electrostaticRegions.createProperty( {
      regions: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoElectrostaticRegions( deltaEN ) )
    } );
  }

  public static createElectronDensityStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electronDensity.createProperty( {
      density: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoElectronDensity( deltaEN ) )
    } );
  }

  public static createElectronDensityShiftStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electronDensityShift.createProperty( {
      shift: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoElectronDensityShift( deltaEN ) )
    } );
  }

  public static createElectronegativityStringProperty( ENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electronegativity.createProperty( {
      level: ENProperty.derived( value => DescriptionMaps.ENtoQualitative( value ) )
    } );
  }

  public static formatElectronegativityString( EN: number ): string {
    return MoleculePolarityFluent.a11y.electronegativity.format( {
      level: DescriptionMaps.ENtoQualitative( EN )
    } );
  }
  public static formatPartialChargesString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.partialChargeMagnitude.format( {
      magnitude: DescriptionMaps.deltaENtoPartialCharges( deltaEN )
    } );
  }
  public static createShapeStringProperty( angleProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.shape.createProperty( {
      shape: angleProperty.derived( angle => DescriptionMaps.angleToShape( angle ) )
    } );
  }
}

moleculePolarity.register( 'DescriptionMaps', DescriptionMaps );