// Copyright 2021, University of Colorado Boulder

/**
 * ThreeAtomsControlPanel is the control panel in the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EFieldControl from '../../common/view/EFieldControl.js';
import MPControlPanel from '../../common/view/MPControlPanel.js';
import moleculePolarity from '../../moleculePolarity.js';
import ThreeAtomsViewControls from './ThreeAtomsViewControls.js';

class ThreeAtomsControlPanel extends MPControlPanel {

  /**
   * @param {ThreeAtomsViewProperties} viewProperties
   * @param {Property.<boolean>} eFieldEnabledProperty
   * @param {Object} [options]
   */
  constructor( viewProperties, eFieldEnabledProperty, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

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
}

moleculePolarity.register( 'ThreeAtomsControlPanel', ThreeAtomsControlPanel );
export default ThreeAtomsControlPanel;