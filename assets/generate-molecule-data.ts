// Copyright 2025, University of Colorado Boulder

/**
 * Generates molecule data imports.
 *
 * Run from molecule-polarity directory
 *
 * npx tsx ./assets/generate-molecule-data.ts
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import fs from 'fs';
import path from 'path';
import execute from '../../perennial/js/common/execute.js';
import os from 'os';

const TEMP_DIR = './assets/molecule-data-temp/';
const OUT_DIR = './assets/generated-data/';
const GRID_SPACING = 0.1;
const PROBE_RADIUS = 1.4;
const SES_DENSITY = 6.0;
const MSMS_PATH = `~/Downloads/msms/msms_x86_64Darwin_2.6.1/msms.x86_64Darwin.2.6.1`;

const MOLECULE_NAMES = [
  'BF3',
  'BH3',
  'CF4',
  'CH2F2',
  'CH2O',
  'CH3F',
  'CH4',
  'CHCl3',
  'CHF3',
  'CO2',
  'F2',
  'H2',
  'H2O',
  'HCN',
  'HF',
  'N2',
  'NH3',
  'O2',
  'O3'
];

// const moleculeName = process.argv[ 2 ];
//
// if ( !moleculeName ) {
//   throw new Error( 'Please provide a molecule name as the first argument' );
// }

const xyzToXyzr = ( xyzString: string ): string => {
  // Radii in angstroms
  const VDW_RADII = {
    H: 1.20,
    B: 1.92,
    C: 1.70,
    N: 1.55,
    O: 1.52,
    F: 1.47,
    Cl: 1.75,
    CL: 1.75
  };

  const lines = xyzString.split( /\r?\n/ ).map( l => l.trim() );

  // Line 1: atom count
  const first = lines[ 0 ].split( /\s+/ );
  const numAtoms = parseInt( first[0], 10 );
  if ( !Number.isFinite( numAtoms ) ) {
    throw new Error(`Could not parse atom count from first line: '${lines[ 0 ]}'`);
  }

  // Skip comment line
  const atomLines = lines.slice( 2, 2 + numAtoms );
  if ( atomLines.length < numAtoms ) {
    throw new Error( `Expected ${numAtoms} atom lines, found ${atomLines.length}.` );
  }

  // Build output
  const outLines: string[] = [];

  atomLines.forEach( (line, idx) => {
    const parts = line.split( /\s+/ );
    if ( parts.length < 4 ) {
      throw new Error(`Atom line ${idx + 1} malformed: '${line}'`);
    }

    let elem = parts[ 0 ];
    let x = parseFloat( parts[ 1 ] );
    let y = parseFloat( parts[ 2 ] );
    let z = parseFloat( parts[ 3 ] );

    if ( ![x, y, z].every( Number.isFinite ) ) {
      throw new Error( `Invalid coordinates in line ${idx + 1}: '${line}'` );
    }

    // Normalize element key
    let key = elem;
    if ( elem.toLowerCase() === "cl" ) key = "Cl";

    if ( !( key in VDW_RADII ) ) {
      throw new Error(`No VdW radius defined for element '${elem}' on line ${idx + 1}`);
    }

    const radius: number = VDW_RADII[ key as keyof typeof VDW_RADII ];

    outLines.push(
      `${x.toFixed( 6 )}  ${y.toFixed( 6 )}  ${z.toFixed( 6 )}  ${radius.toFixed( 3 )}`
    );
  } );

  return outLines.join( '\n' );
};

// 1 e·Å → Debye
const EA_TO_DEBYE = 4.80320427;

/**
 * Parse Mulliken charges (Total column) from Psi4 .out text.
 * Returns an array of charges (e), one per atom.
 */
function parseMullikenFromOut( outText: string ): number[] {
  // Find all Mulliken blocks, take the last one
  const regex = /Mulliken Charges:\s*\(a\.u\.\)([\s\S]*?)(?:\n\s*\n|\Z)/g;
  const matches = [...outText.matchAll(regex)];
  if (matches.length === 0) {
    throw new Error("Could not find 'Mulliken Charges' block in Psi4 output.");
  }

  const block = matches[matches.length - 1][1]; // last block's group 1
  const charges = [];

  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("Center") || line.startsWith("-")) continue;

    const parts = line.split(/\s+/);
    // Expect: index Symbol Alpha Beta Spin Total
    if (parts.length >= 6 && /^\d+$/.test(parts[0])) {
      const qTotal = parseFloat(parts[parts.length - 1]); // 'Total' column
      if (!Number.isFinite(qTotal)) {
        throw new Error(`Could not parse Mulliken charge from line: '${line}'`);
      }
      charges.push(qTotal);
    }
  }

  if (charges.length === 0) {
    throw new Error("No Mulliken charges parsed from Psi4 output.");
  }

  return charges; // array of numbers (e)
}

