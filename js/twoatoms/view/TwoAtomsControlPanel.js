// Copyright 2014-2017, University of Colorado Boulder

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
  var EFieldControl = require( 'MOLECULE_POLARITY/common/view/EFieldControl' );
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
  var electronDensityString = require( 'string!MOLECULE_POLARITY/electronDensity' );
  var electrostaticPotentialString = require( 'string!MOLECULE_POLARITY/electrostaticPotential' );
  var noneString = require( 'string!MOLECULE_POLARITY/none' );
  var partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  var surfaceString = require( 'string!MOLECULE_POLARITY/surface' );
  var viewString = require( 'string!MOLECULE_POLARITY/view' );

  // constants
  var TITLE_OPTIONS = {
    font: MPConstants.TITLE_FONT,
    maxWidth: 275 // i18n, set empirically
  };
  var CONTROL_TEXT_OPTIONS = {
    font: MPConstants.CONTROL_FONT,
    maxWidth: 175 // i18n, determined empirically
  };
  var RADIO_BUTTON_OPTIONS = {
    radius: MPConstants.RADIO_BUTTON_RADIUS
  };

  /**
   * @param {TwoAtomsViewProperties} viewProperties
   * @param {Property.<boolean>} eFieldEnabledProperty
   * @constructor
   */
  function TwoAtomsControlPanel( viewProperties, eFieldEnabledProperty ) {

    // 'View' title
    var viewTitleNode = new Text( viewString, TITLE_OPTIONS );

    // 'View' check boxes
    var bondDipoleLabel = new LayoutBox( {
      children: [ new Text( bondDipoleString, CONTROL_TEXT_OPTIONS ), BondDipoleNode.createIcon() ],
      orientation: 'horizontal',
      spacing: 10
    } );
    var bondDipoleCheckBox = new CheckBox( bondDipoleLabel, viewProperties.bondDipoleVisibleProperty );
    var partialChargesCheckBox = new CheckBox( new Text( partialChargesString, CONTROL_TEXT_OPTIONS ), viewProperties.partialChargesVisibleProperty );
    var bondCharacterCheckBox = new CheckBox( new Text( bondCharacterString, CONTROL_TEXT_OPTIONS ), viewProperties.bondCharacterVisibleProperty );

    // 'Surface' title
    var surfaceTitleNode = new Text( surfaceString, TITLE_OPTIONS );

    // 'Surface' radio buttons
    var noneButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.NONE,
      new Text( noneString, CONTROL_TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );
    var electrostaticPotentialButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTROSTATIC_POTENTIAL,
      new Text( electrostaticPotentialString, CONTROL_TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );
    var electronDensityButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTRON_DENSITY,
      new Text( electronDensityString, CONTROL_TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );

    // 'E-Field' control
    var eFieldControl = new EFieldControl( eFieldEnabledProperty );

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
      eFieldControl
    ];

    // compute the horizontal separator width, insert separators above (before) titles
    var separatorWidth = 0;
    for ( var i = 0; i < children.length; i++ ) {
      separatorWidth = Math.max( separatorWidth, children[ i ].width );
    }
    children.splice( children.indexOf( surfaceTitleNode ), 0, new HSeparator( separatorWidth ) );
    children.splice( children.indexOf( eFieldControl ), 0, new HSeparator( separatorWidth ) );

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
