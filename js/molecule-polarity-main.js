// Copyright 2014-2019, University of Colorado Boulder

/**
 * Main entry point for the 'Molecule Polarity' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const MPOptionsNode = require( 'MOLECULE_POLARITY/common/view/MPOptionsNode' );
  const RealMoleculesScreen = require( 'MOLECULE_POLARITY/realmolecules/RealMoleculesScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const ThreeAtomsScreen = require( 'MOLECULE_POLARITY/threeatoms/ThreeAtomsScreen' );
  const TwoAtomsScreen = require( 'MOLECULE_POLARITY/twoatoms/TwoAtomsScreen' );

  // strings
  const moleculePolarityTitleString = require( 'string!MOLECULE_POLARITY/molecule-polarity.title' );

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
} );