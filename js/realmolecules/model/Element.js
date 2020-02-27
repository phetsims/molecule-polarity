// Copyright 2014-2019, University of Colorado Boulder

/**
 * An element in the periodic table.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import moleculePolarity from '../../moleculePolarity.js';

/**
 * @param {number} elementNumber
 * @param {Color|String} color
 * @constructor
 */
function Element( elementNumber, color ) {

  // @public (read-only)
  this.elementNumber = elementNumber;
  this.color = color;
}

moleculePolarity.register( 'Element', Element );

inherit( Object, Element );
export default Element;