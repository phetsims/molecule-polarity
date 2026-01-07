// Copyright 2025, University of Colorado Boulder

/**
 * Enumeration for partial charge model
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

export const BondDipoleModelValues = [ 'electronegativity', 'psi4', 'java', 'mulliken', 'loewdin', 'hirschfeld', 'mbis', 'chelpg' ] as const;
export type BondDipoleModel = ( typeof BondDipoleModelValues )[number];