// Copyright 2020, University of Colorado Boulder

/**
 * Enumeration for polarity of the plates.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import moleculePolarity from '../../moleculePolarity.js';

const Polarity = Enumeration.byKeys( [ 'POSITIVE', 'NEGATIVE' ] );

moleculePolarity.register( 'Polarity', Polarity );
export default Polarity;