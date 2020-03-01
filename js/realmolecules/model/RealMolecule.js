// Copyright 2014-2020, University of Colorado Boulder

/**
 * Real molecule that is viewable in PhET's 3D molecule viewer.
 * The molecule is described using the mol2 standard format.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ChemUtils from '../../../../nitroglycerin/js/ChemUtils.js';
import moleculePolarity from '../../moleculePolarity.js';

class RealMolecule {

  /**
   * @param {string} symbol
   * @param {string} name
   * @param {string} mol2Data molecule data description, in mol2 format
   */
  constructor( symbol, name, mol2Data ) {

    // @public (read-only)
    this.symbol = ChemUtils.toSubscript( symbol );
    this.name = name;
    this.mol2Data = mol2Data;
  }
}

moleculePolarity.register( 'RealMolecule', RealMolecule );

export default RealMolecule;