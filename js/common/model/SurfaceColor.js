// Copyright 2020, University of Colorado Boulder

/**
 * Enumeration for dipole direction.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import moleculePolarity from '../../moleculePolarity.js';

const SurfaceColor = Enumeration.byKeys( [ 'RWB', 'ROYGB' ] );

moleculePolarity.register( 'SurfaceColor', SurfaceColor );

export default SurfaceColor;

