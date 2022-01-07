// Copyright 2020-2022, University of Colorado Boulder

/**
 * Enumeration for dipole direction.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import moleculePolarity from '../../moleculePolarity.js';

const SurfaceColor = EnumerationDeprecated.byKeys( [ 'RWB', 'ROYGB' ] );

moleculePolarity.register( 'SurfaceColor', SurfaceColor );
export default SurfaceColor;

