// Copyright 2014-2022, University of Colorado Boulder

/**
 * Panel with slider control for electronegativity.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import Atom from '../model/Atom.js';
import Molecule from '../model/Molecule.js';
import ElectronegativitySlider from './ElectronegativitySlider.js';

type SelfOptions = EmptySelfOptions;

export type ElectronegativityPanelOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class ElectronegativityPanel extends Panel {

  /**
   * @param atom - the atom whose electronegativity we're controlling
   * @param molecule - molecule that the atom belongs to, for pausing animation while this control is used
   * @param [providedOptions]
   */
  public constructor( atom: Atom, molecule: Molecule, providedOptions: ElectronegativityPanelOptions ) {

    const options = optionize<ElectronegativityPanelOptions, SelfOptions, PanelOptions>()( {

      // PanelOptions
      fill: atom.color,
      stroke: 'black',
      xMargin: 15,
      yMargin: 6
    }, providedOptions );

    const titleStringProperty = new PatternStringProperty( MoleculePolarityStrings.pattern.atomNameStringProperty, {
      name: atom.labelStringProperty
    }, {
      tandem: options.tandem.createTandem( 'titleStringProperty' ),
      phetioValueType: StringIO
    } );

    // title
    const titleText = new Text( titleStringProperty, {
      font: new PhetFont( { size: 20, weight: 'bold' } ),
      maxWidth: 150,
      tandem: options.tandem.createTandem( 'titleText' ),
      phetioVisiblePropertyInstrumented: false
    } );

    // subtitle
    const subtitleText = new Text( MoleculePolarityStrings.electronegativityStringProperty, {
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

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'ElectronegativityPanel', ElectronegativityPanel );