/**
 * Parse molecular dipole from the 'Multipole Moments' L = 1 block.
 * Returns [mux, muy, muz] in Debye.
 */
function parseMolecularDipoleFromMultipole( outText: string ): number[] {
  const lines = outText.split(/\r?\n/);

  let factor = 2.5417464519; // default; overwritten if parsed
  let mux = null;
  let muy = null;
  let muz = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("L = 1.") && line.includes("convert [e a0] to [Debye]")) {
      // Extract factor
      const facMatch = line.match(
        /Multiply by\s+([0-9.Ee+-]+)\s+to convert \[e a0\] to \[Debye\]/
      );
      if (facMatch) {
        factor = parseFloat(facMatch[1]);
      }

      // Next ~10 lines should contain Dipole X/Y/Z
      for (let j = i + 1; j < Math.min(i + 12, lines.length); j++) {
        const s = lines[j];
        if (s.includes("Dipole X")) {
          const parts = s.trim().split(/\s+/);
          mux = parseFloat(parts[parts.length - 1]); // total (a.u.)
        } else if (s.includes("Dipole Y")) {
          const parts = s.trim().split(/\s+/);
          muy = parseFloat(parts[parts.length - 1]);
        } else if (s.includes("Dipole Z")) {
          const parts = s.trim().split(/\s+/);
          muz = parseFloat(parts[parts.length - 1]);
        }
      }
      break;
    }
  }

  if (
    mux === null ||
    !Number.isFinite(mux) ||
    muy === null ||
    !Number.isFinite(muy) ||
    muz === null ||
    !Number.isFinite(muz)
  ) {
    // Fallback: zero vector if not found
    return [0, 0, 0];
  }

  // Convert from e·a0 to Debye
  return [mux * factor, muy * factor, muz * factor];
}

/**
 * Parse coordinates (Å) from XYZ string.
 * Format:
 *   natoms
 *   comment
 *   Sym x y z
 *   ...
 * Returns array of [x, y, z].
 */
function parseXYZCoords( xyzText: string ): number[][] {
  const lines = xyzText
    .split(/\r?\n/)
    .map((l) => l.trim());

  if (lines.length < 3) {
    throw new Error("XYZ content too short (need at least 3 lines).");
  }

  const natoms = parseInt(lines[0].split(/\s+/)[0], 10);
  if (!Number.isFinite(natoms)) {
    throw new Error(`Could not parse atom count from first XYZ line: '${lines[0]}'`);
  }

  const atomLines = lines.slice(2, 2 + natoms);
  if (atomLines.length < natoms) {
    throw new Error(
      `Expected ${natoms} atom lines in XYZ, found ${atomLines.length}.`
    );
  }

  const coords = [];
  for (const line of atomLines) {
    const parts = line.split(/\s+/);
    if (parts.length < 4) {
      throw new Error(`Bad XYZ atom line: '${line}'`);
    }
    const x = parseFloat(parts[1]);
    const y = parseFloat(parts[2]);
    const z = parseFloat(parts[3]);
    if (![x, y, z].every(Number.isFinite)) {
      throw new Error(`Invalid coordinates in XYZ line: '${line}'`);
    }
    coords.push([x, y, z]);
  }

  return coords; // Array<[x,y,z>] in Å
}

/**
 * Parse coordinates (Å) from XYZ string.
 * Format:
 *   natoms
 *   comment
 *   Sym x y z
 *   ...
 * Returns array of [x, y, z].
 */
function parseAtoms( xyzText: string ): {
  symbol: string;
  x: number;
  y: number;
  z: number;
}[] {
  const lines = xyzText
    .split(/\r?\n/)
    .map((l) => l.trim());

  if (lines.length < 3) {
    throw new Error("XYZ content too short (need at least 3 lines).");
  }

  const natoms = parseInt(lines[0].split(/\s+/)[0], 10);
  if (!Number.isFinite(natoms)) {
    throw new Error(`Could not parse atom count from first XYZ line: '${lines[0]}'`);
  }

  const atomLines = lines.slice(2, 2 + natoms);
  if (atomLines.length < natoms) {
    throw new Error(
      `Expected ${natoms} atom lines in XYZ, found ${atomLines.length}.`
    );
  }

  const atoms: { symbol: string; x: number; y: number; z: number }[] = [];
  for (const line of atomLines) {
    const parts = line.split(/\s+/);
    if (parts.length < 4) {
      throw new Error(`Bad XYZ atom line: '${line}'`);
    }
    const symbol = parts[0];
    const x = parseFloat(parts[1]);
    const y = parseFloat(parts[2]);
    const z = parseFloat(parts[3]);
    if (![x, y, z].every(Number.isFinite)) {
      throw new Error(`Invalid coordinates in XYZ line: '${line}'`);
    }
    atoms.push( {
      symbol: symbol,
      x: x,
      y: y,
      z: z
    } );
  }

  return atoms;
}

