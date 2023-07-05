// Copyright 2014-2023, University of Colorado Boulder

/**
 * Panel with slider control for electronegativity.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import Atom from '../model/Atom.js';
import Molecule from '../model/Molecule.js';
import ElectronegativitySlider from './ElectronegativitySlider.js';

type SelfOptions = EmptySelfOptions;

type ElectronegativityPanelOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

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
      yMargin: 6,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      isDisposable: false
    }, providedOptions );

    const titleStringProperty = new PatternStringProperty( MoleculePolarityStrings.pattern.atomNameStringProperty, {
      name: atom.labelStringProperty
    }, {
      tandem: options.tandem.createTandem( Text.STRING_PROPERTY_TANDEM_NAME )
    } );

    // title
    const titleText = new Text( titleStringProperty, {
      font: new PhetFont( { size: 20, weight: 'bold' } ),
      maxWidth: 150
    } );

    // subtitle
    const subtitleText = new Text( MoleculePolarityStrings.electronegativityStringProperty, {
      font: new PhetFont( 18 ),
      maxWidth: titleText.maxWidth
    } );

    const titleVBox = new VBox( {
      children: [ titleText, subtitleText ],
      spacing: 0
    } );

    // slider
    const slider = new ElectronegativitySlider( molecule, atom, {
      tandem: options.tandem.createTandem( 'slider' )
    } );

    const content = new VBox( {
      children: [ titleVBox, slider ],
      spacing: 8
    } );

    super( content, options );
  }
}

moleculePolarity.register( 'ElectronegativityPanel', ElectronegativityPanel );