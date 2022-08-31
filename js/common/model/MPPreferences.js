// Copyright 2022, University of Colorado Boulder

/**
 * MPPreferences is the model for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPQueryParameters from '../MPQueryParameters.js';
import { DipoleDirectionValues } from './DipoleDirection.js';
import { SurfaceColorValues } from './SurfaceColor.js';

const MPPreferences = {

  dipoleDirectionProperty: new StringEnumerationProperty( MPQueryParameters.dipoleDirection, {
    validValues: DipoleDirectionValues,
    tandem: Tandem.PREFERENCES.createTandem( 'dipoleDirectionProperty' )
  } ),

  surfaceColorProperty: new StringEnumerationProperty( MPQueryParameters.surfaceColor, {
    validValues: SurfaceColorValues,

    //TODO see https://github.com/phetsims/molecule-polarity/issues/32
    // Until the 'Real Molecules' screen is fully implemented, opt out of PhET-iO instrumentation.
    // In the meantime, support testing via the realMolecules query parameter.
    tandem: ( MPQueryParameters.realMolecules ) ?
            Tandem.PREFERENCES.createTandem( 'surfaceColorProperty' ) :
            Tandem.OPT_OUT.createTandem( 'surfaceColorProperty' ),
    phetioDocumentation: 'color scheme for the Electrostatic Potential surface in the Real Molecules screen'
  } )
};

moleculePolarity.register( 'MPPreferences', MPPreferences );
export default MPPreferences;