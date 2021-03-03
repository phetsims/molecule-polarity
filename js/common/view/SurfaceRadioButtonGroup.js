// Copyright 2021, University of Colorado Boulder

/**
 * SurfaceRadioButtonGroup is the radio button group for choosing a surface for the molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import SurfaceType from '../model/SurfaceType.js';
import MPConstants from '../MPConstants.js';

class SurfaceRadioButtonGroup extends AquaRadioButtonGroup {

  /**
   * @param {EnumerationProperty.<SurfaceType>} surfaceTypeProperty
   * @param {Object} [options]
   */
  constructor( surfaceTypeProperty, options ) {
    assert && AssertUtils.assertEnumerationPropertyOf( surfaceTypeProperty, SurfaceType );

    options = merge( {
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: Tandem.REQUIRED
    }, MPConstants.AQUA_RADIO_BUTTON_OPTIONS, options );

    const radioButtonGroupItems = [
      {
        node: new Text( moleculePolarityStrings.none, merge( {
          tandem: options.tandem.createTandem( 'noneText' )
        }, MPConstants.CONTROL_TEXT_OPTIONS ) ),
        value: SurfaceType.NONE,
        tandemName: 'noneRadioButton'
      },
      {
        value: SurfaceType.ELECTROSTATIC_POTENTIAL,
        node: new Text( moleculePolarityStrings.electrostaticPotential, merge( {
          tandem: options.tandem.createTandem( 'electrostaticPotentialText' )
        }, MPConstants.CONTROL_TEXT_OPTIONS ) ),
        tandemName: 'electrostaticPotentialRadioButton'
      },
      {
        value: SurfaceType.ELECTRON_DENSITY,
        node: new Text( moleculePolarityStrings.electronDensity, merge( {
          tandem: options.tandem.createTandem( 'electronDensityText' )
        }, MPConstants.CONTROL_TEXT_OPTIONS ) ),
        tandemName: 'electronDensityRadioButton'
      }
    ];

    super( surfaceTypeProperty, radioButtonGroupItems, options );
  }
}

moleculePolarity.register( 'SurfaceRadioButtonGroup', SurfaceRadioButtonGroup );
export default SurfaceRadioButtonGroup;