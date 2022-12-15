// Copyright 2022, University of Colorado Boulder

/**
 * MPPreferences is the model for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPQueryParameters from '../MPQueryParameters.js';
import { DipoleDirection, DipoleDirectionValues } from './DipoleDirection.js';
import { SurfaceColor, SurfaceColorValues } from './SurfaceColor.js';

const MPPreferences = {

  dipoleDirectionProperty: new StringUnionProperty<DipoleDirection>(
    MPQueryParameters.dipoleDirection as DipoleDirection, {
      validValues: DipoleDirectionValues,
      tandem: Tandem.PREFERENCES.createTandem( 'dipoleDirectionProperty' )
    } ),

  surfaceColorProperty: new StringUnionProperty<SurfaceColor>(
    MPQueryParameters.surfaceColor as SurfaceColor, {
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