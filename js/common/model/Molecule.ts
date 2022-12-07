// Copyright 2014-2022, University of Colorado Boulder

/**
 * Molecule is the abstract base type for all 2D molecules.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';
import Atom from './Atom.js';
import Bond from './Bond.js';

type SelfOptions = {
  position?: Vector2; // the point about which the molecule rotates, in global model coordinate frame
  angle?: number; // angle of rotation of the entire molecule about the position, in radians
};

export type MoleculeOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default abstract class Molecule extends PhetioObject {

  public readonly position: Vector2; // the point about which the molecule rotates, in global model coordinate frame
  public readonly atoms: Atom[];
  public readonly bonds: Bond[];
  public readonly angleProperty: NumberProperty;
  public readonly isDraggingProperty: Property<boolean>; // true when the user is dragging the molecule
  public readonly dipoleProperty: TReadOnlyProperty<Vector2>; // the molecular dipole, sum of the bond dipoles

  /**
   * @param atoms - atoms that make up the molecule
   * @param bonds - bonds between the atoms
   * @param updateAtomPositions - repositions the atoms
   * @param updatePartialCharges - updates the partial charges
   * @param [providedOptions]
   */
  protected constructor( atoms: Atom[], bonds: Bond[],
                         updateAtomPositions: ( position: Vector2, angle: number ) => void,
                         updatePartialCharges: () => void,
                         providedOptions: MoleculeOptions ) {

    const options = optionize<MoleculeOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      position: new Vector2( 0, 0 ),
      angle: 0,

      // PhetioObjectOptions
      phetioState: false
    }, providedOptions );

    super( options );

    this.position = options.position;
    this.atoms = atoms;
    this.bonds = bonds;

    this.angleProperty = new NumberProperty( options.angle, {
      range: MPConstants.ANGLE_RANGE,
      units: 'radians',
      tandem: options.tandem.createTandem( 'angleProperty' ),
      phetioDocumentation: 'rotation angle of the molecule, with positive rotation being CLOCKWISE'
    } );

    this.isDraggingProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'isDraggingProperty' ),
      phetioReadOnly: true,
      phetioState: false
    } );

    // update atom positions when molecule is rotated
    this.angleProperty.link( angle => updateAtomPositions( this.position, angle ) );

    // bond dipoles, for deriving molecular dipole
    const bondDipoleProperties = this.bonds.map( bond => bond.dipoleProperty );

    this.dipoleProperty = DerivedProperty.deriveAny( bondDipoleProperties, () => {

      // Sum the bond dipoles
      const sum = new Vector2( 0, 0 );
      bondDipoleProperties.forEach( bondDipoleProperty => {
        sum.add( bondDipoleProperty.value );
      } );

      // If y is effectively zero, snap to zero. See https://github.com/phetsims/molecule-polarity/issues/89
      if ( Math.abs( sum.y ) < 1E-10 ) {
        sum.y = 0;
      }
      return sum;
    }, {
      tandem: options.tandem.createTandem( 'dipoleProperty' ),
      phetioValueType: Vector2.Vector2IO,
      phetioDocumentation: 'The molecular dipole, vector sum of the bond dipoles. ' +
                           '+x is to the right, +y is DOWN, and positive rotation is CLOCKWISE.'
    } );

    // update partial charges when atoms' EN changes
    this.atoms.forEach( atom => {
      atom.electronegativityProperty.link( updatePartialCharges );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public reset(): void {
    this.angleProperty.reset();
    this.atoms.forEach( atom => atom.reset() );
  }

  /**
   * Creates a transform that accounts for the molecule's position and orientation.
   */
  public createTransformMatrix(): Matrix3 {
    return Matrix3.translationFromVector( this.position ).timesMatrix( Matrix3.rotation2( this.angleProperty.value ) );
  }
}

moleculePolarity.register( 'Molecule', Molecule );