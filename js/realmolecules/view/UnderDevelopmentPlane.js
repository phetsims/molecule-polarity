// Copyright 2017-2021, University of Colorado Boulder

//TODO Delete when the Real Molecules screen is completed, see https://github.com/phetsims/molecule-polarity/issues/32
/**
 * Used to disable the 'Real Molecules' screen and display a message indicating that it's under development.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Plane, RichText, Text, VBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';

// constants
const LEGACY_URL = 'https://phet.colorado.edu/en/simulation/legacy/molecule-polarity';

class UnderDevelopmentPlane extends Plane {

  /**
   * @param {Bounds2} layoutBounds
   */
  constructor( layoutBounds ) {
    assert && assert( layoutBounds instanceof Bounds2, 'invalid layoutBounds' );

    const urlString = phet.chipper.queryParameters.allowLinks ?
                      StringUtils.fillIn( '<a href="{{href}}">{{text}}</a>', {
                        href: LEGACY_URL,
                        text: LEGACY_URL
                      } ) :
                      LEGACY_URL;

    const maxTextWidth = 0.75 * layoutBounds.width;

    const vBox = new VBox( {
      align: 'left',
      spacing: 20,
      children: [
        new Text( moleculePolarityStrings.underDevelopment.line1, {
          font: new PhetFont( 22 ),
          maxWidth: maxTextWidth
        } ),
        new VBox( {
          align: 'left',
          children: [
            new Text( moleculePolarityStrings.underDevelopment.line2, {
              font: new PhetFont( 16 ),
              maxWidth: maxTextWidth
            } ),
            new RichText( urlString, {
              links: true,
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