// Copyright 2014-2022, University of Colorado Boulder

/**
 * A pair of arrows used to indicate that an atom can be rotated.
 * Shapes are created in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import CurvedArrowShape from '../../../../scenery-phet/js/CurvedArrowShape.js';
import { Node, NodeOptions, Path } from '../../../../scenery/js/imports.js';
import Atom from '../../common/model/Atom.js';
import moleculePolarity from '../../moleculePolarity.js';

type SelfOptions = EmptySelfOptions;

type RotateArrowsNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class RotateArrowsNode extends Node {

  public constructor( atom: Atom, providedOptions: RotateArrowsNodeOptions ) {

    const options = optionize<RotateArrowsNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      visiblePropertyOptions: { phetioReadOnly: true }
    }, providedOptions );

    // arrow configuration
    const arrowShapeOptions = { headWidth: 30, headHeight: 15, tailWidth: 15 };
    const arrowPathOptions = { fill: atom.color, stroke: 'gray' };
    const radius = ( 0.5 * atom.diameter ) + ( 0.5 * arrowShapeOptions.headWidth ) + 2; // distance of arrow's tip from the atom's center
    const theta = 0.1 * Math.PI; // central angle of the arc that the arrow traces

    options.children = [
      new Path( new CurvedArrowShape( radius, -theta, theta, arrowShapeOptions ), arrowPathOptions ),
      new Path( new CurvedArrowShape( radius, Math.PI - theta, Math.PI + theta, arrowShapeOptions ), arrowPathOptions )
    ];

    super( options );

    // Sync with atom position
    atom.positionProperty.link( position => {
      this.translation = position;
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'RotateArrowsNode', RotateArrowsNode );