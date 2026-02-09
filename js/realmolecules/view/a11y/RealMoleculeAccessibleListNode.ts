// Copyright 2026, University of Colorado Boulder

/**
 * Description for real molecules.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Agustín Vallejo
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../../axon/js/DynamicProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import FluentPattern from '../../../../../chipper/js/browser/FluentPattern.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import AccessibleListNode, { AccessibleListNodeOptions } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import moleculePolarity from '../../../moleculePolarity.js';
import MoleculePolarityFluent from '../../../MoleculePolarityFluent.js';
import RealMolecule, { MoleculeName, MoleculeSymbol } from '../../model/RealMolecule.js';
import RealMoleculesViewProperties from '../RealMoleculesViewProperties.js';
import { toFixed } from '../../../../../dot/js/util/toFixed.js';
import Element from '../../../../../nitroglycerin/js/Element.js';

type SelfOptions = EmptySelfOptions;

export type RealMoleculeAccessibleListNodeOptions = SelfOptions & AccessibleListNodeOptions;

export default class RealMoleculeAccessibleListNode extends AccessibleListNode {
  public constructor(
    molecules: RealMolecule[],
    moleculeProperty: TReadOnlyProperty<RealMolecule>,
    isAdvancedProperty: TReadOnlyProperty<boolean>,
    viewProperties: RealMoleculesViewProperties,
    providedOptions?: RealMoleculeAccessibleListNodeOptions
  ) {

    const moleculeNameProperty = moleculeProperty.derived( molecule => {
      return molecule.getAccessibleName();
    } );

    // Provide a single Property that will switch its source based on basic/advanced.
    type MoleculeFluentPattern = FluentPattern<{ molecule: MoleculeName | TReadOnlyProperty<MoleculeName> }>;
    const getBasicAdvancedStringProperty = ( basicPattern: MoleculeFluentPattern, advancedPattern: MoleculeFluentPattern ) => {
      return new DerivedProperty( [
        basicPattern.createProperty( { molecule: moleculeNameProperty } ),
        advancedPattern.createProperty( { molecule: moleculeNameProperty } ),
        isAdvancedProperty
      ], ( basicValue, advancedValue, isAdvanced ) => {
        return isAdvanced ? advancedValue : basicValue;
      } );
    };

    const options = optionize<SelfOptions, EmptySelfOptions, RealMoleculeAccessibleListNodeOptions>()( {
      leadingParagraphStringProperty: getBasicAdvancedStringProperty(
        MoleculePolarityFluent.a11y.realMoleculesScreen.molecules.description,
        MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.description
      )
    }, providedOptions );

    const partialChargeStringPropertyMap = RealMoleculeAccessibleListNode.getPartialChargeStringPropertyMap( molecules );

    super( [

      // Bond Dipole
      {
        visibleProperty: viewProperties.bondDipolesVisibleProperty,
        stringProperty: getBasicAdvancedStringProperty(
          MoleculePolarityFluent.a11y.realMoleculesScreen.molecules.bondDipole,
          MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.bondDipole
        )
      },

      // Molecular Dipole
      {
        visibleProperty: viewProperties.molecularDipoleVisibleProperty,
        stringProperty: getBasicAdvancedStringProperty(
          MoleculePolarityFluent.a11y.realMoleculesScreen.molecules.molecularDipole,
          MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.molecularDipole
        )
      },

      // Partial Charges
      {
        visibleProperty: DerivedProperty.and( [ isAdvancedProperty, viewProperties.partialChargesVisibleProperty ] ),
        stringProperty: new DynamicProperty( new DerivedProperty( [ moleculeProperty ], molecule => partialChargeStringPropertyMap[ molecule.symbol ] ) )
      },

      // Electrostatic Potential Surface
      {
        visibleProperty: DerivedProperty.valueEqualsConstant( viewProperties.surfaceTypeProperty, 'electrostaticPotential' ),
        stringProperty: getBasicAdvancedStringProperty(
          MoleculePolarityFluent.a11y.realMoleculesScreen.molecules.electrostaticPotential,
          MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.electrostaticPotential
        )
      },

      // Electron Density Surface
      {
        visibleProperty: DerivedProperty.valueEqualsConstant( viewProperties.surfaceTypeProperty, 'electronDensity' ),
        stringProperty: getBasicAdvancedStringProperty(
          MoleculePolarityFluent.a11y.realMoleculesScreen.molecules.electronDensity,
          MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.electronDensity
        )
      }
    ], options );
  }

  /**
   * Creates a map from MoleculeSymbol to the appropriate partial charge string property.
   */
  private static getPartialChargeStringPropertyMap(
    molecules: RealMolecule[]
  ): Record<MoleculeSymbol, TReadOnlyProperty<string>> {
    // format partial charges to 2 decimal places and explicit +/- signs
    const toFixedChargeString = ( charge: number ) => {
      const fixed = toFixed( charge, 2 );

      // Explicitly indicate the sign for positive charges.
      return charge > 0 ? `+${fixed}` : fixed;
    };

    // Helper to get the partial charge string for a specific element in a molecule.
    const getElementalChargeString = ( moleculeSymbol: MoleculeSymbol, element: Element ): string => {
      const molecule = molecules.find( molecule => molecule.symbol === moleculeSymbol )!;
      const atom = molecule.atoms.find( atom => atom.element === element );

      return toFixedChargeString( atom!.getPartialCharge() );
    };

    // Helper to get the partial charge string for an atom at a specific index in a molecule.
    const getIndexedChargeString = ( moleculeSymbol: MoleculeSymbol, index: number ): string => {
      const molecule = molecules.find( molecule => molecule.symbol === moleculeSymbol )!;
      const atom = molecule.atoms[ index ];

      return toFixedChargeString( atom.getPartialCharge() );
    };

    // Maps MoleculeSymbol to the appropriate partial charge string property.
    // Requires some extra complexity so we can fill in all of the partial charges for each molecule.
    return {
      H2: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.hydrogenStringProperty,
      N2: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.nitrogenStringProperty,
      O2: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.oxygenStringProperty,
      F2: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.fluorineStringProperty,
      HF: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.hydrogenFluoride.createProperty( {
        hydrogenCharge: getElementalChargeString( 'HF', Element.H ),
        fluorineCharge: getElementalChargeString( 'HF', Element.F )
      } ),
      H2O: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.water.createProperty( {
        hydrogenCharge: getElementalChargeString( 'H2O', Element.H ),
        oxygenCharge: getElementalChargeString( 'H2O', Element.O )
      } ),
      CO2: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.carbonDioxide.createProperty( {
        carbonCharge: getElementalChargeString( 'CO2', Element.C ),
        oxygenCharge: getElementalChargeString( 'CO2', Element.O )
      } ),
      HCN: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.hydrogenCyanide.createProperty( {
        hydrogenCharge: getElementalChargeString( 'HCN', Element.H ),
        carbonCharge: getElementalChargeString( 'HCN', Element.C ),
        nitrogenCharge: getElementalChargeString( 'HCN', Element.N )
      } ),
      O3: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.ozone.createProperty( {
        centralOxygenCharge: getIndexedChargeString( 'O3', 0 ),
        terminalOxygenCharge: getIndexedChargeString( 'O3', 1 )
      } ),
      NH3: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.ammonia.createProperty( {
        hydrogenCharge: getElementalChargeString( 'NH3', Element.H ),
        nitrogenCharge: getElementalChargeString( 'NH3', Element.N )
      } ),
      BH3: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.borane.createProperty( {
        boronCharge: getElementalChargeString( 'BH3', Element.B ),
        hydrogenCharge: getElementalChargeString( 'BH3', Element.H )
      } ),
      BF3: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.boronTrifluoride.createProperty( {
        boronCharge: getElementalChargeString( 'BF3', Element.B ),
        fluorineCharge: getElementalChargeString( 'BF3', Element.F )
      } ),
      CH2O: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.formaldehyde.createProperty( {
        carbonCharge: getElementalChargeString( 'CH2O', Element.C ),
        hydrogenCharge: getElementalChargeString( 'CH2O', Element.H ),
        oxygenCharge: getElementalChargeString( 'CH2O', Element.O )
      } ),
      CH4: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.methane.createProperty( {
        carbonCharge: getElementalChargeString( 'CH4', Element.C ),
        hydrogenCharge: getElementalChargeString( 'CH4', Element.H )
      } ),
      CH3F: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.fluoromethane.createProperty( {
        carbonCharge: getElementalChargeString( 'CH3F', Element.C ),
        fluorineCharge: getElementalChargeString( 'CH3F', Element.F ),
        hydrogenCharge: getElementalChargeString( 'CH3F', Element.H )
      } ),
      CH2F2: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.difluoromethane.createProperty( {
        carbonCharge: getElementalChargeString( 'CH2F2', Element.C ),
        fluorineCharge: getElementalChargeString( 'CH2F2', Element.F ),
        hydrogenCharge: getElementalChargeString( 'CH2F2', Element.H )
      } ),
      CHF3: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.trifluoromethane.createProperty( {
        carbonCharge: getElementalChargeString( 'CHF3', Element.C ),
        fluorineCharge: getElementalChargeString( 'CHF3', Element.F ),
        hydrogenCharge: getElementalChargeString( 'CHF3', Element.H )
      } ),
      CF4: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.tetrafluoromethane.createProperty( {
        carbonCharge: getElementalChargeString( 'CF4', Element.C ),
        fluorineCharge: getElementalChargeString( 'CF4', Element.F )
      } ),
      CHCl3: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.chloroform.createProperty( {
        carbonCharge: getElementalChargeString( 'CHCl3', Element.C ),
        chlorineCharge: getElementalChargeString( 'CHCl3', Element.Cl ),
        hydrogenCharge: getElementalChargeString( 'CHCl3', Element.H )
      } )
    };
  }
}

moleculePolarity.register( 'RealMoleculeAccessibleListNode', RealMoleculeAccessibleListNode );