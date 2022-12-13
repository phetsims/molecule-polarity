// Copyright 2014-2022, University of Colorado Boulder

/**
 * Real molecule that is viewable in PhET's 3D molecule viewer.
 * The molecule is described using the mol2 standard format.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ChemUtils from '../../../../nitroglycerin/js/ChemUtils.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import moleculePolarity from '../../moleculePolarity.js';

export default class RealMolecule extends PhetioObject {

  public readonly symbol: string;
  public readonly fullNameProperty: TReadOnlyProperty<string>;
  public readonly mol2Data: string;

  /**
   * @param symbol - chemical symbol of the molecule
   * @param fullNameProperty - full name of the molecule
   * @param mol2Data molecule data description, in mol2 format
   * @param tandem
   */
  public constructor( symbol: string, fullNameProperty: TReadOnlyProperty<string>, mol2Data: string, tandem: Tandem ) {

    super( {
      phetioType: RealMolecule.RealMoleculeIO,
      phetioState: false, // because RealMoleculeIO extends ReferenceIO
      tandem: tandem
    } );

    this.symbol = ChemUtils.toSubscript( symbol );
    this.fullNameProperty = fullNameProperty;
    this.mol2Data = mol2Data;
  }

  /**
   * RealMoleculeIO handles PhET-iO serialization of RealMolecule. Since all RealMolecule are instantiated at
   * startup, it implements 'Reference type serialization', as described in the Serialization section of
   * https://github.com/phetsims/phet-io/blob/master/doc/phet-io-instrumentation-technical-guide.md#serialization
   */
  public static readonly RealMoleculeIO = new IOType( 'RealMoleculeIO', {
    valueType: RealMolecule,
    supertype: ReferenceIO( IOType.ObjectIO )
  } );
}

moleculePolarity.register( 'RealMolecule', RealMolecule );