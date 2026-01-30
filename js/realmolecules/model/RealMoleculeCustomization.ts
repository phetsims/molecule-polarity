// Copyright 2026, University of Colorado Boulder

/**
 * Customization applied to real molecules in the 'Real Molecules' screen.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import type { MoleculeSymbols } from './RealMolecule.js';

export type RealMoleculeCustomizationEntry = {
  // indices of atoms that should have their bond dipoles switched to the other side on startup
  initialBondDipolesReversed?: [ number, number ][];
};

export const RealMoleculeCustomization: Record<MoleculeSymbols, RealMoleculeCustomizationEntry> = {
  BF3: {
  },
  BH3: {
  },
  CF4: {
  },
  CH2F2: {
  },
  CH2O: {
  },
  CH3F: {
    initialBondDipolesReversed: [ [ 0, 1 ] ]
  },
  CH4: {
  },
  CHCl3: {
    initialBondDipolesReversed: [ [ 3, 4 ] ]
  },
  CHF3: {
    initialBondDipolesReversed: [ [ 3, 4 ] ]
  },
  CO2: {
  },
  F2: {
  },
  H2: {
  },
  H2O: {
  },
  HCN: {
  },
  HF: {
  },
  N2: {
  },
  NH3: {
    initialBondDipolesReversed: [ [ 0, 1 ] ]
  },
  O2: {
  },
  O3: {
  }
};