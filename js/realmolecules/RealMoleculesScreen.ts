// Copyright 2014-2026, University of Colorado Boulder

/**
 * The 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import Tandem from '../../../tandem/js/Tandem.js';
import realMoleculesScreenIcon_png from '../../images/realMoleculesScreenIcon_png.js';
import MPColors from '../common/MPColors.js';
import moleculePolarity from '../moleculePolarity.js';
import MoleculePolarityFluent from '../MoleculePolarityFluent.js';
import RealMoleculesModel from './model/RealMoleculesModel.js';
import RealMoleculesScreenView from './view/RealMoleculesScreenView.js';
import RealMoleculesKeyboardHelpContent from './view/RealMoleculesKeyboardHelpContent.js';

export default class RealMoleculesScreen extends Screen<RealMoleculesModel, RealMoleculesScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {
      name: MoleculePolarityFluent.screen.realMoleculesStringProperty,
      backgroundColorProperty: MPColors.screenBackgroundColorProperty,
      homeScreenIcon: createScreenIcon(),
      screenButtonsHelpText: MoleculePolarityFluent.a11y.common.screenIcons.realMoleculesStringProperty,
      createKeyboardHelpNode: () => new RealMoleculesKeyboardHelpContent(),
      tandem: tandem
    };

    super(
      () => new RealMoleculesModel( tandem.createTandem( 'model' ) ),
      model => new RealMoleculesScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

/**
 * Creates the screen icon.
 */
function createScreenIcon(): ScreenIcon {
  return new ScreenIcon( new Image( realMoleculesScreenIcon_png ), {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 1
  } );
}

moleculePolarity.register( 'RealMoleculesScreen', RealMoleculesScreen );