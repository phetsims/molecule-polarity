// Copyright 2014-2021, University of Colorado Boulder

/**
 * Main entry point for the 'Molecule Polarity' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import MPOptionsNode from './common/view/MPOptionsNode.js';
import moleculePolarityStrings from './moleculePolarityStrings.js';
import RealMoleculesScreen from './realmolecules/RealMoleculesScreen.js';
import ThreeAtomsScreen from './threeatoms/ThreeAtomsScreen.js';
import TwoAtomsScreen from './twoatoms/TwoAtomsScreen.js';

const options = {

  // Creates content for the Options dialog
  createOptionsDialogContent: tandem => new MPOptionsNode( {
    tandem: tandem
  } ),

  credits: {
    leadDesign: 'Kelly Lancaster',
    softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
    team: 'Julia Chamberlain, Emily B. Moore, Robert Parson, Kathy Perkins, Amy Rouinfar',
    qualityAssurance: 'Steele Dalton, Alex Dornan, Ethan Johnson, Kathryn Woessner'
  }
};

simLauncher.launch( () => {

  const screens = [
    new TwoAtomsScreen( { tandem: Tandem.ROOT.createTandem( 'twoAtomsScreen' ) } ),
    new ThreeAtomsScreen( { tandem: Tandem.ROOT.createTandem( 'threeAtomsScreen' ) } ),
    new RealMoleculesScreen( { tandem: Tandem.ROOT.createTandem( 'realMoleculesScreen' ) } )
  ];

  const sim = new Sim( moleculePolarityStrings[ 'molecule-polarity' ].title, screens, options );
  sim.start();
} );