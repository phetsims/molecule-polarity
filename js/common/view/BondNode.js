// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation of a bond between 2 atoms.
 * Intended to be rendered before the 2 atoms, so that the atoms cover the portion of the bond that overlaps the atoms.
 * Shapes are created in world coordinates, so this node's offset should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );

  function BondNode( bond ) {

    var thisNode = this;
    Line.call( thisNode, bond.atom1.locationProperty.get(), bond.atom2.locationProperty.get(), { stroke: MPColors.BOND, lineWidth: 12 } );

    thisNode.strokePickable = true; // include stroke in hit-testing

    // adjust the bond when its endpoints change
    bond.atom1.locationProperty.link( function( location ) { thisNode.setPoint1( location ); } );
    bond.atom2.locationProperty.link( function( location ) { thisNode.setPoint2( location ); } );
  }

  return inherit( Line, BondNode );
} );

