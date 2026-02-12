// Copyright 2014-2026, University of Colorado Boulder

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

const CONTROL_FONT = new PhetFont( 18 );
const CONTROL_LABEL_MAX_WIDTH = 200;

const MPConstants = {

  // While these layoutBounds differ from the default, PhET-iO customizations may rely on these bounds.
  // So do not change. See https://github.com/phetsims/molecule-polarity/issues/146
  LAYOUT_BOUNDS: new Bounds2( 0, 0, 1100, 700 ),

  // Model
  ELECTRONEGATIVITY_RANGE: new RangeWithValue( 2, 4, 2 ),
  ELECTRONEGATIVITY_TICK_SPACING: 0.2,
  ATOM_DIAMETER: 100,
  BOND_LENGTH: 150, // must be longer than ATOM_DIAMETER
  ANGLE_RANGE: new Range( -Math.PI, Math.PI ), // see https://github.com/phetsims/molecule-polarity/issues/91

  CONTROL_ICON_X_SPACING: 10,  // horizontal space between labels and icons
  CONTROL_PANEL_Y_SPACING: 15, // vertical space between controls
  CONTROL_PANEL_MOUSE_X_DILATION: 5,
  CONTROL_PANEL_TOUCH_X_DILATION: 15,

  // options for titles in control panels
  CONTROL_PANEL_TITLE_OPTIONS: {
    font: new PhetFont( { size: 20, weight: 'bold' } ),
    maxWidth: 250 // i18n, determined empirically
  },

  // Provided to text on controls (Checkbox/RadioButton labels)
  CONTROL_TEXT_OPTIONS: {
    font: CONTROL_FONT
  },

  // Provided to control labels (usually Text, but sometimes an HBox with Text and an icon)
  CONTROL_LABEL_OPTIONS: {
    maxWidth: CONTROL_LABEL_MAX_WIDTH
  },

  // Provided to control labels that are JUST text (for convenience)
  CONTROL_TEXT_LABEL_OPTIONS: {
    font: CONTROL_FONT,
    maxWidth: CONTROL_LABEL_MAX_WIDTH
  },

  AQUA_RADIO_BUTTON_OPTIONS: { radius: 9 },

  // Controls the width of the gradient used to fill the 2D surfaces.
  // Smaller values result in a more noticeable change as the EN sliders are dragged.
  SURFACE_GRADIENT_WIDTH_MULTIPLIER: 5
};

assert && assert( MPConstants.BOND_LENGTH > MPConstants.ATOM_DIAMETER, 'bond length must be > atom diameter' );

moleculePolarity.register( 'MPConstants', MPConstants );
export default MPConstants;