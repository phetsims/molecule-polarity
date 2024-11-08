// Copyright 2023, University of Colorado Boulder

/**
 * MPCheckbox is the base class for checkboxes in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import { Node } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';

type SelfOptions = EmptySelfOptions;

export type MPCheckboxOptions = SelfOptions & WithRequired<CheckboxOptions, 'tandem'>;

export default class MPCheckbox extends Checkbox {

  protected constructor( property: Property<boolean>, content: Node, provideOptions?: MPCheckboxOptions ) {

    const options = optionize<MPCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // CheckboxOptions
      layoutOptions: {
        stretch: true // for uniform pointer areas, see https://github.com/phetsims/molecule-polarity/issues/161
      },

      // To emulate VerticalCheckboxGroup behavior
      mouseAreaYDilation: MPConstants.CONTROL_PANEL_Y_SPACING / 2,
      touchAreaYDilation: MPConstants.CONTROL_PANEL_Y_SPACING / 2
    }, provideOptions );

    super( property, content, options );
  }
}

moleculePolarity.register( 'MPCheckbox', MPCheckbox );