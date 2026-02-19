// Copyright 2014-2026, University of Colorado Boulder

/**
 * Constants used throughout this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../dot/js/Bounds2.js';
import Range from '../../../dot/js/Range.js';
import RangeWithValue from '../../../dot/js/RangeWithValue.js';
import affirm from '../../../perennial-alias/js/browser-and-node/affirm.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import moleculePolarity from '../moleculePolarity.js';

const CONTROL_FONT = new PhetFont( 18 );
const CONTROL_LABEL_MAX_WIDTH = 200;

export default class MPConstants {
  // While these layoutBounds differ from the default, PhET-iO customizations may rely on these bounds.
  // So do not change. See https://github.com/phetsims/molecule-polarity/issues/146
  public static readonly LAYOUT_BOUNDS = new Bounds2( 0, 0, 1100, 700 );

  // Model
  public static readonly ELECTRONEGATIVITY_RANGE = new RangeWithValue( 2, 4, 2 );
  public static readonly ELECTRONEGATIVITY_TICK_SPACING = 0.2;
  public static readonly ATOM_DIAMETER = 100;
  public static readonly BOND_LENGTH = 150; // must be longer than ATOM_DIAMETER
  public static readonly ANGLE_RANGE = new Range( -Math.PI, Math.PI ); // see https://github.com/phetsims/molecule-polarity/issues/91
  public static readonly ALIGNMENT_COS_THRESHOLD = 1 - 1e-10; // threshold for alignment checks using cos(angle) ~ 1

  public static readonly CONTROL_ICON_X_SPACING = 10;  // horizontal space between labels and icons
  public static readonly CONTROL_PANEL_Y_SPACING = 15; // vertical space between controls
  public static readonly CONTROL_PANEL_MOUSE_X_DILATION = 5;
  public static readonly CONTROL_PANEL_TOUCH_X_DILATION = 15;
  public static readonly CONTROL_PANEL_TOP = 65;

  public static readonly HORIZONTAL_MARGIN = 40;
  public static readonly VERTICAL_MARGIN = 20;

  // options for titles in control panels
  public static readonly CONTROL_PANEL_TITLE_OPTIONS = {
    font: new PhetFont( { size: 20, weight: 'bold' } ),
    maxWidth: 250 // i18n, determined empirically
  };

  // Provided to text on controls (Checkbox/RadioButton labels)
  public static readonly CONTROL_TEXT_OPTIONS = {
    font: CONTROL_FONT
  };

  // Provided to control labels (usually Text, but sometimes an HBox with Text and an icon)
  public static readonly CONTROL_LABEL_OPTIONS = {
    maxWidth: CONTROL_LABEL_MAX_WIDTH
  };

  // Provided to control labels that are JUST text (for convenience)
  public static readonly CONTROL_TEXT_LABEL_OPTIONS = {
    font: CONTROL_FONT,
    maxWidth: CONTROL_LABEL_MAX_WIDTH
  };

  public static readonly AQUA_RADIO_BUTTON_OPTIONS = {
    radius: 9
  };

  // Controls the width of the gradient used to fill the 2D surfaces.
  // Smaller values result in a more noticeable change as the EN sliders are dragged.
  public static readonly SURFACE_GRADIENT_WIDTH_MULTIPLIER = 5;
}

affirm( MPConstants.BOND_LENGTH > MPConstants.ATOM_DIAMETER, 'bond length must be > atom diameter' );

moleculePolarity.register( 'MPConstants', MPConstants );