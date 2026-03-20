// Copyright 2026, University of Colorado Boulder

/**
 * RealMoleculesElectronegativityDescriber is an accessible list node for the electronegativity information.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { toFixed } from '../../../../../dot/js/util/toFixed.js';
import AccessibleList from '../../../../../scenery-phet/js/accessibility/AccessibleList.js';
import type { AccessibleTemplateValue } from '../../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import MoleculePolarityFluent from '../../../MoleculePolarityFluent.js';
import { RealAtom } from '../../model/RealAtom.js';
import RealMolecule from '../../model/RealMolecule.js';

export default class RealMoleculesElectronegativityDescriber {
  private constructor() {
    // This is a static class, so it should never be instantiated.
  }

  public static createTemplateProperty( realMoleculeProperty: TReadOnlyProperty<RealMolecule> ): TReadOnlyProperty<AccessibleTemplateValue> {
    return AccessibleList.createTemplateProperty( {
      listItems: RealAtom.ORDERED_ELEMENTS.map( element => {
        return {
          visibleProperty: realMoleculeProperty.derived(
            molecule => molecule.atoms.some( atom => atom.element === element ) ),
          stringProperty: MoleculePolarityFluent.a11y.common.electronegativity.elementElectronegativity.createProperty( {
            element: RealAtom.getA11yStringProperty( element ),
            en: toFixed( RealAtom.getDisplayElectronegativity( element ), 1 )
          } )
        };
      } ),
      leadingParagraphStringProperty: MoleculePolarityFluent.a11y.common.electronegativity.currentValueStringProperty
    } );
  }
}
