// Copyright 2014-2020, University of Colorado Boulder

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

class RealMolecule extends PhetioObject {

  /**
   * @param {string} symbol
   * @param {string} name
   * @param {string} mol2Data molecule data description, in mol2 format
   * @param {Tandem} tandem
   */
  constructor( symbol, name, mol2Data, tandem ) {
    assert && assert( typeof symbol === 'string', 'invalid symbol' );
    assert && assert( typeof name === 'string', 'invalid name' );
    assert && assert( typeof mol2Data === 'string', 'invalid mol2Data' );
    assert && assert( tandem instanceof Tandem, 'invalid tandem' );

    super( {
      phetioType: RealMolecule.RealMoleculeIO,
      tandem: tandem
    } );

    // @public (read-only)
    this.symbol = ChemUtils.toSubscript( symbol );
    this.name = name;
    this.mol2Data = mol2Data;
  }
}

RealMolecule.RealMoleculeIO = new IOType( 'RealMoleculeIO', {
  valueType: RealMolecule,
  supertype: ReferenceIO( IOType.ObjectIO )
} );

moleculePolarity.register( 'RealMolecule', RealMolecule );
export default RealMolecule;