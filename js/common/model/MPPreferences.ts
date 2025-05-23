// Copyright 2022-2024, University of Colorado Boulder

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

      //TODO When Real Molecules screen is eventually implemented, make this tandem change. See https://github.com/phetsims/molecule-polarity/issues/32
      // tandem: Tandem.PREFERENCES.createTandem( 'surfaceColorProperty' ),
      tandem: Tandem.OPT_OUT,
      phetioDocumentation: 'color scheme for the Electrostatic Potential surface in the Real Molecules screen',
      phetioFeatured: true
    } )
};

moleculePolarity.register( 'MPPreferences', MPPreferences );
export default MPPreferences;