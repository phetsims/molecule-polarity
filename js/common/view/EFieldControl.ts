// Copyright 2014-2026, University of Colorado Boulder

/**
 * EFieldControl is the control for turning E-field on/off.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ToggleSwitch from '../../../../sun/js/ToggleSwitch.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';

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
    const onOffSwitch = new ToggleSwitch( eFieldEnabledProperty,
      false, true, {
        accessibleName: MoleculePolarityFluent.a11y.common.electricFieldToggle.accessibleNameStringProperty,
        accessibleHelpText: MoleculePolarityFluent.a11y.common.electricFieldToggle.accessibleHelpTextStringProperty,
        trackFillLeft: 'rgb( 180, 180, 180 )',
        trackFillRight: 'rgb( 0, 180, 0 )',
        tandem: options.tandem.createTandem( 'onOffSwitch' ),
        visiblePropertyOptions: {
          phetioFeatured: false
        }
      } );

    options.children = [ titleText, onOffSwitch ];

    super( options );

    eFieldEnabledProperty.lazyLink( enabled => {
      const objectResponse = enabled ?
                             MoleculePolarityFluent.a11y.common.electricFieldToggle.onStringProperty.value :
                             MoleculePolarityFluent.a11y.common.electricFieldToggle.offStringProperty.value;
      this.addAccessibleObjectResponse( objectResponse );
    } );
  }
}

moleculePolarity.register( 'EFieldControl', EFieldControl );