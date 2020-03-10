// Copyright 2015-2020, University of Colorado Boulder

/**
 * Global options for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationProperty from '../../../axon/js/EnumerationProperty.js';
import moleculePolarity from '../moleculePolarity.js';
import DipoleDirection from './model/DipoleDirection.js';
import SurfaceColor from './model/SurfaceColor.js';

class MPGlobalOptions {

  constructor() {

    // @public
    this.dipoleDirectionProperty = new EnumerationProperty( DipoleDirection, DipoleDirection.POSITIVE_TO_NEGATIVE );
    this.surfaceColorProperty = new EnumerationProperty( SurfaceColor, SurfaceColor.RWB );
  }

  // @public
  reset() {
    this.dipoleDirectionProperty.reset();
    this.surfaceColorProperty.reset();
  }
}

moleculePolarity.register( 'MPGlobalOptions', MPGlobalOptions );

export default MPGlobalOptions;