// Copyright 2014-2022, University of Colorado Boulder

/**
 * Combo box for choosing a real molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, RichText, Text } from '../../../../scenery/js/imports.js';
import ComboBox, { ComboBoxItem, ComboBoxOptions } from '../../../../sun/js/ComboBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import RealMolecule from '../model/RealMolecule.js';

type SelfOptions = EmptySelfOptions;

export type RealMoleculesComboBoxOptions = SelfOptions & PickRequired<ComboBoxOptions, 'tandem'>;

export default class RealMoleculesComboBox extends ComboBox<RealMolecule> {

  public constructor( moleculeProperty: Property<RealMolecule>,
                      molecules: RealMolecule[],
                      listParent: Node,
                      provideOptions: RealMoleculesComboBoxOptions ) {

    const options = optionize<RealMoleculesComboBoxOptions, SelfOptions, ComboBoxOptions>()( {

      // ComboBoxOptions
      listPosition: 'above',
      highlightFill: 'rgb(218,255,255)',
      cornerRadius: 8,
      maxWidth: 450,
      tandem: Tandem.REQUIRED
    }, provideOptions );

    // label
    options.labelNode = new Text( moleculePolarityStrings.moleculeStringProperty, {
      font: new PhetFont( 22 ),
      maxWidth: 150,
      tandem: options.tandem.createTandem( 'labelNode' ),
      phetioVisiblePropertyInstrumented: false
    } );

    // {ComboBoxItem[]}
    const items = molecules.map( createItem );

    super( moleculeProperty, items, listParent, options );
  }
}

/**
 * Creates an item for the combo box.
 */
function createItem( molecule: RealMolecule ): ComboBoxItem<RealMolecule> {

  //TODO https://github.com/phetsims/molecule-polarity/issues/140 support for dynamic locale
  const text = StringUtils.fillIn( moleculePolarityStrings.pattern.symbolName, {
    symbol: molecule.symbol,
    name: molecule.fullName
  } );

  const node = new RichText( text, {
    maxWidth: 200,
    font: new PhetFont( 18 )
  } );

  return {
    value: molecule,
    node: node,
    tandemName: `${molecule.tandem.name}${ComboBox.ITEM_TANDEM_NAME_SUFFIX}`
  };
}

moleculePolarity.register( 'RealMoleculesComboBox', RealMoleculesComboBox );