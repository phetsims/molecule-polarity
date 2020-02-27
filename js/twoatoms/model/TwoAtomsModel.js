// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import MPModel from '../../common/model/MPModel.js';
import moleculePolarity from '../../moleculePolarity.js';
import DiatomicMolecule from './DiatomicMolecule.js';

/**
 * @constructor
 */
function TwoAtomsModel() {
  MPModel.call( this, new DiatomicMolecule( { position: new Vector2( 380, 280 ) } ) );
}

moleculePolarity.register( 'TwoAtomsModel', TwoAtomsModel );

inherit( MPModel, TwoAtomsModel );
export default TwoAtomsModel;