// Copyright 2017-2022, University of Colorado Boulder

/**
 * Control panel for the molecule's surface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';
import SurfaceRadioButtonGroup from './SurfaceRadioButtonGroup.js';
import { SurfaceType } from '../model/SurfaceType.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';

type SelfOptions = EmptySelfOptions;

export type SurfaceControlOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class SurfaceControl extends VBox {

  public constructor( surfaceTypeProperty: StringEnumerationProperty<SurfaceType>,
                      providedOptions: SurfaceControlOptions ) {

    const options = optionize<SurfaceControlOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, providedOptions );

    // title
    const titleText = new Text( moleculePolarityStrings.surfaceStringProperty, merge( {
      tandem: options.tandem.createTandem( 'titleText' ),
      phetioVisiblePropertyInstrumented: false
    }, MPConstants.CONTROL_PANEL_TITLE_OPTIONS ) );

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