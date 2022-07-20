// Copyright 2014-2021, University of Colorado Boulder

/**
 * A pair of arrows used to indicate that an atom can be rotated.
 * Shapes are created in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import CurvedArrowShape from '../../../../scenery-phet/js/CurvedArrowShape.js';
import { Node, Path } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Atom from '../../common/model/Atom.js';
import Molecule from '../../common/model/Molecule.js';
import moleculePolarity from '../../moleculePolarity.js';

class RotateArrowsNode extends Node {

  /**
   * @param {Molecule} molecule
   * @param {Atom} atom
   * @param {Object} [options]
   */
  constructor( molecule, atom, options ) {
    assert && assert( molecule instanceof Molecule, 'invalid molecule' );
    assert && assert( atom instanceof Atom, 'invalid atom' );

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED,
      visiblePropertyOptions: { phetioReadOnly: true }
    }, options );

    // arrow configuration
    const arrowShapeOptions = { headWidth: 30, headHeight: 15, tailWidth: 15 };
    const arrowPathOptions = { fill: atom.color, stroke: 'gray' };
    const radius = ( 0.5 * atom.diameter ) + ( 0.5 * arrowShapeOptions.headWidth ) + 2; // distance of arrow's tip from the atom's center
    const theta = 0.1 * Math.PI; // central angle of the arc that the arrow traces

    assert && assert( !options.children, 'RotateArrowsNode sets children' );
    options.children = [
      new Path( new CurvedArrowShape( radius, -theta, theta, arrowShapeOptions ), arrowPathOptions ),
      new Path( new CurvedArrowShape( radius, Math.PI - theta, Math.PI + theta, arrowShapeOptions ), arrowPathOptions )
    ];

    super( options );

    // Sync with atom position. unlink not needed
    atom.positionProperty.link( position => {
      this.translation = position;
    } );
  }
}

moleculePolarity.register( 'RotateArrowsNode', RotateArrowsNode );
export default RotateArrowsNode;