/**
 * Parse bonds from SDF (V2000) text.
 * Returns array of [i, j] pairs (0-based indices).
 */
function parseSDFBonds( sdfText: string ): number[][] {
  const lines = sdfText.split(/\r?\n/);

  if (lines.length < 4) {
    throw new Error("SDF content too short (need at least 4 lines).");
  }

  const countsLine = lines[3];
  if (!countsLine || countsLine.length < 6) {
    throw new Error(`Malformed counts line in SDF: '${countsLine}'`);
  }

  let natoms, nbonds;
  try {
    natoms = parseInt(countsLine.slice(0, 3), 10);
    nbonds = parseInt(countsLine.slice(3, 6), 10);
  } catch (e) {
    throw new Error(
      `Could not parse natoms/nbonds from SDF counts line: '${countsLine}'`
    );
  }

  const atomStart = 4;
  const bondStart = atomStart + natoms;
  const bondEnd = bondStart + nbonds;

  if (lines.length < bondEnd) {
    throw new Error(
      `SDF does not contain ${nbonds} bond lines; only ${lines.length} lines total.`
    );
  }

  const bonds = [];

  for (let i = bondStart; i < bondEnd; i++) {
    const line = lines[i];
    if (!line || line.length < 6) continue;
    try {
      const a = parseInt(line.slice(0, 3), 10);
      const b = parseInt(line.slice(3, 6), 10);
      if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
      // Convert 1-based to 0-based
      bonds.push([a - 1, b - 1]);
    } catch {
      // ignore malformed bond lines
    }
  }

  return bonds; // Array<[i,j>]
}

/**
 * Compute bond dipole vectors (Debye) from Mulliken charges + geometry.
 *
 * coords: Array<[x,y,z]> in Å
 * charges: Array<number> in e
 * bonds: Array<[i,j]> 0-based
 */
function computeBondDipoles( coords: number[][], charges: number[], bonds: number[][] ) {
  if (coords.length !== charges.length) {
    throw new Error(
      `coords (${coords.length}) and charges (${charges.length}) mismatch`
    );
  }

  const bondDipoles = [];

  for (const [a, b] of bonds) {
    const ra = coords[a];
    const rb = coords[b];
    if (!ra || !rb) {
      throw new Error(`Invalid bond indices: ${a}-${b}`);
    }

    const r_ab = [
      rb[0] - ra[0],
      rb[1] - ra[1],
      rb[2] - ra[2],
    ]; // Å

    const dq = charges[b] - charges[a]; // e
    const muVec = [
      dq * r_ab[0] * EA_TO_DEBYE,
      dq * r_ab[1] * EA_TO_DEBYE,
      dq * r_ab[2] * EA_TO_DEBYE,
    ]; // Debye

    const mag = Math.sqrt(
      muVec[0] * muVec[0] +
        muVec[1] * muVec[1] +
        muVec[2] * muVec[2]
    );

    bondDipoles.push({
      indexA: a,
      indexB: b,
      x: muVec[0],
      y: muVec[1],
      z: muVec[2],
      magnitude: mag,
    });
  }

  return bondDipoles;
}

/**
 * Main entry: take Psi4 output, XYZ, SDF (all as strings),
 * return JSON-like object:
 *
 * {
 *   molecularDipole: [mux, muy, muz], // Debye
 *   bondDipoles: [ { indexA, indexB, x, y, z, magnitude }, ... ]
 * }
 */
export function computeDipolesFromPsi4( psiOutText: string, xyzText: string, sdfText: string ) {
  const coords = parseXYZCoords( xyzText );
  const charges = parseMullikenFromOut( psiOutText );
  const bonds = parseSDFBonds( sdfText );
  const muMol = parseMolecularDipoleFromMultipole( psiOutText );

  console.log( 'charges', charges );

  const bondDipoles = computeBondDipoles( coords, charges, bonds );

  return {
    molecularDipole: muMol,
    bondDipoles,
  };
}

