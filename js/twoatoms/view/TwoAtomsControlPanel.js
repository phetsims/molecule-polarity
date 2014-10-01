// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  var CheckBox = require( 'SUN/CheckBox' );
  var EFieldSwitch = require( 'MOLECULE_POLARITY/common/view/EFieldSwitch' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Panel = require( 'SUN/Panel' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var bondCharacterString = require( 'string!MOLECULE_POLARITY/bondCharacter' );
  var bondDipoleString = require( 'string!MOLECULE_POLARITY/bondDipole' );
  var electricFieldString = require( 'string!MOLECULE_POLARITY/electricField' );
  var electronDensityString = require( 'string!MOLECULE_POLARITY/electronDensity' );
  var electrostaticPotentialString = require( 'string!MOLECULE_POLARITY/electrostaticPotential' );
  var noneString = require( 'string!MOLECULE_POLARITY/none' );
  var partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  var surfaceString = require( 'string!MOLECULE_POLARITY/surface' );
  var viewString = require( 'string!MOLECULE_POLARITY/view' );

  /**
   * @param {*} viewProperties
   * @param {Property.<boolean>} eFieldEnabledProperty
   * @constructor
   */
  function TwoAtomsControlPanel( viewProperties, eFieldEnabledProperty ) {

    var controlTextOptions = { font: MPConstants.CONTROL_FONT };
    var radioButtonOptions = { radius: MPConstants.RADIO_BUTTON_RADIUS };

    // 'View' title
    var viewTitleNode = new Text( viewString, { font: MPConstants.TITLE_FONT } );

    // 'View' check boxes
    var bondDipoleLabel = new HBox( { spacing: 10, children: [ new Text( bondDipoleString, controlTextOptions ), BondDipoleNode.createIcon() ] } );
    var bondDipoleCheckBox = new CheckBox( bondDipoleLabel, viewProperties.bondDipoleVisibleProperty );
    var partialChargesCheckBox = new CheckBox( new Text( partialChargesString, controlTextOptions ), viewProperties.partialChargesVisibleProperty );
    var bondCharacterCheckBox = new CheckBox( new Text( bondCharacterString, controlTextOptions ), viewProperties.bondCharacterVisibleProperty );

    // 'Surface' title
    var surfaceTitleNode = new Text( surfaceString, { font: MPConstants.TITLE_FONT } );

    // 'Surface' radio buttons
    var noneButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.NONE, new Text( noneString, controlTextOptions ), radioButtonOptions );
    var electrostaticPotentialButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTROSTATIC_POTENTIAL, new Text( electrostaticPotentialString, controlTextOptions ), radioButtonOptions );
    var electronDensityButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTRON_DENSITY, new Text( electronDensityString, controlTextOptions ), radioButtonOptions );

    // 'E-Field' title
    var eFieldTitleNode = new Text( electricFieldString, { font: MPConstants.TITLE_FONT } );

    // 'E-Field' control
    var eFieldControl = new EFieldSwitch( eFieldEnabledProperty );

    // nodes in the control panel, in the order they will appear vertically
    var children = [
      viewTitleNode,
      bondDipoleCheckBox,
      partialChargesCheckBox,
      bondCharacterCheckBox,
      //--------------------
      surfaceTitleNode,
      noneButton,
      electrostaticPotentialButton,
      electronDensityButton,
      //--------------------
      eFieldTitleNode,
      eFieldControl
    ];

    // compute the horizontal separator width, insert separators above (before) titles
    var separatorWidth = 0;
    for ( var i = 0; i < children.length; i++ ) {
      separatorWidth = Math.max( separatorWidth, children[i].width );
    }
    children.splice( children.indexOf( surfaceTitleNode ), 0, new HSeparator( separatorWidth ) );
    children.splice( children.indexOf( eFieldTitleNode ), 0, new HSeparator( separatorWidth ) );

    // vertical panel
    Panel.call( this, new VBox( {
      children: children,
      align: 'left',
      spacing: 15
    } ), {
      // panel options
      fill: 'rgb(238,238,238)',
      xMargin: 20,
      yMargin: 15
    } );
  }

  return inherit( Panel, TwoAtomsControlPanel );
} );
