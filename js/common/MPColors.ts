// Copyright 2014-2022, University of Colorado Boulder

/**
 * Colors used throughout this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import { Color } from '../../../scenery/js/imports.js';
import moleculePolarity from '../moleculePolarity.js';

// constants
const SURFACE_ALPHA = 0.72;
const NEUTRAL_GREEN = new Color( 31, 247, 0 );

const MPColors = {

  SCREEN_BACKGROUND: 'rgb( 180, 205, 255)',

  CONTROL_PANEL_BACKGROUND: 'rgb( 238, 238, 238)',

  // atoms
  ATOM_A: 'rgb( 255, 255, 90 )',
  ATOM_B: 'rgb( 0, 255, 0 )',
  ATOM_C: 'rgb( 255, 175, 175)',
  BOND: 'rgb( 90, 90, 90)',
  OXYGEN: PhetColorScheme.RED_COLORBLIND,

  // dipoles
  BOND_DIPOLE: 'black',
  MOLECULAR_DIPOLE: 'rgb( 255, 200, 0 )',

  // E-field plates
  PLATE: 'rgb( 192, 192, 192 )',

  // surfaces, colors are ordered negative to positive
  NEUTRAL_GRAY: new Color( 128, 128, 128, SURFACE_ALPHA ),
  BW_GRADIENT: [ Color.BLACK.withAlpha( SURFACE_ALPHA ), Color.WHITE.withAlpha( SURFACE_ALPHA ) ],
  RWB_GRADIENT: [ Color.RED.withAlpha( SURFACE_ALPHA ), Color.WHITE.withAlpha( SURFACE_ALPHA ), Color.BLUE.withAlpha( SURFACE_ALPHA ) ],

  // Color used for 'neutral' (potential===0) by Jmol in ROYGB gradient, see http://jmol.sourceforge.net/jscolors/#gradnt
  NEUTRAL_POTENTIAL: NEUTRAL_GREEN,

  /*
   * Secondary gradient for mep, negative to positive.
   * This is Jmol's ROYGB gradient, documented at http://jmol.sourceforge.net/jscolors/#gradnt.
   */
  ROYGB_GRADIENT: [
    Color.RED,
    new Color( 242, 30, 0 ),
    new Color( 247, 62, 0 ),
    new Color( 247, 93, 0 ),
    new Color( 247, 124, 0 ),
    new Color( 247, 155, 0 ),
    new Color( 244, 214, 0 ),
    new Color( 244, 230, 0 ),
    new Color( 242, 242, 0 ),
    new Color( 227, 227, 0 ),
    new Color( 217, 247, 0 ),
    new Color( 180, 242, 0 ),
    new Color( 121, 247, 0 ),
    new Color( 93, 247, 0 ),
    new Color( 61, 242, 0 ),
    NEUTRAL_GREEN, // neutral (potential===0)
    new Color( 0, 244, 0 ),
    new Color( 0, 244, 31 ),
    new Color( 0, 247, 93 ),
    new Color( 0, 247, 124 ),
    new Color( 0, 247, 155 ),
    new Color( 0, 250, 188 ),
    new Color( 0, 243, 217 ),
    new Color( 0, 247, 247 ),
    new Color( 0, 184, 244 ),
    new Color( 0, 153, 244 ),
    new Color( 0, 121, 242 ),
    new Color( 0, 89, 236 ),
    new Color( 0, 60, 239 ),
    new Color( 0, 30, 242 ),
    Color.BLUE
  ]
};

moleculePolarity.register( 'MPColors', MPColors );
export default MPColors;