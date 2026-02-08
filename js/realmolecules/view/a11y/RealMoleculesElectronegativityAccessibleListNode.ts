// Copyright 2026, University of Colorado Boulder

/**
 * RealMoleculesElectronegativityAccessibleListNode is an accessible list node for the electronegativity information.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Agustín Vallejo
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { toFixed } from '../../../../../dot/js/util/toFixed.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import AccessibleListNode, { AccessibleListNodeOptions } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import moleculePolarity from '../../../moleculePolarity.js';
import MoleculePolarityFluent from '../../../MoleculePolarityFluent.js';
import RealMolecule from '../../model/RealMolecule.js';
import { RealAtom } from '../../model/RealAtom.js';

type SelfOptions = EmptySelfOptions;

export type RealMoleculesElectronegativityAccessibleListNodeOptions = SelfOptions & AccessibleListNodeOptions;

export default class RealMoleculesElectronegativityAccessibleListNode extends AccessibleListNode {
  public constructor( realMoleculeProperty: TReadOnlyProperty<RealMolecule>, providedOptions?: RealMoleculesElectronegativityAccessibleListNodeOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, RealMoleculesElectronegativityAccessibleListNodeOptions>()( {
      leadingParagraphStringProperty: MoleculePolarityFluent.a11y.common.electronegativity.currentValueStringProperty
    }, providedOptions );

    super( RealAtom.ORDERED_ELEMENTS.map( element => {
      return {
        visibleProperty: realMoleculeProperty.derived(
          molecule => molecule.atoms.some( atom => atom.element === element ) ),
        stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.elementElectronegativity.createProperty( {
          element: RealAtom.getA11yStringProperty( element ),
          en: toFixed( RealAtom.getDisplayElectronegativity( element ), 1 )
        } )
      };
    } ), options );
  }
}

moleculePolarity.register( 'RealMoleculesElectronegativityAccessibleListNode', RealMoleculesElectronegativityAccessibleListNode );