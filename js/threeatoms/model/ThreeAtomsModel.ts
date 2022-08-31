// Copyright 2014-2021, University of Colorado Boulder

/**
 * ThreeAtomsModel is the model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import MPModel, { MPModelOptions } from '../../common/model/MPModel.js';
import moleculePolarity from '../../moleculePolarity.js';
import TriatomicMolecule from './TriatomicMolecule.js';
import { MoleculeOptions } from '../../common/model/Molecule.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

export type ThreeAtomsModelOptions = SelfOptions & MPModelOptions;

export default class ThreeAtomsModel extends MPModel {

  public constructor( providedOptions: ThreeAtomsModelOptions ) {

    const createMolecule = ( options: MoleculeOptions ) => new TriatomicMolecule( merge( {
      position: new Vector2( 400, 280 )
    }, options ) );

    super( createMolecule, providedOptions );
  }
}

moleculePolarity.register( 'ThreeAtomsModel', ThreeAtomsModel );