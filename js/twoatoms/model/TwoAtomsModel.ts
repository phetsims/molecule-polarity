// Copyright 2014-2021, University of Colorado Boulder

// @ts-nocheck
/**
 * Model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import MPModel from '../../common/model/MPModel.js';
import moleculePolarity from '../../moleculePolarity.js';
import DiatomicMolecule from './DiatomicMolecule.js';

class TwoAtomsModel extends MPModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    const createMolecule = options => new DiatomicMolecule( merge( {
      position: new Vector2( 380, 280 )
    }, options ) );

    super( createMolecule, options );
  }
}

moleculePolarity.register( 'TwoAtomsModel', TwoAtomsModel );
export default TwoAtomsModel;