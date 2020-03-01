// Copyright 2014-2020, University of Colorado Boulder

/**
 * Visual representation of a molecular dipole.
 * Controls its own position in global coordinates, so clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPColors from '../MPColors.js';
import DipoleNode from './DipoleNode.js';

// constants
const OFFSET = 55; // offset in the direction that the dipole points

class MolecularDipoleNode extends DipoleNode {

  /**
   * @param {Molecule} molecule
   */
  constructor( molecule ) {

    super( molecule.dipoleProperty, MPColors.MOLECULAR_DIPOLE );

    // position the dipole with some radial offset from the molecule's position, unlink not needed
    const self = this;
    molecule.dipoleProperty.link( function( dipole ) {

      // offset vector relative to molecule position
      const v = Vector2.createPolar( OFFSET, dipole.angle );

      // offset in global coordinate frame
      self.translation = molecule.position.plus( v );
    } );
  }

  /**
   * Creates an icon, for use in control panels.
   * @returns {DipoleNode}
   * @public
   * @static
   */
  static createIcon() {
    return DipoleNode.createIcon( MPColors.MOLECULAR_DIPOLE );
  }
}

moleculePolarity.register( 'MolecularDipoleNode', MolecularDipoleNode );

export default MolecularDipoleNode;