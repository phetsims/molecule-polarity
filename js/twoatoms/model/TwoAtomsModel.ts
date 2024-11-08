// Copyright 2014-2023, University of Colorado Boulder

/**
 * TwoAtomsModel is the model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPModel from '../../common/model/MPModel.js';
import moleculePolarity from '../../moleculePolarity.js';
import DiatomicMolecule from './DiatomicMolecule.js';

export default class TwoAtomsModel extends MPModel {

  public readonly diatomicMolecule: DiatomicMolecule;

  public constructor( tandem: Tandem ) {

    const molecule = new DiatomicMolecule( {
      position: new Vector2( 380, 280 ),
      tandem: tandem.createTandem( 'molecule' )
    } );

    super( molecule, tandem );

    this.diatomicMolecule = molecule;
  }

  public override reset(): void {
    this.diatomicMolecule.reset();
    super.reset();
  }
}

moleculePolarity.register( 'TwoAtomsModel', TwoAtomsModel );