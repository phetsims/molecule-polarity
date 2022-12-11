// Copyright 2021-2022, University of Colorado Boulder

/**
 * RealMoleculesControlPanel is the control panel in the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import MPControlPanel, { MPControlPanelOptions } from '../../common/view/MPControlPanel.js';
import SurfaceControl from '../../common/view/SurfaceControl.js';
import moleculePolarity from '../../moleculePolarity.js';
import RealMoleculesViewControls from './RealMoleculesViewControls.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';

type SelfOptions = EmptySelfOptions;

type RealMoleculesControlPanelOptions = SelfOptions & PickRequired<MPControlPanelOptions, 'tandem'>;

export default class RealMoleculesControlPanel extends MPControlPanel {

  public constructor( viewProperties: RealMoleculesViewProperties, providedOptions: RealMoleculesControlPanelOptions ) {

    const options = providedOptions;

    const subPanels = [
      new RealMoleculesViewControls( viewProperties, {
        tandem: options.tandem.createTandem( 'viewControls' )
      } ),
      new SurfaceControl( viewProperties.surfaceTypeProperty, {
        tandem: options.tandem.createTandem( 'surfaceControl' )
      } )
    ];

    super( subPanels, options );
  }
}

moleculePolarity.register( 'RealMoleculesControlPanel', RealMoleculesControlPanel );