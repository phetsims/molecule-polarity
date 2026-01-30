// Copyright 2014-2026, University of Colorado Boulder

/**
 * The bond of a RealMolecule.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Vector3 from '../../../../dot/js/Vector3.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import moleculePolarity from '../../moleculePolarity.js';
import { RealAtom } from './RealAtom.js';

export class RealBond {
  /**
   * @param atomA
   * @param atomB
   * @param bondType - the order of the bond, with 1.5 representing aromatic bonds (i.e. ozone)
   * @param realMolecularDipole - needed for positioning 1.5 bond dashes
   * @param isAdvancedProperty
   * @param initialBondReversed
   */
  public constructor(
    public readonly atomA: RealAtom,
    public readonly atomB: RealAtom,
    public readonly bondType: 1 | 1.5 | 2 | 3,
    public readonly realMolecularDipole: Vector3,
    public isAdvancedProperty: TReadOnlyProperty<boolean>,
    public initialBondReversed: boolean
  ) {
    // Connect the bond to the atoms
    atomA.bonds.push( this );
    atomB.bonds.push( this );
  }

  /**
   * Distance between the two atoms (in angstroms).
   */
  public getDistance(): number {
    return this.atomB.position.distance( this.atomA.position );
  }

  /**
   * Unit direction vector from atomB to atomA.
   */
  public getDirection(): Vector3 {
    return this.atomB.position.minus( this.atomA.position ).normalized();
  }

  /**
   * Unit direction vector from positive to negative end (Jmol convention), independent of orientation preference.
   */
  public getPositiveToNegativeDirection(): Vector3 {
    if ( this.isAdvancedProperty.value ) {
      // Partial charge based directions
      const c1 = this.atomA.getPartialCharge();
      const c2 = this.atomB.getPartialCharge();
      return ( ( c1 - c2 ) >= 0 ? this.getDirection() : this.getDirection().negated() );
    }
    else {
      // Electronegativity-based directions
      const en1 = this.atomA.element.electronegativity!;
      const en2 = this.atomB.element.electronegativity!;
      return ( ( en2 - en1 ) >= 0 ? this.getDirection() : this.getDirection().negated() );
    }
  }

  /**
   * The visible length of the bond is calculated by subtracting the display radii of the two atoms from the total distance
   * between them.
   *
   * (the portion not covered by spheres).
   */
  public getVisibleLength(): number {
    const radiusA = this.atomA.getDisplayRadius();
    const radiusB = this.atomB.getDisplayRadius();
    return Math.max( 0, this.getDistance() - ( radiusA + radiusB ) );
  }

  /**
   * Visible bond center, midway between the exposed endpoints.
   */
  public getVisibleCenter(): Vector3 {
    const direction = this.getDirection();
    const positionA = this.atomA.position.plus( direction.timesScalar( this.atomA.getDisplayRadius() ) );
    const positionB = this.atomB.position.minus( direction.timesScalar( this.atomB.getDisplayRadius() ) );
    return positionA.average( positionB );
  }

  /**
   * Bond dipole magnitude in Debye (Jmol convention) using partial charges and bond distance.
   */
  public getDipoleMagnitudeDebye(): number {
    if ( this.isAdvancedProperty.value ) {
      const E_ANG_PER_DEBYE = 0.208194; // e*angstroms/debye
      const c1 = this.atomA.getPartialCharge();
      const c2 = this.atomB.getPartialCharge();
      const dist = this.getDistance();
      const valueDebye = ( ( c1 - c2 ) / 2 ) * ( dist / E_ANG_PER_DEBYE );
      return Math.abs( valueDebye );
    }
    else {
      // Electronegativity-based dipole magnitudes.
      // An approximate value, we mainly just need relative magnitudes for visualization
      return Math.abs( this.atomB.element.electronegativity! - this.atomA.element.electronegativity! );
    }
  }

  /**
   * Bond dipole vector from positive to negative end (Jmol convention).
   */
  public getDipoleVector(): Vector3 {
    const muMag = this.getDipoleMagnitudeDebye();

    return this.getPositiveToNegativeDirection().timesScalar( muMag );
  }
}

moleculePolarity.register( 'RealBond', RealBond );