// Copyright 2015-2020, University of Colorado Boulder

/**
 * Global options for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationProperty from '../../../axon/js/EnumerationProperty.js';
import merge from '../../../phet-core/js/merge.js';
import Tandem from '../../../tandem/js/Tandem.js';
import moleculePolarity from '../moleculePolarity.js';
import DipoleDirection from './model/DipoleDirection.js';
import SurfaceColor from './model/SurfaceColor.js';

class MPGlobalOptions {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    // @public
    this.dipoleDirectionProperty = new EnumerationProperty( DipoleDirection, DipoleDirection.POSITIVE_TO_NEGATIVE, {
      tandem: options.tandem.createTandem( 'dipoleDirectionProperty' )
    } );
    this.surfaceColorProperty = new EnumerationProperty( SurfaceColor, SurfaceColor.RWB, {
      tandem: options.tandem.createTandem( 'surfaceColorProperty' )
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