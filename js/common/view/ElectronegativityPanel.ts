// Copyright 2014-2025, University of Colorado Boulder

/**
 * Panel with slider control for electronegativity.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import ThreeAtomsViewProperties from '../../threeatoms/view/ThreeAtomsViewProperties.js';
import TwoAtomsViewProperties from '../../twoatoms/view/TwoAtomsViewProperties.js';
import Atom from '../model/Atom.js';
import Molecule from '../model/Molecule.js';
import ElectronegativitySlider from './ElectronegativitySlider.js';

type SelfOptions = {
  // Option passed to ElectroNegativitySlider to invert the mapping of some context responses based on the atom.
  invertMapping?: boolean;
};

type ElectronegativityPanelOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class ElectronegativityPanel extends Panel {

  /**
   * @param atom - the atom whose electronegativity we're controlling
   * @param molecule - molecule that the atom belongs to, for pausing animation while this control is used
   * @param viewProperties - visibility properties that determine whether to emit context responses
   * @param [providedOptions]
   */
  public constructor(
    atom: Atom,
    molecule: Molecule,
    viewProperties: ThreeAtomsViewProperties | TwoAtomsViewProperties,
    providedOptions: ElectronegativityPanelOptions ) {

    const options = optionize<ElectronegativityPanelOptions, SelfOptions, PanelOptions>()( {

      // SelfOptions
      invertMapping: false,

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
    const slider = new ElectronegativitySlider(
      atom,
      molecule.isDraggingProperty,
      {
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