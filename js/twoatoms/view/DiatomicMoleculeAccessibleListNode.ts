// Copyright 2025, University of Colorado Boulder
/**
 * Description for diatomic molecule.
 *
 * @author Agustín Vallejo
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleListNode, { AccessibleListNodeOptions } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import DescriptionMaps from '../../common/view/DescriptionMaps.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import DiatomicMolecule from '../model/DiatomicMolecule.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';

type SelfOptions = EmptySelfOptions;

export type DiatomicMoleculeAccessibleListNodeOptions = SelfOptions & AccessibleListNodeOptions;

export default class DiatomicMoleculeAccessibleListNode extends AccessibleListNode {
  public constructor(
    diatomicMolecule: DiatomicMolecule,
    viewProperties: TwoAtomsViewProperties,
    eFieldEnabledProperty: TReadOnlyProperty<boolean>,
    providedOptions?: DiatomicMoleculeAccessibleListNodeOptions
  ) {
    const options = optionize<SelfOptions, EmptySelfOptions, DiatomicMoleculeAccessibleListNodeOptions>()( {
      // no-op
    }, providedOptions );

    // Wether deltaEN is non-zero
    const isMoleculePolarProperty = diatomicMolecule.deltaENProperty.derived( deltaEN => deltaEN !== 0 );

    super( [

      // Bond Dipole Null Description. e.g. Molecule has { no } dipole arrow.
      {
        visibleProperty: DerivedProperty.and( [
          DerivedProperty.not( isMoleculePolarProperty ),
          viewProperties.bondDipoleVisibleProperty
        ] ),
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.bondDipoleDescription.createProperty( {
          bondDipoleMagnitude: DescriptionMaps.createBondDipoleStringProperty( diatomicMolecule.deltaENProperty )
        } )
      },

      // Bond dipole direction e.g. Molecule has { small } dipole arrow. Bond dipole points to Atom { B }.
      {
        visibleProperty: DerivedProperty.and( [
          isMoleculePolarProperty,
          viewProperties.bondDipoleVisibleProperty
        ] ),
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.bondDipoleDirection.createProperty( {
          bondDipoleMagnitude: DescriptionMaps.createBondDipoleStringProperty( diatomicMolecule.deltaENProperty ),
          atom: diatomicMolecule.deltaENProperty.derived( deltaEN => deltaEN < 0 ? 'A' : 'B' )
        } )
      },

      // Partial Charges Null Description e.g. Partial charges are { zero }.
      {
        visibleProperty: DerivedProperty.and( [
          DerivedProperty.not( isMoleculePolarProperty ),
          viewProperties.partialChargesVisibleProperty
        ] ),
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.partialChargesDescription.createProperty( {
          partialChargeMagnitude: DescriptionMaps.createPartialChargesStringProperty( diatomicMolecule.deltaENProperty )
        } )
      },

      // Partial Charges Detail. e.g. Partial charges are small. Atom A has partial positive charge, Atom B has partial negative charge.
      {
        visibleProperty: DerivedProperty.and( [
          isMoleculePolarProperty,
          viewProperties.partialChargesVisibleProperty
        ] ),
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.partialChargesDetail.createProperty( {
          partialChargeMagnitude: DescriptionMaps.createPartialChargesStringProperty( diatomicMolecule.deltaENProperty ),
          chargeA: MoleculePolarityFluent.a11y.partialChargeSign.createProperty( {
            sign: diatomicMolecule.atomA.partialChargeProperty.derived(
              charge => charge > 0 ? 'positive' : 'negative' )
          } ),
          chargeB: MoleculePolarityFluent.a11y.partialChargeSign.createProperty( {
            sign: diatomicMolecule.atomB.partialChargeProperty.derived(
              charge => charge > 0 ? 'positive' : 'negative' )
          } )
        } )
      },

      // Bond Character
      {
        visibleProperty: viewProperties.bondCharacterVisibleProperty,
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.bondCharacterDescription.createProperty( {
          bondCharacter: DescriptionMaps.createBondCharacterStringProperty( diatomicMolecule.deltaENProperty )
        } )
      },

      // Electrostatic Potential Null Description
      {
        visibleProperty: DerivedProperty.and( [
          DerivedProperty.not( isMoleculePolarProperty ),
          DerivedProperty.valueEqualsConstant( viewProperties.surfaceTypeProperty, 'electrostaticPotential' )
        ] ),
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.electrostaticPotentialDescription.createProperty( {
          potential: DescriptionMaps.createElectrostaticPotentialStringProperty( diatomicMolecule.deltaENProperty )
        } )
      },

      {
        visibleProperty: DerivedProperty.and( [
          isMoleculePolarProperty,
          DerivedProperty.valueEqualsConstant( viewProperties.surfaceTypeProperty, 'electrostaticPotential' )
        ] ),
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.electrostaticPotentialRegions.createProperty( {
          potential: DescriptionMaps.createElectrostaticPotentialStringProperty( diatomicMolecule.deltaENProperty ),
          chargeA: MoleculePolarityFluent.a11y.partialChargeSign.createProperty( {
            sign: diatomicMolecule.atomA.partialChargeProperty.derived(
              charge => charge > 0 ? 'positive' : 'negative' )
          } ),
          chargeB: MoleculePolarityFluent.a11y.partialChargeSign.createProperty( {
            sign: diatomicMolecule.atomB.partialChargeProperty.derived(
              charge => charge > 0 ? 'positive' : 'negative' )
          } ),
          regionA: DescriptionMaps.createElectrostaticRegionsStringProperty( diatomicMolecule.deltaENProperty ),
          regionB: DescriptionMaps.createElectrostaticRegionsStringProperty( diatomicMolecule.deltaENProperty )
        } )
      },

      // Electron density (First two regions)
      {
        visibleProperty: DerivedProperty.and( [
          DerivedProperty.not( isMoleculePolarProperty ), // TODO what regions https://github.com/phetsims/molecule-polarity/issues/193
          DerivedProperty.valueEqualsConstant( viewProperties.surfaceTypeProperty, 'electronDensity' )
        ] ),
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.electronDensityDescription.firstTwoRegions.createProperty( {
          density: DescriptionMaps.createElectronDensityStringProperty( diatomicMolecule.deltaENProperty )
        } )
      },

      // Electron density (Last four regions)
      {
        visibleProperty: DerivedProperty.and( [
          isMoleculePolarProperty, // TODO what regions https://github.com/phetsims/molecule-polarity/issues/193
          DerivedProperty.valueEqualsConstant( viewProperties.surfaceTypeProperty, 'electronDensity' )
        ] ),
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.electronDensityDescription.lastFourRegions.createProperty( {
          density: DescriptionMaps.createElectronDensityStringProperty( diatomicMolecule.deltaENProperty ),
          electronDensityShift: DescriptionMaps.createElectronDensityShiftStringProperty( diatomicMolecule.deltaENProperty ),
          atom: diatomicMolecule.deltaENProperty.derived( deltaEN => deltaEN < 0 ? 'A' : 'B' )
        } )
      },

      // Electric Field
      {
        visibleProperty: DerivedProperty.and( [
          isMoleculePolarProperty,
          eFieldEnabledProperty
        ] ),
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
          atomAPosition: DescriptionMaps.createOrientationStringProperty( diatomicMolecule.angleProperty.derived(
            angle => {
              return angle + Math.PI;
            }
          ) ),
          atomBPosition: DescriptionMaps.createOrientationStringProperty( diatomicMolecule.angleProperty )
        } )
      },

      // Electronegativity Values
      {
        stringProperty: MoleculePolarityFluent.a11y.twoAtomsScreen.moleculeAB.electronegativityValues.createProperty( {
          enA: DescriptionMaps.createElectronegativityStringProperty( diatomicMolecule.atomA.electronegativityProperty ),
          enB: DescriptionMaps.createElectronegativityStringProperty( diatomicMolecule.atomB.electronegativityProperty )
        } )
      }
    ], options );
  }
}

moleculePolarity.register( 'DiatomicMoleculeAccessibleListNode', DiatomicMoleculeAccessibleListNode );