// Copyright 2014-2021, University of Colorado Boulder

/**
 * Visual representation of a molecular dipole.
 * Controls its own position in global coordinates, so clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import moleculePolarity from '../../moleculePolarity.js';
import Molecule from '../model/Molecule.js';
import MPColors from '../MPColors.js';
import DipoleNode from './DipoleNode.js';

// constants
const OFFSET = 55; // offset in the direction that the dipole points

class MolecularDipoleNode extends DipoleNode {

  /**
   * @param {Molecule} molecule
   * @param {Object} [options]
   */
  constructor( molecule, options ) {
    assert && assert( molecule instanceof Molecule, 'invalid molecule' );

    options = merge( {
      fill: MPColors.MOLECULAR_DIPOLE
    }, options );

    super( molecule.dipoleProperty, options );

    // position the dipole with some radial offset from the molecule's position, unlink not needed
    molecule.dipoleProperty.link( dipole => {

      // offset vector relative to molecule position
      const v = Vector2.createPolar( OFFSET, dipole.angle );

      // offset in global coordinate frame
      this.translation = molecule.position.plus( v );
    } );
  }

  /**
   * Creates an icon, for use in control panels.
   * @param {Object} [options] - DipoleNode options
   * @returns {Node}
   * @public
   * @static
   */
  static createIcon( options ) {
    return DipoleNode.createIcon( merge( {
      fill: MPColors.MOLECULAR_DIPOLE
    }, options ) );
  }
}

moleculePolarity.register( 'MolecularDipoleNode', MolecularDipoleNode );
export default MolecularDipoleNode;