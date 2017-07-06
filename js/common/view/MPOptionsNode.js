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
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var MPQueryParameters = require( 'MOLECULE_POLARITY/common/MPQueryParameters' );
  var SurfaceColorControl = require( 'MOLECULE_POLARITY/common/view/SurfaceColorControl' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @constructor
   */
  function MPOptionsNode() {

    var children = [
      new DipoleDirectionControl( MPConstants.GLOBAL_OPTIONS.dipoleDirectionProperty )
    ];

    //TODO clean this up when Real Molecules screen is implemented, see #15
    if ( MPQueryParameters.realMolecules ) {
      children.push( new SurfaceColorControl( MPConstants.GLOBAL_OPTIONS.surfaceColorProperty ) );
    }

    VBox.call( this, {
      align: 'left',
      spacing: 25,
      children: children
    } );
  }

  moleculePolarity.register( 'MPOptionsNode', MPOptionsNode );

  return inherit( VBox, MPOptionsNode );
} );
