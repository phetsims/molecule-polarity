// Copyright 2025, University of Colorado Boulder
/**
 * Common class for the Accessible Slider that controls angles of particles or molecules
 *
 * @author Agustín Vallejo
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { toDegrees } from '../../../../dot/js/util/toDegrees.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import AccessibleSlider, { AccessibleSliderOptions } from '../../../../sun/js/accessibility/AccessibleSlider.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';

type SelfOptions = EmptySelfOptions;

type ParentOptions = NodeOptions & AccessibleSliderOptions;

export type MPAccessibleSliderOptions = SelfOptions & StrictOmit<ParentOptions, 'interactiveHighlightEnabled' | 'enabledRangeProperty' | 'valueProperty' | 'startDrag' | 'endDrag'>;

export default class MPAccessibleSlider extends AccessibleSlider( Node, 0 ) {
  public constructor( valueProperty: NumberProperty, providedOptions: MPAccessibleSliderOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, ParentOptions>()( {
      // AccessibleSliderOptions
      enabledRangeProperty: valueProperty.rangeProperty,
      valueProperty: valueProperty,
      keyboardStep: Math.PI / 8,
      shiftKeyboardStep: Math.PI / 8,
      createAriaValueText: angle => {
        angle *= -1; // Inverting the angle to have +Y pointing up
        let angleDeg = toDegrees( angle < 0 ? angle + 2 * Math.PI : angle ); // Mapping to [0-360]
        angleDeg = toFixedNumber( angleDeg, 1 ); // Rounding
        return MoleculePolarityFluent.a11y.direction.format( {
          angle: angleDeg,
          direction: Math.abs( Math.sin( angle ) ) <= 0.01 ? 'horizontal' :
                      Math.abs( Math.cos( angle ) ) <= 0.01 ? 'vertical' : 'diagonal'
          } );
      }
    }, providedOptions );

    super( options );
    //nop
  }
}

moleculePolarity.register( 'MPAccessibleSlider', MPAccessibleSlider );