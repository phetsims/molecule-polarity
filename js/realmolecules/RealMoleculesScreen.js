// Copyright 2014-2019, University of Colorado Boulder

/**
 * The 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Image = require( 'SCENERY/nodes/Image' );
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

  class RealMoleculesScreen extends Screen {
    constructor() {

      const options = {
        name: screenRealMoleculesString,
        backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
        homeScreenIcon: new Image( homeIcon ),
        navigationBarIcon: new Image( navigationBarIcon )
      };

      super(
        () => new RealMoleculesModel(),
        model => new RealMoleculesScreenView( model ),
        options
      );
    }
  }

  return moleculePolarity.register( 'RealMoleculesScreen', RealMoleculesScreen );
} );