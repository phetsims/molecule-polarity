// Copyright 2002-2014, University of Colorado Boulder

/**
 * Base type for the visual representations of partial charge, a delta symbol followed by either + or -.
 * Controls its own position in world coordinates, so clients should not attempt to position it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var deltaString = '\u03B4'; // i18n not required

  // constants
  var REFERENCE_MAGNITUDE = MPConstants.ELECTRONEGATIVITY_RANGE.getLength();
  var REFERENCE_SCALE = 1;

  /**
   * @param {Atom} atom
   * @param {Function} unitVectorFunction has no parameters, returns {Vector}
   * @constructor
   */
  function PartialChargeNode( atom, unitVectorFunction ) {

    var thisNode = this;
    Node.call( thisNode );

    var textNode = new Text( '?', { font: new PhetFont( 32 ), fill: 'black' } );
    thisNode.addChild( textNode );

    // @private
    thisNode.update = function() {
      var partialCharge = atom.partialChargeProperty.get();

      textNode.visible = ( partialCharge !== 0 ); // invisible if dipole is zero

      if ( partialCharge !== 0 ) {

        // d+ or d-
        textNode.text = deltaString + ( ( partialCharge > 0 ) ? '+' : '-' );

        // size proportional to bond dipole magnitude
        var scale = Math.abs( REFERENCE_SCALE * partialCharge / REFERENCE_MAGNITUDE );
        if ( scale !== 0 ) {
          textNode.setScaleMagnitude( scale );
          textNode.centerX = 0;
          textNode.centerY = 0;
        }

        // A vector that points in the direction we will need to move the charge node.
        var unitVector = unitVectorFunction.apply();

        // Compute the amount to move the partial charge node
        var multiplier = ( atom.diameter / 2 ) + ( Math.max( thisNode.width, thisNode.height ) / 2 ) + 3;
        var relativeOffset = unitVector.timesScalar( multiplier );
        thisNode.translation = atom.locationProperty.get().plus( relativeOffset );
      }
    };
    atom.partialChargeProperty.link( thisNode.update.bind( thisNode ) );
    atom.locationProperty.link( thisNode.update.bind( thisNode ) );
  }

  return inherit( Node, PartialChargeNode, {}, {

    /*
     * Partial charge for an atom that participates in a single bond.
     * It's partial charge is the opposite of the charge of the other atom in the bond.
     * The charge is placed along the axis of the bond, away from the atom.
     * @static
     * @param {Atom} atom
     * @param {Bond} bond
     * @return {PartialChargeNode}
     */
    createOppositePartialChargeNode: function( atom, bond ) {
      return new PartialChargeNode( atom, function() {
        // along the bond axis, in the direction of the atom
        var v = atom.locationProperty.get().minus( bond.getCenter() );
        /*
         * Avoid the case where pressing Reset All causes the atoms to swap locations, temporarily resulting
         * in a zero-magnitude vector when the first atom has moved but the second atom hasn't moved yet.
         * This sorts itself out when both atoms have moved.
         */
        if ( v.magnitude() > 0 ) {
          v = v.normalize();
        }
        return v;
      } );
    },

    /*
     * Partial charge for an atom that participates in more than one bond.
     * It's partial charge is the composite of charges contributed by other atoms in the bonds.
     * The charge is placed along the axis of the molecular dipole, on the opposite side of the atom from the dipole.
     * @static
     * @param {Atom} atom
     * @param {Bond} bond
     * @return {PartialChargeNode}
     */
    createCompositePartialChargeNode: function( atom, molecule ) {
      var node = new PartialChargeNode( atom, function() {
        if ( molecule.dipoleProperty.get().magnitude() > 0 ) {
          return molecule.dipoleProperty.get().rotated( Math.PI ).normalize();
        }
        else {
          // can't normalize a zero-magnitude vector, so create our own with the proper angle
          return new Vector2( 1, molecule.dipoleProperty.get().angle() );
        }
      } );
      molecule.dipoleProperty.link( node.update.bind( this ) );
      return node;
    }
  } );
} );

