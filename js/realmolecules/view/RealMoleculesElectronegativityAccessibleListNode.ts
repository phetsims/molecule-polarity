// Copyright 2025, University of Colorado Boulder
/**
 * RealMoleculesElectronegativityAccessibleListNode is an accessible list node for the electronegativity information.
 *
 * @author Agustín Vallejo
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import Element from '../../../../nitroglycerin/js/Element.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleListNode, { AccessibleListNodeOptions } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import RealMolecule from '../model/RealMolecule.js';

type SelfOptions = EmptySelfOptions;

export type RealMoleculesElectronegativityAccessibleListNodeOptions = SelfOptions & AccessibleListNodeOptions;

export default class RealMoleculesElectronegativityAccessibleListNode extends AccessibleListNode {
  public constructor( realMoleculeProperty: TReadOnlyProperty<RealMolecule>, providedOptions?: RealMoleculesElectronegativityAccessibleListNodeOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, RealMoleculesElectronegativityAccessibleListNodeOptions>()( {
      leadingParagraphStringProperty: MoleculePolarityFluent.a11y.common.electronegativity.currentValueStringProperty
    }, providedOptions );

    super( [
      {
        visibleProperty: realMoleculeProperty.derived(
          molecule => molecule.atoms.map( atom => atom.element ).includes( Element.H ) ),
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.symbolDescription.createProperty( {
          symbol: 'H',
          en: toFixed( 2.1, 1 )
        } )
      },
      {
        visibleProperty: realMoleculeProperty.derived(
          molecule => molecule.atoms.map( atom => atom.element ).includes( Element.B ) ),
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.symbolDescription.createProperty( {
          symbol: 'B',
          en: toFixed( 2.0, 1 )
        } )
      },
      {
        visibleProperty: realMoleculeProperty.derived(
          molecule => molecule.atoms.map( atom => atom.element ).includes( Element.C ) ),
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.symbolDescription.createProperty( {
          symbol: 'C',
          en: toFixed( 2.5, 1 )
        } )
      },
      {
        visibleProperty: realMoleculeProperty.derived(
          molecule => molecule.atoms.map( atom => atom.element ).includes( Element.N ) ),
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.symbolDescription.createProperty( {
          symbol: 'N',
          en: toFixed( 3.0, 1 )
        } )
      },
      {
        visibleProperty: realMoleculeProperty.derived(
          molecule => molecule.atoms.map( atom => atom.element ).includes( Element.O ) ),
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.symbolDescription.createProperty( {
          symbol: 'O',
          en: toFixed( 3.5, 1 )
        } )
      },
      {
        visibleProperty: realMoleculeProperty.derived(
          molecule => molecule.atoms.map( atom => atom.element ).includes( Element.F ) ),
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.symbolDescription.createProperty( {
          symbol: 'F',
          en: toFixed( 4.0, 1 )
        } )
      },
      {
        visibleProperty: realMoleculeProperty.derived(
          molecule => molecule.atoms.map( atom => atom.element ).includes( Element.Cl ) ),
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.symbolDescription.createProperty( {
          symbol: 'Cl',
          en: toFixed( 3.0, 1 )
        } )
      }
    ], options );
  }
}

moleculePolarity.register( 'RealMoleculesElectronegativityAccessibleListNode', RealMoleculesElectronegativityAccessibleListNode );