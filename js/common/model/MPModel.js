// Copyright 2014-2019, University of Colorado Boulder

/**
 * Abstract base type for 2D models in this sim.
 * Every 2D model has an E-field and a molecule.
 * If the E-field is enabled, the molecule rotates until its molecular dipole is aligned with the E-field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';
import EField from './EField.js';

// constants
const MAX_RADIANS_PER_STEP = 0.17; // controls animation of E-field alignment

class MPModel {

  /**
   * @param {Molecule} molecule
   * @abstract
   */
  constructor( molecule ) {

    // @public (read-only)
    this.eField = new EField();
    this.molecule = molecule;
  }

  // @public
  reset() {
    this.eField.reset();
    this.molecule.reset();
  }

  /**
   * Advances the model.
   * @param {number} dt - time step, in seconds
   * @public
   */
  step( dt ) {

    // If the E-field is on and the user isn't controlling the molecule's orientation, animate molecule rotation.
    if ( this.eField.enabledProperty.get() && !this.molecule.dragging ) {
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

    let dipole = molecule.dipoleProperty.get();

    // This algorithm is for a dipole that points from positive to negative charge, and is therefore
    // anti-parallel to the E-field.  For IUPAC convention, the direction of the dipole moment
    // is from negative to positive charge, so rotate the dipole 180 degrees. See issue #5 and #56.
    if ( MPConstants.GLOBAL_OPTIONS.dipoleDirectionProperty.get() === 'negativeToPositive' ) {
      dipole = dipole.rotated( Math.PI );
    }

    // magnitude of angular velocity is proportional to molecular dipole magnitude
    const deltaDipoleAngle = Math.abs( Utils.linear( 0, MPConstants.ELECTRONEGATIVITY_RANGE.getLength(), 0, MAX_RADIANS_PER_STEP, dipole.magnitude ) );

    // convert angle to range [0,2*PI)
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
    molecule.angleProperty.set( molecule.angleProperty.get() + deltaMoleculeAngle );
  }
}

/**
 * Converts an angle to range [0,2*PI) radians
 * @param {number} angle
 * @returns {number}
 */
function normalizeAngle( angle ) {
  let normalizedAngle = angle % ( 2 * Math.PI );
  if ( normalizedAngle < 0 ) {
    normalizedAngle = ( 2 * Math.PI ) + angle;
  }
  assert && assert( normalizedAngle >= 0 && normalizedAngle <= 2 * Math.PI, 'normalizedAngle must be between 0-2pi radians' );
  return normalizedAngle;
}

moleculePolarity.register( 'MPModel', MPModel );

export default MPModel;