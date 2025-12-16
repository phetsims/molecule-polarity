// Copyright 2017-2025, University of Colorado Boulder

/**
 * Control panel for the molecule's surface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import { SurfaceType } from '../model/SurfaceType.js';
import MPConstants from '../MPConstants.js';
import SurfaceRadioButtonGroup, { ElectrostaticSurfaceColors } from './SurfaceRadioButtonGroup.js';

type SelfOptions = {

  // Color map used for the electrostatic surface, to be passed to SurfaceRadioButtonGroup
  electrosaticSurfaceColors?: ElectrostaticSurfaceColors;
};

type SurfaceControlOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class SurfaceControl extends VBox {

  public constructor( surfaceTypeProperty: StringUnionProperty<SurfaceType>,
                      providedOptions: SurfaceControlOptions ) {

    const options = optionize<SurfaceControlOptions, SelfOptions, VBoxOptions>()( {

      // Self otpions
      electrosaticSurfaceColors: 'blueWhiteRed',

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      isDisposable: false
    }, providedOptions );

    // title
    const titleText = new Text( MoleculePolarityStrings.surfaceStringProperty, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // Radio button group
    const radioButtonGroup = new SurfaceRadioButtonGroup( surfaceTypeProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' ),
      electrosaticSurfaceColors: options.electrosaticSurfaceColors
    } );

    options.children = [ titleText, radioButtonGroup ];

    super( options );
  }
}

moleculePolarity.register( 'SurfaceControl', SurfaceControl );