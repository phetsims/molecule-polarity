// Copyright 2022-2023, University of Colorado Boulder

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
      tandem: Tandem.PREFERENCES.createTandem( 'dipoleDirectionProperty' ),
      phetioFeatured: true
    } ),

  surfaceColorProperty: new StringUnionProperty<SurfaceColor>(
    MPQueryParameters.surfaceColor as SurfaceColor, {
      validValues: SurfaceColorValues,

      // TODO: It would be preferable to uninstrument this when running without the Real Molecules screen, which is not yet phet-io instrumented, see https://github.com/phetsims/molecule-polarity/issues/32
      tandem: Tandem.PREFERENCES.createTandem( 'surfaceColorProperty' ),
      phetioDocumentation: 'color scheme for the Electrostatic Potential surface in the Real Molecules screen',
      phetioFeatured: true
    } )
};

moleculePolarity.register( 'MPPreferences', MPPreferences );
export default MPPreferences;