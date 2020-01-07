// Copyright 2014-2019, University of Colorado Boulder

/**
 * Visual representation of a bond dipole.
 * Controls its own position, so clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DipoleNode = require( 'MOLECULE_POLARITY/common/view/DipoleNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );

  // constants
  const PERPENDICULAR_OFFSET = 55; // offset perpendicular to the axis of the bond

  /**
   * @param {Bond} bond
   * @constructor
   */
  function BondDipoleNode( bond ) {

    const self = this;

    DipoleNode.call( this, bond.dipoleProperty, MPColors.BOND_DIPOLE );

    // position the dipole to be parallel with the bond, with some perpendicular offset, unlink not needed
    bond.dipoleProperty.link( function( dipole ) {

      const bondAngle = bond.getAngle();
      const isInPhase = Math.abs( bondAngle - dipole.angle ) < ( Math.PI / 4 );
      const dipoleViewLength = dipole.magnitude * ( self.referenceLength / self.referenceMagnitude );

      // position of tail in polar coordinates, relative to center of bond
      const offsetX = isInPhase ? ( dipoleViewLength / 2 ) : -( dipoleViewLength / 2 );
      const offsetAngle = Math.atan( offsetX / PERPENDICULAR_OFFSET );
      const tailDistance = PERPENDICULAR_OFFSET / Math.cos( offsetAngle );
      const tailAngle = bondAngle - ( Math.PI / 2 ) - offsetAngle;

      // position of tail in Cartesian coordinates, relative to center of bond
      const tailX = tailDistance * Math.cos( tailAngle );
      const tailY = tailDistance * Math.sin( tailAngle );

      // position of tail in global coordinate frame
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