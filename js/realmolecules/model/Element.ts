// Copyright 2014-2022, University of Colorado Boulder

/**
 * Element is an element in the periodic table.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TColor } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';

export default class Element {

  public readonly elementNumber: number;
  public readonly color: TColor;

  public constructor( elementNumber: number, color: TColor ) {
    assert && assert( Number.isInteger( elementNumber ) && elementNumber > 0,
      `elementNumber must be a positive integer: ${elementNumber}` );

    this.elementNumber = elementNumber;
    this.color = color;
  }
}

moleculePolarity.register( 'Element', Element );