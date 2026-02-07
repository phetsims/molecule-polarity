// Copyright 2021-2026, University of Colorado Boulder

/**
 * RealMoleculesControlPanel is the control panel in the 'Real Molecules' screen.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import MPPreferences from '../../common/model/MPPreferences.js';
import MPControlPanel, { MPControlPanelOptions } from '../../common/view/MPControlPanel.js';
import SurfaceControl from '../../common/view/SurfaceControl.js';
import moleculePolarity from '../../moleculePolarity.js';
import RealMoleculesViewControls from './RealMoleculesViewControls.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import ModelControl from './ModelControl.js';

type SelfOptions = EmptySelfOptions;

type RealMoleculesControlPanelOptions = SelfOptions & PickRequired<MPControlPanelOptions, 'tandem'>;

export default class RealMoleculesControlPanel extends MPControlPanel {

  public constructor(
    isAdvancedProperty: PhetioProperty<boolean>,
    viewProperties: RealMoleculesViewProperties,
    providedOptions: RealMoleculesControlPanelOptions
  ) {

    const options = providedOptions;

    const subPanels = [
      new RealMoleculesViewControls( isAdvancedProperty, viewProperties, {
        tandem: options.tandem.createTandem( 'viewControls' )
      } ),
      new SurfaceControl( viewProperties.surfaceTypeProperty, {
        electrosaticSurfaceColorsProperty: MPPreferences.surfaceColorProperty,
        tandem: options.tandem.createTandem( 'surfaceControl' )
      } ),
      new ModelControl( isAdvancedProperty, {
        tandem: options.tandem.createTandem( 'modelControl' )
      } )
    ];

    super( subPanels, options );
  }
}

moleculePolarity.register( 'RealMoleculesControlPanel', RealMoleculesControlPanel );