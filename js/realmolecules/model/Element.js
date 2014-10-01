// Copyright 2002-2014, University of Colorado Boulder

/**
 * Elements, as they are known by Jmol.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function() {
  'use strict';

  /**
   * @param {number} elementNumber element number in the periodic table
   * @param {Color|String} color color used by Jmol
   * @constructor
   */
  function Element( elementNumber, color ) {
    this.elementNumber = elementNumber;
    this.color = color;
  }

  return Element;
} );
