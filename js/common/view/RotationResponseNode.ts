// Copyright 2026, University of Colorado Boulder
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

// A small epsilon to avoid floating point precision issues when checking for horizontal alignment.
const ONE = 1 - 1e-10;

export type RotationResponseNodeOptions = SelfOptions & NodeOptions;

export default class RotationResponseNode extends Node {
  public constructor(
    angleProperty: TReadOnlyProperty<number>,
    dipoleProperty: TReadOnlyProperty<Vector2>,
    isRotatingDueToEFieldProperty: TReadOnlyProperty<boolean>,
    eFieldEnabledProperty: TReadOnlyProperty<boolean>,
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

      // Normal object response for rotations
      this.addAccessibleObjectResponse(
        MoleculePolarityFluent.a11y.rotation.format( { direction: direction } )
      );

      lastDirection = direction;
    };

    // Storing the dipole to track direction of angle changes
    let lastDirectionVector = Vector2.createPolar( 1, angleProperty.value );

    angleProperty.lazyLink( angle => {
        const directionVector = Vector2.createPolar( 1, angle );

        // Using the cross product of the direction vector
        // to determine wether the molecule is rotating
        // clockwise or counterclockwise.
        if ( directionVector.crossScalar( lastDirectionVector ) < 0 ) {
          if ( lastDirection !== 'clockwise' ) {
            emitRotationResponse( 'clockwise' );
          }
        }
        else {
          if ( lastDirection !== 'counterclockwise' ) {
            emitRotationResponse( 'counterclockwise' );
          }
        }

        // If molecule is horizontal and was rotating due to E-field, emit aligned response.
        if ( Math.cos( dipoleProperty.value.angle ) > ONE && isRotatingDueToEFieldProperty.value && dipoleProperty.value.magnitude !== 0 ) {

          // "Molecule aligned with Electric Field" after rotating due to E-field has stopped
          this.addAccessibleContextResponse(
            MoleculePolarityFluent.a11y.twoAtomsScreen.rotateMoleculeSlider.electricFieldContextStringProperty
          );

          lastDirection = null;
        }

        lastDirectionVector = directionVector;
      }
    );


    eFieldEnabledProperty.lazyLink( eFieldEnabled => {
      // Reset last direction when E-field is toggled to allow new responses.
      lastDirection = null;

      // If molecule is horizontal, notify that it is aligned with electric field.
      if ( eFieldEnabled && dipoleProperty.value.magnitude !== 0 && Math.cos( dipoleProperty.value.angle ) > ONE ) {

        // "Molecule aligned with Electric Field" when E-field is turned on and molecule is already aligned.
        this.addAccessibleContextResponse(
          MoleculePolarityFluent.a11y.twoAtomsScreen.rotateMoleculeSlider.electricFieldContextStringProperty
        );
      }
    } );
  }

}

moleculePolarity.register( 'RotationResponseNode', RotationResponseNode );