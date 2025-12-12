// Copyright 2025, University of Colorado Boulder
/**
 * Static function collection to map continuous numerical values such as deltaEN or angle into discrete descriptions.
 *
 * Each mapping defines a createStringProperty function as well as a formatString function for convenience.
 *
 * @author Agustín vallejo
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';

type Polarity = 'nonpolar' | 'veryWeaklyPolar' | 'weaklyPolar' | 'polar' | 'stronglyPolar' | 'veryStronglyPolar';
type Dipole = 'small' | 'no' | 'verySmall' | 'medium' | 'large' | 'veryLarge';
type PartialChargeMagnitude = 'small' | 'zero' | 'verySmall' | 'medium' | 'large' | 'veryLarge';
type BondCharacter = 'nonpolarCovalent' | 'nearlyNonpolarCovalent' | 'slightlyPolarCovalent' | 'polarCovalent' | 'slightlyIonic' | 'mostlyIonic';
type ElectrostaticPotential = 'noDifference' | 'verySmallDifference' | 'smallDifference' | 'mediumDifference' | 'largeDifference' | 'veryLargeDifference';
type ElectronDensity = 'evenlyShared' | 'nearlyEvenlyShared' | 'slightlyUnevenlyShared' | 'unevenlyShared' | 'veryUnevenlyShared' | 'mostUnevenlyShared';
type ElectronDensityShift = 'shiftedSlightly' | 'shifted' | 'shiftedMuchMore' | 'shiftedAlmostCompletely';
type Electronegativity = 'veryLow' | 'low' | 'mediumLow' | 'mediumHigh' | 'high' | 'veryHigh';
type Directions = 'between1And2' | 'at3' | 'between4And5' | 'at6' | 'between7And8' | 'at9' | 'between10And11' | 'at12';
type Shape = 'linear' | 'nearlyLinear' | 'slightlyBent' | 'bent' | 'veryBent' | 'extremelyBentSlightOverlap' | 'atomsOverlap';


export default class DescriptionMaps {
  public constructor() {
    // no-op
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

  public static createBondDipoleStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.bondDipole.createProperty( {
      bondDipole: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoBondDipole( deltaEN ) )
    } );
  }

  public static formatBondDipoleString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.bondDipole.format( {
      bondDipole: DescriptionMaps.deltaENtoBondDipole( deltaEN )
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
    return MoleculePolarityFluent.a11y.electrostaticPotential.createProperty( {
      potential: deltaENProperty.derived( deltaEN => DescriptionMaps.deltaENtoElectrostaticPotential( deltaEN ) )
    } );
  }

  public static formatElectrostaticPotentialString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.electrostaticPotential.format( {
      potential: DescriptionMaps.deltaENtoElectrostaticPotential( deltaEN )
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

  private static deltaENtoPolarity( deltaEN: number ): Polarity {
    deltaEN = Math.abs( deltaEN );
    return deltaEN <= 0.05 ? 'nonpolar' :
           deltaEN <= 0.4 ? 'veryWeaklyPolar' :
           deltaEN <= 0.8 ? 'weaklyPolar' :
           deltaEN <= 1.2 ? 'polar' :
           deltaEN <= 1.6 ? 'stronglyPolar' :
           'veryStronglyPolar';
  }

  private static deltaENtoBondDipole( deltaEN: number ): Dipole {
    deltaEN = Math.abs( deltaEN );
    return deltaEN <= 0.05 ? 'no' :
           deltaEN <= 0.4 ? 'verySmall' :
           deltaEN <= 0.8 ? 'small' :
           deltaEN <= 1.2 ? 'medium' :
           deltaEN <= 1.6 ? 'large' :
           'veryLarge';
  }

  private static deltaENtoPartialCharges( deltaEN: number ): PartialChargeMagnitude {
    deltaEN = Math.abs( deltaEN );
    return deltaEN <= 0.05 ? 'zero' :
           deltaEN <= 0.4 ? 'verySmall' :
           deltaEN <= 0.8 ? 'small' :
           deltaEN <= 1.2 ? 'medium' :
           deltaEN <= 1.6 ? 'large' :
           'veryLarge';
  }

  private static deltaENtoBondCharacter( deltaEN: number ): BondCharacter {
    deltaEN = Math.abs( deltaEN );
    return deltaEN <= 0.05 ? 'nonpolarCovalent' :
           deltaEN <= 0.4 ? 'nearlyNonpolarCovalent' :
           deltaEN <= 0.8 ? 'slightlyPolarCovalent' :
           deltaEN <= 1.2 ? 'polarCovalent' :
           deltaEN <= 1.6 ? 'slightlyIonic' :
           'mostlyIonic';
  }

  private static deltaENtoElectrostaticPotential( deltaEN: number ): ElectrostaticPotential {
    deltaEN = Math.abs( deltaEN );
    return deltaEN <= 0.05 ? 'noDifference' :
           deltaEN <= 0.4 ? 'verySmallDifference' :
           deltaEN <= 0.8 ? 'smallDifference' :
           deltaEN <= 1.2 ? 'mediumDifference' :
           deltaEN <= 1.6 ? 'largeDifference' :
           'veryLargeDifference';
  }

  private static deltaENtoElectronDensity( deltaEN: number ): ElectronDensity {
    deltaEN = Math.abs( deltaEN );
    return deltaEN <= 0.05 ? 'evenlyShared' :
           deltaEN <= 0.4 ? 'nearlyEvenlyShared' :
           deltaEN <= 0.8 ? 'slightlyUnevenlyShared' :
           deltaEN <= 1.2 ? 'unevenlyShared' :
           deltaEN <= 1.6 ? 'veryUnevenlyShared' :
           'mostUnevenlyShared';
  }

  private static deltaENtoElectronDensityShift( deltaEN: number ): ElectronDensityShift {
    deltaEN = Math.abs( deltaEN );
    return deltaEN < 0.8 ? 'shiftedSlightly' :
           deltaEN < 1.2 ? 'shifted' :
           deltaEN < 1.6 ? 'shiftedMuchMore' :
           'shiftedAlmostCompletely';
  }

  private static ENtoQualitative( EN: number ): Electronegativity {
    return EN === 2.0 ? 'veryLow' :
           EN < 2.4 ? 'low' :
           EN < 2.8 ? 'mediumLow' :
           EN < 3.2 ? 'mediumHigh' :
           EN < 3.6 ? 'high' :
           'veryHigh';
  }

  private static angleToOrientation( angle: number ): Directions {
    const sin = roundToInterval( Math.sin( angle ), 0.1 );
    const cos = roundToInterval( Math.cos( angle ), 0.1 );

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
    return absAngle <= 0.05 * Math.PI ? 'atomsOverlap' :
            absAngle <= 0.2 * Math.PI ? 'extremelyBentSlightOverlap' :
            absAngle <= 0.4 * Math.PI ? 'veryBent' :
            absAngle <= 0.6 * Math.PI ? 'bent' :
            absAngle <= 0.9 * Math.PI ? 'slightlyBent' :
            absAngle <= 0.95 * Math.PI ? 'nearlyLinear' :
            'linear';
  }
}

moleculePolarity.register( 'DescriptionMaps', DescriptionMaps );