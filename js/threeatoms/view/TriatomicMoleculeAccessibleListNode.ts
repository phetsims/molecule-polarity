// Copyright 2025, University of Colorado Boulder
/**
 * Description for diatomic molecule.
 *
 * @author Agustín Vallejo
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { roundSymmetric } from '../../../../dot/js/util/roundSymmetric.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import { toDegrees } from '../../../../dot/js/util/toDegrees.js';
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

    const absoluteBondAngleABProperty = new DerivedProperty( [
      triatomicMolecule.bondAngleABProperty,
      triatomicMolecule.angleProperty
    ], ( bondAngleAB: number, moleculeAngle: number ) => roundToInterval( bondAngleAB + moleculeAngle, 0.1 ) );

    const absoluteBondAngleBCProperty = new DerivedProperty( [
      triatomicMolecule.bondAngleBCProperty,
      triatomicMolecule.angleProperty
    ], ( bondAngleBC: number, moleculeAngle: number ) => roundToInterval( bondAngleBC + moleculeAngle, 0.1 ) );

    const toClock = ( radians: number ) => {
      return ( roundSymmetric( toDegrees( radians ) / 30 ) + 3 ) % 12 || 12;
    };

    super( [

      // Orientation
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.orientationDescription.createProperty( {
          shape: DescriptionMaps.createShapeStringProperty(
            new DerivedProperty( [
                triatomicMolecule.bondAngleABProperty,
                triatomicMolecule.bondAngleBCProperty
              ], ( bondAngleAB: number, bondAngleBC: number ) => bondAngleAB - bondAngleBC
            )
          ),
          atomAPosition: DescriptionMaps.createOrientationStringProperty(
            absoluteBondAngleABProperty
          ),
          atomCPosition: DescriptionMaps.createOrientationStringProperty(
            absoluteBondAngleBCProperty
          )
        } )
      },

      // Electric Field
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.electricFieldAlignedStringProperty
      },

      // Electronegativity Values
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.electronegativityValues.createProperty( {
          enA: DescriptionMaps.createElectronegativityStringProperty( triatomicMolecule.atomA.electronegativityProperty ),
          enB: DescriptionMaps.createElectronegativityStringProperty( triatomicMolecule.atomB.electronegativityProperty ),
          enC: DescriptionMaps.createElectronegativityStringProperty( triatomicMolecule.atomC.electronegativityProperty )
        } )
      },

      // Molecular Dipole Description
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.molecularDipoleDescription.createProperty( {
          magnitude: DescriptionMaps.createMolecularDipoleStringProperty(
            triatomicMolecule.dipoleProperty.derived( dipole => dipole.magnitude )
          )
        } )
      },

      // Molecular dipole direction
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.molecularDipoleDirection.createProperty( {
          direction: DescriptionMaps.createOrientationStringProperty(
            triatomicMolecule.dipoleProperty.derived( dipole => dipole.angle )
          )
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
          magnitude: DescriptionMaps.createBondDipoleStringProperty(
            triatomicMolecule.bondAB.dipoleProperty.derived( dipole => dipole.magnitude )
          )
        } )
      },
      // AB Bond Direction
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.bondDipoleABDirection.createProperty( {
          direction: new DerivedProperty(
            [
              absoluteBondAngleABProperty,
              triatomicMolecule.bondBC.deltaENProperty
            ], ( bondAngle: number, deltaEN: number ) => {
              return deltaEN > 0 ? toClock( bondAngle ) : toClock( bondAngle + Math.PI );
            }
          ),
          atom: new DerivedProperty(
            [ triatomicMolecule.bondAB.deltaENProperty ], ( deltaEN: number ) => deltaEN < 0 ? 'A' : 'B'
          )
        } )
      },

      // BC Bond Magnitude
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.bondDipoleBCDescription.createProperty( {
          magnitude: DescriptionMaps.createBondDipoleStringProperty(
            triatomicMolecule.bondBC.dipoleProperty.derived( dipole => dipole.magnitude )
          )
        } )
      },
      // BC Bond Direction
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.bondDipoleBCDirection.createProperty( {
          direction: new DerivedProperty(
            [
              absoluteBondAngleBCProperty,
              triatomicMolecule.bondBC.deltaENProperty
            ], ( bondAngle: number, deltaEN: number ) => {
              return deltaEN > 0 ? toClock( bondAngle ) : toClock( bondAngle + Math.PI );
            }
          ),
          atom: new DerivedProperty(
            [ triatomicMolecule.bondBC.deltaENProperty ], ( deltaEN: number ) => deltaEN < 0 ? 'B' : 'C'
          )
        } )
      },

      // Partial Charges Description
      {
        stringProperty: MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.partialChargesDescription.createProperty( {
          magnitudeA: DescriptionMaps.createPartialChargesStringProperty( triatomicMolecule.atomA.partialChargeProperty ),
          signA: triatomicMolecule.atomA.partialChargeProperty.derived( charge => charge < 0 ? 'negative' : 'positive' ),
          magnitudeB: DescriptionMaps.createPartialChargesStringProperty( triatomicMolecule.atomB.partialChargeProperty ),
          signB: triatomicMolecule.atomB.partialChargeProperty.derived( charge => charge < 0 ? 'negative' : 'positive' ),
          magnitudeC: DescriptionMaps.createPartialChargesStringProperty( triatomicMolecule.atomC.partialChargeProperty ),
          signC: triatomicMolecule.atomC.partialChargeProperty.derived( charge => charge < 0 ? 'negative' : 'positive' )
        } )
      }

    ], options );
  }
}

moleculePolarity.register( 'TriatomicMoleculeAccessibleListNode', TriatomicMoleculeAccessibleListNode );