// Copyright 2014-2020, University of Colorado Boulder

/**
 * A make-believe atom whose electronegativity is mutable.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';

class Atom {

  /**
   * @param {string} name - name used to label the atom
   * @param {Object} [options]
   */
  constructor( name, options ) {
    assert && assert( typeof name === 'string', 'invalid name' );

    options = merge( {
      diameter: MPConstants.ATOM_DIAMETER, // {number} the atom's diameter
      color: 'white', // {Color|string} base color of the atom
      position: new Vector2( 0, 0 ), // initial position
      electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min, // {number}
      tandem: Tandem.REQUIRED
    }, options );

    // @public (read-only)
    this.name = name;
    this.diameter = options.diameter;
    this.color = options.color;

    // @public
    this.positionProperty = new Vector2Property( options.position, {
      tandem: options.tandem.createTandem( 'positionProperty' )
    } );

    // @public
    this.electronegativityProperty = new NumberProperty( options.electronegativity, {
      range: MPConstants.ELECTRONEGATIVITY_RANGE,
      tandem: options.tandem.createTandem( 'electronegativityProperty' )
    } );

    // @public partial charge is zero until this atom participates in a bond
    this.partialChargeProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'partialChargeProperty' ),
      phetioReadOnly: true // because this is computed based on electronegativity of atoms in a molecule
    } );
  }

  // @public
  reset() {
    this.electronegativityProperty.reset();

    // Do not reset position and partial charge, they will be reset by their parent molecule.
  }
}

moleculePolarity.register( 'Atom', Atom );

export default Atom;