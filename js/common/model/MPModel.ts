// Copyright 2014-2023, University of Colorado Boulder

/**
 * MPModel is the abstract base type for 2D models in this sim.
 * Every 2D model has an E-field and a molecule.
 * If the E-field is enabled, the molecule rotates until its molecular dipole is aligned with the E-field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';
import MPPreferences from './MPPreferences.js';
import normalizeAngle from './normalizeAngle.js';
import Molecule from './Molecule.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Property from '../../../../axon/js/Property.js';
import TModel from '../../../../joist/js/TModel.js';

// constants
const MAX_RADIANS_PER_STEP = 0.17; // controls animation of E-field alignment

type SelfOptions = EmptySelfOptions;

export type MPModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default abstract class MPModel extends PhetioObject implements TModel {

  private readonly molecule: Molecule;
  public readonly eFieldEnabledProperty: Property<boolean>;

  protected constructor( molecule: Molecule, providedOptions: MPModelOptions ) {

    const options = optionize<MPModelOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      phetioState: false
    }, providedOptions );

    super( options );

    this.molecule = molecule;

    this.eFieldEnabledProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'eFieldEnabledProperty' )
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public reset(): void {
    this.eFieldEnabledProperty.reset();
  }

  /**
   * Advances the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {

    // If the E-field is on and the user isn't controlling the molecule's orientation, animate molecule rotation.
    if ( this.eFieldEnabledProperty.value && !this.molecule.isDraggingProperty.value ) {
      this.updateMoleculeOrientation( this.molecule );
    }
  }

  /**
   * Rotate the molecule one step towards alignment of the molecular dipole with the E-field.
   * Angular velocity is proportional to the dipole's magnitude.
   */
  private updateMoleculeOrientation( molecule: Molecule ): void {

    let dipole = molecule.dipoleProperty.value;

    // This algorithm is for a dipole that points from positive to negative charge, and is therefore
    // antiparallel to the E-field.  For IUPAC convention, the direction of the dipole moment
    // is from negative to positive charge, so rotate the dipole 180 degrees. See issue #5 and #56.
    if ( MPPreferences.dipoleDirectionProperty.value === 'negativeToPositive' ) {
      dipole = dipole.rotated( Math.PI );
    }

    // magnitude of angular velocity is proportional to molecular dipole magnitude
    const deltaDipoleAngle = Math.abs( Utils.linear( 0, MPConstants.ELECTRONEGATIVITY_RANGE.getLength(), 0, MAX_RADIANS_PER_STEP, dipole.magnitude ) );

    // normalize to [0,2*PI), because that's what the next chunk of code expects.
    const dipoleAngle = normalizeAngle( dipole.angle );

    let newDipoleAngle;

    // move the molecular dipole one step towards alignment with the E-field
    if ( dipoleAngle === 0 ) {

      // do nothing, molecule is aligned with E-field
      newDipoleAngle = dipoleAngle;
    }
    else if ( dipoleAngle > 0 && dipoleAngle < Math.PI ) {

      // rotate counterclockwise
      newDipoleAngle = dipoleAngle - deltaDipoleAngle;
      if ( newDipoleAngle < 0 ) {

        // new angle would overshoot, set to zero
        newDipoleAngle = 0;
      }
    }
    else {

      // rotate clockwise
      newDipoleAngle = dipoleAngle + deltaDipoleAngle;
      if ( newDipoleAngle > 2 * Math.PI ) {

        // new angle would overshoot, set to zero
        newDipoleAngle = 0;
      }
    }

    // convert dipole rotation to molecule rotation
    const deltaMoleculeAngle = newDipoleAngle - dipoleAngle;
    let angle = molecule.angleProperty.value + deltaMoleculeAngle;

    // If dipole is aligned with molecule orientation, snap to zero when we're close enough.
    // See https://github.com/phetsims/molecule-polarity/issues/97
    if ( newDipoleAngle === 0 && Math.abs( angle ) < 1E-5 ) {
      angle = 0;
    }

    const angleRange = molecule.angleProperty.range;
    molecule.angleProperty.value = normalizeAngle( angle, angleRange.min );
  }
}

moleculePolarity.register( 'MPModel', MPModel );