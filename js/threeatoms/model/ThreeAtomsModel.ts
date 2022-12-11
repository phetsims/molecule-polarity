// Copyright 2014-2022, University of Colorado Boulder

/**
 * ThreeAtomsModel is the model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import MPModel, { MPModelOptions } from '../../common/model/MPModel.js';
import moleculePolarity from '../../moleculePolarity.js';
import TriatomicMolecule from './TriatomicMolecule.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

type ThreeAtomsModelOptions = SelfOptions & MPModelOptions;

export default class ThreeAtomsModel extends MPModel {

  public readonly triatomicMolecule: TriatomicMolecule;

  public constructor( providedOptions: ThreeAtomsModelOptions ) {

    const triatomicMolecule = new TriatomicMolecule( {
      position: new Vector2( 400, 280 ),
      tandem: providedOptions.tandem.createTandem( 'molecule' )
    } );

    super( triatomicMolecule, providedOptions );

    this.triatomicMolecule = triatomicMolecule;
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public override reset(): void {
    this.triatomicMolecule.reset();
    super.reset();
  }
}

moleculePolarity.register( 'ThreeAtomsModel', ThreeAtomsModel );