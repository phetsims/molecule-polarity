// Copyright 2014-2020, University of Colorado Boulder

/**
 * An element in the periodic table.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import moleculePolarity from '../../moleculePolarity.js';

class Element {

  /**
   * @param {number} elementNumber
   * @param {Color|String} color
   */
  constructor( elementNumber, color ) {

    // @public (read-only)
    this.elementNumber = elementNumber;
    this.color = color;
  }
}

moleculePolarity.register( 'Element', Element );

export default Element;