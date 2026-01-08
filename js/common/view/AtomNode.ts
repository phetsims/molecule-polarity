// Copyright 2014-2026, University of Colorado Boulder

/**
 * AtomNode is the visual representation of an atom.
 * It controls its own position, so clients should not attempt to position it.
 * It extends MPAccessibleSlider so that the atom can be moved via keyboard input
 * and show as a slider in the PDOM.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Agustín Vallejo
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import Atom from '../model/Atom.js';
import MPAccessibleSlider, { MPAccessibleSliderOptions } from './MPAccessibleSlider.js';

type SelfOptions = EmptySelfOptions;

export type AtomNodeOptions = SelfOptions & MPAccessibleSliderOptions;

export default class AtomNode extends MPAccessibleSlider {

  public constructor( atom: Atom, angleProperty: NumberProperty, providedOptions: AtomNodeOptions ) {

    const options = optionize<AtomNodeOptions, SelfOptions, MPAccessibleSliderOptions>()(
      {
        // NodeOptions
        visiblePropertyOptions: { phetioReadOnly: true },
        isDisposable: false,
        accessibleName: MoleculePolarityFluent.a11y.common.atom.accessibleName.createProperty( {
          name: atom.labelStringProperty
        } ),

        // MPAccessibleSliderOptions
        cursor: 'pointer',
        phetioInputEnabledPropertyInstrumented: true,
        keyboardStep: Math.PI / 6,
        shiftKeyboardStep: Math.PI / 12
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

    super( angleProperty, options );

    // sync position with model
    atom.positionProperty.linkAttribute( this, 'translation' );

    // Keep the label centered in the sphere. The label can be changed via PhET-iO.
    labelText.boundsProperty.link( () => {
      labelText.center = sphereNode.center;
    } );

    this.focusHighlight = new Shape().circle(
      Vector2.ZERO,
      atom.diameter * 0.6
    );
  }
}

moleculePolarity.register( 'AtomNode', AtomNode );