// Copyright 2014-2021, University of Colorado Boulder

/**
 * TwoAtomsModel is the model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import MPModel, { MPModelOptions } from '../../common/model/MPModel.js';
import moleculePolarity from '../../moleculePolarity.js';
import DiatomicMolecule from './DiatomicMolecule.js';
import { MoleculeOptions } from '../../common/model/Molecule.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

export type TwoAtomsModelOptions = SelfOptions & MPModelOptions;

export default class TwoAtomsModel extends MPModel {

  public constructor( providedOptions: TwoAtomsModelOptions ) {

    const createMolecule = ( options: MoleculeOptions ) => new DiatomicMolecule( merge( {
      position: new Vector2( 380, 280 )
    }, options ) );

    super( createMolecule, providedOptions );
  }
}

moleculePolarity.register( 'TwoAtomsModel', TwoAtomsModel );