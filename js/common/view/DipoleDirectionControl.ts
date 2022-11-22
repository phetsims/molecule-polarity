// Copyright 2017-2022, University of Colorado Boulder

/**
 * Dipole direction control that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Text, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';
import DipoleDirectionRadioButtonGroup from './DipoleDirectionRadioButtonGroup.js';
import { DipoleDirection } from '../model/DipoleDirection.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';

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
    const dipoleDirectionText = new Text( MoleculePolarityStrings.dipoleDirectionStringProperty, {
      font: PreferencesDialog.CONTENT_FONT,
      maxWidth: 500,
      tandem: options.tandem.createTandem( 'dipoleDirectionText' )
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