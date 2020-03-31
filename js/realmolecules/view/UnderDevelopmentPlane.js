// Copyright 2017-2020, University of Colorado Boulder

//TODO Delete when the Real Molecules screen is completed, see https://github.com/phetsims/molecule-polarity/issues/32
/**
 * Used to disable the 'Real Molecules' screen and display a message indicating that it's under development.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Plane from '../../../../scenery/js/nodes/Plane.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Panel from '../../../../sun/js/Panel.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import moleculePolarity from '../../moleculePolarity.js';

// strings
const underDevelopmentLine1String = moleculePolarityStrings.underDevelopment.line1;
const underDevelopmentLine2String = moleculePolarityStrings.underDevelopment.line2;

// constants
const LEGACY_URL = 'https://phet.colorado.edu/en/simulation/legacy/molecule-polarity';

class UnderDevelopmentPlane extends Plane {

  constructor( layoutBounds ) {

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

    super( {
      children: [ panel ],
      fill: 'rgba( 0, 0, 0, 0.2 )',
      pickable: true // blocks interaction with anything behind this Plane
    } );
  }
}

moleculePolarity.register( 'UnderDevelopmentPlane', UnderDevelopmentPlane );

export default UnderDevelopmentPlane;