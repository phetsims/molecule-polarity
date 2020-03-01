// Copyright 2014-2020, University of Colorado Boulder

/**
 * A pair of arrows used to indicate that an arrow can be rotated.
 * Shapes are created in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Matrix3 from '../../../../dot/js/Matrix3.js';
import CurvedArrowShape from '../../../../scenery-phet/js/CurvedArrowShape.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import moleculePolarity from '../../moleculePolarity.js';

class RotateArrowsNode extends Node {

  /**
   * @param {Molecule} molecule
   * @param {Atom} atom
   */
  constructor( molecule, atom ) {

    // arrow configuration
    const arrowShapeOptions = { headWidth: 30, headHeight: 15, tailWidth: 15 };
    const arrowPathOptions = { fill: atom.color, stroke: 'gray' };
    const radius = ( 0.5 * atom.diameter ) + ( 0.5 * arrowShapeOptions.headWidth ) + 2; // distance of arrow's tip from the atom's center
    const theta = 0.1 * Math.PI; // central angle of the arc that the arrow traces

    super( {
      children: [
        new Path( new CurvedArrowShape( radius, -theta, theta, arrowShapeOptions ), arrowPathOptions ),
        new Path( new CurvedArrowShape( radius, Math.PI - theta, Math.PI + theta, arrowShapeOptions ), arrowPathOptions )
      ]
    } );

    // Align with atom position and molecular dipole
    const updateTransform = () => {
      this.matrix = Matrix3
        .translationFromVector( atom.positionProperty.get() )
        .timesMatrix( Matrix3.rotation2( molecule.dipoleProperty.get().angle + Math.PI / 2 ) );
    };
    molecule.dipoleProperty.link( updateTransform.bind( this ) ); // unlink not needed
    atom.positionProperty.link( updateTransform.bind( this ) ); // unlink not needed
  }
}

moleculePolarity.register( 'RotateArrowsNode', RotateArrowsNode );

export default RotateArrowsNode;