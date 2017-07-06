// Copyright 2014-2017, University of Colorado Boulder

/**
 * Constants used throughout this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var MPGlobalOptions = require( 'MOLECULE_POLARITY/common/MPGlobalOptions' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );

  var MPConstants = {

    // ScreenView
    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 1100, 700 ) },

    // View
    GLOBAL_OPTIONS: new MPGlobalOptions(),

    // Model
    ELECTRONEGATIVITY_RANGE: new RangeWithValue( 2, 4, 2 ),
    ELECTRONEGATIVITY_TICK_SPACING: 0.2,
    ATOM_DIAMETER: 100,
    BOND_LENGTH: 150, // must be longer than ATOM_DIAMETER

    // Controls
    TITLE_FONT: new PhetFont( { size: 20, weight: 'bold' } ),
    CONTROL_FONT: new PhetFont( 18 ),
    RADIO_BUTTON_RADIUS: 12
  };

  moleculePolarity.register( 'MPConstants', MPConstants );

  return MPConstants;
} );
