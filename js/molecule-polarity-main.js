// Copyright 2014-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Molecule Polarity' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import MPOptionsNode from './common/view/MPOptionsNode.js';
import moleculePolarityStrings from './molecule-polarity-strings.js';
import RealMoleculesScreen from './realmolecules/RealMoleculesScreen.js';
import ThreeAtomsScreen from './threeatoms/ThreeAtomsScreen.js';
import TwoAtomsScreen from './twoatoms/TwoAtomsScreen.js';

// strings
const moleculePolarityTitleString = moleculePolarityStrings[ 'molecule-polarity' ].title;

const options = {

  // Creates content for the Options dialog
  createOptionsDialogContent: () => new MPOptionsNode(),

  credits: {
    leadDesign: 'Kelly Lancaster',
    softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
    team: 'Julia Chamberlain, Emily B. Moore, Robert Parson, Kathy Perkins',
    qualityAssurance: 'Steele Dalton, Alex Dornan, Ethan Johnson'
  }
};

SimLauncher.launch( () => {

  const screens = [
    new TwoAtomsScreen(),
    new ThreeAtomsScreen(),
    new RealMoleculesScreen()
  ];

  const sim = new Sim( moleculePolarityTitleString, screens, options );
  sim.start();
} );