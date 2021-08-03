// Copyright 2014-2021, University of Colorado Boulder

/**
 * The 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import merge from '../../../phet-core/js/merge.js';
import Image from '../../../scenery/js/nodes/Image.js';
import Tandem from '../../../tandem/js/Tandem.js';
import homeIcon from '../../images/RealMolecules-home-icon_png.js';
import MPColors from '../common/MPColors.js';
import MPQueryParameters from '../common/MPQueryParameters.js';
import moleculePolarity from '../moleculePolarity.js';
import moleculePolarityStrings from '../moleculePolarityStrings.js';
import RealMoleculesModel from './model/RealMoleculesModel.js';
import RealMoleculesScreenView from './view/RealMoleculesScreenView.js';

class RealMoleculesScreen extends Screen {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      name: moleculePolarityStrings.screen.realMolecules,
      backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon(),
      tandem: Tandem.REQUIRED
    }, options );

    //TODO see https://github.com/phetsims/molecule-polarity/issues/32
    // Until the 'Real Molecules' screen is fully implemented, opt out of PhET-iO instrumentation.
    const parentTandem = ( MPQueryParameters.realMolecules ) ? options.tandem : Tandem.OPT_OUT;

    super(
      () => new RealMoleculesModel( { tandem: parentTandem.createTandem( 'model' ) } ),
      model => new RealMoleculesScreenView( model, { tandem: parentTandem.createTandem( 'view' ) } ),
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