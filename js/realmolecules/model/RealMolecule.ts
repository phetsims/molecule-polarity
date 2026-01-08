// Copyright 2014-2026, University of Colorado Boulder

/**
 * Real molecule that is viewable in PhET's 3D molecule viewer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import moleculePolarity from '../../moleculePolarity.js';
import { RealMoleculeData, RealMoleculeDataEntry } from './RealMoleculeData.js';
import { simplifiedPartialChargesMap } from './RealMoleculeSimplifiedData.js';
import Element from '../../../../nitroglycerin/js/Element.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import Color from '../../../../scenery/js/util/Color.js';
import { elementToColor } from './RealMoleculeColors.js';
import { BondDipoleModel } from './BondDipoleModel.js';
import { FieldModel } from './FieldModel.js';

// Visualization constants for dipoles
const DEFAULT_DIPOLE_FACTOR = 1.3;

// Some dipoles need to be adjusted for molecules (outside of the typical formula for scaling)
const DIPOLE_FACTOR_OVERRIDES: Record<string, number> = {
  HF: 2,
  HCN: 1.6,
  CH2O: 1.6,
  CHCl3: 1.6
};

export default class RealMolecule extends PhetioObject {

  // Structure of the molecule
  public readonly atoms: RealAtom[];
  public readonly bonds: RealBond[];
  public readonly vertices: SurfaceVertex[];
  public readonly faces: SurfaceVertex[][];

  // Molecular dipole as calculated by the psi4 quantum chemistry software (debye)
  public readonly realMolecularDipole: Vector3;

  /**
   * @param symbol - chemical symbol of the molecule
   * @param fullNameProperty - full name of the molecule
   * @param bondDipoleModelProperty - determines how bond dipoles are calculated
   * @param fieldModelProperty - determines how fields (ESP, electron density) are calculated
   * @param tandem
   */
  public constructor(
    public symbol: string,
    public fullNameProperty: TReadOnlyProperty<string>,
    public bondDipoleModelProperty: TReadOnlyProperty<BondDipoleModel>,
    public fieldModelProperty: TReadOnlyProperty<FieldModel>,
    tandem: Tandem
  ) {

    super( {
      phetioType: RealMolecule.RealMoleculeIO,
      phetioState: false, // because RealMoleculeIO extends ReferenceIO
      tandem: tandem
    } );

    this.fullNameProperty = fullNameProperty;

    const moleculeData = RealMoleculeData[ symbol ];
    const simplifiedPartialChargeMap = simplifiedPartialChargesMap[ symbol ];

    // Compute the origin offset for centering the molecule
    const originOffset = RealMolecule.computeOriginOffset( moleculeData );

    this.atoms = moleculeData.atoms.map( ( atomData, atomIndex ) => {
      const symbol = atomData.symbol;
      const bonds = moleculeData.bonds.filter( b => b.indexA === atomIndex || b.indexB === atomIndex );

      // Look up the atom symbol (with bond count fallback) in the simplified partial charge map
      let simplifiedPartialCharge = simplifiedPartialChargeMap[ symbol ];
      if ( simplifiedPartialCharge === undefined ) {
        simplifiedPartialCharge = simplifiedPartialChargeMap[ `${symbol}${bonds.length}` ];
      }
      if ( simplifiedPartialCharge === undefined ) {
        throw new Error( `No partial charge found for atom symbol: ${symbol} with bond quantity: ${bonds.length}` );
      }

      return new RealAtom(
        atomIndex,
        Element.getElementBySymbol( symbol ),
        simplifiedPartialCharge,
        moleculeData.charges[ atomIndex ],
        moleculeData.mulliken[ atomIndex ],
        moleculeData.loewdin[ atomIndex ],
        moleculeData.hirshfeld[ atomIndex ],
        moleculeData.mbis[ atomIndex ],
        moleculeData.chelpg[ atomIndex ],
        new Vector3( atomData.x, atomData.y, atomData.z ).minus( originOffset ),
        this.bondDipoleModelProperty
      );
    } );

    // Bonds later, since they reference atoms
    this.bonds = moleculeData.bonds.map( bondData => {
      const atomA = this.atoms[ bondData.indexA ];
      const atomB = this.atoms[ bondData.indexB ];

      const bondDipoleData = moleculeData.bondDipoles.find( dipole => {
        const indices = [ dipole.indexA, dipole.indexB ];
        return indices.includes( bondData.indexA ) && indices.includes( bondData.indexB );
      } )!;

      return new RealBond( atomA, atomB, bondData.bondType, new Vector3( bondDipoleData.x, bondDipoleData.y, bondDipoleData.z ), this.bondDipoleModelProperty );
    } );

    this.realMolecularDipole = new Vector3( moleculeData.molecularDipole[ 0 ], moleculeData.molecularDipole[ 1 ], moleculeData.molecularDipole[ 2 ] );

    this.vertices = moleculeData.vertexPositions.map( ( positionData, index ) => {
      const normalData = moleculeData.vertexNormals[ index ];

      const position = new Vector3( positionData[ 0 ], positionData[ 1 ], positionData[ 2 ] ).minus( originOffset );
      const normal = new Vector3( normalData[ 0 ], normalData[ 1 ], normalData[ 2 ] );
      const espValue = moleculeData.vertexESPs[ index ];
      const dtValue = moleculeData.vertexDTs[ index ];

      return new SurfaceVertex( position, normal, espValue, dtValue );
    } );

    this.faces = moleculeData.faceIndices.map( faceIndices => faceIndices.map( index => this.vertices[ index ] ) );
  }

  /**
   * Compute the origin offset for centering the molecule
   */
  public static computeOriginOffset( moleculeData: RealMoleculeDataEntry ): Vector3 {
    if ( moleculeData.atoms.length === 2 ) {
      // Homogeneous diatomic centered between two atoms
      if ( moleculeData.atoms[ 0 ].symbol === moleculeData.atoms[ 1 ].symbol ) {
        const a = new Vector3( moleculeData.atoms[ 0 ].x, moleculeData.atoms[ 0 ].y, moleculeData.atoms[ 0 ].z );
        const b = new Vector3( moleculeData.atoms[ 1 ].x, moleculeData.atoms[ 1 ].y, moleculeData.atoms[ 1 ].z );
        return a.average( b );
      }
      else {
        // it's HF, for now we'll center around the F
        const fluorine = moleculeData.atoms.find( atom => atom.symbol === 'F' )!;
        return new Vector3( fluorine.x, fluorine.y, fluorine.z );
      }
    }
    else {
      // Find the atom with the most bonds, we'll center around that
      let centralAtomIndex: number | null = null;
      let bestBondCount = 0;

      for ( let i = 0; i < moleculeData.atoms.length; i++ ) {
        const bondCount = moleculeData.bonds.filter( b => b.indexA === i || b.indexB === i ).length;

        if ( bondCount > bestBondCount ) {
          bestBondCount = bondCount;
          centralAtomIndex = i;
        }
      }

      const centralAtom = moleculeData.atoms[ centralAtomIndex! ];
      return new Vector3( centralAtom.x, centralAtom.y, centralAtom.z );
    }
  }

  /**
   * Returns the electrostatic potential at the given vertex.
   */
  public getElectrostaticPotential( vertex: SurfaceVertex ): number {
    if ( this.fieldModelProperty.value === 'psi4' ) {
      return vertex.espValue;
    }
    else {
      return this.getSimplifiedElectrostaticPotential( vertex.position );
    }
  }

  /**
   * Returns the electron density at the given vertex.
   */
  public getElectronDensity( vertex: SurfaceVertex ): number {
    if ( this.fieldModelProperty.value === 'psi4' ) {
      return vertex.dtValue;
    }
    else {
      // NOTE: Yes... the "simplified" model is to just hack the same value for electron density as electrostatic potential.
      return this.getSimplifiedElectrostaticPotential( vertex.position );
    }
  }

  /**
   * Returns the electrostatic potential at the given point using simplified partial charges.
   *
   * NOTE: this can't use the psi4 model, because we only have ESP values at surface vertices for that.
   */
  public getSimplifiedElectrostaticPotential( point: Vector3 ): number {
    let espValue = 0;

    for ( let i = 0; i < this.atoms.length; i++ ) {
      const atom = this.atoms[ i ];
      const distance = point.distance( atom.position );
      const partialCharge = atom.simplifiedPartialCharge;

      espValue += partialCharge / distance;
    }

    return espValue;
  }

  /**
   * Returns the bond-dipole cap factor for this molecule. Allows per-molecule overrides.
   */
  public getBondDipoleFactor(): number {
    return DIPOLE_FACTOR_OVERRIDES[ this.symbol ] ?? DEFAULT_DIPOLE_FACTOR;
  }

  /**
   * Computes the per-Debye scale used to size dipole arrows so that all bond dipoles fit within their
   * visible bond length times the bond-dipole factor. Returns 0 if no bonds contribute.
   */
  public getDipoleScale(): number {
    let globalScalePerDebye = Number.POSITIVE_INFINITY;
    const factor = this.getBondDipoleFactor();
    for ( const bond of this.bonds ) {
      const muMag = bond.getDipoleMagnitudeDebye();
      if ( muMag <= 1e-3 ) {
        continue;
      }

      const cap = factor * bond.getVisibleLength();
      globalScalePerDebye = Math.min( globalScalePerDebye, cap / muMag );
    }

    if ( !isFinite( globalScalePerDebye ) || globalScalePerDebye < 0 ) {
      return 0;
    }

    return globalScalePerDebye;
  }

  /**
   * Computes the molecular dipole using a centroid method (Jmol-style):
   * find centroids of positive and negative charge distributions and scale by total positive charge.
   * Returns a Vector3 in model coordinates, or null if it cannot be computed.
   */
  public computeMolecularDipole(): Vector3 | null {
    const E_ANG_PER_DEBYE = 0.208194; // e*angstroms/debye
    let positiveCharge = 0;
    let negativeCharge = 0;

    const positive = new Vector3( 0, 0, 0 );
    const negative = new Vector3( 0, 0, 0 );

    for ( let i = 0; i < this.atoms.length; i++ ) {
      const atom = this.atoms[ i ];
      const q = atom.getPartialCharge();
      if ( q > 0 ) {
        positiveCharge += q;
        positive.add( atom.position.timesScalar( q ) );
      }
      else if ( q < 0 ) {
        negativeCharge += q;
        negative.add( atom.position.timesScalar( q ) );
      }
    }

    if ( positiveCharge !== 0 && negativeCharge !== 0 ) {
      positive.divideScalar( positiveCharge );
      negative.divideScalar( negativeCharge );

      const sep = positive.minus( negative );
      const factor = positiveCharge / E_ANG_PER_DEBYE;
      return sep.timesScalar( factor );
    }
    return null;
  }

  /**
   * Vector sum of per-bond dipoles (in Debye), each oriented from positive to negative.
   * Useful for visual consistency with bond dipole arrows.
   */
  public computeBondDipoleVectorSum(): Vector3 {
    const sum = new Vector3( 0, 0, 0 );

    for ( const bond of this.bonds ) {
      sum.add( bond.getDipoleVector() );
    }

    return sum;
  }

  /**
   * Returns the atom most aligned with the molecular dipole direction from the central atom.
   * Uses the vector sum of bond dipoles (positive->negative) and an orientation sign.
   * Returns null if no central atom or negligible dipole.
   */
  public getMoleculeDipoleAlignedAtom( orientationSign: number ): RealAtom | null {
    const centralAtom = this.getCentralAtom();
    if ( !centralAtom ) {
      return null;
    }

    const mu = this.computeBondDipoleVectorSum();
    const muMag = mu.getMagnitude();
    if ( muMag <= 1e-3 ) {
      return null;
    }

    const dir = mu.dividedScalar( muMag ).timesScalar( orientationSign );
    const threshold = 0.95; // dot product threshold

    let bestDot = threshold;
    let best: RealAtom | null = null;

    for ( const atom of this.atoms ) {
      if ( atom === centralAtom ) { continue; }
      const vector = atom.position.minus( centralAtom.position ).normalized();
      const dot = vector.dot( dir );
      if ( dot > bestDot ) {
        bestDot = dot;
        best = atom;
      }
    }
    return best;
  }

  /**
   * If the bond is one of a symmetric pair around the central atom (two neighbors with the same element),
   * returns its partner bond; otherwise null.
   */
  public getSymmetricPartnerBond( bond: RealBond ): RealBond | null {
    const centralAtom = this.getCentralAtom();
    if ( !centralAtom ) {
      return null;
    }

    let other: RealAtom | null = null;
    if ( bond.atomA === centralAtom ) {
      other = bond.atomB;
    }
    else if ( bond.atomB === centralAtom ) {
      other = bond.atomA;
    }
    else {
      return null;
    }
    const targetSymbol = other.element.symbol;
    const sameSymbolBonds = centralAtom.bonds.filter( b => {
      const neighbor = b.atomA === centralAtom ? b.atomB : ( b.atomB === centralAtom ? b.atomA : null );
      return neighbor !== null && neighbor.element.symbol === targetSymbol;
    } );
    if ( sameSymbolBonds.length === 2 ) {
      return sameSymbolBonds[ 0 ] === bond ? sameSymbolBonds[ 1 ] : ( sameSymbolBonds[ 1 ] === bond ? sameSymbolBonds[ 0 ] : null );
    }
    return null;
  }

  /**
   * Returns a representative central atom for positioning the molecular dipole arrow and related visuals.
   * - Homogeneous diatomic (e.g., H2, F2): returns null
   * - HF: returns the Fluorine atom
   * - Otherwise: returns the atom with the most bonds (ties resolved by first encountered)
   */
  public getCentralAtom(): RealAtom | null {
    if ( this.atoms.length === 2 ) {
      const a = this.atoms[ 0 ];
      const b = this.atoms[ 1 ];
      if ( a.element.symbol === b.element.symbol ) {
        return null; // homogeneous diatomic
      }
      // Prefer Fluorine for HF (our known hetero-diatomic case)
      const fluorine = this.atoms.find( atom => atom.element.symbol === 'F' );
      if ( fluorine ) {
        return fluorine;
      }
      // If we ever encounter other hetero-diatomics, fall back to null to avoid arbitrary choice
      return null;
    }

    // Pick the atom with the most bonds
    let best: RealAtom = this.atoms[ 0 ];
    let bestCount = best.bonds.length;
    for ( let i = 1; i < this.atoms.length; i++ ) {
      const count = this.atoms[ i ].bonds.length;
      if ( count > bestCount ) {
        best = this.atoms[ i ];
        bestCount = count;
      }
    }
    return best;
  }

  /**
   * Centroid (unweighted average position) of atom positions in model coordinates.
   */
  public getCentroid(): Vector3 {
    const centroid = new Vector3( 0, 0, 0 );
    for ( let i = 0; i < this.atoms.length; i++ ) {
      centroid.add( this.atoms[ i ].position );
    }
    return centroid.divideScalar( this.atoms.length );
  }

  /**
   * Maximum radial extent: the maximum distance from the centroid to any atom position.
   * Returns a length in model units (same as previously used 'span').
   */
  public getMaximumExtent(): number {
    const centroid = this.getCentroid();
    let maxR2 = 0;
    for ( let i = 0; i < this.atoms.length; i++ ) {
      const d2 = this.atoms[ i ].position.distanceSquared( centroid );
      if ( d2 > maxR2 ) {
        maxR2 = d2;
      }
    }
    return Math.sqrt( maxR2 );
  }

  /**
   * RealMoleculeIO handles PhET-iO serialization of RealMolecule. Since all RealMolecule are instantiated at
   * startup, it implements 'Reference type serialization', as described in the Serialization section of
   * https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization
   */
  public static readonly RealMoleculeIO = new IOType<IntentionalAny, IntentionalAny>( 'RealMoleculeIO', {
    valueType: RealMolecule,
    supertype: ReferenceIO( IOType.ObjectIO )
  } );
}

