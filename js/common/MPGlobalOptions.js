// Copyright 2015-2021, University of Colorado Boulder

/**
 * Global options for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationDeprecatedProperty from '../../../axon/js/EnumerationDeprecatedProperty.js';
import merge from '../../../phet-core/js/merge.js';
import Tandem from '../../../tandem/js/Tandem.js';
import moleculePolarity from '../moleculePolarity.js';
import DipoleDirection from './model/DipoleDirection.js';
import SurfaceColor from './model/SurfaceColor.js';
import MPQueryParameters from './MPQueryParameters.js';

class MPGlobalOptions {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    // @public
    this.dipoleDirectionProperty = new EnumerationDeprecatedProperty(
      DipoleDirection, MPQueryParameters.getDipoleDirection(), {
        tandem: options.tandem.createTandem( 'dipoleDirectionProperty' )
      } );

    // @public
    this.surfaceColorProperty = new EnumerationDeprecatedProperty(
      SurfaceColor, MPQueryParameters.getSurfaceColor(), {

        //TODO see https://github.com/phetsims/molecule-polarity/issues/32
        // Until the 'Real Molecules' screen is fully implemented, opt out of PhET-iO instrumentation.
        tandem: ( MPQueryParameters.realMolecules ) ?
                options.tandem.createTandem( 'surfaceColorProperty' ) :
                Tandem.OPT_OUT.createTandem( 'surfaceColorProperty' ),
        phetioDocumentation: 'color scheme for the Electrostatic Potential surface in the Real Molecules screen'
      } );
  }

  // @public
  reset() {
    this.dipoleDirectionProperty.reset();
    this.surfaceColorProperty.reset();
  }
}

moleculePolarity.register( 'MPGlobalOptions', MPGlobalOptions );
export default MPGlobalOptions;