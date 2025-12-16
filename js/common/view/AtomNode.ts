// Copyright 2014-2025, University of Colorado Boulder

/**
 * AtomNode is the visual representation of an atom.
 * It controls its own position, so clients should not attempt to position it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import AccessibleInteractiveOptions from '../../../../scenery-phet/js/accessibility/AccessibleInteractiveOptions.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import Atom from '../model/Atom.js';

type SelfOptions = EmptySelfOptions;

type AtomNodeOptions = SelfOptions &
  PickRequired<NodeOptions, 'tandem'> &
  PickOptional<NodeOptions, 'phetioInputEnabledPropertyInstrumented' | 'phetioType' | 'phetioState' | 'focusable'>;

export default class AtomNode extends Node {

  public constructor( atom: Atom, providedOptions: AtomNodeOptions ) {

    // Create a focus highlight that looks like a single electron positioned below the nucleus.
    const focusHighlight = new Shape().circle(
      Vector2.ZERO,
      atom.diameter * 0.6
    );

    const options = optionize4<AtomNodeOptions, SelfOptions, NodeOptions>()(
      {},
      AccessibleInteractiveOptions,
      {
        // NodeOptions
        visiblePropertyOptions: { phetioReadOnly: true },
        isDisposable: false,
        focusHighlight: focusHighlight,
        accessibleName: MoleculePolarityFluent.a11y.common.atom.accessibleName.createProperty( {
          name: atom.labelStringProperty
        } )
      }, providedOptions );

    // atom
    const sphereNode = new ShadedSphereNode( atom.diameter, {
      mainColor: atom.color,
      stroke: 'black'
    } );

    // name centered on atom
    const labelText = new Text( atom.labelStringProperty, {
      font: new PhetFont( { size: 32, weight: 'bold' } ),
      maxWidth: 0.75 * atom.diameter
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
}

moleculePolarity.register( 'AtomNode', AtomNode );