// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import MPModel from '../../common/model/MPModel.js';
import moleculePolarity from '../../moleculePolarity.js';
import TriatomicMolecule from './TriatomicMolecule.js';

class ThreeAtomsModel extends MPModel {

  constructor() {
    super( new TriatomicMolecule( { position: new Vector2( 400, 280 ) } ) );
  }
}

moleculePolarity.register( 'ThreeAtomsModel', ThreeAtomsModel );

export default ThreeAtomsModel;