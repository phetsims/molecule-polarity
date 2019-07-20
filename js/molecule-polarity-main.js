// Copyright 2014-2017, University of Colorado Boulder

/**
 * Main entry point for the 'Molecule Polarity' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var MPOptionsNode = require( 'MOLECULE_POLARITY/common/view/MPOptionsNode' );
  var RealMoleculesScreen = require( 'MOLECULE_POLARITY/realmolecules/RealMoleculesScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var ThreeAtomsScreen = require( 'MOLECULE_POLARITY/threeatoms/ThreeAtomsScreen' );
  var TwoAtomsScreen = require( 'MOLECULE_POLARITY/twoatoms/TwoAtomsScreen' );

  // strings
  var moleculePolarityTitleString = require( 'string!MOLECULE_POLARITY/molecule-polarity.title' );

  var options = {

    // Creates content for the Options dialog
    createOptionsDialogContent: () => new MPOptionsNode(),

    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Julia Chamberlain, Emily B. Moore, Robert Parson, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Alex Dornan, Ethan Johnson'
    }
  };

  SimLauncher.launch( function() {

    var screens = [
      new TwoAtomsScreen(),
      new ThreeAtomsScreen(),
      new RealMoleculesScreen()
    ];

    var sim = new Sim( moleculePolarityTitleString, screens, options );
    sim.start();
  } );
} );