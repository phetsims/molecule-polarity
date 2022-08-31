// Copyright 2020-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Enumeration for polarity of the plates.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import moleculePolarity from '../../moleculePolarity.js';

const Polarity = EnumerationDeprecated.byKeys( [ 'POSITIVE', 'NEGATIVE' ] );

moleculePolarity.register( 'Polarity', Polarity );
export default Polarity;