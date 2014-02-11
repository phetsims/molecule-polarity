// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the 'Molecule Polarity' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var RealMoleculesScreen = require( 'MOLECULE_POLARITY/realmolecules/RealMoleculesScreen' );
  var Sim = require( 'JOIST/Sim');
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var ThreeAtomsScreen = require( 'MOLECULE_POLARITY/threeatoms/ThreeAtomsScreen' );
  var TwoAtomsScreen = require( 'MOLECULE_POLARITY/twoatoms/TwoAtomsScreen' );

  // strings
  var simTitle = require( 'string!MOLECULE_POLARITY/molecule-polarity.name' );

  var screens = [ new TwoAtomsScreen(), new ThreeAtomsScreen() ];

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'Chris Malley',
      designTeam: 'Julia Chamberlain, Emily B. Moore, Robert Parson, Kathy Perkins'
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( window.phetcommon.getQueryParameter( 'dev' ) ) {

    screens.push( new RealMoleculesScreen() );

    simOptions = _.extend( {
      // add dev-specific options here
      showHomeScreen: false,
      screenIndex: 2
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, screens, simOptions );
    sim.start();
  } );
} );