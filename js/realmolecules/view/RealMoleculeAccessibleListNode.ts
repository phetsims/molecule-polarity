// Copyright 2026, University of Colorado Boulder

/**
 * Description for real molecules.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Agustín Vallejo
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import FluentPattern from '../../../../chipper/js/browser/FluentPattern.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleListNode, { AccessibleListNodeOptions } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import RealMolecule, { MoleculeNames } from '../model/RealMolecule.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';

type SelfOptions = EmptySelfOptions;

export type RealMoleculeAccessibleListNodeOptions = SelfOptions & AccessibleListNodeOptions;

export default class RealMoleculeAccessibleListNode extends AccessibleListNode {
  public constructor(
    moleculeProperty: TReadOnlyProperty<RealMolecule>,
    isAdvancedProperty: TReadOnlyProperty<boolean>,
    viewProperties: RealMoleculesViewProperties,
    providedOptions?: RealMoleculeAccessibleListNodeOptions
  ) {

    const moleculeNameProperty = moleculeProperty.derived( molecule => {
      return molecule.getAccessibleName();
    } );

    // Provide a single Property that will switch its source based on basic/advanced.
    type MoleculeFluentPattern = FluentPattern<{ molecule: MoleculeNames | TReadOnlyProperty<MoleculeNames> }>;
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
}

moleculePolarity.register( 'RealMoleculeAccessibleListNode', RealMoleculeAccessibleListNode );