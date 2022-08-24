// Copyright 2015-2022, University of Colorado Boulder

/**
 * MPPreferences is the model for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationDeprecatedProperty from '../../../../axon/js/EnumerationDeprecatedProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPQueryParameters from '../MPQueryParameters.js';
import DipoleDirection from './DipoleDirection.js';
import SurfaceColor from './SurfaceColor.js';

const MPPreferences = {

  dipoleDirectionProperty: new EnumerationDeprecatedProperty(
    DipoleDirection, MPQueryParameters.getDipoleDirection(), {
      tandem: Tandem.PREFERENCES.createTandem( 'dipoleDirectionProperty' )
    } ),

  surfaceColorProperty: new EnumerationDeprecatedProperty(
    SurfaceColor, MPQueryParameters.getSurfaceColor(), {

      //TODO see https://github.com/phetsims/molecule-polarity/issues/32
      // Until the 'Real Molecules' screen is fully implemented, opt out of PhET-iO instrumentation.
      tandem: ( MPQueryParameters.realMolecules ) ?
              Tandem.PREFERENCES.createTandem( 'surfaceColorProperty' ) :
              Tandem.OPT_OUT.createTandem( 'surfaceColorProperty' ),
      phetioDocumentation: 'color scheme for the Electrostatic Potential surface in the Real Molecules screen'
    } )
};

moleculePolarity.register( 'MPPreferences', MPPreferences );
export default MPPreferences;