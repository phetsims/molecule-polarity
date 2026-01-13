// Copyright 2025-2026, University of Colorado Boulder
/**
 * Common class for the Accessible Slider that controls angles of particles or molecules
 *
 * @author Agustín Vallejo
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import { toDegrees } from '../../../../dot/js/util/toDegrees.js';
import { toRadians } from '../../../../dot/js/util/toRadians.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import AccessibleSlider, { AccessibleSliderOptions } from '../../../../sun/js/accessibility/AccessibleSlider.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import normalizeAngle from '../model/normalizeAngle.js';

type SelfOptions = EmptySelfOptions;

type ParentOptions = NodeOptions & AccessibleSliderOptions;

export type MPAccessibleSliderOptions = SelfOptions & StrictOmit<ParentOptions,
  'interactiveHighlightEnabled' | 'enabledRangeProperty' | 'valueProperty' | 'startDrag' | 'endDrag'>;

const DEFAULT_STEP = toRadians( 5 );

export default class MPAccessibleSlider extends AccessibleSlider( Node, 0 ) {
  public constructor( valueProperty: NumberProperty, providedOptions: MPAccessibleSliderOptions ) {

    const options = optionize<MPAccessibleSliderOptions, SelfOptions, ParentOptions>()( {
      // AccessibleSliderOptions
      enabledRangeProperty: valueProperty.rangeProperty,
      valueProperty: valueProperty,
      keyboardStep: DEFAULT_STEP * 6, // 30 degrees or 1h on the clock
      shiftKeyboardStep: DEFAULT_STEP, // 5 degrees or 30min on the clock
      constrainValue: ( value: number ) => {
        return roundToInterval( value, providedOptions.shiftKeyboardStep || DEFAULT_STEP );
      },
      createAriaValueText: angle => {
        const degrees = roundToInterval( toDegrees( normalizeAngle( angle ) ), 30 );
        return MoleculePolarityFluent.a11y.degrees.format( { angle: degrees } );
      },
      startDrag: event => {
        this.moveToFront();
      }
    }, providedOptions );

    super( options );
  }
}

moleculePolarity.register( 'MPAccessibleSlider', MPAccessibleSlider );