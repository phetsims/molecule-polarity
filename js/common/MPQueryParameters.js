// Copyright 2014-2022, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import moleculePolarity from '../moleculePolarity.js';
import DipoleDirection from './model/DipoleDirection.js';
import SurfaceColor from './model/SurfaceColor.js';

const MPQueryParameters = QueryStringMachine.getAll( {

  // Direction of the dipole, see MPPreferences.dipoleDirectionProperty
  dipoleDirection: {
    type: 'string',
    validValues: [ 'positiveToNegative', 'negativeToPositive' ],
    defaultValue: 'positiveToNegative',
    public: true
  },

  // Surface color used for Electrostatic Potential surface in the Real Molecules screen.
  // See MPPreferences.surfaceColorProperty
  surfaceColor: {
    type: 'string',
    validValues: [ 'RWB', 'ROYGB' ],
    defaultValue: 'RWB',
    public: true
  },

  //TODO https://github.com/phetsims/molecule-polarity/issues/32 delete when Real Molecules is fully implemented
  // Enables the 'Real Molecules' screen, for internal use only.
  realMolecules: { type: 'flag' },

  // Shows the molecule angle by adding an arrow whose tail is at the molecule center, and points
  // outward in the direction of the angle. For internal use only.
  showMoleculeAngle: { type: 'flag' }
} );

/**
 * Gets the DipoleDirection that corresponds to the associated query parameter value.
 * @returns {DipoleDirection}
 * @public
 */
MPQueryParameters.getDipoleDirection = () =>
  ( MPQueryParameters.dipoleDirection === 'positiveToNegative' ) ?
  DipoleDirection.POSITIVE_TO_NEGATIVE :
  DipoleDirection.NEGATIVE_TO_POSITIVE;

/**
 * Gets the SurfaceColor that corresponds to the associated query parameter value.
 * @returns {SurfaceColor}
 * @public
 */
MPQueryParameters.getSurfaceColor = () =>
  ( MPQueryParameters.surfaceColor === 'RWB' ) ? SurfaceColor.RWB : SurfaceColor.ROYGB;

moleculePolarity.register( 'MPQueryParameters', MPQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.moleculePolarity.MPQueryParameters' );

export default MPQueryParameters;