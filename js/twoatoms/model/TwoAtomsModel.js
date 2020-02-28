// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import MPModel from '../../common/model/MPModel.js';
import moleculePolarity from '../../moleculePolarity.js';
import DiatomicMolecule from './DiatomicMolecule.js';

class TwoAtomsModel extends MPModel {

  constructor() {
    super( new DiatomicMolecule( { position: new Vector2( 380, 280 ) } ) );
  }
}

moleculePolarity.register( 'TwoAtomsModel', TwoAtomsModel );

export default TwoAtomsModel;