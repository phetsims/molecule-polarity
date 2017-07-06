// Copyright 2015-2017, University of Colorado Boulder

/**
 * Controls for setting global options, accessed via the PhET > Options menu item.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DipoleDirectionControl = require( 'MOLECULE_POLARITY/common/view/DipoleDirectionControl' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var SurfaceColorControl = require( 'MOLECULE_POLARITY/common/view/SurfaceColorControl' );

  /**
   * @constructor
   */
  function MPOptionsNode() {

    LayoutBox.call( this, {
      orientation: 'vertical',
      align: 'left',
      spacing: 25,
      children: [
        new DipoleDirectionControl( MPConstants.GLOBAL_OPTIONS.dipoleDirectionProperty ),
        new SurfaceColorControl( MPConstants.GLOBAL_OPTIONS.surfaceColorProperty )
      ]
    } );
  }

  moleculePolarity.register( 'MPOptionsNode', MPOptionsNode );

  return inherit( LayoutBox, MPOptionsNode );
} );
