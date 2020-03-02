// Copyright 2015-2020, University of Colorado Boulder

/**
 * Controls for setting global options, accessed via the PhET > Options menu item.
 * This Node serves as the content for a joist.OptionsDialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import VBox from '../../../../scenery/js/nodes/VBox.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';
import MPQueryParameters from '../MPQueryParameters.js';
import DipoleDirectionControl from './DipoleDirectionControl.js';
import SurfaceColorControl from './SurfaceColorControl.js';

class MPOptionsNode extends VBox {

  constructor() {

    const dipoleDirectionControl = new DipoleDirectionControl( MPConstants.GLOBAL_OPTIONS.dipoleDirectionProperty );
    const surfaceColorControl = ( new SurfaceColorControl( MPConstants.GLOBAL_OPTIONS.surfaceColorProperty ) );

    const children = [
      dipoleDirectionControl,
      surfaceColorControl
    ];

    //TODO https://github.com/phetsims/molecule-polarity/issues/32 remove the Surface Color option until Real Molecules screen is implemented
    if ( !MPQueryParameters.realMolecules ) {
      children.splice( children.indexOf( surfaceColorControl ), 1 );
    }

    super( {
      align: 'left',
      spacing: 25,
      children: children
    } );

    // @private
    this.disposeMPOptionsNode = () => {
      dipoleDirectionControl.dispose();
      surfaceColorControl.dispose();
    };
  }

  /**
   * NOTE: In the current design of joist, a new instance of OptionsDialog is created every time that
   * the Options menu item is selected from the PhET menu.  But one instance of the dialog's
   * content (in this case MPOptionsNode) is reused. This is (imo) a bad design, and likely to
   * change in the future. So I'm implementing dispose to future-proof this sim.
   * @public
   * @override
   */
  dispose() {
    this.disposeMPOptionsNode();
    super.dispose();
  }
}

moleculePolarity.register( 'MPOptionsNode', MPOptionsNode );

export default MPOptionsNode;