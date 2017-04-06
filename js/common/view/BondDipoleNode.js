// Copyright 2014-2017, University of Colorado Boulder

/**
 * Visual representation of a bond dipole.
 * Controls its own position in world coordinates, so clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var DipoleNode = require( 'MOLECULE_POLARITY/common/view/DipoleNode' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );

  // constants
  var PERPENDICULAR_OFFSET = 55; // offset perpendicular to the axis of the bond

  /**
   * @param {Bond} bond
   * @constructor
   */
  function BondDipoleNode( bond ) {

    var self = this;
    
    DipoleNode.call( this, bond.dipoleProperty, MPColors.BOND_DIPOLE );

    // position the dipole to be parallel with the bond, with some perpendicular offset, unlink not needed
    bond.dipoleProperty.link( function( dipole ) {

      var bondAngle = bond.getAngle();
      var isInPhase = Math.abs( bondAngle - dipole.angle() ) < ( Math.PI / 4 );
      var dipoleViewLength = dipole.magnitude() * ( self.referenceLength / self.referenceMagnitude );

      // location of tail in polar coordinates, relative to center of bond
      var offsetX = isInPhase ? ( dipoleViewLength / 2 ) : -( dipoleViewLength / 2 );
      var offsetAngle = Math.atan( offsetX / PERPENDICULAR_OFFSET );
      var tailDistance = PERPENDICULAR_OFFSET / Math.cos( offsetAngle );
      var tailAngle = bondAngle - ( Math.PI / 2 ) - offsetAngle;

      // location of tail in Cartesian coordinates, relative to center of bond
      var tailX = tailDistance * Math.cos( tailAngle );
      var tailY = tailDistance * Math.sin( tailAngle );

      // location of tail in world coordinate frame
      self.translation = bond.getCenter().plusXY( tailX, tailY );
    } );
  }

  moleculePolarity.register( 'BondDipoleNode', BondDipoleNode );

  return inherit( DipoleNode, BondDipoleNode, {}, {

    /**
     * Creates an icon, for use in control panels.
     * @returns {DipoleNode}
     * @public
     * @static
     */
    createIcon: function() {
      return DipoleNode.createIcon( MPColors.BOND_DIPOLE );
    }
  } );
} );