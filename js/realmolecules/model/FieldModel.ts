// Copyright 2025, University of Colorado Boulder

/**
 * Enumeration for what model to use for the electrostatic potential and electron density fields.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

export const FieldModelValues = [ 'psi4', 'java' ] as const;
export type FieldModel = ( typeof FieldModelValues )[number];