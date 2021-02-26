// Copyright 2014-2020, University of Colorado Boulder

/**
 * Visual representation of a bond dipole.
 * Controls its own position, so clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import moleculePolarity from '../../moleculePolarity.js';
import MPColors from '../MPColors.js';
import DipoleNode from './DipoleNode.js';

// constants
const PERPENDICULAR_OFFSET = 55; // offset perpendicular to the axis of the bond

class BondDipoleNode extends DipoleNode {

  /**
   * @param {Bond} bond
   */
  constructor( bond ) {

    super( bond.dipoleProperty, MPColors.BOND_DIPOLE );

    // position the dipole to be parallel with the bond, with some perpendicular offset, unlink not needed
    bond.dipoleProperty.link( dipole => {

      const bondAngle = bond.getAngle();
      const isInPhase = Math.abs( bondAngle - dipole.angle ) < ( Math.PI / 4 );
      const dipoleViewLength = dipole.magnitude * ( this.referenceLength / this.referenceMagnitude );

      // position of tail in polar coordinates, relative to center of bond
      const offsetX = isInPhase ? ( dipoleViewLength / 2 ) : -( dipoleViewLength / 2 );
      const offsetAngle = Math.atan( offsetX / PERPENDICULAR_OFFSET );
      const tailDistance = PERPENDICULAR_OFFSET / Math.cos( offsetAngle );
      const tailAngle = bondAngle - ( Math.PI / 2 ) - offsetAngle;

      // position of tail in Cartesian coordinates, relative to center of bond
      const tailX = tailDistance * Math.cos( tailAngle );
      const tailY = tailDistance * Math.sin( tailAngle );

      // position of tail in global coordinate frame
      this.translation = bond.getCenter().plusXY( tailX, tailY );
    } );
  }

  /**
   * Creates an icon, for use in control panels.
   * @returns {DipoleNode}
   * @public
   * @static
   */
  static createIcon() {
    return DipoleNode.createIcon( MPColors.BOND_DIPOLE );
  }
}

moleculePolarity.register( 'BondDipoleNode', BondDipoleNode );

export default BondDipoleNode;