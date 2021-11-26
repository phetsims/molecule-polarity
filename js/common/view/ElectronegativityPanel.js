// Copyright 2014-2021, University of Colorado Boulder

/**
 * Panel with slider control for electronegativity.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node } from '../../../../scenery/js/imports.js';
import { Text } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
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

    // title
    const titleText = new Text( '', {
      font: new PhetFont( { size: 20, weight: 'bold' } ),
      maxWidth: 150,
      tandem: options.tandem.createTandem( 'titleText' ),
      textPropertyOptions: { phetioReadOnly: true }
    } );

    // subtitle
    const subtitleText = new Text( moleculePolarityStrings.electronegativity, {
      font: new PhetFont( 18 ),
      maxWidth: titleText.maxWidth,
      tandem: options.tandem.createTandem( 'subtitleText' )
    } );

    // slider
    const slider = new ElectronegativitySlider( molecule, atom, {
      tandem: options.tandem.createTandem( 'slider' )
    } );

    const content = new Node( { children: [ titleText, subtitleText, slider ] } );

    // Update the title if the atom's label is changed via PhET-iO.
    atom.labelProperty.link( label => {
      titleText.text = StringUtils.fillIn( moleculePolarityStrings.pattern.atomName, {
        name: atom.labelProperty.value
      } );
    } );

    // layout, handled dynamically because titleText and subtitleText can be changed via PhET-iO
    Property.multilink( [ titleText.boundsProperty, subtitleText.boundsProperty ], () => {
      subtitleText.centerX = slider.centerX = titleText.centerX;
      subtitleText.top = titleText.bottom;
      slider.top = subtitleText.bottom + 8;
    } );

    super( content, options );
  }
}

moleculePolarity.register( 'ElectronegativityPanel', ElectronegativityPanel );
export default ElectronegativityPanel;