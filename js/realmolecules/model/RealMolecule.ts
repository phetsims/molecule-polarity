// Copyright 2014-2022, University of Colorado Boulder

/**
 * Real molecule that is viewable in PhET's 3D molecule viewer.
 * The molecule is described using the mol2 standard format.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ChemUtils from '../../../../nitroglycerin/js/ChemUtils.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import moleculePolarity from '../../moleculePolarity.js';

export default class RealMolecule extends PhetioObject {

  public readonly symbol: string;
  public readonly fullName: string;
  public readonly mol2Data: string;

  public static readonly RealMoleculeIO = new IOType( 'RealMoleculeIO', {
    valueType: RealMolecule,
    supertype: ReferenceIO( IOType.ObjectIO )
  } );

  /**
   * @param symbol - chemical symbol of the molecule
   * @param fullName - full name of the molecule
   * @param mol2Data molecule data description, in mol2 format
   * @param tandem
   */
  //TODO https://github.com/phetsims/molecule-polarity/issues/140 change fullName to fullNameProperty
  public constructor( symbol: string, fullName: string, mol2Data: string, tandem: Tandem ) {

    super( {
      phetioType: RealMolecule.RealMoleculeIO,
      phetioState: false, // because RealMoleculeIO extends ReferenceIO
      tandem: tandem
    } );

    this.symbol = ChemUtils.toSubscript( symbol );
    this.fullName = fullName;
    this.mol2Data = mol2Data;
  }
}

moleculePolarity.register( 'RealMolecule', RealMolecule );