// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for selecting a surface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Panel = require( 'SUN/Panel' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var electronDensityString = require( 'string!MOLECULE_POLARITY/electronDensity' );
  var electrostaticPotentialString = require( 'string!MOLECULE_POLARITY/electrostaticPotential' );
  var noneString = require( 'string!MOLECULE_POLARITY/none' );
  var surfaceString = require( 'string!MOLECULE_POLARITY/surface' );

  /**
   * @param {Property<SurfaceType>} surfaceTypeProperty
   * @constructor
   */
  function SurfaceControls( surfaceTypeProperty ) {

    // title
    var titleNode = new Text( surfaceString, { font: MPConstants.TITLE_FONT } );

    // radio buttons
    var textOptions = { font: MPConstants.CONTROL_FONT };
    var noneButton = new AquaRadioButton( surfaceTypeProperty, SurfaceType.NONE, new Text( noneString, textOptions ) );
    var electrostaticPotentialButton = new AquaRadioButton( surfaceTypeProperty, SurfaceType.ELECTROSTATIC_POTENTIAL, new Text( electrostaticPotentialString, textOptions ) );
    var electronDensityButton = new AquaRadioButton( surfaceTypeProperty, SurfaceType.ELECTRON_DENSITY, new Text( electronDensityString, textOptions ) );

    var content = new VBox( {
      children: [ titleNode, noneButton, electrostaticPotentialButton, electronDensityButton ],
      align: 'left',
      spacing: 12
    } );

    // vertical panel
    Panel.call( this, content, {
      fill: 'rgb(238,238,238)',
      xMargin: 20,
      yMargin: 10
    } );
  }

  return inherit( Panel, SurfaceControls );
} );
