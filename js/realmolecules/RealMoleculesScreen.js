// Copyright 2014-2020, University of Colorado Boulder

/**
 * The 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import homeIcon from '../../images/RealMolecules-home-icon_png.js';
import MPColors from '../common/MPColors.js';
import moleculePolarity from '../moleculePolarity.js';
import moleculePolarityStrings from '../moleculePolarityStrings.js';
import RealMoleculesModel from './model/RealMoleculesModel.js';
import RealMoleculesScreenView from './view/RealMoleculesScreenView.js';

class RealMoleculesScreen extends Screen {

  constructor() {

    const options = {
      name: moleculePolarityStrings.screen.realMolecules,
      backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon()
    };

    super(
      () => new RealMoleculesModel(),
      model => new RealMoleculesScreenView( model ),
      options
    );
  }
}

/**
 * Creates the screen icon.
 * @returns {ScreenIcon}
 */
function createScreenIcon() {
  return new ScreenIcon( new Image( homeIcon ), {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 1
  } );
}

moleculePolarity.register( 'RealMoleculesScreen', RealMoleculesScreen );
export default RealMoleculesScreen;