// Copyright 2014-2017, University of Colorado Boulder

/**
 * The 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var RealMoleculesModel = require( 'MOLECULE_POLARITY/realmolecules/model/RealMoleculesModel' );
  var RealMoleculesScreenView = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesScreenView' );

  // strings
  var screenRealMoleculesString = require( 'string!MOLECULE_POLARITY/screen.realMolecules' );

  // images
  var homeIcon = require( 'image!MOLECULE_POLARITY/RealMolecules-home-icon.png' );
  var navigationBarIcon = require( 'image!MOLECULE_POLARITY/RealMolecules-navbar-icon.png' );

  /**
   * @constructor
   */
  function RealMoleculesScreen() {

    var options = {
      name: screenRealMoleculesString,
      backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
      homeScreenIcon: new Image( homeIcon ),
      navigationBarIcon: new Image( navigationBarIcon )
    };

    Screen.call( this,
      function() { return new RealMoleculesModel(); },
      function( model ) { return new RealMoleculesScreenView( model ); },
      options );
  }

  moleculePolarity.register( 'RealMoleculesScreen', RealMoleculesScreen );

  return inherit( Screen, RealMoleculesScreen );
} );