// Copyright 2014-2021, University of Colorado Boulder

/**
 * Abstract base type for 2D models in this sim.
 * Every 2D model has an E-field and a molecule.
 * If the E-field is enabled, the molecule rotates until its molecular dipole is aligned with the E-field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';
import MPPreferences from './MPPreferences.js';
import DipoleDirection from './DipoleDirection.js';
import normalizeAngle from './normalizeAngle.js';

// constants
const MAX_RADIANS_PER_STEP = 0.17; // controls animation of E-field alignment

class MPModel {

  /**
   * @param {function(options:Object):Molecule} createMolecule - creates the molecule for this model
   * @param {Object} [options]
   * @abstract
   */
  constructor( createMolecule, options ) {
    assert && assert( typeof createMolecule === 'function', 'invalid createMolecule' );

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    // @public (read-only)
    this.molecule = createMolecule( {
      tandem: options.tandem.createTandem( 'molecule' )
    } );

    // @public
    this.eFieldEnabledProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'eFieldEnabledProperty' )
    } );
  }

  // @public
  reset() {
    this.molecule.reset();
    this.eFieldEnabledProperty.reset();
  }

  /**
   * Advances the model.
   * @param {number} dt - time step, in seconds
   * @public
   */
  step( dt ) {

    // If the E-field is on and the user isn't controlling the molecule's orientation, animate molecule rotation.
    if ( this.eFieldEnabledProperty.value && !this.molecule.isDraggingProperty.value ) {
      this.updateMoleculeOrientation( this.molecule );
    }
  }

  /**
   * Rotate the molecule one step towards alignment of the molecular dipole with the E-field.
   * Angular velocity is proportional to the dipole's magnitude.
   * @param {Molecule} molecule
   * @private
   */
  updateMoleculeOrientation( molecule ) {

    let dipole = molecule.dipoleProperty.value;

    // This algorithm is for a dipole that points from positive to negative charge, and is therefore
    // anti-parallel to the E-field.  For IUPAC convention, the direction of the dipole moment
    // is from negative to positive charge, so rotate the dipole 180 degrees. See issue #5 and #56.
    if ( MPPreferences.dipoleDirectionProperty.value === DipoleDirection.NEGATIVE_TO_POSITIVE ) {
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

    molecule.angleProperty.value = normalizeAngle( angle, molecule.angleProperty.range.min );
  }
}

moleculePolarity.register( 'MPModel', MPModel );
export default MPModel;