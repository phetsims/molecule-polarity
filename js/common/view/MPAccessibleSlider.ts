// Copyright 2025, University of Colorado Boulder
/**
 * Common class for the Accessible Slider that controls angles of particles or molecules
 *
 * @author Agustín Vallejo
 */

import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import Range from '../../../../dot/js/Range.js';
import { toDegrees } from '../../../../dot/js/util/toDegrees.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import AccessibleSlider, { AccessibleSliderOptions } from '../../../../sun/js/accessibility/AccessibleSlider.js';
import moleculePolarity from '../../moleculePolarity.js';

type SelfOptions = EmptySelfOptions;

type ParentOptions = NodeOptions & AccessibleSliderOptions;

export type MPAccessibleSliderOptions = SelfOptions & StrictOmit<ParentOptions, 'interactiveHighlightEnabled' | 'enabledRangeProperty' | 'valueProperty' | 'startDrag' | 'endDrag'>;

export default class MPAccessibleSlider extends AccessibleSlider( Node, 0 ) {
  public constructor( valueProperty: TProperty<number>, providedOptions: MPAccessibleSliderOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, ParentOptions>()( {
      // AccessibleSliderOptions
      enabledRangeProperty: new Property( new Range( -Math.PI, Math.PI ) ),
      valueProperty: valueProperty,
      keyboardStep: Math.PI / 8,
      shiftKeyboardStep: Math.PI / 8,
      createAriaValueText: angle => {
        angle *= -1; // Inverting the angle to have +Y pointing up
        angle = toDegrees( angle < 0 ? angle + 2 * Math.PI : angle ); // Mapping to [0-360]
        return toFixed( angle, 1 ); // Rounding
      }
    }, providedOptions );

    super( options );
    //nop
  }
}

moleculePolarity.register( 'MPAccessibleSlider', MPAccessibleSlider );