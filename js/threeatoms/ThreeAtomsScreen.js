// Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var Screen = require( 'JOIST/Screen' );
  var ThreeAtomsModel = require( 'MOLECULE_POLARITY/threeatoms/model/ThreeAtomsModel' );
  var ThreeAtomsView = require( 'MOLECULE_POLARITY/threeatoms/view/ThreeAtomsView' );

  // strings
  var screenTitle = require( 'string!MOLECULE_POLARITY/threeAtoms' );

  // images
  var homeIcon = require( 'image!MOLECULE_POLARITY/ThreeAtoms-home-icon.png' );
  var navigationBarIcon = require( 'image!MOLECULE_POLARITY/ThreeAtoms-navbar-icon.png' );

  function ThreeAtomsScreen() {
    Screen.call( this,
      screenTitle,
      new Image( homeIcon ),
      function() { return new ThreeAtomsModel(); },
      function( model ) { return new ThreeAtomsView( model ); },
      {
        backgroundColor: MPColors.SCREEN_BACKGROUND,
        navigationBarIcon: new Image( navigationBarIcon )
      }
    );
  }

  return inherit( Screen, ThreeAtomsScreen );
} );