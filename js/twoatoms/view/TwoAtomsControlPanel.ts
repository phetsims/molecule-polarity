// Copyright 2021-2022, University of Colorado Boulder

/**
 * TwoAtomsControlPanel is the control panel in the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import EFieldControl from '../../common/view/EFieldControl.js';
import MPControlPanel, { MPControlPanelOptions } from '../../common/view/MPControlPanel.js';
import SurfaceControl from '../../common/view/SurfaceControl.js';
import moleculePolarity from '../../moleculePolarity.js';
import TwoAtomsViewControls from './TwoAtomsViewControls.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';

type SelfOptions = EmptySelfOptions;

type TwoAtomsControlPanelOptions = SelfOptions & PickRequired<MPControlPanelOptions, 'tandem'>;

export default class TwoAtomsControlPanel extends MPControlPanel {

  public constructor( viewProperties: TwoAtomsViewProperties,
                      eFieldEnabledProperty: Property<boolean>,
                      providedOptions: TwoAtomsControlPanelOptions ) {

    const options = providedOptions;

    const subPanels = [
      new TwoAtomsViewControls( viewProperties, {
        tandem: options.tandem.createTandem( 'viewControls' )
      } ),
      new SurfaceControl( viewProperties.surfaceTypeProperty, {
        tandem: options.tandem.createTandem( 'surfaceControl' )
      } ),
      new EFieldControl( eFieldEnabledProperty, {
        tandem: options.tandem.createTandem( 'eFieldControl' )
      } )
    ];

    super( subPanels, options );
  }
}

moleculePolarity.register( 'TwoAtomsControlPanel', TwoAtomsControlPanel );