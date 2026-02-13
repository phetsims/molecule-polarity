// Copyright 2014-2026, University of Colorado Boulder

/**
 * Combo box for choosing a real molecule.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import ChemUtils from '../../../../nitroglycerin/js/ChemUtils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox, { HBoxOptions } from '../../../../scenery/js/layout/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ComboBox, { ComboBoxOptions } from '../../../../sun/js/ComboBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import RealMolecule from '../model/RealMolecule.js';

type SelfOptions = {
  comboBoxOptions?: WithRequired<ComboBoxOptions, 'tandem'>;
};

type RealMoleculesComboBoxOptions = SelfOptions & StrictOmit<HBoxOptions, 'children'>;

export default class RealMoleculesControl extends HBox {

  public constructor(
    moleculeProperty: Property<RealMolecule>,
    molecules: RealMolecule[],
    listParent: Node,
    provideOptions: RealMoleculesComboBoxOptions
  ) {
    const options = optionize<RealMoleculesComboBoxOptions, SelfOptions, HBoxOptions>()( {
      spacing: 10,

      comboBoxOptions: {
        tandem: Tandem.REQUIRED,
        listPosition: 'above',
        highlightFill: 'rgb(218,255,255)',
        cornerRadius: 8,
        buttonTouchAreaXDilation: 15,
        buttonTouchAreaYDilation: 15
      }
    }, provideOptions );

    const comboBox = new ComboBox( moleculeProperty, molecules.map( molecule => {
      return {
        value: molecule,
        // We don't instrument the node, so we can ignore the passed in tandem.
        createNode: () => new RichText( new PatternStringProperty( MoleculePolarityStrings.pattern.symbolNameStringProperty, {
          symbol: ChemUtils.toSubscript( molecule.symbol ),
          name: molecule.fullNameProperty
        }, { tandem: Tandem.OPT_OUT } ), {
          maxWidth: 400,
          font: new PhetFont( 18 )
        } ),
        tandemName: `${molecule.tandem.name}Item`,
        accessibleName: new PatternStringProperty( MoleculePolarityStrings.pattern.symbolNameStringProperty, {
          symbol: molecule.createSpokenSymbolStringProperty(),
          name: molecule.fullNameProperty
        } )
      };
    } ), listParent, options.comboBoxOptions );

    options.children = [
      new Text( MoleculePolarityStrings.moleculeStringProperty, {
        font: new PhetFont( 22 ),
        maxWidth: 150,
        visibleProperty: comboBox.visibleProperty
      } ),
      comboBox
    ];

    super( options );
  }
}

moleculePolarity.register( 'RealMoleculesControl', RealMoleculesControl );