// Copyright 2002-2014, University of Colorado Boulder

/**
 * On/off switch for E-field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var OnOffSwitch = require( 'SUN/OnOffSwitch' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var offString = require( 'string!MOLECULE_POLARITY/off' );
  var onString = require( 'string!MOLECULE_POLARITY/on' );

  // constants
  var TEXT_OPTIONS = { font: MPConstants.CONTROL_FONT };

  function EFieldSwitch( eFieldEnabledProperty ) {

    // 'E-Field' radio buttons
    HBox.call( this, {
      spacing: 12,
      children: [
        new Text( offString, TEXT_OPTIONS ),
        new OnOffSwitch( eFieldEnabledProperty, { trackOnFill: 'rgb(0,180,0)', trackOffFill: 'rgb(180,180,180)' } ),
        new Text( onString, TEXT_OPTIONS )
      ]
    } );
  }

  return inherit( HBox, EFieldSwitch );
} );
