// Copyright 2025, University of Colorado Boulder
/**
 * RotationResponseNode handles the context response for a rotating object such as
 * the diatomic molecule for screen 1, or the central atom for screen 3.
 *
 * It will emit 'clockwise' or 'counterclockwise' rotation responses based on the
 * turning of the object and whether or not it is under the influence of an
 * electric field.
 *
 * @author Agustín Vallejo
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';

type SelfOptions = EmptySelfOptions;

export type RotationResponseNodeOptions = SelfOptions & NodeOptions;

export default class RotationResponseNode extends Node {
  public constructor(
    angleProperty: TReadOnlyProperty<number>,
    dipoleProperty: TReadOnlyProperty<Vector2>,
    isRotatingDueToEFieldProperty: TReadOnlyProperty<boolean>,
    providedOptions?: RotationResponseNodeOptions
  ) {

    const options = optionize<SelfOptions, EmptySelfOptions, RotationResponseNodeOptions>()( {
      // Default options go here
    }, providedOptions );

    super( options );

    // Tracking last direction to avoid repeating responses for the same direction.
    let lastDirection: 'clockwise' | 'counterclockwise' | null = null;

    // Utility function to emit accessible responses based on rotation direction and context.
    const emitRotationResponse = ( direction: 'clockwise' | 'counterclockwise' ) => {
      if ( isRotatingDueToEFieldProperty.value ) {

        // Context response for E-field rotations
        this.addAccessibleContextResponse(
          MoleculePolarityFluent.a11y.twoAtomsScreen.rotateMoleculeSlider.electricFieldContext.format( {
            direction: direction
          } )
        );
      }
      else {

        // Normal object response for manual rotations
        this.addAccessibleObjectResponse(
          MoleculePolarityFluent.a11y.rotation.format( { direction: direction } )
        );
      }
      lastDirection = direction;
    };

    // Reset lastDirection when E-field rotation state changes.
    isRotatingDueToEFieldProperty.lazyLink( () => {
      lastDirection = null;
    } );

    // Storing the dipole to track direction of angle changes.
    let lastDipole = dipoleProperty.value;

    angleProperty.lazyLink( () => {

      const dipole = dipoleProperty.value;

      // Using the cross product of the dipole to determine wether the dipole change due to the angle
      // is rotating the molecule clockwise or counterclockwise.
      // We do not listen directly to the dipole because we don't want magnitude changes to trigger
      // these accessible responses.
      if ( dipole.crossScalar( lastDipole ) < 0 ) {
        if ( lastDirection !== 'clockwise' ) {
          emitRotationResponse( 'clockwise' );
        }
      }
      else {
        if ( lastDirection !== 'counterclockwise' ) {
          emitRotationResponse( 'counterclockwise' );
        }
      }

      lastDipole = dipole;
    } );
  }
}

moleculePolarity.register( 'RotationResponseNode', RotationResponseNode );