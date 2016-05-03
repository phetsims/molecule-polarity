// Copyright 2014-2015, University of Colorado Boulder

/**
 * Elements, as they are known by Jmol.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );

  /**
   * @param {number} elementNumber element number in the periodic table
   * @param {Color|String} color color used by Jmol
   * @constructor
   */
  function Element( elementNumber, color ) {
    this.elementNumber = elementNumber;
    this.color = color;
  }

  moleculePolarity.register( 'Element', Element );

  return inherit( Object, Element );
} );
