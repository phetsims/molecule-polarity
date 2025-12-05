// Copyright 2025, University of Colorado Boulder
/**
 * Description for diatomic molecule.
 *
 * @author Agustín Vallejo
 */

import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleListNode, { AccessibleListNodeOptions } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import BondDescriptionMaps from '../../common/view/BondDescriptionMaps.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import DiatomicMolecule from '../model/DiatomicMolecule.js';

type SelfOptions = EmptySelfOptions;

export type DiatomicMoleculeAccessibleListNodeOptions = SelfOptions & AccessibleListNodeOptions;

export default class DiatomicMoleculeAccessibleListNode extends AccessibleListNode {
  public constructor( diatomicMolecule: DiatomicMolecule, providedOptions?: DiatomicMoleculeAccessibleListNodeOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, DiatomicMoleculeAccessibleListNodeOptions>()( {
      // no-op
    }, providedOptions );

    super( [

      // Bond Dipole Description
      {
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.bondDipoleDescription.createProperty( {
          bondDipoleMagnitude: BondDescriptionMaps.createBondDipoleStringProperty( diatomicMolecule.deltaENProperty )
        } )
      },

      // Bond dipole direction
      {
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.bondDipoleDirection.createProperty( {
          dipoleDirection: MoleculePolarityFluent.a11y.dipoleOrientAB.createProperty( {
            direction: diatomicMolecule.deltaENProperty.derived( deltaEN => deltaEN < 0 ? 'toA' : 'toB' )
          } )
        } )
      },

      // Partial Charges Description
      {
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.partialChargesDescription.createProperty( {
          partialChargeMagnitude: BondDescriptionMaps.createPartialChargesStringProperty( diatomicMolecule.deltaENProperty )
        } )
      },

      // Partial Charges Detail
      {
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.partialChargesDetail.createProperty( {
          chargeA: diatomicMolecule.atomA.partialChargeProperty,
          chargeB: diatomicMolecule.atomB.partialChargeProperty
        } )
      },

      // Bond Character
      {
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.bondCharacterDescription.createProperty( {
          bondCharacter: BondDescriptionMaps.createBondCharacterStringProperty( diatomicMolecule.deltaENProperty )
        } )
      },

      // Electrostatic Potential
      {
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.electrostaticPotentialDescription.createProperty( {
          potential: BondDescriptionMaps.createElectrostaticPotentialStringProperty( diatomicMolecule.deltaENProperty )
        } )
      },

      // Electron density (First two regions)
      {
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.electronDensityDescription.firstTwoRegions.createProperty( {
          density: BondDescriptionMaps.createElectronDensityStringProperty( diatomicMolecule.deltaENProperty )
        } )
      },

      // Electron density (Last four regions)
      {
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.electronDensityDescription.lastFourRegions.createProperty( {
          density: BondDescriptionMaps.createElectronDensityStringProperty( diatomicMolecule.deltaENProperty ),
          electronDensityShift: BondDescriptionMaps.createElectronDensityShiftStringProperty( diatomicMolecule.deltaENProperty ),
          atom: diatomicMolecule.deltaENProperty.derived( deltaEN => deltaEN < 0 ? 'A' : 'B' )
        } )
      },

      // Electric Field
      {
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.electricFieldAlignedStringProperty
      },

      // Orientation
      {
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.orientationDescription.createProperty( {
          orientation: MoleculePolarityFluent.a11y.orientationMolecule.createProperty( {
            orientation: diatomicMolecule.angleProperty.derived( angle => {
              const absSin = roundToInterval( Math.abs( Math.sin( angle ) ), 0.1 );
              return absSin === 0 ? 'horizontal' : absSin === 1 ? 'vertical' : 'diagonal';
            } )
          } ),
          atomAPosition: 'TODO',
          atomBPosition: 'TODO'
        } )
      },

      // Electronegativity Values
      {
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.electronegativityValues.createProperty( {
          enA: diatomicMolecule.atomA.electronegativityProperty,
          enB: diatomicMolecule.atomB.electronegativityProperty
        } )
      }
    ], options );
  }
}

moleculePolarity.register( 'DiatomicMoleculeAccessibleListNode', DiatomicMoleculeAccessibleListNode );