moleculePolarity.register( 'RealMolecule', RealMolecule );

/**
 * Represents an atom in a RealMolecule.
 */
export class RealAtom {

  public readonly bonds: RealBond[] = [];

  public constructor(
    public readonly index: number,
    public element: Element,
    public simplifiedPartialCharge: number,
    public psi4PartialCharge: number,
    public mullikenPartialCharge: number,
    public loewdinPartialCharge: number,
    public hirshfeldPartialCharge: number,
    public mbisPartialCharge: number,
    public chelpgPartialCharge: number,
    public position: Vector3,
    public bondDipoleModelProperty: TReadOnlyProperty<BondDipoleModel>
  ) {

  }

  public getPartialCharge(): number {
    const bondDipoleModel = this.bondDipoleModelProperty.value;
    if ( bondDipoleModel === 'electronegativity' || bondDipoleModel === 'psi4' ) {
      return this.psi4PartialCharge;
    }
    else if ( bondDipoleModel === 'mulliken' ) {
      return this.mullikenPartialCharge;
    }
    else if ( bondDipoleModel === 'loewdin' ) {
      return this.loewdinPartialCharge;
    }
    else if ( bondDipoleModel === 'hirschfeld' ) {
      return this.hirshfeldPartialCharge;
    }
    else if ( bondDipoleModel === 'mbis' ) {
      return this.mbisPartialCharge;
    }
    else if ( bondDipoleModel === 'chelpg' ) {
      return this.chelpgPartialCharge;
    }
    else if ( bondDipoleModel === 'java' ) {
      return this.simplifiedPartialCharge;
    }
    else {
      throw new Error( `Unknown bond dipole model: ${bondDipoleModel}` );
    }
  }

