// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import mol2Data from './mol2Data.js';
import RealMolecule from './RealMolecule.js';

class RealMoleculesModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    // @public (read-only) the set of molecules to choose from
    this.molecules = [

      new RealMolecule( 'H2', moleculePolarityStrings.hydrogen, mol2Data.H2, options.tandem.createTandem( 'H2' ) ),
      new RealMolecule( 'N2', moleculePolarityStrings.nitrogen, mol2Data.N2, options.tandem.createTandem( 'N2' ) ),
      new RealMolecule( 'O2', moleculePolarityStrings.oxygen, mol2Data.O2, options.tandem.createTandem( 'O2' ) ),
      new RealMolecule( 'F2', moleculePolarityStrings.fluorine, mol2Data.F2, options.tandem.createTandem( 'F2' ) ),
      new RealMolecule( 'HF', moleculePolarityStrings.hydrogenFluoride, mol2Data.HF, options.tandem.createTandem( 'HF' ) ),

      new RealMolecule( 'H2O', moleculePolarityStrings.water, mol2Data.H2O, options.tandem.createTandem( 'H2O' ) ),
      new RealMolecule( 'CO2', moleculePolarityStrings.carbonDioxide, mol2Data.CO2, options.tandem.createTandem( 'CO2' ) ),
      new RealMolecule( 'HCN', moleculePolarityStrings.hydrogenCyanide, mol2Data.HCN, options.tandem.createTandem( 'HCN' ) ),
      new RealMolecule( 'O3', moleculePolarityStrings.ozone, mol2Data.O3, options.tandem.createTandem( 'O3' ) ),

      new RealMolecule( 'NH3', moleculePolarityStrings.ammonia, mol2Data.NH3, options.tandem.createTandem( 'NH3' ) ),
      new RealMolecule( 'BH3', moleculePolarityStrings.borane, mol2Data.BH3, options.tandem.createTandem( 'BH3' ) ),
      new RealMolecule( 'BF3', moleculePolarityStrings.boronTrifluoride, mol2Data.BF3, options.tandem.createTandem( 'BF3' ) ),
      new RealMolecule( 'CH2O', moleculePolarityStrings.formaldehyde, mol2Data.CH2O, options.tandem.createTandem( 'CH2O' ) ),

      new RealMolecule( 'CH4', moleculePolarityStrings.methane, mol2Data.CH4, options.tandem.createTandem( 'CH4' ) ),
      new RealMolecule( 'CH3F', moleculePolarityStrings.fluoromethane, mol2Data.CH3F, options.tandem.createTandem( 'CH3F' ) ),
      new RealMolecule( 'CH2F2', moleculePolarityStrings.difluoromethane, mol2Data.CH2F2, options.tandem.createTandem( 'CH2F2' ) ),
      new RealMolecule( 'CHF3', moleculePolarityStrings.trifluoromethane, mol2Data.CHF3, options.tandem.createTandem( 'CHF3' ) ),
      new RealMolecule( 'CF4', moleculePolarityStrings.tetrafluoromethane, mol2Data.CF4, options.tandem.createTandem( 'CF4' ) ),
      new RealMolecule( 'CHCl3', moleculePolarityStrings.chloroform, mol2Data.CHCl3, options.tandem.createTandem( 'CHCl3' ) )
    ];

    // @public the selected molecule
    this.moleculeProperty = new Property( this.molecules[ 4 ], {
      validValues: this.molecules,
      phetioType: Property.PropertyIO( RealMolecule.RealMoleculeIO ),
      tandem: options.tandem.createTandem( 'moleculeProperty' )
    } );
  }

  // @public
  reset() {
    this.moleculeProperty.reset();
  }
}

moleculePolarity.register( 'RealMoleculesModel', RealMoleculesModel );

export default RealMoleculesModel;