// Copyright 2014-2022, University of Colorado Boulder

/**
 * TranslateArrowsNode is a pair of arrows that are placed around an atom to indicate that the atom can be translated.
 * Shapes are created in global coordinates, so this Node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Matrix3 from '../../../../dot/js/Matrix3.js';
import Transform3 from '../../../../dot/js/Transform3.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ArrowShape from '../../../../scenery-phet/js/ArrowShape.js';
import { Node, NodeOptions, Path } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import Atom from '../model/Atom.js';
import Molecule from '../model/Molecule.js';

type SelfOptions = {
  length?: number;
};

type TranslateArrowsNodeOptions = SelfOptions &
  PickRequired<NodeOptions, 'tandem'> &
  PickOptional<NodeOptions, 'pickable'>;

export default class TranslateArrowsNode extends Node {

  public constructor( molecule: Molecule, atom: Atom, providedOptions: TranslateArrowsNodeOptions ) {

    const options = optionize<TranslateArrowsNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      length: 25, // relatively short, so we don't need curved arrows

      // NodeOptions
      visiblePropertyOptions: { phetioReadOnly: true }
    }, providedOptions );

    const leftArrowNode = new Path( null, { fill: atom.color, stroke: 'gray' } );
    const rightArrowNode = new Path( null, { fill: atom.color, stroke: 'gray' } );

    // create "normalized" shapes at (0,0) with no rotation
    const arrowShapeOptions = { headWidth: 30, headHeight: 15, tailWidth: 15 };
    const radius = atom.diameter / 2;
    const spacing = 2;
    const leftArrow = new ArrowShape( -( radius + spacing ), 0, -( radius + spacing + options.length ), 0, arrowShapeOptions );
    const rightArrow = new ArrowShape( ( radius + spacing ), 0, ( radius + spacing + options.length ), 0, arrowShapeOptions );

    options.children = [ leftArrowNode, rightArrowNode ];

    // transform the arrow shapes to account for atom position and relationship to molecule position
    atom.positionProperty.link( () => {
      const v = molecule.position.minus( atom.positionProperty.value );
      const angle = v.angle - ( Math.PI / 2 );
      const transform = new Transform3( Matrix3.translationFromVector( atom.positionProperty.value ).timesMatrix( Matrix3.rotation2( angle ) ) );
      leftArrowNode.shape = transform.transformShape( leftArrow );
      rightArrowNode.shape = transform.transformShape( rightArrow );
    } );

    super( options );
  }
}

moleculePolarity.register( 'TranslateArrowsNode', TranslateArrowsNode );