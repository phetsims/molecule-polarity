// Copyright 2014-2025, University of Colorado Boulder

/**
 * Colors used throughout this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import Color from '../../../scenery/js/util/Color.js';
import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import moleculePolarity from '../moleculePolarity.js';

// constants
const SURFACE_ALPHA = 0.72;
const NEUTRAL_GREEN = new Color( 31, 247, 0 );

const MPColors = {

  screenBackgroundColorProperty: new ProfileColorProperty( moleculePolarity, 'screenBackgroundColor', {
    default: 'rgb( 180, 205, 255)'
  } ),

  panelFillProperty: new ProfileColorProperty( moleculePolarity, 'panelFill', {
    default: 'rgb( 238, 238, 238)'
  } ),

  // atoms
  ATOM_A: 'rgb( 255, 255, 90 )',
  ATOM_B: 'rgb( 0, 255, 0 )',
  ATOM_C: 'rgb( 255, 175, 175)',
  BOND: 'rgb( 140, 140, 140 )',
  OXYGEN: PhetColorScheme.RED_COLORBLIND,
  CARBON: '#444',

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
    new Color( '#FF0000' ),
    new Color( '#FF2000' ),
    new Color( '#FF4000' ),
    new Color( '#FF6000' ),
    new Color( '#FF8000' ),
    new Color( '#FFA000' ),
    new Color( '#FFC000' ),
    new Color( '#FFE000' ),
    new Color( '#FFF000' ),
    new Color( '#FFFF00' ),
    new Color( '#F0F000' ),
    new Color( '#E0FF00' ),
    new Color( '#C0FF00' ),
    new Color( '#A0FF00' ),
    new Color( '#80FF00' ),
    new Color( '#60FF00' ),
    new Color( '#40FF00' ),
    new Color( '#20FF00' ),
    new Color( '#00FF00' ),
    new Color( '#00FF20' ),
    new Color( '#00FF40' ),
    new Color( '#00FF60' ),
    new Color( '#00FF80' ),
    new Color( '#00FFA0' ),
    new Color( '#00FFC0' ),
    new Color( '#00FFE0' ),
    new Color( '#00FFFF' ),
    new Color( '#00E0FF' ),
    new Color( '#00C0FF' ),
    new Color( '#00A0FF' ),
    new Color( '#0080FF' ),
    new Color( '#0060FF' ),
    new Color( '#0040FF' ),
    new Color( '#0020FF' ),
    new Color( '#0000FF' )
  ]
};

moleculePolarity.register( 'MPColors', MPColors );
export default MPColors;