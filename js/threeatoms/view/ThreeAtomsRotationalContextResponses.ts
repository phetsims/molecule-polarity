// Copyright 2025, University of Colorado Boulder
/**
 * Updates the accessible context responses related to rotation for a triatomic molecule.
 *
 * @author Agustín Vallejo
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Bond from '../../common/model/Bond.js';
import { toClock } from '../../common/view/toClock.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import TriatomicMolecule from '../model/TriatomicMolecule.js';
import ThreeAtomsViewProperties from './ThreeAtomsViewProperties.js';

type SelfOptions = EmptySelfOptions;

export type RotationalContextResponsesNodeOptions = SelfOptions & NodeOptions;

export default class ThreeAtomsRotationalContextResponses extends Node {
  public constructor(
    molecule: TriatomicMolecule,
    viewProperties: ThreeAtomsViewProperties,
    providedOptions?: RotationalContextResponsesNodeOptions
  ) {
    const options = optionize<SelfOptions, EmptySelfOptions, RotationalContextResponsesNodeOptions>()( {
      // Default options go here
    }, providedOptions );

    super( options );

    const bondDipoleChangeContextResponse = (
      angle: number,
      bond: Bond,
      inverted: boolean // Bond BC is inverted with respect to angle measurement
    ) => {

      if ( bond.deltaENProperty.value === 0 ) { return; } // No dipole, no context response

      const isDeltaENNegative = bond.deltaENProperty.value < 0;

      // If deltaEN is negative and atom is inverted, we need to add PI. If it's positive and not inverted we dont.
      angle = inverted !== isDeltaENNegative ? angle : angle + Math.PI;

      this.addAccessibleContextResponse(
        MoleculePolarityFluent.a11y.common.bondDipoleDirection.format( {
          bond: bond.label,
          position: toClock( angle )
        } ), {
          interruptible: true
        }
      );
    };

    let previousMolecularDipoleMagnitude = molecule.dipoleProperty.value.magnitude;

    const molecularDipoleChangeContextResponse = () => {
      const currentDipole = molecule.dipoleProperty.value;
      const magnitudeChange = currentDipole.magnitude - previousMolecularDipoleMagnitude;

      // Communicate that the dipole became zero
      if ( currentDipole.magnitude < 1e-5 && previousMolecularDipoleMagnitude > 1e-5 ) {

        // Molecular dipole null description: Molecular dipole zero.
        this.addAccessibleContextResponse(
          MoleculePolarityFluent.a11y.common.electronegativitySlider.molecularDipoleContext.format( {
            progress: MoleculePolarityFluent.a11y.dipoleProgress.format( {
              progress: 'zero'
            } )
          } ), {
            interruptible: true
          }
        );
      }
      else {

        // Molecular dipole description
        this.addAccessibleContextResponse(
          MoleculePolarityFluent.a11y.common.electronegativitySlider.molecularDipoleDirection.format( {
            progress: MoleculePolarityFluent.a11y.dipoleProgress.format( {
              progress: magnitudeChange > 0 ? 'larger' : 'smaller'
            } ),
            position: toClock( currentDipole.angle )
          } ), {
            interruptible: true
          }
        );
      }
      previousMolecularDipoleMagnitude = currentDipole.magnitude;
    };

    molecule.bondAngleABProperty.link( angle => {
      if ( viewProperties.bondDipolesVisibleProperty.value ) {
        bondDipoleChangeContextResponse( angle, molecule.bondAB, false );
      }
      if ( molecule.dipoleProperty.value.magnitude > 1e-5 && viewProperties.molecularDipoleVisibleProperty.value ) {
        molecularDipoleChangeContextResponse();
      }
    } );

    molecule.bondAngleBCProperty.link( angle => {
      if ( viewProperties.bondDipolesVisibleProperty.value ) {
        bondDipoleChangeContextResponse( angle, molecule.bondBC, true );
      }
      if ( molecule.dipoleProperty.value.magnitude > 1e-5 && viewProperties.molecularDipoleVisibleProperty.value ) {
        molecularDipoleChangeContextResponse();
      }
    } );

    molecule.angleProperty.link( () => {
      if ( molecule.dipoleProperty.value.magnitude > 1e-5 && viewProperties.molecularDipoleVisibleProperty.value ) {
        this.addAccessibleContextResponse(
          MoleculePolarityFluent.a11y.common.electronegativitySlider.molecularDipoleDirectionOnly.format( {
            position: toClock( molecule.dipoleProperty.value.angle )
          } ), {
            interruptible: true
          }
        );
      }
    } );
  }
}

moleculePolarity.register( 'ThreeAtomsRotationalContextResponses', ThreeAtomsRotationalContextResponses );