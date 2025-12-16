// Copyright 2014-2025, University of Colorado Boulder

/**
 * Real molecule that is viewable in PhET's 3D molecule viewer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ChemUtils from '../../../../nitroglycerin/js/ChemUtils.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import moleculePolarity from '../../moleculePolarity.js';
import { RealMoleculeData } from './RealMoleculeData.js';
import { simplifiedPartialChargesMap } from './RealMoleculeSimplifiedData.js';
import Element from '../../../../nitroglycerin/js/Element.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import Color from '../../../../scenery/js/util/Color.js';
import { elementToColor } from './RealMoleculeColors.js';

export default class RealMolecule extends PhetioObject {

  public readonly symbol: string;
  public readonly fullNameProperty: TReadOnlyProperty<string>;

  public readonly atoms: RealAtom[];
  public readonly bonds: RealBond[];
  public readonly realMolecularDipole: Vector3;
  public readonly vertices: SurfaceVertex[];
  public readonly faces: SurfaceVertex[][];

  /**
   * @param rawSymbol - chemical symbol of the molecule
   * @param fullNameProperty - full name of the molecule
   * @param tandem
   */
  public constructor( public rawSymbol: string, fullNameProperty: TReadOnlyProperty<string>, tandem: Tandem ) {

    super( {
      phetioType: RealMolecule.RealMoleculeIO,
      phetioState: false, // because RealMoleculeIO extends ReferenceIO
      tandem: tandem
    } );

    // TODO: rename so we have displaySymbol and symbol, https://github.com/phetsims/molecule-polarity/issues/32
    this.symbol = ChemUtils.toSubscript( rawSymbol );
    this.fullNameProperty = fullNameProperty;

    const moleculeData = RealMoleculeData[ rawSymbol ];
    const simplifiedPartialChargeMap = simplifiedPartialChargesMap[ rawSymbol ];

    this.atoms = moleculeData.atoms.map( ( atomData, atomIndex ) => {
      const symbol = atomData.symbol;
      const bonds = moleculeData.bonds.filter( b => b.indexA === atomIndex || b.indexB === atomIndex );

      let simplifiedPartialCharge = simplifiedPartialChargeMap[ symbol ];
      if ( simplifiedPartialCharge === undefined ) {
        simplifiedPartialCharge = simplifiedPartialChargeMap[ `${symbol}${bonds.length}` ];
      }
      if ( simplifiedPartialCharge === undefined ) {
        throw new Error( `No partial charge found for atom symbol: ${symbol} with bond quantity: ${bonds.length}` );
      }
      const realPartialCharge = moleculeData.charges[ atomIndex ];

      return new RealAtom(
        atomIndex,
        Element.getElementBySymbol( symbol ),
        simplifiedPartialCharge,
        realPartialCharge,
        new Vector3( atomData.x, atomData.y, atomData.z )
      );
    } );

    this.bonds = moleculeData.bonds.map( bondData => {
      const atomA = this.atoms[ bondData.indexA ];
      const atomB = this.atoms[ bondData.indexB ];

      const bondDipoleData = moleculeData.bondDipoles.find( dipole => {
        const indices = [ dipole.indexA, dipole.indexB ];
        return indices.includes( bondData.indexA ) && indices.includes( bondData.indexB );
      } )!;

      return new RealBond( atomA, atomB, bondData.bondType, new Vector3( bondDipoleData.x, bondDipoleData.y, bondDipoleData.z ) );
    } );

    this.realMolecularDipole = new Vector3( moleculeData.molecularDipole[ 0 ], moleculeData.molecularDipole[ 1 ], moleculeData.molecularDipole[ 2 ] );

    this.vertices = moleculeData.vertexPositions.map( ( positionData, index ) => {
      const normalData = moleculeData.vertexNormals[ index ];

      const position = new Vector3( positionData[ 0 ], positionData[ 1 ], positionData[ 2 ] );
      const normal = new Vector3( normalData[ 0 ], normalData[ 1 ], normalData[ 2 ] );
      const espValue = moleculeData.vertexESPs[ index ];
      const dtValue = moleculeData.vertexDTs[ index ];

      return new SurfaceVertex( position, normal, espValue, dtValue );
    } );

    this.faces = moleculeData.faceIndices.map( faceIndices => faceIndices.map( index => this.vertices[ index ] ) );
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

export class RealAtom {

  public readonly bonds: RealBond[] = [];

  public constructor(
    public readonly index: number,
    public element: Element,
    public simplifiedPartialCharge: number,
    public realPartialCharge: number,
    public position: Vector3
  ) {

  }

  public getColor(): Color {
    return Color.toColor( elementToColor( this.element ) );
  }

  public getDisplayRadius(): number {
    const angstroms = this.element.vanDerWaalsRadius / 100;

    return 0.25 * angstroms; // scale factor for better visibility
  }
}

export class RealBond {
  public constructor(
    public readonly atomA: RealAtom,
    public readonly atomB: RealAtom,
    public readonly bondType: 1 | 2 | 3,
    public readonly realBondDipole: Vector3
  ) {
    atomA.bonds.push( this );
    atomB.bonds.push( this );
  }
}

export class SurfaceVertex {
  public constructor(
    public readonly position: Vector3,
    public readonly normal: Vector3,
    public readonly espValue: number,
    public readonly dtValue: number
  ) {}
}