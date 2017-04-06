// Copyright 2014-2017, University of Colorado Boulder

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
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );

  /**
   * @param {Bond} bond
   * @constructor
   */
  function BondNode( bond ) {

    Line.call( this, bond.atom1.locationProperty.get(), bond.atom2.locationProperty.get(), {
      stroke: MPColors.BOND,
      lineWidth: 12,
      strokePickable: true // include stroke in hit-testing
    } );

    // adjust the bond when its endpoints change, unlinks not needed
    var self = this;
    bond.atom1.locationProperty.link( function( location ) { self.setPoint1( location ); } );
    bond.atom2.locationProperty.link( function( location ) { self.setPoint2( location ); } );
  }

  moleculePolarity.register( 'BondNode', BondNode );

  return inherit( Line, BondNode );
} );

