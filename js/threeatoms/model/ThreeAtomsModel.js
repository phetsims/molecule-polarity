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
import TriatomicMolecule from './TriatomicMolecule.js';

/**
 * @constructor
 */
function ThreeAtomsModel() {
  MPModel.call( this, new TriatomicMolecule( { position: new Vector2( 400, 280 ) } ) );
}

moleculePolarity.register( 'ThreeAtomsModel', ThreeAtomsModel );

inherit( MPModel, ThreeAtomsModel );
export default ThreeAtomsModel;