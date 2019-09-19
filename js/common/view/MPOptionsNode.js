// Copyright 2015-2017, University of Colorado Boulder

/**
 * Controls for setting global options, accessed via the PhET > Options menu item.
 * This Node serves as the content for a joist.OptionsDialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DipoleDirectionControl = require( 'MOLECULE_POLARITY/common/view/DipoleDirectionControl' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const MPQueryParameters = require( 'MOLECULE_POLARITY/common/MPQueryParameters' );
  const SurfaceColorControl = require( 'MOLECULE_POLARITY/common/view/SurfaceColorControl' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @constructor
   */
  function MPOptionsNode() {

    var dipoleDirectionControl = new DipoleDirectionControl( MPConstants.GLOBAL_OPTIONS.dipoleDirectionProperty );
    var surfaceColorControl = ( new SurfaceColorControl( MPConstants.GLOBAL_OPTIONS.surfaceColorProperty ) );

    var children = [
      dipoleDirectionControl,
      surfaceColorControl
    ];

    //TODO remove the Surface Color option until Real Molecules screen is implemented, see #32
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

  return inherit( VBox, MPOptionsNode, {

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
} );
