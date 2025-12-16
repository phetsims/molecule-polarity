// Copyright 2025, University of Colorado Boulder

/**
 * Color functions used for real molecules
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import TColor from '../../../../scenery/js/util/TColor.js';
import MPColors from '../../common/MPColors.js';
import Element from '../../../../nitroglycerin/js/Element.js';

export const elementToColor = ( element: Element ): TColor => {
  return element === Element.C ? MPColors.CARBON : element.color;
};

export const elementToForegroundColor = ( element: Element ): TColor => {
  return [ Element.N, Element.O, Element.C ].includes( element ) ? 'white' : 'black';
};
