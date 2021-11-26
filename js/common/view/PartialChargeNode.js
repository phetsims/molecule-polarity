// Copyright 2014-2021, University of Colorado Boulder

/**
 * Visual representations of partial charge, a delta symbol followed by either + or -.
 * Controls its own position in global coordinates, so clients should not attempt to position it.
 * Uses static factory methods to supply the needed instances for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node } from '../../../../scenery/js/imports.js';
import { Text } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import Atom from '../model/Atom.js';
import MPConstants from '../MPConstants.js';

// constants
const REFERENCE_MAGNITUDE = MPConstants.ELECTRONEGATIVITY_RANGE.getLength();
const REFERENCE_SCALE = 1;

class PartialChargeNode extends Node {

  /**
   * @param {Atom} atom
   * @param {function} unitVectorFunction has no parameters, returns {Vector}
   * @param {Object} [options]
   */
  constructor( atom, unitVectorFunction, options ) {
    assert && assert( atom instanceof Atom, 'invalid atom' );
    assert && assert( typeof unitVectorFunction === 'function', 'invalid unitVectorFunction' );

    super( options );

    // textNode has a maxWidth for i18n. Then wrap chargeNode, so that we can scale it.
    const textNode = new Text( '?', {
      font: new PhetFont( 32 ),
      fill: 'black',
      maxWidth: 50
    } );
    const chargeNode = new Node( {
      children: [ textNode ]
    } );
    this.addChild( chargeNode );

    // @public
    this.update = () => {
      const partialCharge = atom.partialChargeProperty.value;

      // invisible if dipole is zero
      const partialChargeVisible = ( partialCharge !== 0 );

      textNode.visible = partialChargeVisible;

      // Only update if the partial charge is visible
      if ( partialChargeVisible ) {

        // d+ or d-
        textNode.text = ( partialCharge > 0 ) ? moleculePolarityStrings.deltaPlus : moleculePolarityStrings.deltaMinus;

        // size proportional to bond dipole magnitude
        const scale = Math.abs( REFERENCE_SCALE * partialCharge / REFERENCE_MAGNITUDE );
        if ( scale !== 0 ) {
          chargeNode.setScaleMagnitude( scale );
          chargeNode.centerX = 0;
          chargeNode.centerY = 0;
        }

        // A vector that points in the direction we will need to move the charge node.
        const unitVector = unitVectorFunction.apply();

        // Compute the amount to move the partial charge node
        const multiplier = ( atom.diameter / 2 ) + ( Math.max( this.width, this.height ) / 2 ) + 3;
        const relativeOffset = unitVector.timesScalar( multiplier );
        this.translation = atom.positionProperty.value.plus( relativeOffset );
      }
    };

    atom.partialChargeProperty.link( this.update.bind( this ) ); // unlink not needed
    atom.positionProperty.link( this.update.bind( this ) ); // unlink not needed

    // Update when this Node becomes visible
    this.visibleProperty.link( visible => visible && this.update() );
  }

  /**
   * Partial charge for an atom that participates in a single bond.
   * It's partial charge is the opposite of the charge of the other atom in the bond.
   * The charge is placed along the axis of the bond, away from the atom.
   * @static
   * @param {Atom} atom
   * @param {Bond} bond
   * @param {Object} [options] - options to PartialChargeNode
   * @returns {PartialChargeNode}
   * @public
   * @static
   */
  static createOppositePartialChargeNode( atom, bond, options ) {
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
   * @static
   * @param {Atom} atom
   * @param {Molecule} molecule
   * @param {Object} [options]
   * @returns {PartialChargeNode}
   * @public
   * @static
   */
  static createCompositePartialChargeNode( atom, molecule, options ) {
    const node = new PartialChargeNode( atom, () => {
      if ( molecule.dipoleProperty.value.magnitude > 0 ) {
        return molecule.dipoleProperty.value.rotated( Math.PI ).normalize();
      }
      else {
        // can't normalize a zero-magnitude vector, so create our own with the proper angle
        return new Vector2( 1, molecule.dipoleProperty.value.angle );
      }
    }, options );
    molecule.dipoleProperty.link( node.update.bind( this ) ); // unlink not needed
    return node;
  }
}

moleculePolarity.register( 'PartialChargeNode', PartialChargeNode );
export default PartialChargeNode;