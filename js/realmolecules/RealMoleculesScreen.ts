// Copyright 2014-2023, University of Colorado Boulder

/**
 * The 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import realMoleculesScreenIcon_png from '../../images/realMoleculesScreenIcon_png.js';
import MPColors from '../common/MPColors.js';
import MPQueryParameters from '../common/MPQueryParameters.js';
import moleculePolarity from '../moleculePolarity.js';
import MoleculePolarityStrings from '../MoleculePolarityStrings.js';
import RealMoleculesModel from './model/RealMoleculesModel.js';
import RealMoleculesScreenView from './view/RealMoleculesScreenView.js';

export default class RealMoleculesScreen extends Screen<RealMoleculesModel, RealMoleculesScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {
      name: MoleculePolarityStrings.screen.realMoleculesStringProperty,
      backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon(),
      tandem: tandem
    };

    //TODO see https://github.com/phetsims/molecule-polarity/issues/32
    // Until the 'Real Molecules' screen is fully implemented, opt out of PhET-iO instrumentation.
    // In the meantime, support testing via the realMolecules query parameter.
    const parentTandem = ( MPQueryParameters.realMolecules ) ? options.tandem : Tandem.OPT_OUT;

    super(
      () => new RealMoleculesModel( parentTandem.createTandem( 'model' ) ),
      model => new RealMoleculesScreenView( model, parentTandem.createTandem( 'view' ) ),
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