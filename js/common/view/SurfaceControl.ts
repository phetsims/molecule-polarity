// Copyright 2017-2022, University of Colorado Boulder

/**
 * Control panel for the molecule's surface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text, TextOptions, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';
import SurfaceRadioButtonGroup from './SurfaceRadioButtonGroup.js';
import { SurfaceType } from '../model/SurfaceType.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';

type SelfOptions = EmptySelfOptions;

type SurfaceControlOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class SurfaceControl extends VBox {

  public constructor( surfaceTypeProperty: StringUnionProperty<SurfaceType>,
                      providedOptions: SurfaceControlOptions ) {

    const options = optionize<SurfaceControlOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    }, providedOptions );

    // title
    const titleText = new Text( MoleculePolarityStrings.surfaceStringProperty, combineOptions<TextOptions>(
      {}, MPConstants.CONTROL_PANEL_TITLE_OPTIONS, {
        tandem: options.tandem.createTandem( 'titleText' )
      } ) );

    // Radio button group
    const radioButtonGroup = new SurfaceRadioButtonGroup( surfaceTypeProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    options.children = [ titleText, radioButtonGroup ];

    super( options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'SurfaceControl', SurfaceControl );