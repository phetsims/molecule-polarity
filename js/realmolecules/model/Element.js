// Copyright 2014-2017, University of Colorado Boulder

/**
 * An element in the periodic table.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );

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

  return inherit( Object, Element );
} );
