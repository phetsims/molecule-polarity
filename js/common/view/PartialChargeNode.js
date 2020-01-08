// Copyright 2014-2020, University of Colorado Boulder

/**
 * Visual representations of partial charge, a delta symbol followed by either + or -.
 * Controls its own position in global coordinates, so clients should not attempt to position it.
 * Uses static factory methods to supply the needed instances for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const deltaMinusString = require( 'string!MOLECULE_POLARITY/deltaMinus' );
  const deltaPlusString = require( 'string!MOLECULE_POLARITY/deltaPlus' );

  // constants
  const REFERENCE_MAGNITUDE = MPConstants.ELECTRONEGATIVITY_RANGE.getLength();
  const REFERENCE_SCALE = 1;

  /**
   * @param {Atom} atom
   * @param {function} unitVectorFunction has no parameters, returns {Vector}
   * @constructor
   */
  function PartialChargeNode( atom, unitVectorFunction ) {

    const self = this;

    Node.call( this );

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

    // @private
    this.update = function() {
      const partialCharge = atom.partialChargeProperty.get();

      textNode.visible = ( partialCharge !== 0 ); // invisible if dipole is zero

      // Only update if the partial charge is visible
      if ( partialCharge !== 0 ) {

        // d+ or d-
        textNode.text = ( partialCharge > 0 ) ? deltaPlusString : deltaMinusString;

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
        const multiplier = ( atom.diameter / 2 ) + ( Math.max( self.width, self.height ) / 2 ) + 3;
        const relativeOffset = unitVector.timesScalar( multiplier );
        self.translation = atom.positionProperty.get().plus( relativeOffset );
      }
    };

    atom.partialChargeProperty.link( this.update.bind( this ) ); // unlink not needed
    atom.positionProperty.link( this.update.bind( this ) ); // unlink not needed
  }

  moleculePolarity.register( 'PartialChargeNode', PartialChargeNode );

  return inherit( Node, PartialChargeNode, {

    // @public @override
    setVisible: function( visible ) {
      Node.prototype.setVisible.call( this, visible );
      this.update();
    }
  }, {

    /**
     * Partial charge for an atom that participates in a single bond.
     * It's partial charge is the opposite of the charge of the other atom in the bond.
     * The charge is placed along the axis of the bond, away from the atom.
     * @static
     * @param {Atom} atom
     * @param {Bond} bond
     * @returns {PartialChargeNode}
     * @public
     * @static
     */
    createOppositePartialChargeNode: function( atom, bond ) {
      return new PartialChargeNode( atom, function() {

        // along the bond axis, in the direction of the atom
        let v = atom.positionProperty.get().minus( bond.getCenter() );

        /*
         * Avoid the case where pressing Reset All causes the atoms to swap positions, temporarily resulting
         * in a zero-magnitude vector when the first atom has moved but the second atom hasn't moved yet.
         * This sorts itself out when both atoms have moved.
         */
        if ( v.magnitude > 0 ) {
          v = v.normalize();
        }
        return v;
      } );
    },

    /**
     * Partial charge for an atom that participates in more than one bond.
     * Its partial charge is the composite of charges contributed by other atoms in the bonds.
     * The charge is placed along the axis of the molecular dipole, on the opposite side of the atom from the dipole.
     * @static
     * @param {Atom} atom
     * @param {Molecule} molecule
     * @returns {PartialChargeNode}
     * @public
     * @static
     */
    createCompositePartialChargeNode: function( atom, molecule ) {
      const node = new PartialChargeNode( atom, function() {
        if ( molecule.dipoleProperty.get().magnitude > 0 ) {
          return molecule.dipoleProperty.get().rotated( Math.PI ).normalize();
        }
        else {
          // can't normalize a zero-magnitude vector, so create our own with the proper angle
          return new Vector2( 1, molecule.dipoleProperty.get().angle );
        }
      } );
      molecule.dipoleProperty.link( node.update.bind( this ) ); // unlink not needed
      return node;
    }
  } );
} );

