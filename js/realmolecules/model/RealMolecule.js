// Copyright 2014-2019, University of Colorado Boulder

/**
 * Real molecule that is viewable in PhET's 3D molecule viewer.
 * The molecule is described using the mol2 standard format.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ChemUtils from '../../../../nitroglycerin/js/ChemUtils.js';
import inherit from '../../../../phet-core/js/inherit.js';
import moleculePolarity from '../../moleculePolarity.js';

/**
 * @param {string} symbol
 * @param {string} name
 * @param {string} mol2Data molecule data description, in mol2 format
 * @constructor
 */
function RealMolecule( symbol, name, mol2Data ) {

  // @public (read-only)
  this.symbol = ChemUtils.toSubscript( symbol );
  this.name = name;
  this.mol2Data = mol2Data;
}

moleculePolarity.register( 'RealMolecule', RealMolecule );

inherit( Object, RealMolecule );
export default RealMolecule;