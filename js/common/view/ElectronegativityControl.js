// Copyright 2014-2020, University of Colorado Boulder

/**
 * Slider control for electronegativity.
 * Dragging the slider continuously updates an atom's electronegativity.
 * When the slider's thumb is released, it snaps to the closest tick mark.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import Atom from '../model/Atom.js';
import Molecule from '../model/Molecule.js';
import ElectronegativitySlider from './ElectronegativitySlider.js';

class ElectronegativityControl extends Panel {

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

    // titles
    const titleText = new Text( StringUtils.fillIn( moleculePolarityStrings.pattern.atomName, { name: atom.name } ), {
      font: new PhetFont( { size: 20, weight: 'bold' } ),
      maxWidth: 150,
      tandem: options.tandem.createTandem( 'titleText' )
    } );
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

    // layout
    subtitleText.centerX = slider.centerX = titleText.centerX;
    subtitleText.top = titleText.bottom;
    slider.top = subtitleText.bottom + 8;

    super( content, options );
  }
}

moleculePolarity.register( 'ElectronegativityControl', ElectronegativityControl );

export default ElectronegativityControl;