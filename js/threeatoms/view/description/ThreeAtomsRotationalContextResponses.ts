// Copyright 2026, University of Colorado Boulder
/**
 * Updates the accessible context responses related to rotation for a triatomic molecule.
 *
 * @author Agustín Vallejo
 */

import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import DescriptionMaps from '../../../common/view/description/DescriptionMaps.js';
import moleculePolarity from '../../../moleculePolarity.js';
import MoleculePolarityFluent from '../../../MoleculePolarityFluent.js';
import TriatomicMolecule from '../../model/TriatomicMolecule.js';
import ThreeAtomsViewProperties from '../ThreeAtomsViewProperties.js';

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

    let previousMolecularDipoleMagnitude = molecule.dipoleProperty.value.magnitude;

    const molecularDipoleChangeContextResponse = () => {
      const currentDipole = molecule.dipoleProperty.value;
      const magnitudeChange = currentDipole.magnitude - previousMolecularDipoleMagnitude;

      // Communicate that the dipole became zero
      if ( currentDipole.magnitude < 1e-5 && previousMolecularDipoleMagnitude > 1e-5 ) {

        // Molecular dipole null description: Molecular dipole zero.
        this.addAccessibleContextResponse(
          MoleculePolarityFluent.a11y.common.molecularDipoleResponses.molecularDipoleContext.format( {
            progress: MoleculePolarityFluent.a11y.dipoleProgress.format( {
              progress: 'zero'
            } )
          } ), {
            responseGroup: 'molecularDipole'
          }
        );
      }
      else {

        // Molecular dipole description
        this.addAccessibleContextResponse(
          MoleculePolarityFluent.a11y.common.molecularDipoleResponses.molecularDipoleContext.format( {
            progress: MoleculePolarityFluent.a11y.dipoleProgress.format( {
              progress: magnitudeChange > 0 ? 'larger' : 'smaller'
            } )
          } ), {
            responseGroup: 'molecularDipole'
          }
        );
      }
    };

    molecule.bondAngleABProperty.link( ( angle, previousAngle ) => {

      // When molecule rotates, bond angle is triggered but doesn't actually change. Do nothing
      if ( !previousAngle ) { return; }

      if ( viewProperties.molecularDipoleVisibleProperty.value ) {
        molecularDipoleChangeContextResponse();
      }
      previousMolecularDipoleMagnitude = molecule.dipoleProperty.value.magnitude;
    } );

    molecule.bondAngleBCProperty.link( ( angle, previousAngle ) => {

      // When molecule rotates, bond angle is triggered but doesn't actually change. Do nothing
      if ( !previousAngle ) { return; }

      if ( viewProperties.molecularDipoleVisibleProperty.value ) {
        molecularDipoleChangeContextResponse();
      }
      previousMolecularDipoleMagnitude = molecule.dipoleProperty.value.magnitude;
    } );

    molecule.angleProperty.link( () => {
      if ( molecule.dipoleProperty.value.magnitude > 1e-5 && viewProperties.molecularDipoleVisibleProperty.value ) {
        this.addAccessibleContextResponse(
          MoleculePolarityFluent.a11y.common.molecularDipoleResponses.molecularDipoleDirectionOnly.format( {
            position: DescriptionMaps.formatOrientationString( molecule.dipoleProperty.value.angle, 'toAngle' )
          } ), {
            responseGroup: 'molecularDipole'
          }
        );
      }
    } );
  }
}

moleculePolarity.register( 'ThreeAtomsRotationalContextResponses', ThreeAtomsRotationalContextResponses );