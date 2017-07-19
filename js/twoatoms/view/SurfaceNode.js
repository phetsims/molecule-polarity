// Copyright 2017, University of Colorado Boulder

/**
 * Abstract base type for 2D surfaces.
 * The 'look' of 2D surfaces is similar to the corresponding Jmol 3D isosurfaces, see http://jmol.sourceforge.net/docs/surface/.
 * Shapes are created in global coordinates, so this node's location should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DiatomicMolecule = require( 'MOLECULE_POLARITY/twoatoms/model/DiatomicMolecule' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeAngleDragHandler = require( 'MOLECULE_POLARITY/common/view/MoleculeAngleDragHandler' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  // constants
  var DIAMETER_SCALE = 2.25; // multiply atom diameters by this scale when computing surface size

  /**
   * @param {DiatomicMolecule} molecule
   * @param {Color|string[]} colors
   * @constructor
   * @abstract
   */
  function SurfaceNode( molecule, colors ) {

    assert && assert( molecule instanceof DiatomicMolecule );
    assert && assert( molecule.atomA.diameter === molecule.atomB.diameter,
      'creation of gradient assumes that both atoms have the same diameter' );

    var self = this;

    Node.call( this );

    // @private
    this.molecule = molecule;
    this.electronegativityRange = MPConstants.ELECTRONEGATIVITY_RANGE;
    this.colors = colors;

    // each atom is surrounded with a 'cloud' (circle)
    var radius = this.molecule.atomA.diameter * DIAMETER_SCALE / 2;
    this.path = new Path( new Shape()
      .arc( molecule.location.x - this.molecule.atomB.locationProperty.get().x, molecule.location.y - this.molecule.atomB.locationProperty.get().y, radius, Math.PI / 4, 7 * Math.PI / 4 )
      .arc( molecule.location.x - this.molecule.atomA.locationProperty.get().x, molecule.location.y - this.molecule.atomA.locationProperty.get().y, radius, 5 * Math.PI / 4, 3 * Math.PI / 4 )
    );
    this.addChild( this.path );

    // update surface when atoms move or electronegativity changes
    var update = function() {
      if ( self.visible ) {
        self.updateFill();
      }
    };
    molecule.atoms.forEach( function( atom ) {
      atom.electronegativityProperty.link( update ); // unlink not needed
    } );

    // unlink not needed
    molecule.angleProperty.link( function( angle ) {
      if ( self.visible ) {
        self.matrix = molecule.createTransformMatrix();
      }
    } );

    this.cursor = 'pointer';
    this.addInputListener( new MoleculeAngleDragHandler( molecule, this ) );
  }

  moleculePolarity.register( 'SurfaceNode', SurfaceNode );

  return inherit( Node, SurfaceNode, {

    /**
     * Updates the fill when this Node become visible.
     * @param {boolean} visible
     * @public
     * @override
     */
    setVisible: function( visible ) {
      Node.prototype.setVisible.call( this, visible );
      if ( visible ) {
        this.matrix = this.molecule.createTransformMatrix();
        this.updateFill();
      }
    },

    /**
     * Gets the surface width.
     * @returns {number}
     * @protected
     */
    getSurfaceWidth: function() {
      return this.molecule.bond.getLength() + ( DIAMETER_SCALE * this.molecule.atomA.diameter / 2 ) + ( DIAMETER_SCALE * this.molecule.atomB.diameter / 2 );
    },

    /**
     * Updates the surface fill.
     * @private
     * @abstract
     */
    updateFill: function() {
      throw new Error( 'must be implemented by subtype' );
    }
  } );
} );