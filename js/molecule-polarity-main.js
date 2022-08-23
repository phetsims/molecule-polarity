// Copyright 2014-2021, University of Colorado Boulder

/**
 * Main entry point for the 'Molecule Polarity' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import MPOptionsNode from './common/view/MPOptionsNode.js';
import moleculePolarityStrings from './moleculePolarityStrings.js';
import RealMoleculesScreen from './realmolecules/RealMoleculesScreen.js';
import ThreeAtomsScreen from './threeatoms/ThreeAtomsScreen.js';
import TwoAtomsScreen from './twoatoms/TwoAtomsScreen.js';

simLauncher.launch( () => {

  const screens = [
    new TwoAtomsScreen( { tandem: Tandem.ROOT.createTandem( 'twoAtomsScreen' ) } ),
    new ThreeAtomsScreen( { tandem: Tandem.ROOT.createTandem( 'threeAtomsScreen' ) } ),
    new RealMoleculesScreen( { tandem: Tandem.ROOT.createTandem( 'realMoleculesScreen' ) } )
  ];

  const sim = new Sim( moleculePolarityStrings[ 'molecule-polarity' ].title, screens, {
    preferencesModel: new PreferencesModel( {
      generalOptions: {
        customPreferences: [ {
          createContent: tandem => new MPOptionsNode( { tandem: tandem.createTandem( 'optionsNode' ) } )
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