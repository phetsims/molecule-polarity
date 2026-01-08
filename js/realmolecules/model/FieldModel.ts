// Copyright 2025, University of Colorado Boulder

/**
 * Enumeration for what model to use for the electrostatic potential and electron density fields.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

export const FieldModelValues = [
  // Electrostatic potential and electron density independently calculated using the psi4 quantum chemistry package,
  // where each 3d vertex will have a computed value.
  'psi4',

  // Simulates the Java-sim computation (based on partial charges ONLY, and the same exact values are used for
  // electrostatic potential AND electron density - they are solely just colored differently on the output).
  'java'
] as const;
export type FieldModel = ( typeof FieldModelValues )[number];