  public getColor(): Color {
    return Color.toColor( elementToColor( this.element ) );
  }

  public getDisplayRadius(): number {
    const angstroms = this.element.vanDerWaalsRadius / 100;

    return 0.25 * angstroms; // scale factor for better visibility
  }
}

moleculePolarity.register( 'RealAtom', RealAtom );

/**
 * Represents a bond in a RealMolecule.
 */
export class RealBond {
  public constructor(
    public readonly atomA: RealAtom,
    public readonly atomB: RealAtom,
    public readonly bondType: 1 | 2 | 3,
    public readonly realBondDipole: Vector3,
    public bondDipoleModelProperty: TReadOnlyProperty<BondDipoleModel>
  ) {
    atomA.bonds.push( this );
    atomB.bonds.push( this );
  }

  public getDistance(): number {
    return this.atomB.position.distance( this.atomA.position );
  }

  public getDirection(): Vector3 {
    return this.atomB.position.minus( this.atomA.position ).normalized();
  }

  /**
   * Unit direction vector from positive to negative end (Jmol convention), independent of orientation preference.
   */
  public getPositiveToNegativeDirection(): Vector3 {
    if ( this.bondDipoleModelProperty.value === 'electronegativity' ) {
      const en1 = this.atomA.element.electronegativity!;
      const en2 = this.atomB.element.electronegativity!;
      return ( ( en2 - en1 ) >= 0 ? this.getDirection() : this.getDirection().negated() );
    }
    else {
      const c1 = this.atomA.getPartialCharge();
      const c2 = this.atomB.getPartialCharge();
      return ( ( c1 - c2 ) >= 0 ? this.getDirection() : this.getDirection().negated() );
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
    if ( this.bondDipoleModelProperty.value === 'electronegativity' ) {
      // An approximate value, we mainly just need relative magnitudes for visualization
      return Math.abs( this.atomB.element.electronegativity! - this.atomA.element.electronegativity! );
    }
    else {
      const E_ANG_PER_DEBYE = 0.208194; // e*angstroms/debye
      const c1 = this.atomA.getPartialCharge();
      const c2 = this.atomB.getPartialCharge();
      const dist = this.getDistance();
      const valueDebye = ( ( c1 - c2 ) / 2 ) * ( dist / E_ANG_PER_DEBYE );
      return Math.abs( valueDebye );
    }
  }

  public getDipoleVector(): Vector3 {
    const muMag = this.getDipoleMagnitudeDebye();

    return this.getPositiveToNegativeDirection().timesScalar( muMag );
  }
}

moleculePolarity.register( 'RealBond', RealBond );

/**
 * Represents a vertex on the molecular surface.
 */
export class SurfaceVertex {
  public constructor(
    public readonly position: Vector3,
    public readonly normal: Vector3,
    public readonly espValue: number,
    public readonly dtValue: number
  ) {}

  public getPositionArray(): number[] {
    return [ this.position.x, this.position.y, this.position.z ];
  }

  public getNormalArray(): number[] {
    return [ this.normal.x, this.normal.y, this.normal.z ];
  }
}

moleculePolarity.register( 'SurfaceVertex', SurfaceVertex );