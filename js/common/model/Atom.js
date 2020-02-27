// Copyright 2014-2020, University of Colorado Boulder

/**
 * A make-believe atom whose electronegativity is mutable.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';

/**
 * @param {string} name - name used to label the atom
 * @param {Object} [options]
 * @constructor
 */
function Atom( name, options ) {

  options = merge( {
    diameter: MPConstants.ATOM_DIAMETER, // {number} the atom's diameter
    color: 'white', // {Color|string} base color of the atom
    position: new Vector2( 0, 0 ), // initial position
    electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min // {number}
  }, options );

  assert && assert( MPConstants.ELECTRONEGATIVITY_RANGE.contains( options.electronegativity ),
    'electronegativity out of range: ' + options.electronegativity );

  // @public (read-only)
  this.name = name;
  this.diameter = options.diameter;
  this.color = options.color;
  this.positionProperty = new Property( options.position );
  this.electronegativityProperty = new NumberProperty( options.electronegativity );
  this.partialChargeProperty = new NumberProperty( 0 ); // partial charge is zero until this atom participates in a bond
}

moleculePolarity.register( 'Atom', Atom );

export default inherit( Object, Atom, {

  // @public
  reset: function() {
    this.electronegativityProperty.reset();

    // Do not reset position and partial charge, they will be reset by their parent molecule.
  }
} );