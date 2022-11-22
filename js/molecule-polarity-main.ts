// Copyright 2014-2022, University of Colorado Boulder

/**
 * Main entry point for the 'Molecule Polarity' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import MPPreferencesNode from './common/view/MPPreferencesNode.js';
import MoleculePolarityStrings from './MoleculePolarityStrings.js';
import RealMoleculesScreen from './realmolecules/RealMoleculesScreen.js';
import ThreeAtomsScreen from './threeatoms/ThreeAtomsScreen.js';
import TwoAtomsScreen from './twoatoms/TwoAtomsScreen.js';

simLauncher.launch( () => {

  const screens = [
    new TwoAtomsScreen( { tandem: Tandem.ROOT.createTandem( 'twoAtomsScreen' ) } ),
    new ThreeAtomsScreen( { tandem: Tandem.ROOT.createTandem( 'threeAtomsScreen' ) } ),
    new RealMoleculesScreen( { tandem: Tandem.ROOT.createTandem( 'realMoleculesScreen' ) } )
  ];

  const sim = new Sim( MoleculePolarityStrings[ 'molecule-polarity' ].titleStringProperty, screens, {
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
      qualityAssurance: 'Steele Dalton, Alex Dornan, Ethan Johnson, Brooklyn Lash, Emily Miller, Devon Quispe, Nancy Salpepi, Kathryn Woessner'
    },

    // phet-io options
    phetioDesigned: true
  } );

  sim.start();
} );