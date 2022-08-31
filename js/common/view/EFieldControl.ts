// Copyright 2014-2022, University of Colorado Boulder

/**
 * EFieldControl is the control for turning E-field on/off.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Text, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';

// constants
const SWITCH_LABEL_OPTIONS = merge( {}, MPConstants.CONTROL_TEXT_OPTIONS, {
  maxWidth: 80  // i18n, set empirically
} );

type SelfOptions = EmptySelfOptions;

export type EFieldControlOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class EFieldControl extends VBox {

  public constructor( eFieldEnabledProperty: Property<boolean>, providedOptions: EFieldControlOptions ) {

    const options = optionize<EFieldControlOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    }, providedOptions );

    // title
    const titleText = new Text( moleculePolarityStrings.electricFieldStringProperty, merge( {
      tandem: options.tandem.createTandem( 'titleText' ),
      phetioVisiblePropertyInstrumented: false
    }, MPConstants.CONTROL_PANEL_TITLE_OPTIONS ) );

    // on/off switch
    const onOffSwitch = new ABSwitch( eFieldEnabledProperty,
      false, new Text( moleculePolarityStrings.offStringProperty, SWITCH_LABEL_OPTIONS ),
      true, new Text( moleculePolarityStrings.onStringProperty, SWITCH_LABEL_OPTIONS ), {
        spacing: 12,
        toggleSwitchOptions: {
          trackFillLeft: 'rgb( 180, 180, 180 )',
          trackFillRight: 'rgb( 0, 180, 0 )'
        },
        tandem: options.tandem.createTandem( 'onOffSwitch' )
      } );

    options.children = [ titleText, onOffSwitch ];

    super( options );
  }
}

moleculePolarity.register( 'EFieldControl', EFieldControl );