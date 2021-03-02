// Copyright 2021, University of Colorado Boulder

/**
 * TwoAtomsControlPanel is the control panel in the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EFieldControl from '../../common/view/EFieldControl.js';
import MPControlPanel from '../../common/view/MPControlPanel.js';
import SurfaceControl from '../../common/view/SurfaceControl.js';
import moleculePolarity from '../../moleculePolarity.js';
import TwoAtomsViewControls from './TwoAtomsViewControls.js';

class TwoAtomsControlPanel extends MPControlPanel {

  /**
   * @param {TwoAtomsViewProperties} viewProperties
   * @param {Property.<boolean>} eFieldEnabledProperty
   * @param {Object} [options]
   */
  constructor( viewProperties, eFieldEnabledProperty, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

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
export default TwoAtomsControlPanel;