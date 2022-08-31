// Copyright 2017-2022, University of Colorado Boulder

/**
 * Dipole direction control that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';
import DipoleDirectionRadioButtonGroup from './DipoleDirectionRadioButtonGroup.js';
import { DipoleDirection } from '../model/DipoleDirection.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

export type DipoleDirectionControlOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class DipoleDirectionControl extends VBox {

  private readonly disposeDipoleDirectionControl: () => void;

  public constructor( dipoleDirectionProperty: StringEnumerationProperty<DipoleDirection>,
                      providedOptions: DipoleDirectionControlOptions ) {

    const options = optionize<DipoleDirectionControlOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    }, providedOptions );

    // title
    const dipoleDirectionText = new Text( moleculePolarityStrings.dipoleDirectionStringProperty, {
      font: new PhetFont( 18 ),
      maxWidth: 500,
      tandem: options.tandem.createTandem( 'dipoleDirectionText' ),
      phetioVisiblePropertyInstrumented: false
    } );

    // Radio button group
    const radioButtonGroup = new DipoleDirectionRadioButtonGroup( dipoleDirectionProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    options.children = [ dipoleDirectionText, radioButtonGroup ];

    super( options );

    this.disposeDipoleDirectionControl = () => {
      dipoleDirectionText.dispose();
      radioButtonGroup.dispose();
    };
  }

  public override dispose(): void {
    this.disposeDipoleDirectionControl();
    super.dispose();
  }
}

moleculePolarity.register( 'DipoleDirectionControl', DipoleDirectionControl );