// Copyright 2026, University of Colorado Boulder

/**
 * Enumeration for partial charge model
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

export const BondDipoleModelValues = [
  // Bond dipoles calculated based on the electronegativity difference (arrows toward the more electronegative atom,
  // magnitude based on the difference).
  'electronegativity',

  // Psi4 quantum chemistry derived bond dipoles
  'psi4',

  // Using partial charges from the previous Java sim (source unknown for the partial charges, doesn't seem to match models)
  'java',

  // Various partial charge models from the ORCA quantum chemistry package
  'mulliken',
  'loewdin',
  'hirschfeld',
  'mbis',
  'chelpg'
] as const;
export type BondDipoleModel = ( typeof BondDipoleModelValues )[number];