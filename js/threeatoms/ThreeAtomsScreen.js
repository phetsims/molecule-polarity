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
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var Screen = require( 'JOIST/Screen' );
  var ThreeAtomsModel = require( 'MOLECULE_POLARITY/threeatoms/ThreeAtomsModel' );
  var ThreeAtomsView = require( 'MOLECULE_POLARITY/threeatoms/ThreeAtomsView' );

  // strings
  var screenTitle = require( 'string!MOLECULE_POLARITY/threeAtoms' );

  // images
  var screenIcon = require( 'image!MOLECULE_POLARITY/ThreeAtoms-screen-icon.png' );

  function ThreeAtomsScreen() {
    Screen.call( this,
      screenTitle,
      new Image( screenIcon ),
      function() { return new ThreeAtomsModel(); },
      function( model ) { return new ThreeAtomsView( model, ModelViewTransform2.createIdentity() ); },
      { backgroundColor: MPColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, ThreeAtomsScreen );
} );