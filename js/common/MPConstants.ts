// Copyright 2014-2022, University of Colorado Boulder

/**
 * Constants used throughout this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../dot/js/Bounds2.js';
import Range from '../../../dot/js/Range.js';
import RangeWithValue from '../../../dot/js/RangeWithValue.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import moleculePolarity from '../moleculePolarity.js';

const MPConstants = {

  // ScreenView
  LAYOUT_BOUNDS: new Bounds2( 0, 0, 1100, 700 ),

  // Model
  ELECTRONEGATIVITY_RANGE: new RangeWithValue( 2, 4, 2 ),
  ELECTRONEGATIVITY_TICK_SPACING: 0.2,
  ATOM_DIAMETER: 100,
  BOND_LENGTH: 150, // must be longer than ATOM_DIAMETER
  ANGLE_RANGE: new Range( -Math.PI, Math.PI ), // see https://github.com/phetsims/molecule-polarity/issues/91

  CONTROL_ICON_X_SPACING: 10,  // horizontal space between labels and icons
  CONTROL_PANEL_Y_SPACING: 15, // vertical space between controls

  // options for titles in control panels
  CONTROL_PANEL_TITLE_OPTIONS: {
    font: new PhetFont( { size: 20, weight: 'bold' } ),
    maxWidth: 250 // i18n, determined empirically
  },

  // options for text labels on controls
  CONTROL_TEXT_OPTIONS: {
    font: new PhetFont( 18 ),
    maxWidth: 175 // i18n, determined empirically
  },

  AQUA_RADIO_BUTTON_OPTIONS: { radius: 9 },

  // Controls the width of the gradient used to fill the 2D surfaces.
  // Smaller values result in a more noticeable change as the EN sliders are dragged.
  SURFACE_GRADIENT_WIDTH_MULTIPLIER: 5
};

assert && assert( MPConstants.BOND_LENGTH > MPConstants.ATOM_DIAMETER, 'bond length must be > atom diameter' );

moleculePolarity.register( 'MPConstants', MPConstants );
export default MPConstants;