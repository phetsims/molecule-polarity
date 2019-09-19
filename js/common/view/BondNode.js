// Copyright 2014-2017, University of Colorado Boulder

/**
 * Visual representation of a bond between 2 atoms.
 * Intended to be rendered before the 2 atoms, so that the atoms cover the portion of the bond that overlaps the atoms.
 * Shapes are created in global coordinates, so this node's location should be (0,0).
 * Clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'SCENERY/nodes/Line' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );

  /**
   * @param {Bond} bond
   * @constructor
   */
  function BondNode( bond ) {

    const self = this;

    Line.call( this, bond.atom1.locationProperty.get(), bond.atom2.locationProperty.get(), {
      stroke: MPColors.BOND,
      lineWidth: 12,
      strokePickable: true // include stroke in hit-testing
    } );

    // adjust the bond when its endpoints change, unlinks not needed
    bond.atom1.locationProperty.link( function( location ) { self.setPoint1( location ); } );
    bond.atom2.locationProperty.link( function( location ) { self.setPoint2( location ); } );
  }

  moleculePolarity.register( 'BondNode', BondNode );

  return inherit( Line, BondNode );
} );

