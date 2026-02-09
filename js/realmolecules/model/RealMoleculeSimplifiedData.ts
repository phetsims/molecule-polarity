// Copyright 2025-2026, University of Colorado Boulder

/**
 * Simplified partial charges from the Java sim input (unidentified source).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import type { MoleculeSymbol } from './RealMolecule.js';

/**
 * Either a map from element symbol to partial charge, or `${symbol}${adjacentBondCount}` to partial charge for cases
 * where the partial charge depends on bonding.
 */
export const simplifiedPartialChargesMap: Record<MoleculeSymbol, Record<string, number>> = {
  BF3: {
    B: 0.842505,
    F: -0.280358
  },
  BH3: {
    B: 0.301318,
    H: -0.100417
  },
  CF4: {
    C: 0.423049,
    F: -0.105762
  },
  CH2F2: {
    C: 0.100550,
    F: -0.159942,
    H: 0.109667
  },
  CH2O: {
    C: 0.270184,
    H: 0.038366,
    O: -0.346916
  },
  CH3F: {
    C: -0.230517,
    F: -0.166365,
    H: 0.132281
  },
  CH4: {
    C: -0.802069,
    H: 0.200517
  },
  CHCl3: {
    C: -0.025406,
    Cl: -0.052227,
    H: 0.182373
  },
  CHF3: {
    C: 0.282658,
    F: -0.135350,
    H: 0.123152
  },
  CO2: {
    C: 0.685248,
    O: -0.342624
  },
  F2: {
    F: 0
  },
  H2: {
    H: 0
  },
  H2O: {
    H: 0.376285,
    O: -0.752569
  },
  HCN: {
    C: 0.047988,
    N: -0.282540,
    H: 0.234552
  },
  HF: {
    F: -0.430703,
    H: 0.430703
  },
  N2: {
    N: 0
  },
  NH3: {
    N: -1.009460,
    H: 0.337416
  },
  O2: {
    O: 0
  },
  O3: {
    O2: 0.242265,
    O1: -0.121133
  }
};