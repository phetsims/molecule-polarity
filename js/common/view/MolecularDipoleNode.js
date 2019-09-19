// Copyright 2014-2019, University of Colorado Boulder

/**
 * Visual representation of a molecular dipole.
 * Controls its own position in global coordinates, so clients should not attempt to position this node.
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
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const OFFSET = 55; // offset in the direction that the dipole points

  /**
   * @param {Molecule} molecule
   * @constructor
   */
  function MolecularDipoleNode( molecule ) {

    DipoleNode.call( this, molecule.dipoleProperty, MPColors.MOLECULAR_DIPOLE );

    // position the dipole with some radial offset from the molecule's location, unlink not needed
    const self = this;
    molecule.dipoleProperty.link( function( dipole ) {

      // offset vector relative to molecule location
      const v = Vector2.createPolar( OFFSET, dipole.angle );

      // offset in global coordinate frame
      self.translation = molecule.location.plus( v );
    } );
  }

  moleculePolarity.register( 'MolecularDipoleNode', MolecularDipoleNode );

  return inherit( DipoleNode, MolecularDipoleNode, {}, {

    /**
     * Creates an icon, for use in control panels.
     * @returns {DipoleNode}
     * @public
     * @static
     */
    createIcon: function() {
      return DipoleNode.createIcon( MPColors.MOLECULAR_DIPOLE );
    }
  } );
} );
