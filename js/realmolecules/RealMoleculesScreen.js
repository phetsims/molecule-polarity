// Copyright 2014-2017, University of Colorado Boulder

/**
 * The 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  const Property = require( 'AXON/Property' );
  const RealMoleculesModel = require( 'MOLECULE_POLARITY/realmolecules/model/RealMoleculesModel' );
  const RealMoleculesScreenView = require( 'MOLECULE_POLARITY/realmolecules/view/RealMoleculesScreenView' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenRealMoleculesString = require( 'string!MOLECULE_POLARITY/screen.realMolecules' );

  // images
  const homeIcon = require( 'image!MOLECULE_POLARITY/RealMolecules-home-icon.png' );
  const navigationBarIcon = require( 'image!MOLECULE_POLARITY/RealMolecules-navbar-icon.png' );

  /**
   * @constructor
   */
  function RealMoleculesScreen() {

    const options = {
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