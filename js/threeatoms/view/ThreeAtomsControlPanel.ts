// Copyright 2021-2022, University of Colorado Boulder

/**
 * ThreeAtomsControlPanel is the control panel in the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import EFieldControl from '../../common/view/EFieldControl.js';
import MPControlPanel, { MPControlPanelOptions } from '../../common/view/MPControlPanel.js';
import moleculePolarity from '../../moleculePolarity.js';
import ThreeAtomsViewControls from './ThreeAtomsViewControls.js';
import ThreeAtomsViewProperties from './ThreeAtomsViewProperties.js';

type SelfOptions = EmptySelfOptions;

type ThreeAtomsControlPanelOptions = SelfOptions & PickRequired<MPControlPanelOptions, 'tandem'>;

export default class ThreeAtomsControlPanel extends MPControlPanel {

  public constructor( viewProperties: ThreeAtomsViewProperties,
                      eFieldEnabledProperty: Property<boolean>,
                      providedOptions: ThreeAtomsControlPanelOptions ) {

    const options = providedOptions;

    const subPanels = [
      new ThreeAtomsViewControls( viewProperties, {
        tandem: options.tandem.createTandem( 'viewControls' )
      } ),
      new EFieldControl( eFieldEnabledProperty, {
        tandem: options.tandem.createTandem( 'eFieldControl' )
      } )
    ];

    super( subPanels, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'ThreeAtomsControlPanel', ThreeAtomsControlPanel );