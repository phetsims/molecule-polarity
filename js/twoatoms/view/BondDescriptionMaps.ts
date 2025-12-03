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

export default class BondDescriptionMaps {
  public constructor() {
    // no-op
  }

  public static createPolarityStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.polarity.createProperty( {
      polarity: deltaENProperty.derived( value => BondDescriptionMaps.deltaENtoPolarity( value ) )
    } );
  }

  public static createBondDipoleStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.bondDipole.createProperty( {
      bondDipole: deltaENProperty.derived( value => BondDescriptionMaps.deltaENtoBondDipole( value ) )
    } );
  }

  public static createPartialChargesStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.partialChargeMagnitude.createProperty( {
      magnitude: deltaENProperty.derived( value => BondDescriptionMaps.deltaENtoPartialCharges( value ) )
    } );
  }

  public static createBondCharacterStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.bondCharacter.createProperty( {
      bondCharacter: deltaENProperty.derived( value => BondDescriptionMaps.deltaENtoBondCharacter( value ) )
    } );
  }

  public static createElectrostaticPotentialStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electrostaticPotential.createProperty( {
      potential: deltaENProperty.derived( value => BondDescriptionMaps.deltaENtoElectrostaticPotential( value ) )
    } );
  }

  public static createElectronDensityStringProperty( deltaENProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<string> {
    return MoleculePolarityFluent.a11y.electronDensity.createProperty( {
      density: deltaENProperty.derived( value => BondDescriptionMaps.deltaENtoElectronDensity( value ) )
    } );
  }

  private static deltaENtoPolarity( deltaEN: number ): Polarity {
    return deltaEN === 0 ? 'nonpolar' :
           deltaEN <= 0.4 ? 'veryWeaklyPolar' :
           deltaEN <= 0.8 ? 'weaklyPolar' :
           deltaEN <= 1.2 ? 'polar' :
           deltaEN <= 1.6 ? 'stronglyPolar' :
           'veryStronglyPolar';
  }

  private static deltaENtoBondDipole( deltaEN: number ): Dipole {
    return deltaEN === 0 ? 'no' :
           deltaEN <= 0.4 ? 'verySmall' :
           deltaEN <= 0.8 ? 'small' :
           deltaEN <= 1.2 ? 'medium' :
           deltaEN <= 1.6 ? 'large' :
           'veryLarge';
  }

  private static deltaENtoPartialCharges( deltaEN: number ): PartialChargeMagnitude {
    return deltaEN === 0 ? 'no' :
           deltaEN <= 0.4 ? 'verySmall' :
           deltaEN <= 0.8 ? 'small' :
           deltaEN <= 1.2 ? 'medium' :
           deltaEN <= 1.6 ? 'large' :
           'veryLarge';
  }

  private static deltaENtoBondCharacter( deltaEN: number ): BondCharacter {
    return deltaEN === 0 ? 'nonpolarCovalent' :
           deltaEN <= 0.4 ? 'nearlyNonpolarCovalent' :
           deltaEN <= 0.8 ? 'slightlyPolarCovalent' :
           deltaEN <= 1.2 ? 'polarCovalent' :
           deltaEN <= 1.6 ? 'slightlyIonic' :
           'mostlyIonic';
  }

  private static deltaENtoElectrostaticPotential( deltaEN: number ): ElectrostaticPotential {
    return deltaEN === 0 ? 'noDifference' :
           deltaEN <= 0.4 ? 'verySmallDifference' :
           deltaEN <= 0.8 ? 'smallDifference' :
           deltaEN <= 1.2 ? 'mediumDifference' :
           deltaEN <= 1.6 ? 'largeDifference' :
           'veryLargeDifference';
  }

  private static deltaENtoElectronDensity( deltaEN: number ): ElectronDensity {
    return deltaEN === 0 ? 'evenlyShared' :
           deltaEN <= 0.4 ? 'nearlyEvenlyShared' :
           deltaEN <= 0.8 ? 'slightlyUnevenlyShared' :
           deltaEN <= 1.2 ? 'unevenlyShared' :
           deltaEN <= 1.6 ? 'veryUnevenlyShared' :
           'mostUnevenlyShared';
  }
}

moleculePolarity.register( 'BondDescriptionMaps', BondDescriptionMaps );