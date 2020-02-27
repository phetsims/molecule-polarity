// Copyright 2015-2019, University of Colorado Boulder

/**
 * Controls for setting global options, accessed via the PhET > Options menu item.
 * This Node serves as the content for a joist.OptionsDialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';
import MPQueryParameters from '../MPQueryParameters.js';
import DipoleDirectionControl from './DipoleDirectionControl.js';
import SurfaceColorControl from './SurfaceColorControl.js';

/**
 * @constructor
 */
function MPOptionsNode() {

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

  VBox.call( this, {
    align: 'left',
    spacing: 25,
    children: children
  } );

  // @private
  this.disposeMPOptionsNode = function() {
    dipoleDirectionControl.dispose();
    surfaceColorControl.dispose();
  };
}

moleculePolarity.register( 'MPOptionsNode', MPOptionsNode );

export default inherit( VBox, MPOptionsNode, {

  /**
   * NOTE: In the current design of joist, a new instance of OptionsDialog is every time that
   * the Options menu item is selected from the PhET menu.  But one instance of the dialog's
   * content (in this case MPOptionsNode) is reused. This is (imo) a bad design, and likely to
   * change in the future. So I'm implementing dispose to future-proof this sim.
   * @public
   */
  dispose: function() {
    this.disposeMPOptionsNode();
    VBox.prototype.dispose.call( this );
  }
} );