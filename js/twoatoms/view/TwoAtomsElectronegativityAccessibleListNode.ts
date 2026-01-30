// Copyright 2025, University of Colorado Boulder
/**
 * TwoAtomsElectronegativityAccessibleListNode is an accessible list node for the electronegativity information.
 *
 * @author Agustín Vallejo
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleListNode, { AccessibleListNodeOptions } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import DescriptionMaps from '../../common/view/DescriptionMaps.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import DiatomicMolecule from '../model/DiatomicMolecule.js';

type SelfOptions = EmptySelfOptions;

export type TwoAtomsElectronegativityAccessibleListNodeOptions = SelfOptions & AccessibleListNodeOptions;

export default class TwoAtomsElectronegativityAccessibleListNode extends AccessibleListNode {
  public constructor( diatomicMolecule: DiatomicMolecule, providedOptions?: TwoAtomsElectronegativityAccessibleListNodeOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, TwoAtomsElectronegativityAccessibleListNodeOptions>()( {
      leadingParagraphStringProperty: MoleculePolarityFluent.a11y.common.electronegativity.currentValueStringProperty
    }, providedOptions );

    super( [
      {
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.description.createProperty( {
          atom: diatomicMolecule.atomA.label,
          en: DescriptionMaps.createElectronegativityStringProperty( diatomicMolecule.atomA.electronegativityProperty )
        } )
      },
      {
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.description.createProperty( {
          atom: diatomicMolecule.atomB.label,
          en: DescriptionMaps.createElectronegativityStringProperty( diatomicMolecule.atomB.electronegativityProperty )
        } )
      }
    ], options );
  }
}

moleculePolarity.register( 'TwoAtomsElectronegativityAccessibleListNode', TwoAtomsElectronegativityAccessibleListNode );