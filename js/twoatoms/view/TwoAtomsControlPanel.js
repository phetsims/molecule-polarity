// Copyright 2014-2015, University of Colorado Boulder

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
  var HSeparator = require( 'SUN/HSeparator' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Panel = require( 'SUN/Panel' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var Text = require( 'SCENERY/nodes/Text' );

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

  // constants
  var TITLE_MAX_WIDTH = 275; // i18n, set empirically

  /**
   * @param {*} viewProperties
   * @param {Property.<boolean>} eFieldEnabledProperty
   * @constructor
   */
  function TwoAtomsControlPanel( viewProperties, eFieldEnabledProperty ) {

    var controlTextOptions = {
      font: MPConstants.CONTROL_FONT,
      maxWidth: 175 // i18n, determined empirically
    };
    var radioButtonOptions = { radius: MPConstants.RADIO_BUTTON_RADIUS };

    // 'View' title
    var viewTitleNode = new Text( viewString, {
      font: MPConstants.TITLE_FONT,
      maxWidth: TITLE_MAX_WIDTH
    } );

    // 'View' check boxes
    var bondDipoleLabel = new LayoutBox( {
      children: [ new Text( bondDipoleString, controlTextOptions ), BondDipoleNode.createIcon() ],
      orientation: 'horizontal',
      spacing: 10
    } );
    var bondDipoleCheckBox = new CheckBox( bondDipoleLabel, viewProperties.bondDipoleVisibleProperty );
    var partialChargesCheckBox = new CheckBox( new Text( partialChargesString, controlTextOptions ), viewProperties.partialChargesVisibleProperty );
    var bondCharacterCheckBox = new CheckBox( new Text( bondCharacterString, controlTextOptions ), viewProperties.bondCharacterVisibleProperty );

    // 'Surface' title
    var surfaceTitleNode = new Text( surfaceString, {
      font: MPConstants.TITLE_FONT,
      maxWidth: TITLE_MAX_WIDTH
    } );

    // 'Surface' radio buttons
    var noneButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.NONE, new Text( noneString, controlTextOptions ), radioButtonOptions );
    var electrostaticPotentialButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTROSTATIC_POTENTIAL, new Text( electrostaticPotentialString, controlTextOptions ), radioButtonOptions );
    var electronDensityButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTRON_DENSITY, new Text( electronDensityString, controlTextOptions ), radioButtonOptions );

    // 'E-Field' title
    var eFieldTitleNode = new Text( electricFieldString, {
      font: MPConstants.TITLE_FONT,
      maxWidth: TITLE_MAX_WIDTH
    } );

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
      separatorWidth = Math.max( separatorWidth, children[ i ].width );
    }
    children.splice( children.indexOf( surfaceTitleNode ), 0, new HSeparator( separatorWidth ) );
    children.splice( children.indexOf( eFieldTitleNode ), 0, new HSeparator( separatorWidth ) );

    // vertical panel
    Panel.call( this, new LayoutBox( {
      children: children,
      orientation: 'vertical',
      align: 'left',
      spacing: 15
    } ), {
      // panel options
      fill: 'rgb(238,238,238)',
      xMargin: 20,
      yMargin: 15
    } );
  }

  moleculePolarity.register( 'TwoAtomsControlPanel', TwoAtomsControlPanel );

  return inherit( Panel, TwoAtomsControlPanel );
} );