type Vec3 = [number, number, number];

export class CubeScalarField {
  readonly origin: Vec3;      // Å
  readonly axes: [Vec3, Vec3, Vec3]; // axis vectors (a, b, c) in Å
  readonly dims: [number, number, number]; // (nx, ny, nz)
  readonly data: Float32Array; // scalar values in file units (ESP: Hartree/e)

  private invAxisMatrix: number[][]; // 3x3 inverse for mapping world -> grid

  private constructor(
    origin: Vec3,
    axes: [Vec3, Vec3, Vec3],
    dims: [number, number, number],
    data: Float32Array
  ) {
    this.origin = origin;
    this.axes = axes;
    this.dims = dims;
    this.data = data;

    const M = [
      [axes[0][0], axes[1][0], axes[2][0]],
      [axes[0][1], axes[1][1], axes[2][1]],
      [axes[0][2], axes[1][2], axes[2][2]]
    ];
    this.invAxisMatrix = invert3x3(M);
  }

  // ---------- Static constructors ----------

  /**
   * Parse from full cube file text
   */
  static fromText(text: string): CubeScalarField {
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length < 6) {
      throw new Error("Cube file too short");
    }

    let idx = 2; // skip first 2 comment lines

    // Line: natoms, origin (in Å)
    const l3 = splitNums(lines[idx++]);
    const natoms = l3[0] | 0;
    const origin: Vec3 = [l3[1], l3[2], l3[3]];

    // Axes lines: n, ax, ay, az (Å per voxel along that axis)
    const axLine = splitNums(lines[idx++]);
    const bxLine = splitNums(lines[idx++]);
    const cxLine = splitNums(lines[idx++]);

    const nx = axLine[0] | 0;
    const ny = bxLine[0] | 0;
    const nz = cxLine[0] | 0;

    const a: Vec3 = [axLine[1], axLine[2], axLine[3]];
    const b: Vec3 = [bxLine[1], bxLine[2], bxLine[3]];
    const c: Vec3 = [cxLine[1], cxLine[2], cxLine[3]];

    // Skip natoms atom lines
    idx += natoms;

    console.log( lines.slice( 0, idx + 3 ) );

    const total = nx * ny * nz;
    const data = new Float32Array(total);
    let p = 0;

    while (idx < lines.length && p < total) {
      const nums = splitNums(lines[idx++]);
      for (const v of nums) {
        if (p < total) {
          data[p++] = v;
        } else {
          break;
        }
      }
    }

    if (p !== total) {
      throw new Error(
        `Cube file ended early: expected ${total} values, got ${p}`
      );
    }

    return new CubeScalarField(origin, [a, b, c], [nx, ny, nz], data);
  }

  // ---------- Sampling ----------

  /**
   * Sample at world coordinates (x,y,z) in Å.
   * Returns scalar in cube units (for ESP: Hartree/e).
   * Returns NaN if outside the grid.
   */
  sample(x: number, y: number, z: number): number {
    const [nx, ny, nz] = this.dims;

    // Convert world position to grid coordinates (fractional i,j,k)
    const px = x - this.origin[0];
    const py = y - this.origin[1];
    const pz = z - this.origin[2];

    const M = this.invAxisMatrix;
    const gx = M[0][0] * px + M[0][1] * py + M[0][2] * pz;
    const gy = M[1][0] * px + M[1][1] * py + M[1][2] * pz;
    const gz = M[2][0] * px + M[2][1] * py + M[2][2] * pz;

    const ix = Math.floor(gx);
    const iy = Math.floor(gy);
    const iz = Math.floor(gz);

    const tx = gx - ix;
    const ty = gy - iy;
    const tz = gz - iz;

    // Check bounds (need access to ix+1 etc.)
    if (
      ix < 0 || ix >= nx - 1 ||
      iy < 0 || iy >= ny - 1 ||
      iz < 0 || iz >= nz - 1
    ) {
      return NaN;
    }

    const get = (i: number, j: number, k: number) => {
      return this.data[k + nz * (j + ny * i)];
    };

    const c000 = get(ix,     iy,     iz);
    const c100 = get(ix + 1, iy,     iz);
    const c010 = get(ix,     iy + 1, iz);
    const c110 = get(ix + 1, iy + 1, iz);
    const c001 = get(ix,     iy,     iz + 1);
    const c101 = get(ix + 1, iy,     iz + 1);
    const c011 = get(ix,     iy + 1, iz + 1);
    const c111 = get(ix + 1, iy + 1, iz + 1);

    const c00 = c000 * (1 - tx) + c100 * tx;
    const c10 = c010 * (1 - tx) + c110 * tx;
    const c01 = c001 * (1 - tx) + c101 * tx;
    const c11 = c011 * (1 - tx) + c111 * tx;

    const c0 = c00 * (1 - ty) + c10 * ty;
    const c1 = c01 * (1 - ty) + c11 * ty;

    return c0 * (1 - tz) + c1 * tz;
  }
}

