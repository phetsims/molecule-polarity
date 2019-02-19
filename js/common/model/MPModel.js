// Copyright 2014-2019, University of Colorado Boulder

/**
 * Abstract base type for 2D models in this sim.
 * Every 2D model has an E-field and a molecule.
 * If the E-field is enabled, the molecule rotates until its molecular dipole is aligned with the E-field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EField = require( 'MOLECULE_POLARITY/common/model/EField' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Util = require( 'DOT/Util' );

  // constants
  var MAX_RADIANS_PER_STEP = 0.17; // controls animation of E-field alignment

  /**
   * @param {Molecule} molecule
   * @constructor
   * @abstract
   */
  function MPModel( molecule ) {

    // @public (read-only)
    this.eField = new EField();
    this.molecule = molecule;
  }

  moleculePolarity.register( 'MPModel', MPModel );

  /**
   * Converts an angle to range [0,2*PI) radians
   * @param {number} angle
   * @returns {number}
   */
  var normalizeAngle = function( angle ) {
    var normalizedAngle = angle % ( 2 * Math.PI );
    if ( normalizedAngle < 0 ) {
      normalizedAngle = ( 2 * Math.PI ) + angle;
    }
    assert && assert( normalizedAngle >= 0 && normalizedAngle <= 2 * Math.PI, 'normalizedAngle must be between 0-2pi radians' );
    return normalizedAngle;
  };

  return inherit( Object, MPModel, {

    // @public
    reset: function() {
      this.eField.reset();
      this.molecule.reset();
    },

    /**
     * Advances the model.
     * @param {number} dt - time step, in seconds
     * @public
     */
    step: function( dt ) {

      // If the E-field is on and the user isn't controlling the molecule's orientation, animate molecule rotation.
      if ( this.eField.enabledProperty.get() && !this.molecule.dragging ) {
        this.updateMoleculeOrientation( this.molecule );
      }
    },

    /**
     * Rotate the molecule one step towards alignment of the molecular dipole with the E-field.
     * Angular velocity is proportional to the dipole's magnitude.
     * @param {Molecule} molecule
     * @private
     */
    updateMoleculeOrientation: function( molecule ) {

      var dipole = molecule.dipoleProperty.get();

      // This algorithm is for a dipole that points from positive to negative charge, and is therefore
      // anti-parallel to the E-field.  For IUPAC convention, the direction of the dipole moment
      // is from negative to positive charge, so rotate the dipole 180 degrees. See issue #5 and #56.
      if ( MPConstants.GLOBAL_OPTIONS.dipoleDirectionProperty.get() === 'negativeToPositive' ) {
        dipole = dipole.rotated( Math.PI );
      }

      // magnitude of angular velocity is proportional to molecular dipole magnitude
      var deltaDipoleAngle = Math.abs( Util.linear( 0, MPConstants.ELECTRONEGATIVITY_RANGE.getLength(), 0, MAX_RADIANS_PER_STEP, dipole.magnitude ) );

      // convert angle to range [0,2*PI)
      var dipoleAngle = normalizeAngle( dipole.angle );

      var newDipoleAngle;

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
      var deltaMoleculeAngle = newDipoleAngle - dipoleAngle;
      molecule.angleProperty.set( molecule.angleProperty.get() + deltaMoleculeAngle );
    }
  } );
} );
