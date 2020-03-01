// Copyright 2014-2020, University of Colorado Boulder

/**
 * Visual representation of an atom.
 * Controls its own position, so clients should not attempt to position it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import moleculePolarity from '../../moleculePolarity.js';

class AtomNode extends Node {

  /**
   * @param {Atom} atom
   */
  constructor( atom ) {

    // atom
    const sphereNode = new ShadedSphereNode( atom.diameter, { mainColor: atom.color } );

    // name centered on atom
    const textNode = new Text( atom.name, {
      font: new PhetFont( { size: 32, weight: 'bold' } ),
      maxWidth: 0.75 * atom.diameter,
      centerX: sphereNode.centerX,
      centerY: sphereNode.centerY
    } );

    super( {
      children: [ sphereNode, textNode ]
    } );

    // sync position with model, unlink not needed
    atom.positionProperty.linkAttribute( this, 'translation' );
  }
}

moleculePolarity.register( 'AtomNode', AtomNode );

export default AtomNode;