// Copyright 2002-2014, University of Colorado Boulder

/**
 * Constants used throughout this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Range = require( 'DOT/Range' );

  return {

    // ScreenView
    LAYOUT_BOUNDS: new Bounds2( 0, 0, 1100, 700 ),

    // Model
    ELECTRONEGATIVITY_RANGE: new Range( 2, 4, 2 ),
    ELECTRONEGATIVITY_SNAP_INTERVAL: 0.2,
    ATOM_DIAMETER: 100,
    BOND_LENGTH: 150, // must be longer than ATOM_DIAMETER

    // E-field plates, all values are related to 2D projection of the plates
    PLATE_WIDTH: 50,
    PLATE_HEIGHT: 450,
    PLATE_THICKNESS: 5,
    PLATE_PERSPECTIVE_Y_OFFSET: 35, // y difference between foreground and background edges of the plate

    // Controls
    TITLE_FONT: new PhetFont( { size: 18, weight: 'bold' } ),
    CONTROL_FONT: new PhetFont( 14 )
  };
} );
