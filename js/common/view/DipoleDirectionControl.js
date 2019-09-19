// Copyright 2017-2018, University of Colorado Boulder

/**
 * Dipole direction control that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AquaRadioButton = require( 'SUN/AquaRadioButton' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const deltaMinusString = require( 'string!MOLECULE_POLARITY/deltaMinus' );
  const deltaPlusString = require( 'string!MOLECULE_POLARITY/deltaPlus' );
  const dipoleDirectionString = require( 'string!MOLECULE_POLARITY/dipoleDirection' );
  const patternDipoleDirectionString = require( 'string!MOLECULE_POLARITY/pattern.dipoleDirection' );

  // constants
  const TEXT_OPTIONS = {
    font: new PhetFont( 20 ),
    maxWidth: 300
  };
  const RADIO_BUTTON_OPTIONS = { radius: 8 };

  /**
   * @param {Property.<string>} dipoleDirectionProperty
   * @constructor
   */
  function DipoleDirectionControl( dipoleDirectionProperty ) {

    const dipoleDirectionLabel = new Text( dipoleDirectionString, {
      font: new PhetFont( 14 ),
      maxWidth: 400
    } );

    // d+ -> d-
    const positiveToNegativeString = StringUtils.fillIn( patternDipoleDirectionString, {
      from: deltaPlusString,
      to: deltaMinusString
    } );
    const positiveToNegativeButton = new AquaRadioButton(
      dipoleDirectionProperty,
      'positiveToNegative',
      new Text( positiveToNegativeString, TEXT_OPTIONS ),
      RADIO_BUTTON_OPTIONS
    );

    // d- -> d+
    const negativeToPositiveString = StringUtils.fillIn( patternDipoleDirectionString, {
      from: deltaMinusString,
      to: deltaPlusString
    } );
    const negativeToPositiveButton = new AquaRadioButton(
      dipoleDirectionProperty,
      'negativeToPositive',
      new Text( negativeToPositiveString, TEXT_OPTIONS ),
      RADIO_BUTTON_OPTIONS
    );

    VBox.call( this, {
      align: 'left',
      spacing: 10,
      children: [
        dipoleDirectionLabel,
        positiveToNegativeButton,
        negativeToPositiveButton
      ]
    } );

    // @private
    this.disposeDipoleDirectionControl = function() {
      positiveToNegativeButton.dispose();
      negativeToPositiveButton.dispose();
    };
  }

  moleculePolarity.register( 'DipoleDirectionControl', DipoleDirectionControl );

  return inherit( VBox, DipoleDirectionControl, {

    // @public
    dispose: function() {
      this.disposeDipoleDirectionControl();
      VBox.prototype.dispose.call( this );
    }
  } );
} );
