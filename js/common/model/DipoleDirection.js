// Copyright 2020-2021, University of Colorado Boulder

/**
 * Enumeration for dipole direction.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import moleculePolarity from '../../moleculePolarity.js';

const DipoleDirection = Enumeration.byKeys( [ 'POSITIVE_TO_NEGATIVE', 'NEGATIVE_TO_POSITIVE' ] );

moleculePolarity.register( 'DipoleDirection', DipoleDirection );
export default DipoleDirection;

