// Copyright 2014-2023, University of Colorado Boulder

/**
 * ThreeAtomsModel is the model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPModel from '../../common/model/MPModel.js';
import moleculePolarity from '../../moleculePolarity.js';
import TriatomicMolecule from './TriatomicMolecule.js';

export default class ThreeAtomsModel extends MPModel {

  public readonly triatomicMolecule: TriatomicMolecule;

  public constructor( tandem: Tandem ) {

    const molecule = new TriatomicMolecule( {
      position: new Vector2( 400, 280 ),
      tandem: tandem.createTandem( 'molecule' )
    } );

    super( molecule, tandem );

    this.triatomicMolecule = molecule;
  }

  public override reset(): void {
    this.triatomicMolecule.reset();
    super.reset();
  }
}

moleculePolarity.register( 'ThreeAtomsModel', ThreeAtomsModel );