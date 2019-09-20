// Copyright 2014-2019, University of Colorado Boulder

/**
 * Real molecule that is viewable in PhET's 3D molecule viewer.
 * The molecule is described using the mol2 standard format.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ChemUtils = require( 'NITROGLYCERIN/ChemUtils' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );

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

  return inherit( Object, RealMolecule );
} );
