// Copyright 2015-2022, University of Colorado Boulder

/**
 * Control for selecting surface color that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';
import SurfaceColorRadioButtonGroup from './SurfaceColorRadioButtonGroup.js';
import { SurfaceColor } from '../model/SurfaceColor.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

export type SurfaceColorControlOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class SurfaceColorControl extends VBox {

  private readonly disposeSurfaceColorControl: () => void;

  public constructor( surfaceColorProperty: StringEnumerationProperty<SurfaceColor>,
                      providedOptions: SurfaceColorControlOptions ) {

    const options = optionize<SurfaceColorControlOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    }, providedOptions );

    const titleText = new Text( MoleculePolarityStrings.surfaceColorRealMoleculesStringProperty, {
      font: new PhetFont( 14 ),
      maxWidth: 400,
      tandem: options.tandem.createTandem( 'titleText' ),
      phetioVisiblePropertyInstrumented: false
    } );

    const radioButtonGroup = new SurfaceColorRadioButtonGroup( surfaceColorProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    options.children = [ titleText, radioButtonGroup ];

    super( options );

    this.disposeSurfaceColorControl = () => {
      titleText.dispose();
      radioButtonGroup.dispose();
    };
  }

  public override dispose(): void {
    this.disposeSurfaceColorControl();
    super.dispose();
  }
}

moleculePolarity.register( 'SurfaceColorControl', SurfaceColorControl );