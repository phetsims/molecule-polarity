// Copyright 2025-2026, University of Colorado Boulder

/**
 * Centralized renderOrder values for 3D views. This allows certain objects to be rendered "before" other objects,
 * which is important for the copious use of transparency in this sim. See implementation-notes for more info.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

// Lower numbers are rendered first.
export const SURFACE_BACKGROUND_RENDER_ORDER = 3;
export const ATOM_RENDER_ORDER = 5;
export const BOND_RENDER_ORDER = 10;
export const DIPOLE_RENDER_ORDER = 50;
export const ATOM_LABEL_RENDER_ORDER = 100;
export const SURFACE_FOREGROUND_RENDER_ORDER = 150;

