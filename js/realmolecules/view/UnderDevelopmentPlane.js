// Copyright 2017-2019, University of Colorado Boulder

//TODO Delete when the Real Molecules screen is completed, see https://github.com/phetsims/molecule-polarity/issues/32
/**
 * Used to disable the 'Real Molecules' screen and display a message indicating that it's under development.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Plane = require( 'SCENERY/nodes/Plane' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const underDevelopmentLine1String = require( 'string!MOLECULE_POLARITY/underDevelopment.line1' );
  const underDevelopmentLine2String = require( 'string!MOLECULE_POLARITY/underDevelopment.line2' );

  // constants
  const LEGACY_URL = 'https://phet.colorado.edu/en/simulation/legacy/molecule-polarity';

  /**
   * @constructor
   */
  function UnderDevelopmentPlane( layoutBounds ) {

    const linkText = StringUtils.fillIn( '<a href="{{href}}">{{text}}</a>', {
      href: LEGACY_URL,
      text: LEGACY_URL
    } );

    const maxTextWidth = 0.75 * layoutBounds.width;

    const vBox = new VBox( {
      align: 'left',
      spacing: 20,
      children: [
        new Text( underDevelopmentLine1String, {
          font: new PhetFont( 22 ),
          maxWidth: maxTextWidth
        } ),
        new VBox( {
          align: 'left',
          children: [
            new Text( underDevelopmentLine2String, {
              font: new PhetFont( 16 ),
              maxWidth: maxTextWidth
            } ),
            new RichText( linkText, {
              links: true, // allow links in linkText
              font: new PhetFont( 16 ),
              maxWidth: maxTextWidth
            } )
          ]
        } )
      ]
    } );

    const panel = new Panel( vBox, {
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
