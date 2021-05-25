// Copyright 2014-2021, University of Colorado Boulder

/**
 * Type of surface rendered in the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import moleculePolarity from '../../moleculePolarity.js';

const SurfaceType = Enumeration.byKeys( [ 'NONE', 'ELECTROSTATIC_POTENTIAL', 'ELECTRON_DENSITY' ] );

moleculePolarity.register( 'SurfaceType', SurfaceType );
export default SurfaceType;