// Copyright 2017, University of Colorado Boulder

//TODO Delete when the 3D viewer is implemented, see #15
/**
 * Used to disable the 'Real Molecules' screen and display a message indicating that it's under development.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Panel = require( 'SUN/Panel' );
  var Plane = require( 'SCENERY/nodes/Plane' );
  var RichText = require( 'SCENERY_PHET/RichText' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var underDevelopmentLine1String = require( 'string!MOLECULE_POLARITY/underDevelopment.line1' );
  var underDevelopmentLine2String = require( 'string!MOLECULE_POLARITY/underDevelopment.line2' );

  // constants
  var LEGACY_URL = 'https://phet.colorado.edu/en/simulation/legacy/molecule-polarity';

  /**
   * @constructor
   */
  function UnderDevelopmentPlane( layoutBounds ) {

    var linkText = StringUtils.fillIn( '<a href="{{href}}">{{text}}</a>', {
      href: LEGACY_URL,
      text: LEGACY_URL
    } );

    var vBox = new VBox( {
      align: 'left',
      spacing: 20,
      children: [
        new Text( underDevelopmentLine1String, { font: new PhetFont( 22 ) } ),
        new VBox( {
          align: 'left',
          children: [
            new Text( underDevelopmentLine2String, { font: new PhetFont( 16 ) } ),
            new RichText( linkText, {
              links: true, // allow links in linkText
              font: new PhetFont( 16 )
            } )
          ]
        } )
      ]
    } );

    var panel = new Panel( vBox, {
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
