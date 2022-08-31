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
import TriatomicMolecule from './TriatomicMolecule.js';

class ThreeAtomsModel extends MPModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    const createMolecule = options => new TriatomicMolecule( merge( {
      position: new Vector2( 400, 280 )
    }, options ) );

    super( createMolecule, options );
  }
}

moleculePolarity.register( 'ThreeAtomsModel', ThreeAtomsModel );
export default ThreeAtomsModel;