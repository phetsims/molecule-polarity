// Copyright 2021-2022, University of Colorado Boulder

/**
 * SurfaceRadioButtonGroup is the radio button group for choosing a surface for the molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Text } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import MPConstants from '../MPConstants.js';

class SurfaceRadioButtonGroup extends AquaRadioButtonGroup {

  /**
   * @param {StringEnumerationProperty.<SurfaceType>} surfaceTypeProperty
   * @param {Object} [options]
   */
  constructor( surfaceTypeProperty, options ) {

    options = merge( {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, MPConstants.AQUA_RADIO_BUTTON_OPTIONS, options );

    const radioButtonGroupItems = [
      {
        node: new Text( moleculePolarityStrings.noneStringProperty, merge( {
          tandem: options.tandem.createTandem( 'noneText' ),
          phetioVisiblePropertyInstrumented: false
        }, MPConstants.CONTROL_TEXT_OPTIONS ) ),
        value: 'none',
        tandemName: 'noneRadioButton'
      },
      {
        value: 'electrostaticPotential',
        node: new Text( moleculePolarityStrings.electrostaticPotentialStringProperty, merge( {
          tandem: options.tandem.createTandem( 'electrostaticPotentialText' ),
          phetioVisiblePropertyInstrumented: false
        }, MPConstants.CONTROL_TEXT_OPTIONS ) ),
        tandemName: 'electrostaticPotentialRadioButton'
      },
      {
        value: 'electronDensity',
        node: new Text( moleculePolarityStrings.electronDensityStringProperty, merge( {
          tandem: options.tandem.createTandem( 'electronDensityText' ),
          phetioVisiblePropertyInstrumented: false
        }, MPConstants.CONTROL_TEXT_OPTIONS ) ),
        tandemName: 'electronDensityRadioButton'
      }
    ];

    super( surfaceTypeProperty, radioButtonGroupItems, options );
  }
}

moleculePolarity.register( 'SurfaceRadioButtonGroup', SurfaceRadioButtonGroup );
export default SurfaceRadioButtonGroup;