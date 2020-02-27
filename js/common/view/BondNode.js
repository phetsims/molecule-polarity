// Copyright 2014-2020, University of Colorado Boulder

/**
 * Visual representation of a bond between 2 atoms.
 * Intended to be rendered before the 2 atoms, so that the atoms cover the portion of the bond that overlaps the atoms.
 * Shapes are created in global coordinates, so this node's position should be (0,0).
 * Clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPColors from '../MPColors.js';

/**
 * @param {Bond} bond
 * @constructor
 */
function BondNode( bond ) {

  const self = this;

  Line.call( this, bond.atom1.positionProperty.get(), bond.atom2.positionProperty.get(), {
    stroke: MPColors.BOND,
    lineWidth: 12,
    strokePickable: true // include stroke in hit-testing
  } );

  // adjust the bond when its endpoints change, unlinks not needed
  bond.atom1.positionProperty.link( function( position ) { self.setPoint1( position ); } );
  bond.atom2.positionProperty.link( function( position ) { self.setPoint2( position ); } );
}

moleculePolarity.register( 'BondNode', BondNode );

inherit( Line, BondNode );
export default BondNode;