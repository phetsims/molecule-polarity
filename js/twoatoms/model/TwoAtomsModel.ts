// Copyright 2014-2022, University of Colorado Boulder

/**
 * TwoAtomsModel is the model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import MPModel, { MPModelOptions } from '../../common/model/MPModel.js';
import moleculePolarity from '../../moleculePolarity.js';
import DiatomicMolecule from './DiatomicMolecule.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

type TwoAtomsModelOptions = SelfOptions & MPModelOptions;

export default class TwoAtomsModel extends MPModel {

  public readonly diatomicMolecule: DiatomicMolecule;

  public constructor( providedOptions: TwoAtomsModelOptions ) {

    const diatomicMolecule = new DiatomicMolecule( {
      position: new Vector2( 380, 280 ),
      tandem: providedOptions.tandem.createTandem( 'molecule' )
    } );

    super( diatomicMolecule, providedOptions );

    this.diatomicMolecule = diatomicMolecule;
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public override reset(): void {
    this.diatomicMolecule.reset();
    super.reset();
  }
}

moleculePolarity.register( 'TwoAtomsModel', TwoAtomsModel );