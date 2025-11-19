// Copyright 2014-2025, University of Colorado Boulder

/**
 * Main entry point for the 'Molecule Polarity' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import MPPreferencesNode from './common/view/MPPreferencesNode.js';
import MoleculePolarityStrings from './MoleculePolarityStrings.js';
import RealMoleculesScreen from './realmolecules/RealMoleculesScreen.js';
import ThreeAtomsScreen from './threeatoms/ThreeAtomsScreen.js';
import TwoAtomsScreen from './twoatoms/TwoAtomsScreen.js';

simLauncher.launch( () => {

  const titleStringProperty = MoleculePolarityStrings[ 'molecule-polarity' ].titleStringProperty;

  const screens = [
    new TwoAtomsScreen( Tandem.ROOT.createTandem( 'twoAtomsScreen' ) ),
    new ThreeAtomsScreen( Tandem.ROOT.createTandem( 'threeAtomsScreen' ) ),
    new RealMoleculesScreen( Tandem.ROOT.createTandem( 'realMoleculesScreen' ) )
  ];

  const options: SimOptions = {
    webgl: true,

    preferencesModel: new PreferencesModel( {
      simulationOptions: {
        customPreferences: [ {
          createContent: tandem => new MPPreferencesNode( {
            tandem: tandem.createTandem( 'simPreferences' )
          } )
        } ]
      }
    } ),

    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Julia Chamberlain, Emily B. Moore, Robert Parson, Kathy Perkins, Amy Rouinfar',
      qualityAssurance: 'Steele Dalton, Alex Dornan, Jaron Droder, Clifford Hardin, Ethan Johnson, Brooklyn Lash, Emily Miller, Devon Quispe, Nancy Salpepi, Kathryn Woessner'
    },

    // phet-io options
    phetioDesigned: true
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();
} );