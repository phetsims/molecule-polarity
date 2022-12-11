// Copyright 2014-2022, University of Colorado Boulder

/**
 * Visual representations of partial charge, a delta symbol followed by either + or -.
 * Controls its own position in global coordinates, so clients should not attempt to position it.
 * Uses static factory methods to supply the needed instances for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import Atom from '../model/Atom.js';
import Bond from '../model/Bond.js';
import MPConstants from '../MPConstants.js';
import Molecule from '../model/Molecule.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

// constants
const REFERENCE_MAGNITUDE = MPConstants.ELECTRONEGATIVITY_RANGE.getLength();
const REFERENCE_SCALE = 1;

type SelfOptions = EmptySelfOptions;

type PartialChargeNodeOptions = SelfOptions & PickOptional<NodeOptions, 'visibleProperty'>;

export default class PartialChargeNode extends Node {

  private readonly update: () => void;

  public constructor( atom: Atom, unitVectorFunction: () => Vector2, providedOptions?: PartialChargeNodeOptions ) {

    super( providedOptions );

    const stringProperty = new DerivedProperty( [
        atom.partialChargeProperty,
        MoleculePolarityStrings.deltaPlusStringProperty,
        MoleculePolarityStrings.deltaMinusStringProperty
      ], ( partialCharge: number, deltaPlusString: string, deltaMinusString: string ) =>
        ( partialCharge > 0 ) ? deltaPlusString : deltaMinusString
    );

    // labelText has a maxWidth for i18n. Then wrap chargeNode, so that we can scale it.
    const labelText = new Text( stringProperty, {
      font: new PhetFont( 32 ),
      fill: 'black',
      maxWidth: 50
    } );
    const chargeNode = new Node( {
      children: [ labelText ]
    } );
    this.addChild( chargeNode );

    this.update = () => {
      const partialCharge = atom.partialChargeProperty.value;

      // invisible if dipole is zero
      const partialChargeVisible = ( partialCharge !== 0 );

      labelText.visible = partialChargeVisible;

      // Only update if the partial charge is visible
      if ( partialChargeVisible ) {

        // size proportional to bond dipole magnitude
        const scale = Math.abs( REFERENCE_SCALE * partialCharge / REFERENCE_MAGNITUDE );
        if ( scale !== 0 ) {
          chargeNode.setScaleMagnitude( scale );
          chargeNode.centerX = 0;
          chargeNode.centerY = 0;
        }

        // A vector that points in the direction we will need to move the charge node.
        const unitVector = unitVectorFunction();

        // Compute the amount to move the partial charge node
        const multiplier = ( atom.diameter / 2 ) + ( Math.max( this.width, this.height ) / 2 ) + 3;
        const relativeOffset = unitVector.timesScalar( multiplier );
        this.translation = atom.positionProperty.value.plus( relativeOffset );
      }
    };

    // Changing any of these Properties requires an update.
    atom.partialChargeProperty.link( this.update.bind( this ) );
    atom.positionProperty.link( this.update.bind( this ) );
    labelText.boundsProperty.link( this.update.bind( this ) );

    // Update when this Node becomes visible
    this.visibleProperty.link( visible => visible && this.update() );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Partial charge for an atom that participates in a single bond.
   * It's partial charge is the opposite of the charge of the other atom in the bond.
   * The charge is placed along the axis of the bond, away from the atom.
   */
  public static createOppositePartialChargeNode( atom: Atom, bond: Bond, options?: PartialChargeNodeOptions ): Node {
    return new PartialChargeNode( atom, () => {

      // along the bond axis, in the direction of the atom
      let v = atom.positionProperty.value.minus( bond.getCenter() );

      /*
       * Avoid the case where pressing Reset All causes the atoms to swap positions, temporarily resulting
       * in a zero-magnitude vector when the first atom has moved but the second atom hasn't moved yet.
       * This sorts itthis out when both atoms have moved.
       */
      if ( v.magnitude > 0 ) {
        v = v.normalize();
      }
      return v;
    }, options );
  }

  /**
   * Partial charge for an atom that participates in more than one bond.
   * Its partial charge is the composite of charges contributed by other atoms in the bonds.
   * The charge is placed along the axis of the molecular dipole, on the opposite side of the atom from the dipole.
   */
  public static createCompositePartialChargeNode( atom: Atom, molecule: Molecule, options?: PartialChargeNodeOptions ): Node {
    const node = new PartialChargeNode( atom, () => {
      if ( molecule.dipoleProperty.value.magnitude > 0 ) {
        return molecule.dipoleProperty.value.rotated( Math.PI ).normalize();
      }
      else {
        // can't normalize a zero-magnitude vector, so create our own with the proper angle
        return new Vector2( 1, molecule.dipoleProperty.value.angle );
      }
    }, options );
    molecule.dipoleProperty.link( node.update.bind( this ) );
    return node;
  }
}

moleculePolarity.register( 'PartialChargeNode', PartialChargeNode );