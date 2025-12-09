// Copyright 2025, University of Colorado Boulder
/**
 * Description for diatomic molecule.
 *
 * @author Agustín Vallejo
 */

import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleListNode, { AccessibleListNodeOptions } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import DescriptionMaps from '../../common/view/DescriptionMaps.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import TriatomicMolecule from '../model/TriatomicMolecule.js';

type SelfOptions = EmptySelfOptions;

export type TriatomicMoleculeAccessibleListNodeOptions = SelfOptions & AccessibleListNodeOptions;

export default class TriatomicMoleculeAccessibleListNode extends AccessibleListNode {
  public constructor( triatomicMolecule: TriatomicMolecule, providedOptions?: TriatomicMoleculeAccessibleListNodeOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, TriatomicMoleculeAccessibleListNodeOptions>()( {
      // no-op
    }, providedOptions );

    super( [

      // Orientation
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.orientationDescription.createProperty( {
          shape: MoleculePolarityFluent.a11y.orientationMolecule.createProperty( {
            orientation: triatomicMolecule.angleProperty.derived( angle => {
              const absSin = roundToInterval( Math.abs( Math.sin( angle ) ), 0.1 );
              return absSin === 0 ? 'horizontal' : absSin === 1 ? 'vertical' : 'diagonal';
            } ) // TODO: Not proper shape https://github.com/phetsims/molecule-polarity/issues/171
          } ),
          atomAPosition: DescriptionMaps.createOrientationStringProperty( triatomicMolecule.angleProperty.derived(
            angle => {
              return angle + Math.PI;
            }
          ) ),
          atomCPosition: DescriptionMaps.createOrientationStringProperty( triatomicMolecule.angleProperty )
        } )
      },

      // Electric Field
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.electricFieldAlignedStringProperty
      },

      // Electronegativity Values
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.electronegativityValues.createProperty( {
          enA: triatomicMolecule.atomA.electronegativityProperty,
          enB: triatomicMolecule.atomB.electronegativityProperty,
          enC: triatomicMolecule.atomC.electronegativityProperty
        } )
      },

      // Molecular Dipole Description
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.molecularDipoleDescription.createProperty( {
          magnitude: triatomicMolecule.dipoleProperty.derived( dipole => dipole.magnitude )
        } )
      },

      // Molecular dipole direction
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.molecularDipoleDirection.createProperty( {
          direction: triatomicMolecule.dipoleProperty.derived( dipole => dipole.angle ) // TODO: Clock representation! https://github.com/phetsims/molecule-polarity/issues/171
        } )
      },

      // Twice the size Molecular Dipole
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.molecularDipoleTwiceStringProperty
      },

      // Bond Dipole Descriptions
      // AB Bond Magnitude
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.bondDipoleABDescription.createProperty( {
          magnitude: triatomicMolecule.bondAB.dipoleProperty.derived( dipole => dipole.magnitude )
        } )
      },
      // AB Bond Direction
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.bondDipoleABDirection.createProperty( {
          direction: triatomicMolecule.bondAB.dipoleProperty.derived( dipole => dipole.angle ), // TODO: Clock representation! https://github.com/phetsims/molecule-polarity/issues/171
          position: triatomicMolecule.bondAB.dipoleProperty.derived( dipole => dipole.angle )
        } )
      },

      // BC Bond Magnitude
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.bondDipoleBCDescription.createProperty( {
          magnitude: triatomicMolecule.bondBC.dipoleProperty.derived( dipole => dipole.magnitude )
        } )
      },
      // BC Bond Direction
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.bondDipoleBCDirection.createProperty( {
          direction: triatomicMolecule.bondBC.dipoleProperty.derived( dipole => dipole.angle ), // TODO: Clock representation! https://github.com/phetsims/molecule-polarity/issues/171
          position: triatomicMolecule.bondBC.dipoleProperty.derived( dipole => dipole.angle )
        } )
      },

      // Partial Charges Description
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.partialChargesDescription.createProperty( {
          magnitudeA: triatomicMolecule.bondAB.dipoleProperty.derived( dipole => dipole.magnitude ),
          signA: triatomicMolecule.bondAB.dipoleProperty.derived( dipole => dipole.x < 0 ? 'negative' : 'positive' ),
          magnitudeB: triatomicMolecule.bondBC.dipoleProperty.derived( dipole => dipole.magnitude ),
          signB: triatomicMolecule.bondBC.dipoleProperty.derived( dipole => dipole.x < 0 ? 'negative' : 'positive' ),
          magnitudeC: triatomicMolecule.bondBC.dipoleProperty.derived( dipole => dipole.magnitude ),
          signC: triatomicMolecule.bondBC.dipoleProperty.derived( dipole => dipole.x > 0 ? 'negative' : 'positive' )
        } )
      }

    ], options );
  }
}

moleculePolarity.register( 'TriatomicMoleculeAccessibleListNode', TriatomicMoleculeAccessibleListNode );