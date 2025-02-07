// Copyright 2014-2023, University of Colorado Boulder

/**
 * EFieldControl is the control for turning E-field on/off.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Text, { TextOptions } from '../../../../scenery/js/nodes/Text.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';

// constants
const SWITCH_LABEL_OPTIONS = combineOptions<TextOptions>( {}, MPConstants.CONTROL_TEXT_OPTIONS, {
  maxWidth: 80  // i18n, set empirically
} );

type SelfOptions = EmptySelfOptions;

type EFieldControlOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class EFieldControl extends VBox {

  public constructor( eFieldEnabledProperty: Property<boolean>, providedOptions: EFieldControlOptions ) {

    const options = optionize<EFieldControlOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      isDisposable: false
    }, providedOptions );

    // title
    const titleText = new Text( MoleculePolarityStrings.electricFieldStringProperty, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    // on/off switch
    const onOffSwitch = new ABSwitch( eFieldEnabledProperty,
      false, new Text( MoleculePolarityStrings.offStringProperty, SWITCH_LABEL_OPTIONS ),
      true, new Text( MoleculePolarityStrings.onStringProperty, SWITCH_LABEL_OPTIONS ), {
        spacing: 12,
        toggleSwitchOptions: {
          trackFillLeft: 'rgb( 180, 180, 180 )',
          trackFillRight: 'rgb( 0, 180, 0 )',
          visiblePropertyOptions: {
            phetioFeatured: false
          }
        },
        tandem: options.tandem.createTandem( 'onOffSwitch' ),
        visiblePropertyOptions: {
          phetioFeatured: false
        }
      } );

    options.children = [ titleText, onOffSwitch ];

    super( options );
  }
}

moleculePolarity.register( 'EFieldControl', EFieldControl );