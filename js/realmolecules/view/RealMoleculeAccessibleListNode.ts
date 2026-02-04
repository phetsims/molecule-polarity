// Copyright 2026, University of Colorado Boulder
/**
 * Description for real molecules.
 *
 * @author Agustín Vallejo
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleListNode, { AccessibleListNodeOptions } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import { DiatomicMoleculeAccessibleListNodeOptions } from '../../twoatoms/view/DiatomicMoleculeAccessibleListNode.js';
import RealMolecule from '../model/RealMolecule.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';

type SelfOptions = EmptySelfOptions;

export type RealMoleculeAccessibleListNodeOptions = SelfOptions & AccessibleListNodeOptions;

export default class RealMoleculeAccessibleListNode extends AccessibleListNode {
  public constructor(
    moleculeProperty: TReadOnlyProperty<RealMolecule>,
    viewProperties: RealMoleculesViewProperties,
    providedOptions?: RealMoleculeAccessibleListNodeOptions
  ) {

    const moleculeNameProperty = moleculeProperty.derived( molecule => {
      return molecule.getAccessibleName();
    } );

    const options = optionize<SelfOptions, EmptySelfOptions, DiatomicMoleculeAccessibleListNodeOptions>()( {
      leadingParagraphStringProperty: MoleculePolarityFluent.a11y.realMoleculesScreen.molecules.description.createProperty( {
        molecule: moleculeProperty.derived( molecule => {
          return molecule.getAccessibleName();
        } )
      } )
    }, providedOptions );

    super( [

      // Bond Dipole
      {
        visibleProperty: viewProperties.bondDipolesVisibleProperty,
        stringProperty: MoleculePolarityFluent.a11y.realMoleculesScreen.molecules.bondDipole.createProperty( {
          molecule: moleculeNameProperty
        } )
      },

      // Molecular Dipole
      {
        visibleProperty: viewProperties.molecularDipoleVisibleProperty,
        stringProperty: MoleculePolarityFluent.a11y.realMoleculesScreen.molecules.molecularDipole.createProperty( {
          molecule: moleculeNameProperty
        } )
      },

      // Electrostatic Potential Surface
      {
        visibleProperty: DerivedProperty.valueEqualsConstant( viewProperties.surfaceTypeProperty, 'electrostaticPotential' ),
        stringProperty: MoleculePolarityFluent.a11y.realMoleculesScreen.molecules.electrostaticPotential.createProperty( {
          molecule: moleculeNameProperty
        } )
      },

      // Electron Density Surface
      {
        visibleProperty: DerivedProperty.valueEqualsConstant( viewProperties.surfaceTypeProperty, 'electronDensity' ),
        stringProperty: MoleculePolarityFluent.a11y.realMoleculesScreen.molecules.electronDensity.createProperty( {
          molecule: moleculeNameProperty
        } )
      }

    ], options );
  }
}

moleculePolarity.register( 'RealMoleculeAccessibleListNode', RealMoleculeAccessibleListNode );