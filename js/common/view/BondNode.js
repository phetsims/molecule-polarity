// Copyright 2014-2021, University of Colorado Boulder

/**
 * Visual representation of a bond between 2 atoms.
 * Intended to be rendered before the 2 atoms, so that the atoms cover the portion of the bond that overlaps the atoms.
 * Shapes are created in global coordinates, so this node's position should be (0,0).
 * Clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Line } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import Bond from '../model/Bond.js';
import MPColors from '../MPColors.js';

class BondNode extends Line {

  /**
   * @param {Bond} bond
   * @param {Object} [options]
   */
  constructor( bond, options ) {
    assert && assert( bond instanceof Bond, 'invalid bond' );

    options = merge( {
      stroke: MPColors.BOND,
      lineWidth: 12,
      strokePickable: true, // include stroke in hit-testing
      tandem: Tandem.REQUIRED,
      visiblePropertyOptions: { phetioReadOnly: true }
    }, options );

    super( bond.atom1.positionProperty.value, bond.atom2.positionProperty.value, options );

    // adjust the bond when its endpoints change, unlinks not needed
    bond.atom1.positionProperty.link( position => this.setPoint1( position ) );
    bond.atom2.positionProperty.link( position => this.setPoint2( position ) );
  }
}

moleculePolarity.register( 'BondNode', BondNode );
export default BondNode;