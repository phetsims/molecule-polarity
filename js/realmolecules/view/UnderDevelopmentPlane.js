// Copyright 2017, University of Colorado Boulder

/**
 * Used to disable the 'Real Molecules' screen and display a message indicating that it's under development.
 * This will be deleted when the 3D viewer is implemented, see https://github.com/phetsims/molecule-polarity/issues/15.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Panel = require( 'SUN/Panel' );
  var Plane = require( 'SCENERY/nodes/Plane' );

  // strings
  var underDevelopmentString = require( 'string!MOLECULE_POLARITY/underDevelopment' );

  /**
   * @constructor
   */
  function UnderDevelopmentPlane( layoutBounds ) {

    var textNode = new MultiLineText( underDevelopmentString, {
      font: new PhetFont( 20 ),
      align: 'center'
    } );

    var panel = new Panel( textNode, {
      cornerRadius: 10,
      xMargin: 25,
      yMargin: 50,
      fill: 'white',
      stroke: 'black',
      center: layoutBounds.center
    } );

    Plane.call( this, {
      children: [ panel ],
      fill: 'rgba( 0, 0, 0, 0.2 )',
      pickable: true // blocks interaction with anything behind this Plane
    } );
  }

  moleculePolarity.register( 'UnderDevelopmentPlane', UnderDevelopmentPlane );

  return inherit( Plane, UnderDevelopmentPlane );
} );
