// Copyright 2025, University of Colorado Boulder
/**
 * Static function collection to map electronegativity difference (deltaEN) to various bond descriptions.
 *
 * @author Agustín vallejo
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';

type Polarity = 'nonpolar' | 'veryWeaklyPolar' | 'weaklyPolar' | 'polar' | 'stronglyPolar' | 'veryStronglyPolar';
type Dipole = 'small' | 'no' | 'verySmall' | 'medium' | 'large' | 'veryLarge';
type PartialChargeMagnitude = 'small' | 'no' | 'verySmall' | 'medium' | 'large' | 'veryLarge';
type BondCharacter = 'nonpolarCovalent' | 'nearlyNonpolarCovalent' | 'slightlyPolarCovalent' | 'polarCovalent' | 'slightlyIonic' | 'mostlyIonic';
type ElectrostaticPotential = 'noDifference' | 'verySmallDifference' | 'smallDifference' | 'mediumDifference' | 'largeDifference' | 'veryLargeDifference';
type ElectronDensity = 'evenlyShared' | 'nearlyEvenlyShared' | 'slightlyUnevenlyShared' | 'unevenlyShared' | 'veryUnevenlyShared' | 'mostUnevenlyShared';
type ElectronDensityShift = 'shiftedSlightly' | 'shifted' | 'shiftedMuchMore' | 'shiftedAlmostCompletely';
type Electronegativity = 'veryLow' | 'low' | 'mediumLow' | 'mediumHigh' | 'high' | 'veryHigh';


export default class BondDescriptionMaps {
  public constructor() {
    // no-op
  }

  public static createPolarityStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.polarity.createProperty( {
      polarity: deltaENProperty.derived( deltaEN => BondDescriptionMaps.deltaENtoPolarity( deltaEN ) )
    } );
  }

  public static formatPolarityString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.polarity.format( {
      polarity: BondDescriptionMaps.deltaENtoPolarity( deltaEN )
    } );
  }

  public static createBondDipoleStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.bondDipole.createProperty( {
      bondDipole: deltaENProperty.derived( deltaEN => BondDescriptionMaps.deltaENtoBondDipole( deltaEN ) )
    } );
  }

  public static formatBondDipoleString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.bondDipole.format( {
      bondDipole: BondDescriptionMaps.deltaENtoBondDipole( deltaEN )
    } );
  }

  public static createPartialChargesStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.partialChargeMagnitude.createProperty( {
      magnitude: deltaENProperty.derived( deltaEN => BondDescriptionMaps.deltaENtoPartialCharges( deltaEN ) )
    } );
  }

  public static formatPartialChargesString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.partialChargeMagnitude.format( {
      magnitude: BondDescriptionMaps.deltaENtoPartialCharges( deltaEN )
    } );
  }

  public static createBondCharacterStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.bondCharacter.createProperty( {
      bondCharacter: deltaENProperty.derived( deltaEN => BondDescriptionMaps.deltaENtoBondCharacter( deltaEN ) )
    } );
  }

  public static formatBondCharacterString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.bondCharacter.format( {
      bondCharacter: BondDescriptionMaps.deltaENtoBondCharacter( deltaEN )
    } );
  }

  public static createElectrostaticPotentialStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electrostaticPotential.createProperty( {
      potential: deltaENProperty.derived( deltaEN => BondDescriptionMaps.deltaENtoElectrostaticPotential( deltaEN ) )
    } );
  }

  public static formatElectrostaticPotentialString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.electrostaticPotential.format( {
      potential: BondDescriptionMaps.deltaENtoElectrostaticPotential( deltaEN )
    } );
  }

  public static createElectronDensityStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electronDensity.createProperty( {
      density: deltaENProperty.derived( deltaEN => BondDescriptionMaps.deltaENtoElectronDensity( deltaEN ) )
    } );
  }

  public static formatElectronDensityString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.electronDensity.format( {
      density: BondDescriptionMaps.deltaENtoElectronDensity( deltaEN )
    } );
  }

  public static createElectronDensityShiftStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electronDensityShift.createProperty( {
      shift: deltaENProperty.derived( deltaEN => BondDescriptionMaps.deltaENtoElectronDensityShift( deltaEN ) )
    } );
  }

  public static formatElectronDensityShiftString( deltaEN: number ): string {
    return MoleculePolarityFluent.a11y.electronDensityShift.format( {
      shift: BondDescriptionMaps.deltaENtoElectronDensityShift( deltaEN )
    } );
  }

  public static createElectronegativityStringProperty( ENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electronegativity.createProperty( {
      level: ENProperty.derived( value => BondDescriptionMaps.ENtoQualitative( value ) )
    } );
  }

  public static formatElectronegativityString( EN: number ): string {
    return MoleculePolarityFluent.a11y.electronegativity.format( {
      level: BondDescriptionMaps.ENtoQualitative( EN )
    } );
  }

  private static deltaENtoPolarity( deltaEN: number ): Polarity {
    deltaEN = Math.abs( deltaEN );
    return deltaEN === 0 ? 'nonpolar' :
           deltaEN <= 0.4 ? 'veryWeaklyPolar' :
           deltaEN <= 0.8 ? 'weaklyPolar' :
           deltaEN <= 1.2 ? 'polar' :
           deltaEN <= 1.6 ? 'stronglyPolar' :
           'veryStronglyPolar';
  }

  private static deltaENtoBondDipole( deltaEN: number ): Dipole {
    deltaEN = Math.abs( deltaEN );
    return deltaEN === 0 ? 'no' :
           deltaEN <= 0.4 ? 'verySmall' :
           deltaEN <= 0.8 ? 'small' :
           deltaEN <= 1.2 ? 'medium' :
           deltaEN <= 1.6 ? 'large' :
           'veryLarge';
  }

  private static deltaENtoPartialCharges( deltaEN: number ): PartialChargeMagnitude {
    deltaEN = Math.abs( deltaEN );
    return deltaEN === 0 ? 'no' :
           deltaEN <= 0.4 ? 'verySmall' :
           deltaEN <= 0.8 ? 'small' :
           deltaEN <= 1.2 ? 'medium' :
           deltaEN <= 1.6 ? 'large' :
           'veryLarge';
  }

  private static deltaENtoBondCharacter( deltaEN: number ): BondCharacter {
    deltaEN = Math.abs( deltaEN );
    return deltaEN === 0 ? 'nonpolarCovalent' :
           deltaEN <= 0.4 ? 'nearlyNonpolarCovalent' :
           deltaEN <= 0.8 ? 'slightlyPolarCovalent' :
           deltaEN <= 1.2 ? 'polarCovalent' :
           deltaEN <= 1.6 ? 'slightlyIonic' :
           'mostlyIonic';
  }

  private static deltaENtoElectrostaticPotential( deltaEN: number ): ElectrostaticPotential {
    deltaEN = Math.abs( deltaEN );
    return deltaEN === 0 ? 'noDifference' :
           deltaEN <= 0.4 ? 'verySmallDifference' :
           deltaEN <= 0.8 ? 'smallDifference' :
           deltaEN <= 1.2 ? 'mediumDifference' :
           deltaEN <= 1.6 ? 'largeDifference' :
           'veryLargeDifference';
  }

  private static deltaENtoElectronDensity( deltaEN: number ): ElectronDensity {
    deltaEN = Math.abs( deltaEN );
    return deltaEN === 0 ? 'evenlyShared' :
           deltaEN <= 0.4 ? 'nearlyEvenlyShared' :
           deltaEN <= 0.8 ? 'slightlyUnevenlyShared' :
           deltaEN <= 1.2 ? 'unevenlyShared' :
           deltaEN <= 1.6 ? 'veryUnevenlyShared' :
           'mostUnevenlyShared';
  }

  private static deltaENtoElectronDensityShift( deltaEN: number ): ElectronDensityShift {
    deltaEN = Math.abs( deltaEN );
    return deltaEN < 0.5 ? 'shiftedSlightly' :
           deltaEN < 1.0 ? 'shifted' :
           deltaEN < 1.5 ? 'shiftedMuchMore' :
           'shiftedAlmostCompletely';
  }

  public static ENtoQualitative( EN: number ): Electronegativity {
    return EN === 2.0 ? 'veryLow' :
           EN < 2.4 ? 'low' :
           EN < 2.8 ? 'mediumLow' :
           EN < 3.2 ? 'mediumHigh' :
           EN < 3.6 ? 'high' :
           'veryHigh';
  }
}

moleculePolarity.register( 'BondDescriptionMaps', BondDescriptionMaps );