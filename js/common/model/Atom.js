// Copyright 2014-2017, University of Colorado Boulder

/**
 * A make-believe atom whose electronegativity is mutable.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {string} name - name used to label the atom
   * @param {Object} [options]
   * @constructor
   */
  function Atom( name, options ) {

    options = _.extend( {
      diameter: MPConstants.ATOM_DIAMETER, // {number} the atom's diameter
      color: 'white', // {Color|string} base color of the atom
      location: new Vector2( 0, 0 ), // initial location
      electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min // {number}
    }, options );

    assert && assert( MPConstants.ELECTRONEGATIVITY_RANGE.contains( options.electronegativity ),
      'invalid electronegativity: ' + options.electronegativity );

    // @public (read-only)
    this.name = name;
    this.diameter = options.diameter;
    this.color = options.color;
    this.locationProperty = new Property( options.location );
    this.electronegativityProperty = new Property( options.electronegativity );
    this.partialChargeProperty = new Property( 0 ); // partial charge is zero until this atom participates in a bond
  }

  moleculePolarity.register( 'Atom', Atom );

  return inherit( Object, Atom, {

    // @public
    reset: function() {
      this.electronegativityProperty.reset();

      // do not reset location and partial charge, they will be reset by their parent molecule
    }
  } );
} );