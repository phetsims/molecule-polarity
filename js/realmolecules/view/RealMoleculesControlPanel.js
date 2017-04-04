// Copyright 2014-2015, University of Colorado Boulder

/**
 * Control panel for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  var CheckBox = require( 'SUN/CheckBox' );
  var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var MolecularDipoleNode = require( 'MOLECULE_POLARITY/common/view/MolecularDipoleNode' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Panel = require( 'SUN/Panel' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var atomElectronegativitiesString = require( 'string!MOLECULE_POLARITY/atomElectronegativities' );
  var atomLabelsString = require( 'string!MOLECULE_POLARITY/atomLabels' );
  var bondDipolesString = require( 'string!MOLECULE_POLARITY/bondDipoles' );
  var electronDensityString = require( 'string!MOLECULE_POLARITY/electronDensity' );
  var electrostaticPotentialString = require( 'string!MOLECULE_POLARITY/electrostaticPotential' );
  var molecularDipoleString = require( 'string!MOLECULE_POLARITY/molecularDipole' );
  var noneString = require( 'string!MOLECULE_POLARITY/none' );
  var partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  var surfaceString = require( 'string!MOLECULE_POLARITY/surface' );
  var viewString = require( 'string!MOLECULE_POLARITY/view' );

  // constants
  var TITLE_OPTIONS = {
    font: MPConstants.TITLE_FONT,
    maxWidth: 300
  };
  var CONTROL_TEXT_OPTIONS = {
    font: MPConstants.CONTROL_FONT,
    maxWidth: 225
  };
  var RADIO_BUTTON_OPTIONS = { radius: MPConstants.RADIO_BUTTON_RADIUS };
  
  /**
   * @param {JSmolProperties} jsmolProperties
   * @constructor
   */
  function RealMoleculesControlPanel( jsmolProperties ) {

    var viewTitleNode = new Text( viewString, TITLE_OPTIONS );

    // 'View' check boxes
    var bondDipolesLabel = new LayoutBox( {
      children: [ new Text( bondDipolesString, CONTROL_TEXT_OPTIONS ), BondDipoleNode.createIcon() ],
      orientation: 'horizontal',
      spacing: 10
    } );
    var bondDipolesCheckBox = new CheckBox( bondDipolesLabel, jsmolProperties.bondDipolesVisibleProperty );
    var molecularDipoleLabel = new LayoutBox( {
      children: [ new Text( molecularDipoleString, CONTROL_TEXT_OPTIONS ), MolecularDipoleNode.createIcon() ],
      orientation: 'horizontal',
      spacing: 10
    } );
    var molecularDipoleCheckBox = new CheckBox( molecularDipoleLabel, jsmolProperties.molecularDipoleVisibleProperty );
    var partialChargesCheckBox = new CheckBox( new Text( partialChargesString, CONTROL_TEXT_OPTIONS ), jsmolProperties.partialChargesVisibleProperty );
    var atomLabelsCheckBox = new CheckBox( new Text( atomLabelsString, CONTROL_TEXT_OPTIONS ), jsmolProperties.atomLabelsVisibleProperty );
    var atomElectronegativitiesCheckBox = new CheckBox( new Text( atomElectronegativitiesString, CONTROL_TEXT_OPTIONS ), jsmolProperties.atomElectronegativitiesVisibleProperty );

    // 'Surface' title
    var surfaceTitleNode = new Text( surfaceString, TITLE_OPTIONS );

    // 'Surface' radio buttons
    var noneButton = new AquaRadioButton( jsmolProperties.surfaceTypeProperty, SurfaceType.NONE, new Text( noneString, CONTROL_TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );
    var electrostaticPotentialButton = new AquaRadioButton( jsmolProperties.surfaceTypeProperty, SurfaceType.ELECTROSTATIC_POTENTIAL, new Text( electrostaticPotentialString, CONTROL_TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );
    var electronDensityButton = new AquaRadioButton( jsmolProperties.surfaceTypeProperty, SurfaceType.ELECTRON_DENSITY, new Text( electronDensityString, CONTROL_TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );

    // nodes in the control panel, in the order they will appear vertically
    var children = [
      viewTitleNode,
      bondDipolesCheckBox,
      molecularDipoleCheckBox,
      partialChargesCheckBox,
      atomLabelsCheckBox,
      atomElectronegativitiesCheckBox,
      //--------------------
      surfaceTitleNode,
      noneButton,
      electrostaticPotentialButton,
      electronDensityButton
    ];

    // compute the horizontal separator width, insert separators above (before) titles
    var separatorWidth = 0;
    for ( var i = 0; i < children.length; i++ ) {
      separatorWidth = Math.max( separatorWidth, children[ i ].width );
    }
    children.splice( children.indexOf( surfaceTitleNode ), 0, new HSeparator( separatorWidth ) );

    // vertical panel
    Panel.call( this,
      new LayoutBox( {
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

  moleculePolarity.register( 'RealMoleculesControlPanel', RealMoleculesControlPanel );

  return inherit( Panel, RealMoleculesControlPanel );
} );
