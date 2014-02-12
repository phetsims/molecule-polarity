// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation of a bond dipole.
 * Controls its own position in world coordinates, so clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var DipoleNode = require( 'MOLECULE_POLARITY/common/view/DipoleNode' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var PolarCartesianConverter = require( 'MOLECULE_POLARITY/common/PolarCartesianConverter' );

  // constants
  var PERPENDICULAR_OFFSET = 55; // offset perpendicular to the axis of the bond

  /**
   * @param {Bond} bond
   * @constructor
   */
  function BondDipoleNode( bond ) {

    var thisNode = this;
    DipoleNode.call( thisNode, bond.dipoleProperty, MPColors.BOND_DIPOLE );

    // position the dipole to be parallel with the bond, with some perpendicular offset
    bond.dipoleProperty.link( function( dipole ) {

      var bondAngle = bond.getAngle();
      var isInPhase = Math.abs( bondAngle - dipole.angle() ) < ( Math.PI / 4 );
      var dipoleViewLength = dipole.magnitude() * ( thisNode.referenceLength / thisNode.referenceLength );

      // location of tail in polar coordinates, relative to center of bond
      var offsetX = isInPhase ? ( dipoleViewLength / 2 ) : -( dipoleViewLength / 2 );
      var offsetAngle = Math.atan( offsetX / PERPENDICULAR_OFFSET );
      var tailDistance = PERPENDICULAR_OFFSET / Math.cos( offsetAngle );
      var tailAngle = bondAngle - ( Math.PI / 2 ) - offsetAngle;

      // location of tail in Cartesian coordinates, relative to center of bond
      var tailX = PolarCartesianConverter.getX( tailDistance, tailAngle );
      var tailY = PolarCartesianConverter.getY( tailDistance, tailAngle );

      // location of tail in world coordinate frame
      thisNode.translation = bond.getCenter().plusXY( tailX, tailY );
    } );
  }

  return inherit( DipoleNode, BondDipoleNode, {}, {
    createIcon: function() {
      return DipoleNode.createIcon( MPColors.BOND_DIPOLE );
    }
  } );
} );