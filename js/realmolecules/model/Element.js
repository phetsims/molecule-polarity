// Copyright 2014-2021, University of Colorado Boulder

/**
 * An element in the periodic table.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import moleculePolarity from '../../moleculePolarity.js';

class Element {

  /**
   * @param {number} elementNumber
   * @param {Color|String} color
   */
  constructor( elementNumber, color ) {
    assert && AssertUtils.assertPositiveInteger( elementNumber );

    // @public (read-only)
    this.elementNumber = elementNumber;
    this.color = color;
  }
}

moleculePolarity.register( 'Element', Element );
export default Element;