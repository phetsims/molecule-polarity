// Copyright 2026, University of Colorado Boulder

/**
 * Description for real molecules using the advanced model.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Agustín Vallejo
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleListNode, { AccessibleListNodeOptions } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import RealMolecule from '../model/RealMolecule.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';

type SelfOptions = EmptySelfOptions;

export type RealMoleculeAdvancedAccessibleListNodeOptions = SelfOptions & AccessibleListNodeOptions;

export default class RealMoleculeAdvancedAccessibleListNode extends AccessibleListNode {
  public constructor(
    moleculeProperty: TReadOnlyProperty<RealMolecule>,
    viewProperties: RealMoleculesViewProperties,
    providedOptions?: RealMoleculeAdvancedAccessibleListNodeOptions
  ) {

    const moleculeNameProperty = moleculeProperty.derived( molecule => {
      return molecule.getAccessibleName();
    } );

    const options = optionize<SelfOptions, EmptySelfOptions, RealMoleculeAdvancedAccessibleListNodeOptions>()( {
      leadingParagraphStringProperty: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.description.createProperty( {
        molecule: moleculeProperty.derived( molecule => {
          return molecule.getAccessibleName();
        } )
      } )
    }, providedOptions );

    super( [

      // Bond Dipole
      {
        visibleProperty: viewProperties.bondDipolesVisibleProperty,
        stringProperty: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.bondDipole.createProperty( {
          molecule: moleculeNameProperty
        } )
      },

      // Molecular Dipole
      {
        visibleProperty: viewProperties.molecularDipoleVisibleProperty,
        stringProperty: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.molecularDipole.createProperty( {
          molecule: moleculeNameProperty
        } )
      },

      // Partial Charges
      {
        visibleProperty: viewProperties.partialChargesVisibleProperty,
        stringProperty: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.createProperty( {
          molecule: moleculeNameProperty
        } )
      },

      // Electrostatic Potential Surface
      {
        visibleProperty: DerivedProperty.valueEqualsConstant( viewProperties.surfaceTypeProperty, 'electrostaticPotential' ),
        stringProperty: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.electrostaticPotential.createProperty( {
          molecule: moleculeNameProperty
        } )
      },

      // Electron Density Surface
      {
        visibleProperty: DerivedProperty.valueEqualsConstant( viewProperties.surfaceTypeProperty, 'electronDensity' ),
        stringProperty: MoleculePolarityFluent.a11y.realMoleculesScreen.moleculesAdvanced.electronDensity.createProperty( {
          molecule: moleculeNameProperty
        } )
      }

    ], options );
  }
}

moleculePolarity.register( 'RealMoleculeAdvancedAccessibleListNode', RealMoleculeAdvancedAccessibleListNode );