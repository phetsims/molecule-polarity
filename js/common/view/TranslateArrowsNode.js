// Copyright 2014-2020, University of Colorado Boulder

/**
 * A pair of arrows that are placed around an atom to indicate that the atom can be translated.
 * Shapes are created in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Matrix3 from '../../../../dot/js/Matrix3.js';
import Transform3 from '../../../../dot/js/Transform3.js';
import merge from '../../../../phet-core/js/merge.js';
import ArrowShape from '../../../../scenery-phet/js/ArrowShape.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';

class TranslateArrowsNode extends Node {

  /**
   * @param {Molecule} molecule
   * @param {Atom} atom
   * @param {Object} [options]
   */
  constructor( molecule, atom, options ) {

    options = merge( {
      length: 25, // relatively short, so we don't need curved arrows
      tandem: Tandem.REQUIRED,
      phetioReadOnly: true
    }, options );

    const leftArrowNode = new Path( null, { fill: atom.color, stroke: 'gray' } );
    const rightArrowNode = new Path( null, { fill: atom.color, stroke: 'gray' } );

    // create "normalized" shapes at (0,0) with no rotation
    const arrowShapeOptions = { headWidth: 30, headHeight: 15, tailWidth: 15 };
    const radius = atom.diameter / 2;
    const spacing = 2;
    const leftArrow = new ArrowShape( -( radius + spacing ), 0, -( radius + spacing + options.length ), 0, arrowShapeOptions );
    const rightArrow = new ArrowShape( ( radius + spacing ), 0, ( radius + spacing + options.length ), 0, arrowShapeOptions );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ leftArrowNode, rightArrowNode ];

    // unlink not needed
    atom.positionProperty.link( () => {

      // transform the arrow shapes to account for atom position and relationship to molecule position
      const v = molecule.position.minus( atom.positionProperty.get() );
      const angle = v.angle - ( Math.PI / 2 );
      const transform = new Transform3( Matrix3.translationFromVector( atom.positionProperty.get() ).timesMatrix( Matrix3.rotation2( angle ) ) );
      leftArrowNode.shape = transform.transformShape( leftArrow );
      rightArrowNode.shape = transform.transformShape( rightArrow );
    } );

    super( options );
  }
}

moleculePolarity.register( 'TranslateArrowsNode', TranslateArrowsNode );

export default TranslateArrowsNode;