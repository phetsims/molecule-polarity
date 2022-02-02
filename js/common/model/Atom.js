// Copyright 2014-2022, University of Colorado Boulder

/**
 * A make-believe atom whose electronegativity is mutable.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';

class Atom {

  /**
   * @param {string} label - label that appears on the atom
   * @param {Object} [options]
   */
  constructor( label, options ) {
    assert && assert( typeof name === 'string', 'invalid name' );

    options = merge( {
      diameter: MPConstants.ATOM_DIAMETER, // {number} the atom's diameter
      color: 'white', // {Color|string} base color of the atom
      position: new Vector2( 0, 0 ), // initial position
      electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min, // {number}
      tandem: Tandem.REQUIRED
    }, options );

    // @public (read-only)
    this.diameter = options.diameter;
    this.color = options.color;

    // @public (phet-io) this is a Property so that the label can be changed via PhET-iO and will update everywhere
    this.labelProperty = new StringProperty( label, {
      tandem: options.tandem.createTandem( 'labelProperty' )
    } );

    // @public
    this.positionProperty = new Vector2Property( options.position, {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioDocumentation: 'The position of this atom. (0,0) is at the upper-LEFT, +x is to the right, and +y is DOWN.',
      phetioReadOnly: true // because position is constrained by molecule structure
    } );

    // @public
    this.electronegativityProperty = new NumberProperty( options.electronegativity, {
      range: MPConstants.ELECTRONEGATIVITY_RANGE,
      tandem: options.tandem.createTandem( 'electronegativityProperty' )
    } );

    // @public partial charge is zero until this atom participates in a bond
    this.partialChargeProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'partialChargeProperty' ),
      phetioDocumentation: 'qualitative scalar representation of the partial charge, computed as the electronegativity difference',
      phetioReadOnly: true // because this is computed based on electronegativity of atoms in a molecule
    } );
  }

  // @public
  reset() {
    this.electronegativityProperty.reset();

    // Do not reset labelProperty, it is for use by PhET-iO only.
    // Do not reset position and partial charge, they will be reset by their parent molecule.
  }
}

moleculePolarity.register( 'Atom', Atom );
export default Atom;