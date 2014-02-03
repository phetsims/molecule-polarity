// Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Two Atoms' screen.
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
  var TwoAtomsModel = require( 'MOLECULE_POLARITY/twoatoms/TwoAtomsModel' );
  var TwoAtomsView = require( 'MOLECULE_POLARITY/twoatoms/TwoAtomsView' );

  // strings
  var screenTitle = require( 'string!MOLECULE_POLARITY/twoAtoms' );

  // images
  var screenIcon = require( 'image!MOLECULE_POLARITY/TwoAtoms-screen-icon.png' );

  function TwoAtomsScreen() {
    Screen.call( this,
      screenTitle,
      new Image( screenIcon ),
      function() { return new TwoAtomsModel(); },
      function( model ) { return new TwoAtomsView( model ); },
      { backgroundColor: MPColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, TwoAtomsScreen );
} );