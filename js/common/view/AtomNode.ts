// Copyright 2014-2022, University of Colorado Boulder

/**
 * AtomNode is the visual representation of an atom.
 * It controls its own position, so clients should not attempt to position it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import { Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import Atom from '../model/Atom.js';

type SelfOptions = EmptySelfOptions;

type AtomNodeOptions = SelfOptions &
  PickRequired<NodeOptions, 'tandem'> &
  PickOptional<NodeOptions, 'phetioInputEnabledPropertyInstrumented'>;

export default class AtomNode extends Node {

  public constructor( atom: Atom, providedOptions: AtomNodeOptions ) {

    const options = optionize<AtomNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      visiblePropertyOptions: { phetioReadOnly: true }
    }, providedOptions );

    // atom
    const sphereNode = new ShadedSphereNode( atom.diameter, {
      mainColor: atom.color
    } );

    // name centered on atom
    const labelText = new Text( atom.labelStringProperty, {
      font: new PhetFont( { size: 32, weight: 'bold' } ),
      maxWidth: 0.75 * atom.diameter,
      tandem: options.tandem.createTandem( 'labelText' )
    } );

    options.children = [ sphereNode, labelText ];

    super( options );

    // sync position with model
    atom.positionProperty.linkAttribute( this, 'translation' );

    // Keep the label centered in the sphere. The label can be changed via PhET-iO.
    labelText.boundsProperty.link( () => {
      labelText.center = sphereNode.center;
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'AtomNode', AtomNode );