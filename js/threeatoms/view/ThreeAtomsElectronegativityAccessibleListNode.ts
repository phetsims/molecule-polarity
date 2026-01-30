// Copyright 2025, University of Colorado Boulder
/**
 * ThreeAtomsElectronegativityAccessibleListNode is an accessible list node for the electronegativity information.
 *
 * @author Agustín Vallejo
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleListNode, { AccessibleListNodeOptions } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import DescriptionMaps from '../../common/view/DescriptionMaps.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import TriatomicMolecule from '../model/TriatomicMolecule.js';

type SelfOptions = EmptySelfOptions;

export type ThreeAtomsElectronegativityAccessibleListNodeOptions = SelfOptions & AccessibleListNodeOptions;

export default class ThreeAtomsElectronegativityAccessibleListNode extends AccessibleListNode {
  public constructor( triatomicMolecule: TriatomicMolecule, providedOptions?: ThreeAtomsElectronegativityAccessibleListNodeOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, ThreeAtomsElectronegativityAccessibleListNodeOptions>()( {
      leadingParagraphStringProperty: MoleculePolarityFluent.a11y.common.electronegativity.currentValueStringProperty
    }, providedOptions );

    super( [
      {
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.description.createProperty( {
          atom: triatomicMolecule.atomA.label,
          en: DescriptionMaps.createElectronegativityStringProperty( triatomicMolecule.atomA.electronegativityProperty )
        } )
      },
      {
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.description.createProperty( {
          atom: triatomicMolecule.atomB.label,
          en: DescriptionMaps.createElectronegativityStringProperty( triatomicMolecule.atomB.electronegativityProperty )
        } )
      },
      {
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.description.createProperty( {
          atom: triatomicMolecule.atomC.label,
          en: DescriptionMaps.createElectronegativityStringProperty( triatomicMolecule.atomC.electronegativityProperty )
        } )
      }
    ], options );
  }
}

moleculePolarity.register( 'ThreeAtomsElectronegativityAccessibleListNode', ThreeAtomsElectronegativityAccessibleListNode );