// Copyright 2014-2026, University of Colorado Boulder

/**
 * Visual representations of partial charge, a delta symbol followed by either + or -.
 * Controls its own position in global coordinates, so clients should not attempt to position it.
 * Uses static factory methods to supply the needed instances for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import TriatomicMolecule from '../../threeatoms/model/TriatomicMolecule.js';
import Atom from '../model/Atom.js';
import Bond from '../model/Bond.js';
import MPConstants from '../MPConstants.js';

// constants
const REFERENCE_MAGNITUDE = MPConstants.ELECTRONEGATIVITY_RANGE.getLength();
const REFERENCE_SCALE = 1;

type SelfOptions = {
  labelExtraSpace?: number;
};

type PartialChargeNodeOptions = SelfOptions & PickOptional<NodeOptions, 'visibleProperty'>;

export default class PartialChargeNode extends Node {

  private readonly update: () => void;

  public constructor( atom: Atom, unitVectorFunction: () => Vector2, providedOptions?: PartialChargeNodeOptions ) {

    const options = optionize<PartialChargeNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      isDisposable: false,

      // SelfOptions
      labelExtraSpace: 5
    }, providedOptions );

    super( options );

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
        const multiplier = ( atom.diameter / 2 ) + ( Math.max( this.width, this.height ) / 2 ) + options.labelExtraSpace;
        const relativeOffset = unitVector.timesScalar( multiplier );
        this.translation = atom.positionProperty.value.plus( relativeOffset );
      }
      else {
        // Set the translation anyways so the molecule bounds are correct
        this.translation = atom.positionProperty.value;
      }
    };

    // Changing any of these Properties requires an update.
    atom.partialChargeProperty.link( this.update.bind( this ) );
    labelText.boundsProperty.link( this.update.bind( this ) );

    // Update when this Node becomes visible
    this.visibleProperty.link( visible => visible && this.update() );
  }

  public updateLabelPosition(): void {
    this.update();
  }

  /**
   * Partial charge for an atom that participates in a single bond.
   * It's partial charge is the opposite of the charge of the other atom in the bond.
   * The charge is placed along the axis of the bond, away from the atom.
   */
  public static createOppositePartialChargeNode( atom: Atom, bond: Bond, options?: PartialChargeNodeOptions ): PartialChargeNode {
    return new PartialChargeNode( atom, () => {

      // along the bond axis, in the direction of the atom
      let v = atom.positionProperty.value.minus( bond.getCenter() );

      /*
       * Avoid the case where pressing Reset All causes the atoms to swap positions, temporarily resulting
       * in a zero-magnitude vector when the first atom has moved but the second atom hasn't moved yet.
       * This sorts this out when both atoms have moved.
       */
      if ( v.magnitude > 0 ) {
        v = v.normalize();
      }
      else {
        v = new Vector2( 1, 0 ); // default to pointing to the right
      }
      return v;
    }, options );
  }

  /**
   * Partial charge for an atom that participates in more than one bond.
   * Its partial charge is the composite of charges contributed by other atoms in the bonds.
   * If possible, charge is placed opposite to the molecular dipole.
   * But some extra logic is needed to avoid overlap with the bonds.
   */
  public static createCompositePartialChargeNode( atom: Atom, molecule: TriatomicMolecule, options?: PartialChargeNodeOptions ): PartialChargeNode {
    const node = new PartialChargeNode( atom, () => {

      // If the dipole is big enough, place the charge opposite to the dipole.
      if ( molecule.dipoleProperty.value.magnitude > 0.01 ) {
        return molecule.dipoleProperty.value.rotated( Math.PI ).normalize();
      }
      else {

        // Otherwise, position it perpendicular to one of the bond axes.
        return Vector2.createPolar( 1, molecule.bondAngleABProperty.value + molecule.angleProperty.value - Math.PI / 2 );
      }
    }, options );
    molecule.dipoleProperty.link( node.update.bind( this ) );
    return node;
  }
}

moleculePolarity.register( 'PartialChargeNode', PartialChargeNode );