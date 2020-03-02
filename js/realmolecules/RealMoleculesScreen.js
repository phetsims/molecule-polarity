// Copyright 2014-2020, University of Colorado Boulder

/**
 * The 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import Image from '../../../scenery/js/nodes/Image.js';
import homeIcon from '../../images/RealMolecules-home-icon_png.js';
import navigationBarIcon from '../../images/RealMolecules-navbar-icon_png.js';
import MPColors from '../common/MPColors.js';
import moleculePolarityStrings from '../molecule-polarity-strings.js';
import moleculePolarity from '../moleculePolarity.js';
import RealMoleculesModel from './model/RealMoleculesModel.js';
import RealMoleculesScreenView from './view/RealMoleculesScreenView.js';

// strings
const screenRealMoleculesString = moleculePolarityStrings.screen.realMolecules;

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

moleculePolarity.register( 'RealMoleculesScreen', RealMoleculesScreen );
export default RealMoleculesScreen;