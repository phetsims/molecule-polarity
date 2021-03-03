// Copyright 2014-2020, University of Colorado Boulder

/**
 * Abstract base type for 2D surfaces.
 * The 'look' of 2D surfaces is similar to the corresponding Jmol 3D isosurfaces, see http://jmol.sourceforge.net/docs/surface/.
 * Shapes are created in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Shape from '../../../../kite/js/Shape.js';
import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Molecule from '../../common/model/Molecule.js';
import MPConstants from '../../common/MPConstants.js';
import MoleculeAngleDragListener from '../../common/view/MoleculeAngleDragListener.js';
import moleculePolarity from '../../moleculePolarity.js';

// constants
const DIAMETER_SCALE = 2.25; // multiply atom diameters by this scale when computing surface size

class SurfaceNode extends Node {

  /**
   * @param {Molecule} molecule
   * @param {ColorDef[]} colors
   * @param {Object} [options]
   * @abstract
   */
  constructor( molecule, colors, options ) {
    assert && assert( molecule instanceof Molecule, 'molecule must be a DiatomicMolecule' );
    assert && assert( molecule.atomA.diameter === molecule.atomB.diameter,
      'creation of gradient assumes that both atoms have the same diameter' );
    assert && assert( Array.isArray( colors ), 'invalid colors' );

    options = merge( {
      tandem: Tandem.REQUIRED,
      phetioReadOnly: true
    }, options );

    super( options );

    // @private
    this.molecule = molecule;
    this.electronegativityRange = MPConstants.ELECTRONEGATIVITY_RANGE;
    this.colors = colors;

    // each atom is surrounded with a 'cloud' (circle)
    const radius = this.molecule.atomA.diameter * DIAMETER_SCALE / 2;
    this.path = new Path( new Shape()
      .arc( molecule.position.x - this.molecule.atomB.positionProperty.get().x, molecule.position.y - this.molecule.atomB.positionProperty.get().y, radius, Math.PI / 4, 7 * Math.PI / 4 )
      .arc( molecule.position.x - this.molecule.atomA.positionProperty.get().x, molecule.position.y - this.molecule.atomA.positionProperty.get().y, radius, 5 * Math.PI / 4, 3 * Math.PI / 4 )
    );
    this.addChild( this.path );

    // update surface when atoms move or electronegativity changes
    const update = () => {
      if ( this.visible ) {
        this.updateFill();
      }
    };
    molecule.atoms.forEach( atom => atom.electronegativityProperty.link( update ) ); // unlink not needed

    // unlink not needed
    molecule.angleProperty.link( angle => {
      if ( this.visible ) {
        this.matrix = molecule.createTransformMatrix();
      }
    } );

    this.cursor = 'pointer';
    this.addInputListener( new MoleculeAngleDragListener( molecule, this ) );
  }

  /**
   * Updates the fill when this Node become visible.
   * @param {boolean} visible
   * @public
   * @override
   */
  setVisible( visible ) {
    super.setVisible( visible );
    if ( visible ) {
      this.matrix = this.molecule.createTransformMatrix();
      this.updateFill();
    }
  }

  /**
   * Gets the surface width.
   * @returns {number}
   * @protected
   */
  getSurfaceWidth() {
    return this.molecule.bond.getLength() + ( DIAMETER_SCALE * this.molecule.atomA.diameter / 2 ) + ( DIAMETER_SCALE * this.molecule.atomB.diameter / 2 );
  }

  /**
   * Updates the surface fill.
   * @private
   * @abstract
   */
  updateFill() {
    throw new Error( 'must be implemented by subtype' );
  }
}

moleculePolarity.register( 'SurfaceNode', SurfaceNode );

export default SurfaceNode;