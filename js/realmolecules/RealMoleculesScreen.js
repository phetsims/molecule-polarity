// Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Real Molecules' screen.
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
  var RealMoleculesModel = require( 'MOLECULE_POLARITY/realmolecules/model/RealMoleculesModel' );
  var RealMoleculesView = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesView' );

  // strings
  var screenTitle = require( 'string!MOLECULE_POLARITY/realMolecules' );

  // images
  var homeIcon = require( 'image!MOLECULE_POLARITY/RealMolecules-home-icon.png' );

  function RealMoleculesScreen() {
    Screen.call( this,
      screenTitle,
      new Image( homeIcon ),
      function() { return new RealMoleculesModel(); },
      function( model ) { return new RealMoleculesView( model ); },
      { backgroundColor: MPColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, RealMoleculesScreen );
} );