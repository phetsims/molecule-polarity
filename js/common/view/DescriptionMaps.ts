// Copyright 2025-2026, University of Colorado Boulder
/**
 * Static function collection to map continuous numerical values such as deltaEN or angle into discrete descriptions.
 *
 * Each mapping defines a createStringProperty function as well as a formatString function for convenience.
 *
 * @author Agustín Vallejo
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import { MoleculeGeometry } from '../../realmolecules/model/RealMolecule.js';

export type EPProgress = 'morePositive' | 'lessPositive' | 'neutral' | 'lessNegative' | 'moreNegative';
type Polarity = 'nonpolar' | 'veryWeaklyPolar' | 'weaklyPolar' | 'polar' | 'stronglyPolar' | 'veryStronglyPolar';
type MolecularDipole = 'zero' | 'tiny' | 'verySmall' | 'small' | 'fairlySmall' | 'medium' | 'fairlyLarge' | 'large' | 'veryLarge' | 'extremelyLarge' | 'huge';
type BondCharacter = 'nonpolarCovalent' | 'nearlyNonpolarCovalent' | 'slightlyPolarCovalent' | 'polarCovalent' | 'slightlyIonic' | 'mostlyIonic';
type ElectrostaticPotential = 'noDifference' | 'verySmallDifference' | 'smallDifference' | 'mediumDifference' | 'largeDifference' | 'veryLargeDifference';
type ElectrostaticRegions = 'verySlightly' | 'slightly' | 'moderately' | 'highly' | 'veryHighly';
type ElectronDensity = 'evenlyShared' | 'nearlyEvenlyShared' | 'slightlyUnevenlyShared' | 'unevenlyShared' | 'veryUnevenlyShared' | 'mostUnevenlyShared';
type ElectronDensityShift = 'shiftedSlightly' | 'shifted' | 'shiftedMuchMore' | 'shiftedAlmostCompletely';
type Electronegativity = 'veryLow' | 'low' | 'mediumLow' | 'mediumHigh' | 'high' | 'veryHigh';
type Directions = 'between1And2' | 'at3' | 'between4And5' | 'at6' | 'between7And8' | 'at9' | 'between10And11' | 'at12';
type Shape = 'linear' | 'nearlyLinear' | 'slightlyBent' | 'bent' | 'veryBent' | 'extremelyBentSlightOverlap' | 'atomsOverlap';
type PartialChargeMagnitude = 'zero' | 'tiny' | 'verySmall' | 'small' | 'fairlySmall' | 'medium' | 'fairlyLarge' | 'large' | 'veryLarge' | 'extremelyLarge' | 'huge';
type RealPolarity = 'nonpolar' | 'slightlyPolar' | 'polar' | 'stronglyPolar' | 'veryStronglyPolar';

// Approximation of zero to avoid issues with floating point precision
const ZERO = 0.05;

// Rounds the absolute value of a number, used to avoid issues with floating point precision and maintain the absolute value of deltaEN
const roundAbs = ( value: number ) => toFixedNumber( Math.abs( value ), 2 );

export default class DescriptionMaps {
  public constructor() {
    // no-op
  }

  private static dipoleToRealPolarity( dipole: number ): RealPolarity {
    dipole = roundAbs( dipole );
    return dipole < ZERO ? 'nonpolar' :
           dipole < 1 ? 'slightlyPolar' :
           dipole < 1.5 ? 'polar' :
           dipole < 2 ? 'stronglyPolar' :
           'veryStronglyPolar';
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
           deltaEN <= 0.4 ? 'tiny' :
           deltaEN <= 0.8 ? 'verySmall' :
           deltaEN <= 1.2 ? 'small' :
           deltaEN <= 1.6 ? 'fairlySmall' :
           deltaEN <= 2.0 ? 'medium' :
           deltaEN <= 2.4 ? 'fairlyLarge' :
           deltaEN <= 2.8 ? 'large' :
           deltaEN <= 3.2 ? 'veryLarge' :
           deltaEN <= 3.6 ? 'extremelyLarge' :
           'huge';
  }

  private static deltaENtoMolecularDipole( deltaEN: number ): MolecularDipole {
    deltaEN = roundAbs( deltaEN );
    return deltaEN <= ZERO ? 'zero' :
           deltaEN <= 0.4 ? 'tiny' :
           deltaEN <= 0.8 ? 'verySmall' :
           deltaEN <= 1.2 ? 'small' :
           deltaEN <= 1.6 ? 'fairlySmall' :
           deltaEN <= 2.0 ? 'medium' :
           deltaEN <= 2.4 ? 'fairlyLarge' :
           deltaEN <= 2.8 ? 'large' :
           deltaEN <= 3.2 ? 'veryLarge' :
           deltaEN <= 3.6 ? 'extremelyLarge' :
           'huge';
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
    return deltaEN <= ZERO ? 'noDifference' :
           deltaEN <= 0.4 ? 'verySmallDifference' :
           deltaEN <= 0.8 ? 'smallDifference' :
           deltaEN <= 1.2 ? 'mediumDifference' :
           deltaEN <= 1.6 ? 'largeDifference' :
           'veryLargeDifference';
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

  private static angleToOrientation( angle: number ): Directions {
    const sin = toFixedNumber( Math.sin( angle ), 2 );
    const cos = toFixedNumber( Math.cos( angle ), 2 );

    if ( sin === 0 ) {
      return cos > 0 ? 'at3' : 'at9';
    }
    else if ( cos === 0 ) {
      return sin < 0 ? 'at12' : 'at6';
    }
    else if ( sin < 0 ) {
      return cos > 0 ? 'between1And2' : 'between10And11';
    }
    else {
      return cos > 0 ? 'between4And5' : 'between7And8';
    }
  }

  private static angleToShape( angle: number ): Shape {
    const absAngle = Math.abs( angle );
    return absAngle <= ZERO * Math.PI ? 'atomsOverlap' :
           absAngle <= 0.2 * Math.PI ? 'extremelyBentSlightOverlap' :
           absAngle <= 0.4 * Math.PI ? 'veryBent' :
           absAngle <= 0.6 * Math.PI ? 'bent' :
           absAngle <= 0.9 * Math.PI ? 'slightlyBent' :
           absAngle <= 0.95 * Math.PI ? 'nearlyLinear' :
           'linear';
  }
  
  public static createShapeGeometryStringProperty( geometry: TReadOnlyProperty<MoleculeGeometry> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.shapeGeometry.createProperty( {
      geometry: geometry
    } );
  }

  public static createRealPolarityStringProperty( dipoleProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.realPolarity.createProperty( {
      polarity: dipoleProperty.derived( dipole => DescriptionMaps.dipoleToRealPolarity( dipole ) )
    } );
  }

  public static formatRealPolarityString( dipole: number ): string {
    return MoleculePolarityFluent.a11y.realPolarity.format( {
      polarity: DescriptionMaps.dipoleToRealPolarity( dipole )
    } );
  }

  public static createPolarityStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.polarity.createProperty( {
      polarity: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoPolarity( deltaEN ) )
    } );
  }

  public static formatPolarityString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.polarity.format( {
      polarity: DescriptionMaps.deltaENtoPolarity( deltaEN )
    } );
  }

  public static createPartialChargesStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.partialChargeMagnitude.createProperty( {
      magnitude: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoPartialCharges( deltaEN ) )
    } );
  }

  public static formatPartialChargesString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.partialChargeMagnitude.format( {
      magnitude: DescriptionMaps.deltaENtoPartialCharges( deltaEN )
    } );
  }

  public static createMolecularDipoleStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.partialChargeMagnitude.createProperty( {
      magnitude: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoMolecularDipole( deltaEN ) )
    } );
  }

  public static formatMolecularDipoleString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.partialChargeMagnitude.format( {
      magnitude: DescriptionMaps.deltaENtoMolecularDipole( deltaEN )
    } );
  }

  public static createBondCharacterStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.bondCharacter.createProperty( {
      bondCharacter: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoBondCharacter( deltaEN ) )
    } );
  }

  public static formatBondCharacterString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.bondCharacter.format( {
      bondCharacter: DescriptionMaps.deltaENtoBondCharacter( deltaEN )
    } );
  }

  public static createElectrostaticPotentialStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electrostaticPotentialUppercase.createProperty( {
      potential: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoElectrostaticPotential( deltaEN ) )
    } );
  }

  public static formatElectrostaticPotentialString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.electrostaticPotentialUppercase.format( {
      potential: DescriptionMaps.deltaENtoElectrostaticPotential( deltaEN )
    } );
  }

  public static createElectrostaticRegionsStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electrostaticRegions.createProperty( {
      regions: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoElectrostaticRegions( deltaEN ) )
    } );
  }

  public static formatElectrostaticRegionsString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.electrostaticRegions.format( {
      regions: DescriptionMaps.deltaENtoElectrostaticRegions( deltaEN )
    } );
  }

  public static createElectronDensityStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electronDensity.createProperty( {
      density: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoElectronDensity( deltaEN ) )
    } );
  }

  public static formatElectronDensityString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.electronDensity.format( {
      density: DescriptionMaps.deltaENtoElectronDensity( deltaEN )
    } );
  }

  public static createElectronDensityShiftStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electronDensityShift.createProperty( {
      shift: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoElectronDensityShift( deltaEN ) )
    } );
  }

  public static formatElectronDensityShiftString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.electronDensityShift.format( {
      shift: DescriptionMaps.deltaENtoElectronDensityShift( deltaEN )
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

  public static createOrientationStringProperty( angleProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.orientationAtom.createProperty( {
      position: angleProperty.derived( angle => DescriptionMaps.angleToOrientation( angle ) )
    } );
  }

  public static formatOrientationString( angle: number ): string {
    return MoleculePolarityFluent.a11y.orientationAtom.format( {
      position: DescriptionMaps.angleToOrientation( angle )
    } );
  }

  public static createShapeStringProperty( angleProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.shape.createProperty( {
      shape: angleProperty.derived( angle => DescriptionMaps.angleToShape( angle ) )
    } );
  }

  public static formatShapeString( angle: number ): string {
    return MoleculePolarityFluent.a11y.shape.format( {
      shape: DescriptionMaps.angleToShape( angle )
    } );
  }
}

moleculePolarity.register( 'DescriptionMaps', DescriptionMaps );