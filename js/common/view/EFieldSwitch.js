// Copyright 2002-2014, University of Colorado Boulder

/**
 * On/off switch for E-field.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ABSwitch = require( 'SUN/ABSwitch' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var offString = require( 'string!MOLECULE_POLARITY/off' );
  var onString = require( 'string!MOLECULE_POLARITY/on' );

  // constants
  var LABEL_OPTIONS = { font: MPConstants.CONTROL_FONT };

  function EFieldSwitch( eFieldEnabledProperty ) {
    ABSwitch.call( this, eFieldEnabledProperty, false, new Text( offString, LABEL_OPTIONS ), true, new Text( onString, LABEL_OPTIONS ),
      { xSpacing: 12, trackFillA: 'rgb(180,180,180)', trackFillB: 'rgb(0,180,0)' } );
  }

  return inherit( ABSwitch, EFieldSwitch );
} );
