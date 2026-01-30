// Copyright 2026, University of Colorado Boulder

/**
 * Per-molecule customization options applied to real molecules in the 'Real Molecules' screen.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import type { MoleculeSymbols } from './RealMolecule.js';

export type RealMoleculeCustomizationEntry = {
  // indices of atoms that should have their bond dipoles switched to the other side on startup
  initialBondDipolesReversed?: [ number, number ][];

  initialRotation?: THREE.Quaternion;
};

export const RealMoleculeCustomization: Record<MoleculeSymbols, RealMoleculeCustomizationEntry> = {
  BF3: {
  },
  BH3: {
  },
  CF4: {
    initialRotation: new THREE.Quaternion(
      -0.3937806654121543,
      -0.17485260291214183,
      -0.9001547262973663,
      0.0639126241591583
    )
  },
  CH2F2: {
    initialRotation: new THREE.Quaternion(
      -0.27136646893101857,
      -0.6903203332285108,
      -0.6223760651398221,
      0.24993221203410235
    )
  },
  CH2O: {
    initialRotation: new THREE.Quaternion(
      0.3666328007228524,
      0.4262567778088401,
      0.5594996323273494,
      0.6089710257735602
    )
  },
  CH3F: {
    initialBondDipolesReversed: [ [ 0, 1 ] ],
    initialRotation: new THREE.Quaternion(
      -0.424564362987182,
      -0.5991718998340826,
      0.3800185779324334,
      0.5624268988559403
    )
  },
  CH4: {
    initialRotation: new THREE.Quaternion(
      0.09754516100806414,
      0.09754516100806415,
      -0.009607359798384778,
      0.9903926402016154
    )
  },
  CHCl3: {
    initialBondDipolesReversed: [ [ 3, 4 ] ],
    initialRotation: new THREE.Quaternion(
      -0.1748081804583777,
      -0.789947747694425,
      0.5773331843722288,
      -0.11005021662823589
    )
  },
  CHF3: {
    initialBondDipolesReversed: [ [ 3, 4 ] ],
    initialRotation: new THREE.Quaternion(
      0.017834718285708984,
      -0.7400716028848267,
      0.6715496673518707,
      0.03157514381184575
    )
  },
  CO2: {
  },
  F2: {
  },
  H2: {
  },
  H2O: {
    initialRotation: new THREE.Quaternion( -1, 0, 0, 0 )
  },
  HCN: {
    initialRotation: new THREE.Quaternion( 0, -Math.sqrt( 2 ) / 2, 0, Math.sqrt( 2 ) / 2 )
  },
  HF: {
    initialRotation: new THREE.Quaternion( 0, -Math.sqrt( 2 ) / 2, 0, Math.sqrt( 2 ) / 2 )
  },
  N2: {
  },
  NH3: {
    initialBondDipolesReversed: [ [ 0, 1 ] ],
    initialRotation: new THREE.Quaternion(
    0.7677141944032492,
    -0.4684697628688284,
    0.01799052832586886,
    0.4368378851243859
    )
  },
  O2: {
  },
  O3: {
    initialRotation: new THREE.Quaternion(
      0.9995276220774126,
      -0.01492863425893462,
      0.010407093463581261,
      0.024766125838878564
    )
  }
};