// Copyright 2014-2022, University of Colorado Boulder

/**
 * Bond is the model of a bond between 2 atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPPreferences from './MPPreferences.js';
import Atom from './Atom.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

type BondOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem' | 'phetioDocumentation'>;

export default class Bond extends PhetioObject {

  public readonly atom1: Atom;
  public readonly atom2: Atom;
  public readonly dipoleProperty: TReadOnlyProperty<Vector2>;

  public constructor( atom1: Atom, atom2: Atom, providedOptions: BondOptions ) {

    const options = optionize<BondOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      phetioState: false
    }, providedOptions );

    super( options );

    this.atom1 = atom1;
    this.atom2 = atom2;

    this.dipoleProperty = new DerivedProperty( [
        atom1.positionProperty, atom2.positionProperty,
        atom1.electronegativityProperty, atom2.electronegativityProperty,
        MPPreferences.dipoleDirectionProperty
      ],
      ( position1, position2, electronegativity1, electronegativity2, dipoleDirection ) => {

        const deltaEN = electronegativity2 - electronegativity1;

        // this is a simplification. in reality, magnitude is a function of deltaEN and many other things.
        const magnitude = Math.abs( deltaEN );

        let angle = this.getAngle();
        if ( deltaEN < 0 ) {
          angle += Math.PI;
        }

        const dipole = Vector2.createPolar( magnitude, angle );

        // The above algorithm is for a dipole that points from positive to negative charge.
        // For IUPAC convention, the direction of the dipole is from negative to positive charge,
        // so rotate the dipole 180 degrees. See issue #5 and #56.
        if ( dipoleDirection === 'negativeToPositive' ) {
          dipole.rotate( Math.PI );
        }

        return dipole;
      }, {
        tandem: options.tandem.createTandem( 'dipoleProperty' ),
        phetioValueType: Vector2.Vector2IO,
        phetioDocumentation:
          'Qualitative vector representation of the dipole, based on the electronegativity difference ' +
          'between the atoms. +x is to the right, +y is DOWN, and positive rotation is CLOCKWISE.'
      } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Gets the center of the bond, the midpoint between the 2 atom positions.
   */
  public getCenter(): Vector2 {
    return this.atom1.positionProperty.value.average( this.atom2.positionProperty.value );
  }

  /**
   * Gets the angle (in radians) of atom2 relative to the horizontal axis.
   */
  public getAngle(): number {
    const center = this.getCenter();
    return Math.atan2( this.atom2.positionProperty.value.y - center.y, this.atom2.positionProperty.value.x - center.x );
  }

  /**
   * Gets the bond length, the distance between the 2 atoms.
   */
  public getLength(): number {
    return this.atom1.positionProperty.value.distance( this.atom2.positionProperty.value );
  }
}

moleculePolarity.register( 'Bond', Bond );