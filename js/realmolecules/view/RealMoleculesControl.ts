// Copyright 2014-2023, University of Colorado Boulder

/**
 * Combo box for choosing a real molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import optionize from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, HBoxOptions, Node, RichText, Text } from '../../../../scenery/js/imports.js';
import ComboBox, { ComboBoxItem, ComboBoxOptions } from '../../../../sun/js/ComboBox.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import RealMolecule from '../model/RealMolecule.js';

type SelfOptions = {
  comboBoxOptions?: WithRequired<ComboBoxOptions, 'tandem'>;
};

type RealMoleculesComboBoxOptions = SelfOptions & StrictOmit<HBoxOptions, 'children'>;

export default class RealMoleculesControl extends HBox {

  public constructor( moleculeProperty: Property<RealMolecule>,
                      molecules: RealMolecule[],
                      listParent: Node,
                      provideOptions: RealMoleculesComboBoxOptions ) {

    const options = optionize<RealMoleculesComboBoxOptions, SelfOptions, HBoxOptions>()( {
      spacing: 10,

      comboBoxOptions: {
        tandem: Tandem.REQUIRED,
        listPosition: 'above',
        highlightFill: 'rgb(218,255,255)',
        cornerRadius: 8,
        maxWidth: 450
      }
    }, provideOptions );

    // {ComboBoxItem[]}
    const items = molecules.map( createItem );

    options.children = [
      new Text( MoleculePolarityStrings.moleculeStringProperty, {
        font: new PhetFont( 22 ),
        maxWidth: 150,
        tandem: options.comboBoxOptions.tandem.createTandem( 'labelText' )
      } ),
      new ComboBox( moleculeProperty, items, listParent, options.comboBoxOptions )
    ];

    super( options );
  }
}

/**
 * Creates an item for the combo box.
 */
function createItem( molecule: RealMolecule ): ComboBoxItem<RealMolecule> {

  const stringProperty = new PatternStringProperty( MoleculePolarityStrings.pattern.symbolNameStringProperty, {
    symbol: molecule.symbol,
    name: molecule.fullNameProperty
  } );

  const node = new RichText( stringProperty, {
    maxWidth: 200,
    font: new PhetFont( 18 )
  } );

  return {
    value: molecule,
    createNode: tandem => node,
    tandemName: `${molecule.tandem.name}${ComboBox.ITEM_TANDEM_NAME_SUFFIX}`
  };
}

moleculePolarity.register( 'RealMoleculesControl', RealMoleculesControl );