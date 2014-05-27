// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation of a molecular dipole.
 * Controls its own position in world coordinates, so clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var DipoleNode = require( 'MOLECULE_POLARITY/common/view/DipoleNode' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var OFFSET = 55; // offset in the direction that the dipole points

  /**
   * @param {Molecule} molecule
   * @constructor
   */
  function MolecularDipoleNode( molecule ) {

    var thisNode = this;
    DipoleNode.call( thisNode, molecule.dipoleProperty, MPColors.MOLECULAR_DIPOLE );

    // position the dipole with some radial offset from the molecule's location
    molecule.dipoleProperty.link( function( dipole ) {

      // offset vector relative to molecule location
      var v = Vector2.createPolar( OFFSET, dipole.angle() );

      // offset in world coordinate frame
      thisNode.translation = molecule.location.plus( v );
    } );
  }

  return inherit( DipoleNode, MolecularDipoleNode, {}, {

    // @static creates an icon, for use in control panels
    createIcon: function() {
      return DipoleNode.createIcon( MPColors.MOLECULAR_DIPOLE );
    }
  } );
} );
