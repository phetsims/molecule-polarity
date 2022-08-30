// Copyright 2014-2022, University of Colorado Boulder

/**
 * Panel with slider control for electronegativity.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import Atom from '../model/Atom.js';
import Molecule from '../model/Molecule.js';
import ElectronegativitySlider from './ElectronegativitySlider.js';

class ElectronegativityPanel extends Panel {

  /**
   * @param {Atom} atom - the atom whose electronegativity we're controlling
   * @param {Molecule} molecule - molecule that the atom belongs to, for pausing animation while this control is used
   * @param {Object} [options]
   */
  constructor( atom, molecule, options ) {
    assert && assert( atom instanceof Atom, 'invalid atom' );
    assert && assert( molecule instanceof Molecule, 'invalid molecule' );

    options = merge( {

      // Panel
      fill: atom.color,
      stroke: 'black',
      xMargin: 15,
      yMargin: 6,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    const titleStringProperty = new DerivedProperty(
      [ atom.labelProperty, moleculePolarityStrings.pattern.atomNameStringProperty ],
      ( atomLabel, patternString ) => StringUtils.fillIn( patternString, {
        name: atomLabel
      } ), {
        tandem: options.tandem.createTandem( 'titleStringProperty' ),
        phetioValueType: StringIO
      } );

    // title
    const titleText = new Text( titleStringProperty, {
      font: new PhetFont( { size: 20, weight: 'bold' } ),
      maxWidth: 150,
      tandem: options.tandem.createTandem( 'titleText' ),
      textPropertyOptions: { phetioReadOnly: true }
    } );

    // subtitle
    const subtitleText = new Text( moleculePolarityStrings.electronegativityStringProperty, {
      font: new PhetFont( 18 ),
      maxWidth: titleText.maxWidth,
      tandem: options.tandem.createTandem( 'subtitleText' ),
      phetioVisiblePropertyInstrumented: false
    } );

    // slider
    const slider = new ElectronegativitySlider( molecule, atom, {
      tandem: options.tandem.createTandem( 'slider' )
    } );

    const content = new Node( { children: [ titleText, subtitleText, slider ] } );

    // layout, handled dynamically because titleText and subtitleText can be changed via PhET-iO
    Multilink.multilink( [ titleText.boundsProperty, subtitleText.boundsProperty ], () => {
      subtitleText.centerX = slider.centerX = titleText.centerX;
      subtitleText.top = titleText.bottom;
      slider.top = subtitleText.bottom + 8;
    } );

    super( content, options );
  }
}

moleculePolarity.register( 'ElectronegativityPanel', ElectronegativityPanel );
export default ElectronegativityPanel;