// Copyright 2002-2014, University of Colorado Boulder

/**
 * Colors used throughout this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  return {
    
    SCREEN_BACKGROUND: 'rgb( 180, 205, 255)',
    
    // atoms
    ATOM_A: 'rgb( 255, 255, 90 )',
    ATOM_B: 'rgb( 0, 255, 0 )',
    ATOM_C: 'rgb( 255, 175, 175)',
    BOND: 'rgb( 128, 128, 128)',
    
    // dipoles
    BOND_DIPOLE: 'black',
    MOLECULE_DIPOLE: 'rgb( 255, 200, 0 )',

    // E-field plates
    POSITIVE_PLATE: 'rgb( 192, 192, 192 )',
    NEGATIVE_PLATE: 'rgb( 192, 192, 192 )',
    DISABLED_PLATE: 'rgb( 192, 192, 192 )'
  };
} );