// ---------- Helpers ----------

function splitNums(line: string): number[] {
  return line
    .trim()
    .split(/\s+/)
    .filter(s => s.length > 0)
    .map(Number);
}

function invert3x3(m: number[][]): number[][] {
  const [
    [a, b, c],
    [d, e, f],
    [g, h, i]
  ] = m;

  const A = e * i - f * h;
  const B = c * h - b * i;
  const C = b * f - c * e;
  const D = f * g - d * i;
  const E = a * i - c * g;
  const F = c * d - a * f;
  const G = d * h - e * g;
  const H = b * g - a * h;
  const I = a * e - b * d;

  const det = a * A + b * D + c * G;
  if (Math.abs(det) < 1e-12) {
    throw new Error("Axis matrix is singular, cannot invert");
  }
  const invDet = 1 / det;

  return [
    [A * invDet, B * invDet, C * invDet],
    [D * invDet, E * invDet, F * invDet],
    [G * invDet, H * invDet, I * invDet]
  ];
}

( async () => {
  const allData: Record<string, unknown> = {};

  for ( const moleculeName of MOLECULE_NAMES ) {

    if ( !fs.existsSync( TEMP_DIR ) ) {
      fs.mkdirSync( TEMP_DIR );
    }

    // Remove all files in TEMP_DIR
    const tempFiles = fs.readdirSync( TEMP_DIR );
    for ( const file of tempFiles ) {
      fs.unlinkSync( path.join( TEMP_DIR, file ) );
    }

    console.log( `generating data for ${moleculeName}` );

    const sdf = fs.readFileSync( `./assets/sdf/${moleculeName}.sdf`, 'utf8' );

    fs.writeFileSync( path.join( TEMP_DIR, `${moleculeName}.sdf` ), sdf );

    // Convert the SDF to an initial XYZ
    await execute( 'obabel', [
      path.join( TEMP_DIR, `${moleculeName}.sdf` ),
      '-O',
      path.join( TEMP_DIR, `${moleculeName}.xyz` )
    ], process.cwd() );

    const initialXYZ = fs.readFileSync( path.join( TEMP_DIR, `${moleculeName}.xyz` ), 'utf8' );

    fs.writeFileSync( path.join( TEMP_DIR, `psi4-input` ), `
import json
import numpy as np
from psi4 import oeprop

molecule molly {
    0 1
${initialXYZ.split( os.EOL ).slice( 2 ).map( line => `    ${line}` ).join( os.EOL )}
}

set e_convergence 1e-10
set d_convergence 1e-10
set geom_maxiter 100

set cubic_grid_spacing [${GRID_SPACING}, ${GRID_SPACING}, ${GRID_SPACING}]

# Choose basis
set basis cc-pVDZ
set scf_type df
set df_basis_scf cc-pVDZ

# Cube file tasks: electron density + electrostatic potential
set cubeprop_tasks ['density', 'esp']

# Optimize geometry, return the wavefunction object
E, wfn = optimize('B3LYP', return_wfn=True)

oeprop(wfn, 'MULLIKEN_CHARGES', title='molecule')
oeprop(wfn, 'LOWDIN_CHARGES', title='molecule')

# Generate cube files for density & ESP
cubeprop(wfn)

print("Dipole moment (Debye):", wfn.variable('SCF DIPOLE'))

geom = wfn.molecule()
geom.save_xyz_file("reoriented.xyz", 12)
  ` );

    await execute( 'psi4', [
      'psi4-input',
      '-o',
      'psi4-output'
    ], TEMP_DIR );

    // get our reoriented xyz
    const xyz = fs.readFileSync( path.join( TEMP_DIR, `reoriented.xyz` ), 'utf8' );

    console.log( 'xyz\n', xyz );

    // convert to xyzr

    const xyzr = xyzToXyzr( xyz ) + '\n';

    fs.writeFileSync( path.join( TEMP_DIR, `${moleculeName}.xyzr` ), xyzr );

    console.log( 'xyzr\n', xyzr );

    await execute( MSMS_PATH, [
      '-if',
      `${moleculeName}.xyzr`,
      '-of',
      `${moleculeName}.ses`,
      '-probe_radius',
      `${PROBE_RADIUS}`,
      '-density',
      `${SES_DENSITY}`
    ], TEMP_DIR, {
      childProcessOptions: {
        shell: true
      }
    } );

    const psi4Out = fs.readFileSync( path.join( TEMP_DIR, `psi4-output` ), 'utf8' );

    const dipoleObj = computeDipolesFromPsi4( psi4Out, xyz, sdf );

    const vertexLines = fs.readFileSync( path.join( TEMP_DIR, `${moleculeName}.ses.vert` ), 'utf8' ).split( /\r?\n/ ).slice( 3 ).filter( l => l.trim().length > 0 );
    const faceLines = fs.readFileSync( path.join( TEMP_DIR, `${moleculeName}.ses.face` ), 'utf8' ).split( /\r?\n/ ).slice( 3 ).filter( l => l.trim().length > 0 );

    const vertexPositions: Vec3[] = [];
    const vertexNormals: Vec3[] = [];

    vertexLines.forEach( line => {
      const parts = line.trim().split( /\s+/ );
      if ( parts.length < 6 ) {
        throw new Error( `Malformed SES vertex line: '${line}'` );
      }
      const x = parseFloat( parts[ 0 ] );
      const y = parseFloat( parts[ 1 ] );
      const z = parseFloat( parts[ 2 ] );
      const nx = parseFloat( parts[ 3 ] );
      const ny = parseFloat( parts[ 4 ] );
      const nz = parseFloat( parts[ 5 ] );
      vertexPositions.push( [ x, y, z ] );
      vertexNormals.push( [ nx, ny, nz ] );
    } );

    const faceIndices: number[][] = [];
    faceLines.forEach( line => {
      const parts = line.trim().split( /\s+/ );
      if ( parts.length < 3 ) {
        throw new Error( `Malformed SES face line: '${line}'` );
      }
      // Switch to zero-indexed
      const a = parseInt( parts[ 0 ], 10 ) - 1;
      const b = parseInt( parts[ 1 ], 10 ) - 1;
      const c = parseInt( parts[ 2 ], 10 ) - 1;
      faceIndices.push( [ a, b, c ] );
    } );

    const espField = CubeScalarField.fromText( fs.readFileSync( path.join( TEMP_DIR, `ESP.cube` ), 'utf8' ) );
    const dtField = CubeScalarField.fromText( fs.readFileSync( path.join( TEMP_DIR, `Dt.cube` ), 'utf8' ) );

    const bohrInAngstroms = 1.8897259886

    const vertexESPs = vertexPositions.map( pos => espField.sample(
      pos[0] * bohrInAngstroms, pos[1] * bohrInAngstroms, pos[2] * bohrInAngstroms
    ) );
    const vertexDTs = vertexPositions.map( pos => dtField.sample(
      pos[0] * bohrInAngstroms, pos[1] * bohrInAngstroms, pos[2] * bohrInAngstroms
    ) );

    if ( vertexESPs.some( v => Number.isNaN( v ) ) ) {
      throw new Error( `Some vertex ESPs are NaN` );
    }
    if ( vertexDTs.some( v => Number.isNaN( v ) ) ) {
      throw new Error( `Some vertex Dt values are NaN` );
    }

    const atoms = parseAtoms( xyz );
    const bonds = parseSDFBonds( sdf );

    const moleculeData = {
      atoms: atoms,
      bonds: bonds,
      ...dipoleObj,
      vertexPositions: vertexPositions,
      vertexNormals: vertexNormals,
      faceIndices: faceIndices,

      // In Eh/e
      vertexESPs: vertexESPs,

      // In e/a0^3
      vertexDTs: vertexDTs
    };

    fs.writeFileSync( path.join( OUT_DIR, `${moleculeName}.json` ), JSON.stringify( moleculeData, null, 2 ) );

    allData[ moleculeName ] = moleculeData;

    // Remove all files in TEMP_DIR
    for ( const file of fs.readdirSync( TEMP_DIR ) ) {
      fs.unlinkSync( path.join( TEMP_DIR, file ) );
    }
    fs.rmdirSync( TEMP_DIR );
  }

  fs.writeFileSync( path.join( OUT_DIR, `all-molecules.json` ), JSON.stringify( allData, null, 2 ) );
} )();