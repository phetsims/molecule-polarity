// Copyright 2021, University of Colorado Boulder

/**
 * RealMoleculesControlPanel is the control panel in the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MPControlPanel from '../../common/view/MPControlPanel.js';
import SurfaceControl from '../../common/view/SurfaceControl.js';
import moleculePolarity from '../../moleculePolarity.js';
import RealMoleculesViewControls from './RealMoleculesViewControls.js';

class RealMoleculesControlPanel extends MPControlPanel {

  /**
   * @param {RealMoleculesViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( viewProperties, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    const subPanels = [
      new RealMoleculesViewControls( viewProperties ),
      new SurfaceControl( viewProperties.surfaceTypeProperty )
    ];

    super( subPanels, options );
  }
}

moleculePolarity.register( 'RealMoleculesControlPanel', RealMoleculesControlPanel );
export default RealMoleculesControlPanel;