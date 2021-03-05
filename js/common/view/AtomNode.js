// Copyright 2014-2021, University of Colorado Boulder

/**
 * Visual representation of an atom.
 * Controls its own position, so clients should not attempt to position it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import Atom from '../model/Atom.js';

class AtomNode extends Node {

  /**
   * @param {Atom} atom
   * @param {Object} [options]
   */
  constructor( atom, options ) {
    assert && assert( atom instanceof Atom, 'invalid atom' );

    options = merge( {
      tandem: Tandem.REQUIRED,
      visiblePropertyOptions: { phetioReadOnly: true }
    }, options );

    // atom
    const sphereNode = new ShadedSphereNode( atom.diameter, {
      mainColor: atom.color
    } );

    // name centered on atom
    const labelText = new Text( atom.labelProperty.value, {
      textProperty: atom.labelProperty,
      font: new PhetFont( { size: 32, weight: 'bold' } ),
      maxWidth: 0.75 * atom.diameter,
      tandem: options.tandem.createTandem( 'labelText' )
    } );

    assert && assert( !options.children, 'AtomNode sets children' );
    options.children = [ sphereNode, labelText ];

    super( options );

    // sync position with model, unlink not needed
    atom.positionProperty.linkAttribute( this, 'translation' );

    // Keep the label centered in the sphere. The label can be changed via PhET-iO.
    labelText.boundsProperty.link( () => {
      labelText.center = sphereNode.center;
    } );
  }
}

moleculePolarity.register( 'AtomNode', AtomNode );

export default AtomNode;